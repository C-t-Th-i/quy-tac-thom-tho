---
name: nen-phien
description: >-
  Tự CHỌN 1 phương án nén phiên hợp lý nhất (nén ngữ cảnh hoặc xóa hẳn mở phiên mới) theo bối cảnh phiên, đọc bộ nhớ đã lưu tìm việc đang dở.
  Trigger: /nen-phien, hoặc bác nói bất kỳ kiểu nào liên quan context phiên —
  NÉN/DỌN ("nén lại đi", "nén phiên", "compact lại", "compact đi", "dọn context", "dọn phiên",
  "gọn lại đi", "gọn lại phiên", "xem phiên bao lớn", "cần compact") ·
  CLEAR/MỞ MỚI ("clear đi", "clear session", "clear chat này đi", "ném phiên đi", "dẹp phiên",
  "reset phiên", "bắt đầu lại", "mở phiên mới đi", "mở chat mới", "nên clear không",
  "bắt đầu lại được chưa", "nên mở chat mới không") ·
  HỎI TÌNH TRẠNG ("chat dài quá", "nặng quá rồi", "hết context chưa", "sắp đầy chưa",
  "phiên này dài rồi", "chậm rồi", "phiên bị lag", "bao nhiêu token rồi",
  "context còn bao nhiêu", "còn chỗ không", "phiên này nặng quá", "em thấy chậm",
  "context window còn nhiều không", "sắp hết chỗ chưa", "nên compact không") ·
  BÀN GIAO ("viết bàn giao", "bàn giao đi", "gói lại cho phiên sau", "handoff",
  "lưu trạng thái task này", "ghi lại đang làm gì để mai tiếp").
---

# Gợi ý nén phiên — `/nen-phien`

Skill này giúp bác chủ động quyết khi nào và bằng cách nào nén context phiên hiện tại. Em chỉ là công cụ tính toán + đề xuất — bác là người gõ lệnh.

---

## Khi nào skill được kích hoạt

- Bác gõ `/nen-phien` → bắt buộc chạy
- **KHÔNG tự bật.** Đây là skill on-demand cho bác.
- Nếu có hook riêng canh ngưỡng token và cảnh báo xuất hiện + bác hỏi về tình trạng phiên → skill này cũng kích hoạt.

---

## Quy trình em phải làm

### Bước 1. Gom bối cảnh

Đọc lại:
- **5–10 tin nhắn gần nhất của bác** trong phiên này — để hiểu đang làm gì.
- **Mục "ĐANG DỞ" trong bộ nhớ đã lưu** (file index bộ nhớ, nếu nền tảng có cơ chế này) — để biết task lớn nào đang treo.

(Skill không tự đo token — chỉ đoán bối cảnh từ nội dung. Nếu có hook riêng lo cảnh báo ngưỡng token thì để hook đó lo, skill này chỉ kích hoạt khi bác chủ động hỏi hoặc gõ lệnh.)

### Bước 2. Đoán bối cảnh → CHỌN 1 phương án hợp lý nhất

Đọc lại tin nhắn + bộ nhớ → đoán bác đang ở đâu, rồi **tự chọn 1** (không liệt kê đều cả 3 cho bác tự chọn):

| Bối cảnh nhận ra | Phương án chọn |
|---|---|
| Đang giữa task / phase, còn ngã rẽ chưa chốt, cần giữ mạch | Nén ngữ cảnh, giữ lại phần cốt (VD lệnh `/compact focus on [phần cốt thật sự]` nếu nền tảng hỗ trợ) |
| Vừa xong phase / task, sắp chuyển sang việc khác | Xóa hẳn ngữ cảnh (VD `/clear`) + 1 câu lệnh khởi động task kế |
| Cùng task, chỉ muốn bỏ đoạn debug/mò dài, giữ kết quả | Nén ngữ cảnh, giữ kết quả đã chốt, bỏ đoạn debug/mò |

**Cách đoán bối cảnh:**
- Tin nhắn gần nhất còn đang bàn/sửa 1 việc, chưa có câu "xong rồi" → **đang giữa việc** → nén giữ mạch
- Tin nhắn cuối báo hoàn tất / bác nói chuyển việc / hỏi việc mới → **đổi việc** → xóa hẳn
- Phân vân giữa 2 → ưu tiên nén giữ mạch (an toàn hơn, không mất mạch).

