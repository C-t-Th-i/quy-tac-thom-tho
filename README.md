# Quy Trình Làm Việc Claude Code

Bộ quy tắc làm việc chung cho Claude Code — cách một Claude nên hỏi-rồi-làm, tự
phản biện trước khi hành động, nhớ xuyên phiên, và trả lời cô đọng. Không phụ
thuộc lĩnh vực cụ thể — dùng được cho bất kỳ dự án nào.

## Gói này CÓ gì

| Thành phần | Vị trí trong gói | Vai trò |
|---|---|---|
| Quy tắc GRILL-trước-làm-sau | `CLAUDE.md` | Nền tảng: làm rõ mục đích, chốt trải nghiệm người dùng, phản biện, chờ xác nhận trước khi làm |
| Skill hỏi-rồi-làm chi tiết | `skills/hoi-roi-lam/SKILL.md` | Chi tiết đầy đủ quy trình 3 giai đoạn (trước/trong/sau khi làm) |
| Agent phản biện độc lập | `agents/phan-bien-doc-lap.md` | Review plan/bản nháp độc lập, 4 verdict, không tự bênh |
| Skill rút kinh nghiệm | `skills/rut-kinh-nghiem/SKILL.md` | Xử lý lỗi/feedback theo 3 bậc, tránh lặp lại lỗi cũ |
| Skill nén phiên | `skills/nen-phien/SKILL.md` | Nén/bàn giao ngữ cảnh khi phiên dài, không mất việc dở |
| Cơ chế bộ nhớ (mẫu) | `memory-mau/MEMORY.md` | Mục lục ghi chú thủ công (nếu nền tảng không có auto memory) |
| Output-style cô đọng | `output-styles/viet-co-dong.md` | Cách trả lời tiếng Việt ngắn gọn, tránh thuật ngữ Anh không cần thiết |
| 2 hook | `hooks/token-guard.js`, `hooks/check-truoc-khi-tao-skill.ps1` | Cảnh báo mềm: token phiên gần đầy, sắp tạo skill trùng lặp |
| Skill cài đặt | `skills/cai-dat-quy-trinh-lam-viec/SKILL.md` | Claude tự đọc, tự cài toàn bộ gói vào dự án của bạn |

## Gói này KHÔNG có gì

- Không có skill nội dung theo lĩnh vực cụ thể (viết sách, dựng kênh, thiết kế...).
- Không có ghi chú bộ nhớ thật của ai — chỉ có file mẫu rỗng.
- Không tự động ghi đè cấu hình dự án bạn mà không hỏi trước.

## Cách cài (1 câu)

1. Clone repo này về máy (`git clone <link repo>`).
2. Mở Claude Code (Desktop app) tại dự án bạn muốn áp dụng quy tắc này.
3. Gõ: **"hãy cài quy trình làm việc này cho tôi từ `<đường dẫn vừa clone>`"**

Claude sẽ tự đọc skill `cai-dat-quy-trinh-lam-viec`, hỏi xác nhận từng bước quan
trọng (ghi đè file, sửa cấu hình), rồi cài đặt. Không cần biết dòng lệnh gì thêm.

## Ví dụ cấu hình hook (tham khảo khi Claude hỏi xác nhận ở bước cài hook)

