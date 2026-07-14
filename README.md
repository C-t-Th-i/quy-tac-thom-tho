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
áp dụng được cho các trợ lý AI khác (Codex CLI, Antigravity, hoặc chat thuần như
Claude.ai/ChatGPT/Gemini) — xem file `loi-pho-quat.md` (nếu đã có trong gói) và
hướng dẫn dán vào từng nền tảng bên dưới.

<!-- Mục dưới đây sẽ điền ở Pha 3 (B18) — dán vào AGENTS.md / Custom Instructions / Gem -->