**Quy tắc viết chỉ thị nén (công thức gộp):**
- Phải nêu **tên cụ thể** (tên phase, tên file, kết quả cụ thể...)
- KHÔNG viết chung chung ("tiếp tục công việc", "giữ context quan trọng")
- Liệt kê **kết quả đã chốt** (để Claude phiên sau biết điểm tiếp tục)
- Ghi **bước kế** nếu rõ
- **Vế "bỏ ..." tùy chọn:** phiên có nhiều đoạn mò/debug/thử fail dài → thêm 1 vế nêu rõ đoạn nào nên bỏ. Phiên gọn → khỏi vế này.

### Bước 3. In output cho bác

Format chuẩn — **đề xuất 1 phương án chính (em đã chọn)**, lý do 1 câu. Phương án kia chỉ nêu khi thật sự lưỡng lự, đặt dưới mục "hoặc":

```
🎯 Đang làm: [tóm tắt 1 dòng dựa tin nhắn gần nhất]
📌 Việc lớn đang dở: [trích từ bộ nhớ đã lưu nếu có]

→ Em đề xuất: [nén giữ mạch HOẶC xóa hẳn] — vì [lý do 1 câu: đang giữa việc / vừa xong].

  [chỉ thị nén cụ thể với tên file, phase, kết quả đã chốt]
```

- **Chỉ in phương án em chọn.** KHÔNG bày 2-3 lệnh ngang nhau bắt bác tự phán.
- Chỉ khi bối cảnh thật sự mập mờ → thêm mục `hoặc: [lệnh kia]` + 1 câu khi nào dùng cái kia.

> ⛔ **QUY TẮC CỨNG — KHÔNG ĐƯỢC BỎ SÓT:**
> MỌI lần `/nen-phien` hay đề xuất nén/xóa ngữ cảnh → output **BẮT BUỘC** kết thúc bằng block **"🚀 Câu lệnh cho phiên sau"** chứa **1 câu lệnh CỤ THỂ** bác copy được (gọi tên task + trỏ file bàn giao nếu có).
> - KHÔNG đưa lệnh xóa trống rồi dừng.
> - KHÔNG để bác phải hỏi "câu lệnh phiên sau đâu".
> - Câu lệnh phải dạng bác dán thẳng vào phiên mới là task tự tiếp — vd: `Tiếp việc X: đọc file bàn giao <path> rồi [bước kế].`

### Bước 4. Nhánh BÀN GIAO

> **⚡ Task đã có FILE TIẾN ĐỘ sống?** (`_tien-do/tien-do-*.md` — task lớn tạo theo skill `hoi-roi-lam` §1.3)
> → **KHÔNG đẻ file bàn giao mới** (tránh 2 file/task). Thay vào đó **làm tươi file tiến độ**: cập nhật mục `📍 Đang ở đâu` + `🧠 Bối cảnh & nhật ký` (đã thử gì/fail, quyết định chốt) lần cuối, đổi dòng `Cập nhật:` sang giờ thật, rồi trỏ link cho bác. **Task có ≥2 đích con → kiểm luôn mục `🎯 Đích con` còn khớp + đủ chưa** (mỗi đích con 1 dòng, có "nuôi ai" + verify riêng). Thiếu → bổ sung trước khi clear. Con trỏ trong bộ nhớ đã lưu trỏ thẳng file tiến độ đó (format `Bước kế: đọc file tiến độ \`_tien-do/tien-do-<slug>.md\` trước khi tiếp.`). Bỏ qua phần viết file bàn giao bên dưới.
> Phần viết file bàn giao (bên dưới) chỉ dùng cho task **KHÔNG** có file tiến độ.

**Có 2 đường vào nhánh này:**

**Đường A — em tự phát hiện** (CHỈ KHI cả 2 đúng):
1. Bác sắp xóa hẳn ngữ cảnh (đổi task / mở phiên mới), KHÔNG phải chỉ nén
2. Task đang dở **phức tạp** — đạt ≥1 điều kiện cứng:
   - **≥3 file đang đụng** trong phiên, HOẶC
   - **đang giữa 1 phase có ngã rẽ chưa chốt** (vừa thử cách gì đó, chưa xong)

Task đơn giản → BỎ QUA, dùng bộ nhớ + gợi ý lệnh như Bước 3 là đủ.

**Đường B — bác gọi trực tiếp** ("viết bàn giao", "handoff", "lưu trạng thái task này"):
→ Vào THẲNG phần viết file bên dưới. **BỎ QUA điều kiện token và điều kiện sắp-clear** — bác xin là làm, kể cả context còn thoáng.

**Khi kích hoạt (Đường A) → đề xuất trước:**

