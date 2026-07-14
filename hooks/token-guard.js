#!/usr/bin/env node
// token-guard — chốt chặn token tự động cho phiên Claude Code
// 1 file, 2 chế độ (phân nhánh theo hook_event_name):
//
//   PostToolUse  (Lớp A — đo SAU)  : chạy sau mỗi thao tác, đọc token thật của
//       phiên; khi chạm WARN_TOKENS (~200k) thì chèn nhắc nén phiên + gợi
//       câu /compact. Bắt kiểu "cháy từ từ".
//
//   PreToolUse   (Lớp B — chặn TRƯỚC): chạy trước Read/Bash; nếu sắp đọc 1 file
//       to làm token vọt quá HARD_CEIL (~250k) thì CHẶN lần đọc thô đó + trả lý
//       do, để agent đọc lại theo từng phần (limit/offset) hoặc giao phiên phụ.
//       Bắt kiểu "nhảy vọt 1 phát".
//
// Token thật lấy từ file ghi phiên (transcript .jsonl): dòng assistant gần nhất
// có message.usage → input_tokens + cache_read + cache_creation = lượng token
// đang nạp vào cửa sổ ngữ cảnh.
//
// Triết lý: máy tự canh, người (cả người dùng lẫn agent) khỏi phải nhớ. Mọi lỗi
// đều nuốt im — KHÔNG bao giờ chặn thao tác vì lỗi nội bộ của hook.

const fs = require('fs');
const os = require('os');
const path = require('path');

// ── Ngưỡng (chỉnh ở đây) ────────────────────────────────────────────────────
const WARN_TOKENS = 200000;   // Lớp A: chạm mốc này → nhắc nén
const HARD_CEIL    = 250000;  // Lớp B: token sau khi đọc file vượt mốc này → chặn
const READ_EST_FLOOR = 15000; // file ước < mốc này token → bỏ qua (chỉ lo file to)
const BYTES_PER_TOKEN = 3.5;  // ước thô: 1 token ~ 3.5 byte (trộn Việt/Anh, ước hơi dư)
const DEBOUNCE_CALLS = 5;     // Lớp A: số thao tác tối thiểu giữa 2 lần nhắc
const STALE_SECONDS = 90;     // file trung gian cũ hơn mốc này thì bỏ

const stdinTimeout = setTimeout(() => process.exit(0), 8000);
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', c => (input += c));
process.stdin.on('end', () => {
  clearTimeout(stdinTimeout);
  try {
    const data = JSON.parse(input);
    const ev = data.hook_event_name;
    if (ev === 'PreToolUse') handlePre(data);
    else handlePost(data); // PostToolUse (mặc định)
  } catch (e) {
    process.exit(0); // nuốt im
  }
});

// ── Đọc token thật của phiên ────────────────────────────────────────────────
function readContextTokens(data) {
  // Nguồn chính: transcript .jsonl
  const t = tokensFromTranscript(data.transcript_path);
  if (t > 0) return t;
  // Dự phòng: file trung gian (nếu có công cụ khác ghi % dùng theo cửa sổ 1M)
  return tokensFromBridge(data.session_id);
}

function tokensFromTranscript(transcriptPath) {
  if (!transcriptPath || typeof transcriptPath !== 'string') return 0;
  try {
    if (!fs.existsSync(transcriptPath)) return 0;
    const stat = fs.statSync(transcriptPath);
    const MAX = 512 * 1024; // đọc 512KB cuối — đủ phủ nhiều lượt gần nhất
    const start = Math.max(0, stat.size - MAX);
    const fd = fs.openSync(transcriptPath, 'r');
    let content;
    try {
      const buf = Buffer.alloc(stat.size - start);
      fs.readSync(fd, buf, 0, buf.length, start);
      content = buf.toString('utf8');
    } finally {
      fs.closeSync(fd);
    }
    const lines = content.split('\n');
    // Duyệt NGƯỢC: tìm dòng assistant gần nhất có usage
    for (let i = lines.length - 1; i >= 0; i--) {
      const line = lines[i].trim();
      if (!line || line[0] !== '{') continue;
      let obj;
      try { obj = JSON.parse(line); } catch { continue; }
      const u = (obj.message && obj.message.usage) || obj.usage;
      if (u && typeof u.input_tokens === 'number') {
        return (u.input_tokens || 0) +
               (u.cache_read_input_tokens || 0) +
               (u.cache_creation_input_tokens || 0);
      }
    }
  } catch { /* nuốt im */ }
  return 0;
}

function tokensFromBridge(sessionId) {
  if (!sessionId || /[/\\]|\.\./.test(sessionId)) return 0;
  try {
    const p = path.join(os.tmpdir(), `claude-ctx-${sessionId}.json`);
    if (!fs.existsSync(p)) return 0;
    const m = JSON.parse(fs.readFileSync(p, 'utf8'));
    const now = Math.floor(Date.now() / 1000);
    if (m.timestamp && now - m.timestamp > STALE_SECONDS) return 0;
    if (typeof m.used_pct === 'number') return Math.round((m.used_pct / 100) * 1_000_000);
  } catch { /* nuốt im */ }
  return 0;
}