Đoạn cần thêm vào `.claude/settings.json` (hoặc `settings.local.json`) của dự án
đích — điều chỉnh đường dẫn hook cho khớp hệ điều hành của bạn:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash|Edit|Write|MultiEdit|Agent|Task",
        "hooks": [
          { "type": "command", "command": "node \"<đường dẫn dự án>/.claude/hooks/token-guard.js\"" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Read|Bash",
        "hooks": [
          { "type": "command", "command": "node \"<đường dẫn dự án>/.claude/hooks/token-guard.js\"" }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          { "type": "command", "command": "powershell.exe -NoProfile -ExecutionPolicy Bypass -File \"<đường dẫn dự án>/.claude/hooks/check-truoc-khi-tao-skill.ps1\"" }
        ]
      }
    ]
  },
  "outputStyle": "viet-co-dong"
}
```

Nếu không dùng Windows/PowerShell, bỏ hook `check-truoc-khi-tao-skill.ps1` (chỉ
mang tính nhắc nhở, không bắt buộc) hoặc viết lại tương đương bằng shell script.

## Tự động cập nhật (tuỳ chọn)

Sau khi cài, Claude sẽ hỏi có muốn tự kiểm tra bản mới của gói mỗi tuần không. Nếu
đồng ý và nền tảng Claude Code của bạn có tính năng lên lịch (cron/schedule), Claude
sẽ tự tạo 1 lịch chạy `git pull` trong thư mục đã clone, báo lại khi có thay đổi —
không tự động ghi đè lại các file đã cài, bạn chủ động chạy lại skill cài đặt khi
muốn áp bản mới.

## Dùng cho nền tảng khác Claude Code

Bộ quy tắc này ban đầu viết cho Claude Code, nhưng tinh thần GRILL-trước-làm-sau
áp dụng được cho các trợ lý AI khác. File `quy-tac-lam-viec.md` (ở gốc gói này)
là bản rút gọn thuần văn bản — không nhắc tới skill/hook/subagent/memory file,
vì các nền tảng dưới đây không có các cơ chế đó.

### Codex CLI (OpenAI) / Antigravity (Google) — chỉ cần dán 1 link

Repo này là **public**, 2 công cụ dưới đây tự đọc được nội dung file trực tiếp
qua link — không cần tự tay clone/copy/dán:

> Đọc giúp tôi file này: `https://raw.githubusercontent.com/C-t-Th-i/quy-tac-thom-tho/main/quy-tac-lam-viec.md`
> — rồi lưu nguyên nội dung vào file `AGENTS.md` ở gốc dự án này (nếu dự án đã
> có `AGENTS.md`, nối thêm vào cuối, ngăn cách bằng dòng `---` và tiêu đề
> `## Quy tắc làm việc chung`).

Dán nguyên câu trên vào Codex CLI hoặc Antigravity là xong. Với Antigravity, đổi
câu cuối thành: *"...lưu vào file `.agents/agents.md` (tạo thư mục `.agents/`
nếu chưa có)"* — vì Antigravity đọc riêng thư mục `.agents/`, không đọc
`AGENTS.md` ở gốc dự án như Codex.

**Lưu ý Codex CLI:** giới hạn tổng dung lượng file hướng dẫn dự án là 32KB
(`project_doc_max_bytes`) — nếu `AGENTS.md` của dự án đã dài, dán thêm có thể
bị cắt bớt phần cuối; nếu vậy, rút gọn bớt nội dung cũ.

**Cách thủ công (nếu công cụ không tự đọc được link, hoặc bạn muốn kiểm tra nội
dung trước khi dán):** mở file `quy-tac-lam-viec.md`, copy toàn bộ, dán vào
đúng vị trí (`AGENTS.md` cho Codex, `.agents/agents.md` cho Antigravity).

### Claude.ai (Projects) / ChatGPT (Custom GPT hoặc Custom Instructions) / Gemini (Gem)

Các nền tảng này không có khả năng tự đọc 1 link rồi tự áp dụng làm cấu hình
lâu dài cho chính nó — bắt buộc phải copy tay nội dung `quy-tac-lam-viec.md`
rồi dán vào đúng ô cấu hình của từng nơi:

| Nền tảng | Dán vào đâu |
|---|---|
| Claude.ai | Mở Project → "Project instructions" (hoặc "Custom instructions" nếu dùng ngoài Project) → dán toàn bộ nội dung `quy-tac-lam-viec.md` |
| ChatGPT | Ưu tiên tạo/sửa 1 Custom GPT → tab "Instructions" (giới hạn ký tự rộng rãi) → dán. Chỉ dùng Settings → Personalization → "Custom instructions" (áp cho mọi cuộc trò chuyện) nếu thật cần — ô này giới hạn ký tự NHỎ hơn nhiều, có thể bị cắt cụt âm thầm; kiểm tra giới hạn hiện tại của tài khoản trước khi dán, rút gọn nếu cần |
| Gemini | Gemini Gems → tạo Gem mới → ô "Instructions" → dán |

Sau khi dán, mở 1 cuộc trò chuyện mới trong Project/GPT/Gem đó để bản instructions
có hiệu lực — sửa instructions giữa chừng 1 cuộc trò chuyện đang mở thường không
áp dụng ngược lại cho tin nhắn đã gửi trước đó.