```
⚠️ Task phức tạp + sắp xóa hẳn ngữ cảnh → em đề xuất viết FILE BÀN GIAO trước.
   (bộ nhớ đã lưu chỉ là con trỏ, không tải nổi trạng thái sống của task này)
Viết nhé? (y)
```

Bác đồng ý (hoặc Đường B) → làm 2 việc:

**(a) Viết file** `_ban-giao/ban-giao-<slug>-<ngày giờ thật>.md`

- **slug** = rút gọn kebab-case không dấu từ tên task. Task chưa có tên → tự đề xuất tên 2-4 từ dựa tin nhắn gần nhất, xác nhận với bác 1 dòng rồi mới đặt.
- **Ngày giờ** = lấy thật từ hệ thống, KHÔNG tự đoán — chống trùng khi có ≥2 file bàn giao cùng ngày.
- Nếu file trùng tên vẫn tồn tại → thêm hậu tố `-2`.
- `_ban-giao/` chưa có → cứ tạo (công cụ ghi file tự tạo folder cha).

Cấu trúc file:

```markdown
# Bàn giao: <tên task> — <ngày giờ>

## Đang ở đâu
- Bước/phase hiện tại: [...]
- Vừa thử gì (KỂ CẢ cái fail): [...]

## Quyết định đã chốt
- [...] (để phiên sau không bàn lại)

## Bước kế ngay
- [...]

## Skill nên gọi
- [skill nào, vì sao]

## Trỏ tới (KHÔNG copy nội dung)
- Plan: [path tương đối]
- File đang sửa: [path tương đối:line]
- Bộ nhớ liên quan: [tên]
```

Quy tắc viết file:
- **KHÔNG copy** nội dung đã có ở plan/bộ nhớ/file khác — chỉ trỏ **path tương đối** (từ root dự án, để bấm được, KHÔNG dùng đường dẫn tuyệt đối)
- Che thông tin nhạy cảm (khóa, mật khẩu) nếu có
- Trạng thái SỐNG là phần giá trị nhất: bước nào, thử gì fail, biến gì trong đầu

**(b) Ghi 1 dòng con trỏ vào bộ nhớ đã lưu** — **format BẮT BUỘC** để dễ nhận ra ở phiên sau:

```
- [ĐANG DỞ: <tên task>] — <1 câu tóm>. Bước kế: đọc file bàn giao `_ban-giao/ban-giao-<slug>-<ngày giờ>.md` trước khi tiếp.
```

Vì sao format này (ĐỪNG đổi tùy tiện):
- Title phải có **`ĐANG DỞ`** → dễ nhận ra là việc dở khi quét bộ nhớ đầu phiên sau
- Path phải nằm sau **`Bước kế:`** + đúng dạng `_ban-giao/ban-giao-*.md`

### Bước 5. Quét dọn file bàn giao cũ (mỗi lần `/nen-phien` chạy)

"Tự xóa khi task xong" KHÔNG khả thi (không có sự kiện báo task xong). Thay bằng **bán tự động**:

Mỗi lần `/nen-phien` chạy → liệt kê các file `_ban-giao/ban-giao-*.md` đang có:

```
🗂 File bàn giao còn trong _ban-giao/:
  - ban-giao-<x>-<...>.md  (task: <tên>)
Task nào XONG rồi thì em xóa file + xóa dòng con trỏ trong bộ nhớ. Cái nào? (vd "xóa x", "giữ hết")
```

- Bác chỉ cái nào xong → xóa file đó + xóa dòng con trỏ tương ứng.
- Không có file bàn giao nào → bỏ qua bước này, không in gì.
- KHÔNG tự xóa khi bác chưa xác nhận.
- File bàn giao **quá 7 ngày** → coi như rác, nhắc bác xóa. Tránh tồn đọng nếu bác lâu không gõ `/nen-phien`.
- **File tiến độ** `_tien-do/tien-do-*.md` cũng liệt kê chung trong danh sách trên (hỏi bác cái nào XONG để xóa), NHƯNG **KHÔNG áp luật 7-ngày-rác** — task lớn sống nhiều phiên, để lâu là bình thường. Chỉ xóa khi bác xác nhận task xong.

---

## Quy tắc trình bày

- KHÔNG dài dòng giải thích lý do — bác đã biết
- KHÔNG hỏi xác nhận thừa — chỉ in gợi ý
- Skill này KHÔNG tự tính/in con số token — đó là việc của hook riêng (nếu có cài). Skill chỉ đoán bối cảnh qua nội dung tin nhắn + bộ nhớ.
- Chọn 1 phương án chính + lý do 1 câu — không bày menu lệnh để bác tự phán