const k = n => Math.round(n / 1000);

// ── Lớp A — PostToolUse: nhắc nén khi chạm ngưỡng ────────────────────────────
function handlePost(data) {
  const cur = readContextTokens(data);
  if (cur < WARN_TOKENS) process.exit(0);

  const sid = data.session_id;
  const safe = sid && !/[/\\]|\.\./.test(sid);
  const warnPath = safe ? path.join(os.tmpdir(), `token-guard-${sid}-warned.json`) : null;

  // Chống spam: ít nhất DEBOUNCE_CALLS thao tác giữa 2 lần nhắc
  let st = { calls: 0 };
  let first = true;
  if (warnPath && fs.existsSync(warnPath)) {
    try { st = JSON.parse(fs.readFileSync(warnPath, 'utf8')); first = false; } catch {}
  }
  st.calls = (st.calls || 0) + 1;
  if (!first && st.calls < DEBOUNCE_CALLS) {
    if (warnPath) try { fs.writeFileSync(warnPath, JSON.stringify(st)); } catch {}
    process.exit(0);
  }
  st.calls = 0;
  if (warnPath) try { fs.writeFileSync(warnPath, JSON.stringify(st)); } catch {}

  const msg =
    `[token guard] Phiên đã ~${k(cur)}k token (ngưỡng nhắc ${k(WARN_TOKENS)}k — ` +
    `đã chạm mốc loãng). Hãy NHẮC người dùng nén phiên ngay. Tùy bối cảnh chọn: bước kế LIÊN QUAN CHẶT ` +
    `→ \`/compact focus on: quyết định đã chốt + bước đang làm dở + đường dẫn file tiến độ; bỏ: log đọc file, các lần thử fail.\` ` +
    `(nếu đang mở file tiến độ thì trỏ đúng đường dẫn vào câu lệnh). ` +
    `ĐỔI sang việc khác → \`/clear\`. ` +
    `⚠️ Nếu đề xuất \`/clear\`: BẮT BUỘC kèm block "🚀 Câu lệnh cho phiên sau" với 1 câu lệnh CỤ THỂ người dùng dán được ` +
    `(quy tắc cứng skill nen-phien) — KHÔNG để \`/clear\` trống. ` +
    `Nếu đang giữa mạch khó (lịch sử còn cần) thì báo "nên để tích lũy, qua khúc này nén sau".`;

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: msg }
  }));
}

// ── Lớp B — PreToolUse: chặn đọc file to trước khi vọt mốc ───────────────────
function handlePre(data) {
  const tool = data.tool_name;
  const ti = data.tool_input || {};

  if (tool === 'Read') {
    const fp = ti.file_path;
    if (!fp) process.exit(0);
    // Có limit = agent đã chủ ý đọc từng phần → cho qua
    if (ti.limit != null) process.exit(0);

    let size = 0;
    try { size = fs.statSync(fp).size; } catch { process.exit(0); } // không stat được → cho qua

    const est = size / BYTES_PER_TOKEN;
    if (est < READ_EST_FLOOR) process.exit(0); // file nhỏ → cho qua

    const cur = readContextTokens(data);
    if (cur + est <= HARD_CEIL) process.exit(0); // không vọt → cho qua

    const reason =
      `[token guard] CHẶN đọc thô file to: đang ~${k(cur)}k token, file này ` +
      `ước ~${k(est)}k → tổng ~${k(cur + est)}k, vượt mốc loãng ${k(HARD_CEIL)}k. ` +
      `Hãy đọc lại theo TỪNG PHẦN (Read kèm limit/offset), HOẶC giao việc đọc cho ` +
      `phiên phụ (subagent) rồi nhận về phần tóm tắt. Nếu thật sự cần đọc cả file ` +
      `một lần, gọi lại Read kèm 'limit' lớn có chủ đích — chốt chặn sẽ cho qua.`;

    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason
      }
    }));
    return;
  }

  if (tool === 'Bash') {
    // Bash KHÔNG ước được output trước khi chạy → chỉ nhắc mềm khi lệnh có mùi
    // "đổ nguyên file to" mà không giới hạn dòng. Không chặn.
    const cmd = String(ti.command || '');
    const dumpsWhole = /(^|[\s|&;])(cat|type)\s+\S/i.test(cmd) ||
      (/Get-Content/i.test(cmd) && !/-(TotalCount|Tail|First|Last|Head)/i.test(cmd));
    const guarded = /\b(head|tail|-TotalCount|-Tail|-First|-Last|Select-Object|Measure-Object|wc\b)/i.test(cmd);
    if (dumpsWhole && !guarded) {
      const msg =
        `[token guard] Lệnh có vẻ đổ NGUYÊN nội dung file ra màn hình — output to ` +
        `sẽ ngốn token đột ngột. Cân nhắc giới hạn (head/tail, -TotalCount/-Tail) hoặc ` +
        `dùng công cụ Read kèm limit thay vì cat/Get-Content cả file.`;
      process.stdout.write(JSON.stringify({
        hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg }
      }));
    }
    return;
  }

  process.exit(0);
}
