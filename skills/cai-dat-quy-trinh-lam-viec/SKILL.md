---
name: cai-dat-quy-trinh-lam-viec
description: >-
  Cài đặt bộ quy tắc làm việc (GRILL-trước-làm-sau, agent phản biện độc lập,
  cơ chế bộ nhớ, output-style cô đọng) từ gói này vào một dự án Claude Code
  khác. Dùng khi người dùng nói "cài quy trình làm việc này cho tôi", "setup
  bộ quy tắc này", "áp dụng gói này vào dự án của tôi", hoặc mở Claude Code
  trong một thư mục đã clone/chứa gói này và muốn triển khai nó.
---

# Cài đặt quy trình làm việc — skill cài đặt gốc

Skill này hướng dẫn bạn (Claude Code, đang chạy trong Claude Desktop app của người
dùng) tự cài toàn bộ nội dung gói vào dự án thật của người dùng. Người dùng KHÔNG
cần gõ lệnh terminal nào — mọi thao tác copy/sửa file do bạn thực hiện bằng công cụ
đọc/ghi file sẵn có (Read, Write, Bash/PowerShell).

**Nguyên tắc xuyên suốt: hỏi xác nhận trước khi ghi đè bất cứ file/cấu hình nào đã
tồn tại.** Đây là dự án thật của người dùng — không tự quyết định thay họ.

---

## Bước 1 — Xác định thư mục nguồn và thư mục đích

- **Thư mục nguồn** = nơi chứa gói này (có `CLAUDE.md`, `README.md`, `skills/`,
  `agents/`, `hooks/`, `output-styles/`, `memory-mau/`). Nếu người dùng mới đưa
  bạn 1 link GitHub (chưa clone về máy) → hỏi xác nhận rồi mới `git clone` link đó
  vào 1 thư mục riêng (không đè lên dự án của họ). Đây là hành động tải file —
  BẮT BUỘC hỏi trước khi thực hiện.
- **Thư mục đích** = dự án hiện tại của người dùng (thư mục họ đang mở Claude Code).
  Xác nhận lại tên/đường dẫn thư mục đích với người dùng trước khi ghi bất cứ gì
  vào đó.

## Bước 2 — Đọc README.md của gói

Đọc `README.md` ở thư mục nguồn để nắm tổng quan gói (nội dung gồm những gì,
KHÔNG gồm những gì) trước khi cài — tránh cài nhầm hoặc bỏ sót.

## Bước 3 — Liệt kê kế hoạch copy, hỏi xác nhận

Trước khi ghi bất kỳ file nào, trình bày cho người dùng bảng dự kiến:

| Nguồn (trong gói) | Đích (dự án của bạn) |
|---|---|
| `CLAUDE.md` | `CLAUDE.md` ở gốc dự án |
| `output-styles/viet-co-dong.md` | `.claude/output-styles/viet-co-dong.md` |
| `skills/hoi-roi-lam/SKILL.md` | `.claude/skills/hoi-roi-lam/SKILL.md` |
| `skills/rut-kinh-nghiem/SKILL.md` | `.claude/skills/rut-kinh-nghiem/SKILL.md` |
| `skills/nen-phien/SKILL.md` | `.claude/skills/nen-phien/SKILL.md` |
| `agents/phan-bien-doc-lap.md` | `.claude/agents/phan-bien-doc-lap.md` |
| `hooks/token-guard.js` | `.claude/hooks/token-guard.js` |
| `hooks/check-truoc-khi-tao-skill.ps1` | `.claude/hooks/check-truoc-khi-tao-skill.ps1` |
| `memory-mau/MEMORY.md` | (xem Bước 6 — tuỳ chọn, không tự động) |

- Nếu file đích **đã tồn tại** (nhất là `CLAUDE.md` — dự án có thể đã có sẵn) →
  liệt kê rõ, hỏi: **ghi đè / gộp nội dung (nối vào cuối, có ngăn cách rõ) / bỏ qua
  file đó**. Không tự quyết định.
