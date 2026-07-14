# Quy Trình Làm Việc Claude Code

Bộ quy tắc làm việc chung cho Claude Code — cách một Claude nên hỏi-rồi-làm, tự
phản biện trước khi hành động, nhớ xuyên phiên, và trả lời cô đọng. Không phụ
thuộc lĩnh vực cụ thể — dùng được cho bất kỳ dự án nào.

## 🤖 Nếu bạn là AI/trợ lý đang đọc file này

Điều kiện áp dụng phần này: **chỉ khi** người dùng vừa đưa bạn link tới repo
này (hoặc link raw tới `quy-tac-lam-viec.md`) và nói rõ ý muốn cài đặt/áp dụng
nó (vd: "cài đặt quy tắc làm việc này cho tôi", "setup this workflow", "apply
this"). Nếu người dùng chỉ dán link mà không nói ý định gì, đừng tự hành động —
hỏi lại trước.

Khi điều kiện trên đúng, làm theo các bước sau, không cần hỏi lại thêm:

1. Tự xác định bạn đang chạy trên nền tảng/công cụ nào (Codex CLI, Antigravity,
   Claude Code, Cursor, Windsurf, Gemini CLI, hay agent khác).
2. Đọc nội dung file `https://raw.githubusercontent.com/C-t-Th-i/quy-tac-thom-tho/main/quy-tac-lam-viec.md`.
3. Lưu nguyên nội dung đó vào đúng vị trí theo nền tảng bạn đang chạy — nếu
   file đích đã tồn tại và có nội dung khác, nối thêm vào cuối, ngăn cách bằng
   dòng `---` và tiêu đề `## Quy tắc làm việc chung` (không ghi đè, không xoá
   nội dung cũ):
   - **Codex CLI, Antigravity (từ bản v1.20.3 trở lên), và phần lớn agent hỗ
     trợ chuẩn cross-tool** → `AGENTS.md` ở gốc dự án. Với Antigravity, nếu dự
     án đã có `GEMINI.md`, file đó được ưu tiên đọc trước `AGENTS.md` — nối
     thêm vào `GEMINI.md` thay vì `AGENTS.md` trong trường hợp đó.
   - **Claude Code** → `CLAUDE.md` ở gốc dự án.
   - **Cursor / Windsurf / nền tảng khác có quy ước file riêng** → dùng đúng
     file cấu hình chuẩn của nền tảng đó nếu bạn biết (vd `.cursor/rules/`,
     `.windsurfrules`); nếu không chắc, mặc định lưu vào `AGENTS.md` ở gốc dự
     án (chuẩn phổ quát nhiều công cụ agentic đang đọc theo).
   - Giữ tổng file hướng dẫn dự án gọn (khuyến nghị ~300–600 dòng cho dự án
     trưởng thành) — nếu đã dài, rút gọn bớt nội dung cũ trước khi nối thêm.
4. Nếu nền tảng bạn đang chạy có sẵn cơ chế nhớ xuyên phiên, lập kế hoạch
   trước khi làm, hoặc tạo agent con để phản biện độc lập — ưu tiên dùng đúng
   cơ chế có sẵn đó thay vì chỉ dựa vào mỗi file văn bản này.
5. Báo lại ngắn gọn cho người dùng: đã lưu vào file nào, có nối thêm vào nội
   dung cũ hay không.

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

Sau khi cài, Claude sẽ hỏi có muốn tự kiểm tra bản mới của gói mỗi tuần không. Cách
lên lịch khác nhau theo nền tảng bạn đang dùng:

- **Claude Code**: nếu nền tảng có tính năng lên lịch (cron/schedule), Claude tự tạo
  1 lịch chạy `git pull` trong thư mục đã clone, báo lại khi có thay đổi.
- **Antigravity 2.0**: dùng tính năng "Scheduled Tasks" có sẵn (cú pháp cron, lệnh
  `/schedule`) — hoạt động cả trên CLI lẫn Desktop app.
- **Codex Desktop app** (ChatGPT app): dùng tab "Automations" — hỗ trợ lên lịch kiểu
  cron ngay trong app.
- **Codex CLI thuần** (chạy dòng lệnh, không qua Desktop app): bản thân CLI không có
  tính năng lên lịch — cần nhờ cron/Task Scheduler của hệ điều hành, hoặc GitHub
  Actions, để tự chạy `git pull` định kỳ.

Dù dùng cách nào, việc tự động chỉ dừng ở "kiểm tra + báo có thay đổi" — không tự động
ghi đè lại các file đã cài; bạn chủ động chạy lại skill cài đặt khi muốn áp bản mới.

## Dùng cho nền tảng khác Claude Code

Bộ quy tắc này ban đầu viết cho Claude Code, nhưng tinh thần GRILL-trước-làm-sau
áp dụng được cho các trợ lý AI khác. File `quy-tac-lam-viec.md` (ở gốc gói này)
là bản rút gọn thuần văn bản — không nhắc tới skill/hook/subagent/memory file,
vì các nền tảng dưới đây không có các cơ chế đó.

### Codex CLI (OpenAI) / Antigravity (Google) — chỉ cần dán 1 link

Repo này là **public**. Cả 2 công cụ dưới đây (và phần lớn agent hỗ trợ chuẩn
`AGENTS.md`) tự đọc được nội dung file trực tiếp qua link — không cần tự tay
clone/copy/dán:

> Cài đặt quy tắc làm việc này cho tôi: `https://github.com/C-t-Th-i/quy-tac-thom-tho`

Dán nguyên câu trên vào Codex CLI hoặc Antigravity là xong — công cụ sẽ tự đọc
`README.md`, thấy mục "Nếu bạn là AI/trợ lý đang đọc file này", tự nhận diện
nền tảng đang chạy và tự lưu đúng chỗ (`AGENTS.md` ở gốc dự án cho cả Codex CLI
lẫn Antigravity từ bản v1.20.3 trở lên — 2 công cụ giờ dùng chung 1 file).

**Lưu ý Codex CLI:** giới hạn tổng dung lượng file hướng dẫn dự án là 32KB
(`project_doc_max_bytes`) — nếu `AGENTS.md` của dự án đã dài, dán thêm có thể
bị cắt bớt phần cuối; nếu vậy, rút gọn bớt nội dung cũ.

**Lưu ý Antigravity:** nếu dự án đã có `GEMINI.md`, file đó được ưu tiên đọc
trước `AGENTS.md` — nối thêm vào `GEMINI.md` thay vì `AGENTS.md` trong trường
hợp đó. Antigravity còn có sẵn cơ chế nhớ xuyên phiên (Knowledge Items — tự
động, không cần cấu hình gì thêm) và Planning Mode (tự bật khi việc phức tạp) —
2 quy tắc "chốt trải nghiệm trước khi làm" và "nhớ quyết định đã chốt" trong
`quy-tac-lam-viec.md` sẽ cộng hưởng tốt với các cơ chế này, không xung đột.

**Cách thủ công (nếu công cụ không tự đọc được link, hoặc bạn muốn kiểm tra nội
dung trước khi dán):** mở file `quy-tac-lam-viec.md`, copy toàn bộ, dán vào
`AGENTS.md` ở gốc dự án (hoặc `GEMINI.md` nếu dùng Antigravity và dự án đã có
sẵn file đó).

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