- Chỉ sau khi người dùng xác nhận kế hoạch → mới bắt đầu ghi.

## Bước 4 — Copy CLAUDE.md, output-style, skill, agent

Thực hiện đúng bảng đã xác nhận ở Bước 3 cho các dòng KHÔNG phải hook. Đây là copy
file thuần (Read nguồn → Write đích), không cần xin phép thêm lần nữa vì đã xác
nhận kế hoạch ở Bước 3 — nhưng nếu phát sinh file đích tồn tại mà chưa được nhắc
tới ở Bước 3, dừng lại hỏi ngay.

## Bước 5 — Cài hook (cần xác nhận riêng — đụng tới cấu hình)

Hook đụng tới file cấu hình (`settings.json` hoặc `settings.local.json`) — xin xác
nhận RIÊNG, tách khỏi Bước 3, vì đây là thay đổi cấu hình hệ thống:

1. Copy 2 file hook vào `.claude/hooks/` (như bảng ở Bước 3).
2. Đọc `settings.json`/`settings.local.json` hiện có của dự án đích (nếu có).
3. Trình bày đoạn cấu hình cần thêm (đăng ký `PostToolUse`/`PreToolUse` cho
   `token-guard.js`, `PreToolUse` cho `check-truoc-khi-tao-skill.ps1`, và
   `outputStyle` trỏ `viet-co-dong` — xem ví dụ cấu hình trong `README.md` của gói).
4. Hỏi xác nhận rõ ràng: *"Em cần thêm đoạn cấu hình này vào settings — đồng ý
   không?"* — chỉ ghi sau khi người dùng gật.

## Bước 6 — Cơ chế bộ nhớ (tuỳ chọn, hỏi trước)

Hỏi người dùng: *"Nền tảng Claude Code bạn đang dùng có tính năng auto memory (tự
ghi/đọc ghi chú ngoài dự án) không?"*

- **Có sẵn** → không cần làm gì thêm, tính năng nền tảng tự lo.
- **Không có / không chắc** → hỏi có muốn dùng file `memory-mau/MEMORY.md` làm mục
  lục ghi chú thủ công không. Đồng ý → copy vào vị trí người dùng chỉ định (thường
  là gốc dự án hoặc 1 thư mục ghi chú riêng), giải thích ngắn cách dùng (xem mục
  "Cơ chế bộ nhớ" trong `CLAUDE.md` đã cài).

## Bước 7 — Đề xuất tự động cập nhật hàng tuần (hỏi cuối cùng)

Sau khi cài xong, hỏi: *"Bạn có muốn Claude tự kiểm tra bản cập nhật mới của gói
này mỗi tuần không?"*

- **Đồng ý** → kiểm tra xem Claude Code của người dùng có tính năng lên lịch
  (cron/schedule) sẵn có không. Có → tự đề xuất tạo 1 lịch hàng tuần: vào thư mục
  nguồn (nơi đã `git clone` gói), chạy `git pull`, nếu có thay đổi thì báo lại cho
  người dùng (không tự động ghi đè lại các file đã cài — chỉ báo, để người dùng
  chủ động chạy lại skill này áp bản mới).
- **Từ chối** → dừng, không tạo gì thêm.

## Bước 8 — Báo kết quả

Tổng kết ngắn gọn: đã copy những gì vào đâu, đã sửa cấu hình gì, đã (hoặc chưa) đặt
lịch tự kiểm tra. Gợi ý người dùng thử ngay bằng cách nêu 1 việc nhỏ để xem quy tắc
GRILL có tự áp dụng không.

---

## Lưu ý khi tự kiểm/test skill này

Nếu bạn đang chạy skill này để **kiểm thử khô** (không có người dùng thật đứng
sau), làm đúng các bước trên trong 1 thư mục test riêng — không giả định trước
người dùng sẽ trả lời gì ở các bước hỏi xác nhận; nếu không có ai trả lời, dừng lại
đúng chỗ hook/bước cần xác nhận và báo cáo rằng bước đó cần người dùng thật.
