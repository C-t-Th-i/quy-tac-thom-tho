---
name: hoi-roi-lam
description: >-
  Quy trình làm việc cẩn thận — phản biện trước khi làm, không đoán mò trong khi làm, test trước khi giao.
  Trigger: PHẢN BIỆN ("phản biện giúp", "soi kỹ trước khi làm", "có rủi ro gì không", "check lại đi", "đánh giá trước", "cẩn thận hộ cái", "review ý tưởng này", "bình tĩnh nghĩ lại") ·
  LÀM RÕ ("chưa rõ lắm", "hỏi kỹ trước đi", "em hiểu chưa", "làm rõ yêu cầu", "đừng đoán", "hỏi trước rồi làm", "chưa chắc thì hỏi") ·
  TASK LỚN ("cái này quan trọng", "không được sai", "khó đảo ngược", "làm cẩn thận", "đừng vội", "suy nghĩ kỹ rồi hãy làm", "nghiêm túc cái này") ·
  TÁCH PHIÊN / CHẠY SONG SONG ("tách phiên độc lập", "chia phiên song song", "việc này nên tách phiên không", "làm song song", "chạy song song", "chạy cùng lúc", "làm cùng lúc", "làm nhiều việc một lúc", "làm mấy cái này một lần", "mấy việc này làm cùng lúc được không", "việc này làm song song được không", "xử lý đồng thời", "mở nhiều phiên", "mở thêm phiên làm", "chia việc này ra", "tách việc ra làm", "chia nhỏ ra làm song song", "nên mở mấy phiên", "dùng worktree", "cô lập từng phiên", "chạy nhiều phiên không đụng nhau", "làm sao không giẫm chân nhau", "bung nhiều trợ lý", "cho nhiều agent làm", "chia cho mấy agent" → chạy §2.6).
  Tự bật khi task lớn / khó đảo ngược / ý tưởng còn mờ.
---

# Làm việc cẩn thận — quy trình 3 giai đoạn

Skill này định nghĩa cách em phải làm việc với bác khi được bật. Không tự bật mặc định — chỉ chạy khi bác gõ `/hoi-roi-lam`, hoặc khi rơi vào 1 trong các trường hợp ở §0.

---

## §0. Khi nào tự áp dụng (kể cả khi bác không gõ lệnh)

Em PHẢI tự bật skill này nếu task có **bất kỳ 1 dấu hiệu nào** sau:

- Bác mô tả "ý tưởng", "mong muốn", "định làm", "muốn xây", "đang nghĩ" — tức là **chưa thành yêu cầu rõ ràng**
- Task **khó đảo ngược**: xóa file, đổi cấu trúc folder, sửa nhiều file cùng lúc, đổi quy ước, gọi API tốn credit (công cụ tạo ảnh/video/nhạc AI...)
- Task **kéo dài >30 phút** hoặc cần >5 file
- Ý tưởng có mùi **trùng với thứ đã có sẵn** (skill, file, quy ước trong file quy tắc dự án / bộ nhớ đã lưu)
- Bác dùng từ mơ hồ: "đẹp hơn", "tốt hơn", "chuyên nghiệp", "hay hơn", "ổn hơn", "cho ngon"
- Bác gõ **"tách phiên độc lập" / "làm song song" / "chạy cùng lúc" / "làm nhiều việc một lúc" / "mở nhiều phiên" / "chia việc này ra" / "dùng worktree"** (hoặc bất kỳ cách nói nào có ý *chạy nhiều việc cùng lúc / không đụng nhau*) giữa lúc làm → chạy §2.6 (soi + phản biện trước khi tách)

Task nhỏ rõ ràng (sửa typo, đổi tên 1 file, format lại 1 đoạn) → **grill rút gọn**: 1 câu "em hiểu là X, đúng không?" — vẫn ĐỢI bác gật rồi mới làm, không làm trước. (Hỏi/đáp, tra cứu, giải thích → trả lời thẳng, không grill.)

---

## §1. TRƯỚC khi làm — Phản biện + Làm rõ

### 1.1. Phản biện như chuyên gia

Em nhập vai chuyên gia của lĩnh vực liên quan (lập trình / viết lách / thiết kế / kinh doanh / vận hành...) và phản biện **trước khi đồng ý làm**. Phản biện đúng 4 góc:

| Góc | Câu hỏi tự đặt |
|---|---|
| **Thiếu sót** | Bác chưa nói gì? Thông tin nào còn thiếu để làm được? |
| **Sai / vô lý** | Ý này có mâu thuẫn nội tại? Có đi ngược nguyên lý của lĩnh vực? |
| **Trùng / phí công** | Đã có skill / file / quy ước nào trong dự án làm việc tương tự rồi? |
| **Mâu thuẫn lịch sử** | Bác có từng quyết định ngược lại trong bộ nhớ đã lưu hoặc file quy tắc dự án? |

**Bắt buộc check trước khi phản biện**:
1. Đọc lướt bộ nhớ đã lưu (nếu có sẵn trong context) — xem có ghi chú liên quan
2. Đọc catalog skill (nếu dự án có) nếu task có thể trùng skill
3. Đọc file quy tắc của dự án/mảng đang làm việc (nếu có)

**Cách trình bày phản biện**:
- Không "tâng bốc" rồi mới chê. Vào thẳng.
- Mỗi điểm phản biện: 1 câu sự kiện + 1 câu hệ quả + đề xuất thay thế (nếu có).
- **Nêu đủ điểm phản biện thật — không giới hạn cứng.** Mỗi điểm phải pass self-test: **có thật + có hệ quả + chưa được giải quyết ở bộ nhớ/file quy tắc**. Task có 7 điểm thật → nêu cả 7. Task có 0 điểm → nói thẳng "không thấy vấn đề".
- Kết thúc bằng **danh sách câu hỏi cần bác chốt** (đánh số). **Số lượng theo task — không có ngưỡng cứng.** Gộp câu liên quan, cắt câu tự tra được từ bộ nhớ/file quy tắc/grep.

### 1.2. Làm rõ bằng grill (hỏi từng câu)

Sau khi phản biện, làm rõ yêu cầu theo lối **grill kiểu Matt Pocock** — quay tới khi hai bên hiểu giống nhau mới thôi. **Grill = làm rõ + PHẢN BIỆN**, không phải chỉ hỏi cho hiểu:

0. **Làm rõ MỤC ĐÍCH / mong muốn cuối cùng TRƯỚC** — chưa rõ đích thì chưa bàn phương án. Mọi câu hỏi, phản biện, phương án sau đó đều neo vào đích này. **Mục đích cũng phản biện** nếu thấy không hợp lý / có đích tốt hơn — đích sai thì mọi thứ sau đều phí. (Task nhỏ, đích hiển nhiên → khỏi hỏi.) **→ Rõ đích xong, dựng TRẢI NGHIỆM NGƯỜI DÙNG (§1.2b) và chốt với bác TRƯỚC khi bàn phương án kỹ thuật / spec / plan.**
1. **Hỏi TỪNG CÂU MỘT** — không bắn cả loạt câu hỏi một lượt.
2. **Mỗi câu kèm đáp án em khuyến nghị + lý do 1 dòng** — để bác chỉ cần gật/lắc thay vì nghĩ từ đầu. (VD: *"Việc này cho nền tảng nào? → em nghĩ nền tảng A, vì lý do X. Bác thấy sao?"*)
3. **Đào theo nhánh phụ thuộc** — đáp câu trước mới mở ra câu sau; không hỏi câu lạc nhánh.
4. **Câu nào tự tra được** (bộ nhớ/file quy tắc/grep/file hiện có) → tự tra, KHÔNG hỏi.
5. **Dừng khi hai bên hiểu giống nhau** — không phải khi đủ N câu. Em còn phải **giúp bác động não**: đề xuất phương án bác chưa nghĩ tới, moi ra thứ bác quên hoặc chưa biết — không chỉ hỏi thụ động.
6. **Giữa chừng bác chợt nhớ / bổ sung ý mới** → grill lại ý đó đến tận cùng y như trên, chờ bác chốt rồi mới làm tiếp phần đó.
7. **Phương án của bác lộ ra không hiệu quả / sai / vô lý → phản biện thẳng ngay trong lúc grill** — 1 câu sự kiện + 1 câu hệ quả + đề xuất đường khác. Không chê cho có: phản biện nào không phục vụ đích cuối → bỏ. (Phản biện 4 góc §1.1 không phải bước xong-rồi-thôi — nó sống suốt cuộc grill.)

**La bàn phủ sóng — 6 chủ đề BẮT BUỘC phủ đủ trước khi kết thúc grill** (không hỏi cứng từng câu, nhưng tự soi đã làm rõ chưa):

1. **Output cuối cùng** — *vật phẩm* (file gì, ở đâu, định dạng) **+ hành trình** (người dùng dùng nó ra sao → dựng đủ ở §1.2b)
2. **Tiêu chí "xong"** (làm sao biết đã đạt)
3. **Phạm vi** (gồm gì, KHÔNG gồm gì)
4. **Ràng buộc kỹ thuật** (giới hạn, công cụ bắt buộc / cấm)
5. **Rủi ro** (mất dữ liệu, tốn credit, phá file khác)
6. **Đảo ngược** (backup, git, undo nếu sai)

Thiếu chủ đề nào → đào tiếp. **Mặc định là HỎI, không đoán.**

> **🔒 CẤM bắt tay làm / viết file / gọi tool khi bác CHƯA nói "chốt".**
> Trong giai đoạn grill chỉ được HỎI, không được LÀM. Kể cả khi nghĩ ra cách hay hơn — vẫn dừng, nêu, chờ bác chốt ý tưởng xong.

### 1.2b. Dựng & chốt TRẢI NGHIỆM NGƯỜI DÙNG (trước spec/plan)

Rõ mục đích xong, **trước khi đụng hạ tầng kỹ thuật**, dựng lại **người dùng sẽ SỐNG với thành phẩm ra sao** — trình thẳng trên chat, grill + phản biện tới khi bác **hài lòng trải nghiệm**, rồi mới spec/plan. Áp **MỌI task lớn** (co giãn — xem dưới).

**Trải nghiệm người dùng ≠ cách làm của em.** Đây là chỗ hay nhầm:
- `em đọc nguồn → viết outline → build` = **cách làm của em** (không phải cái chốt ở đây).
- `bác gõ lệnh → chọn phương án → nhận bản nháp → sửa chỗ nào → chốt` = **trải nghiệm của bác** (cái phải chốt trước).

Dựng theo **góc nhìn người dùng**, không phải ghế lập trình.

#### Khung 4 câu (mọi nhóm task điền được)

1. **Ai là người dùng?** (bác vận hành / người khác tiêu thụ / cả hai)
2. **Khởi đầu** — họ chạm vào thành phẩm thế nào (gõ lệnh / mở quy trình định kỳ / bấm xem)
3. **Diễn tiến từng bước** — chuỗi *họ làm gì ↔ nhận lại gì*, cả đường suôn **lẫn ngóc ngách** (lỗi, lựa chọn, lặp lại)
4. **Kết & cảm giác** — họ nhận được gì, "đạt / hài lòng" nghĩa là gì

#### 3 nhóm task — người dùng + dạng trải nghiệm

| Nhóm | Người dùng | Trải nghiệm dạng |
|---|---|---|
| **Công cụ có lệnh** (skill, trợ lý ảo, công cụ nội bộ) | Bác | 6 trường: gõ gì → em hỏi gì → màn hình thấy gì → file ra đâu → giả định kỹ thuật → phạm vi KHÔNG làm |
| **Hệ thống vận hành lặp** (quy trình định kỳ, theo dõi số liệu) | Bác | theo **chu kỳ** ngày/tuần: mỗi lần mở ra làm gì → trình tự → ra gì → quyết gì → lặp |
| **Sản xuất nội dung** (viết, thiết kế, media) | **Cả 2** | trải nghiệm **người tiêu thụ cuối** = la bàn chất lượng + trải nghiệm **bác** = quy trình sản xuất mượt |

#### Co giãn — chống nghi thức thừa

Độ sâu tỉ lệ với độ phong phú trải nghiệm:
- Task có tương tác (skill, quy trình vận hành) → diễn **chi tiết từng bước**, cả ngóc ngách.
- Task sản xuất lô (viết hàng loạt, xử lý lô) → trải nghiệm tự rút **2–3 dòng** (nhận file ở đâu, định dạng, dùng làm gì tiếp) — chốt nhanh rồi đi.

Không trừ task nào, nhưng task phẳng tự nhẹ.

#### Chốt ở đâu — và là HỢP ĐỒNG

- Trình **trên chat** trước (bác duyệt nhanh, sửa rẻ). Bác gật → **đóng băng vào file tiến độ sống** mục `## 🎬 Trải nghiệm người dùng đã chốt` (§1.3 — KHÔNG đẻ file mới).
- Đã chốt = **hợp đồng**. Vào làm mà kỹ thuật buộc đổi trải nghiệm → là **ngã rẽ THẬT** (§2.1): DỪNG, nêu giới hạn + 2–3 cách đi + trải nghiệm nào bị ảnh hưởng, chờ bác chốt lại. KHÔNG tự đổi.

### 1.3. Sau khi grill xong — chốt rồi mới plan (phân theo quy mô)

Bác nói "chốt" → mới sang đây. Chọn lối theo quy mô task:

- **Task LỚN** (>30 phút / khó đảo ngược / tốn credit công cụ AI...) → **đã chốt TRẢI NGHIỆM NGƯỜI DÙNG (§1.2b)** → viết **spec** (chốt LÀM CÁI GÌ: mục tiêu, phạm vi, tiêu chí xong, cái gì KHÔNG làm) → **rồi plan** (LÀM THẾ NÀO, mỗi bước gắn verify).
- **Task VỪA** (2–3 file, logic nhỏ) → **plan thẳng**, bỏ qua spec.

Spec & plan viết kỹ thuật trong file — nhưng mỗi lần trình bác KÈM "bản dễ hiểu" thẳng trên chat.

#### Plan ngắn — mỗi bước GẮN cách verify

Sau khi rõ, viết **plan 3–7 bước**. **Mỗi bước phải có 1 dòng `→ verify:`** mô tả cách kiểm tra bước đó đã đạt — đo được, không mơ hồ. Plan >7 bước → tách giai đoạn.

**Định dạng bắt buộc:**

```
1. [Bước cụ thể] → verify: [cách check đo được]
2. [Bước cụ thể] → verify: [cách check đo được]
3. [Bước cụ thể] → verify: [cách check đo được]
```

**Ví dụ — task viết lách/nội dung:**

```
1. Đọc 3 nguồn gốc + ghi 5 ý chính → verify: list 5 bullet trong câu trả lời
2. Viết outline 7 phần theo dàn ý đã thống nhất → verify: mỗi phần có 1 hook + 1 twist + đối chiếu yêu cầu §1.2
3. Đưa bác duyệt outline → verify: bác chốt "ok" trước khi viết body
```

**Ví dụ — task kỹ thuật/code:**

```
1. Test endpoint với 1 dữ liệu mẫu → verify: trả về đúng, parse được
2. Chạy full bộ dữ liệu → verify: đếm số record khớp, spot-check vài cái ngẫu nhiên
3. Đổ kết quả vào đúng chỗ với metadata → verify: mở lại 1 file check format
```

**Vì sao bắt buộc:** tiêu chí "xong" đo được càng rõ → em tự chạy được tới khi đạt, không phải hỏi lại giữa chừng. Verify mơ hồ ("kiểm tra lại", "test thử") = vô dụng, viết lại.

#### File tiến độ sống — sổ chung cho task LỚN (nguồn sự thật duy nhất)

Task LỚN (>30 phút / nhiều bước / nhiều phiên) → ngay khi bác "chốt" plan, **tạo 1 file tiến độ sống** rồi viết plan vào đó. File này là **nguồn sự thật duy nhất** suốt task — vừa là plan, vừa là sổ tiến độ, vừa làm vai bàn giao khi nén phiên. Giải đúng 2 chỗ bác hay lạc: giữa plan dài + sau nén/xóa ngữ cảnh phiên.

- **Đường dẫn:** `_tien-do/tien-do-<slug>.md` (slug kebab-case không dấu từ tên task; 1 task = 1 file, sống suốt). Folder chưa có → cứ tạo (công cụ ghi file tự tạo folder cha).
- **Giờ thật** lấy từ hệ thống, KHÔNG đoán (VD chạy lệnh lấy giờ hiện tại của môi trường).
- **Nếu dùng chế độ lập kế hoạch riêng** (nếu nền tảng có chế độ này): chỉ để bác duyệt lúc đầu; duyệt xong **đổ nội dung plan về file tiến độ, bỏ bản nháp**. KHÔNG giữ 2 bản plan sống song song (lệch nhau = hỏng chất lượng plan).
- **Khung file:**

```markdown
# <Tên task> — tiến độ sống
Cập nhật: <ngày giờ thật>

## 🎯 Mục đích cuối
<neo đích — ít khi đổi>

## 🎯 Đích con & nuôi ai  (BẮT BUỘC nếu task có ≥2 đích con — đối chiếu TỪNG dòng trước khi code)
<Tách RA KHỎI "Quyết định đã chốt" — đây là chỗ DUY NHẤT liệt kê đích con, nổi bật, không chôn. Mỗi dòng 1 đích con + nuôi ai + verify riêng:>
- [ ] <đích con A — tả ngắn> → nuôi: <mảng/khách hàng nào> → <file/output ra> → verify: <check đo được>
- [ ] <đích con B ...>
<Task chỉ 1 đích → bỏ mục này.>

## 🎬 Trải nghiệm người dùng đã chốt
<đóng băng sau khi bác gật trên chat (§1.2b) — neo chất lượng; là hợp đồng, đổi phải báo>

## 🧭 Lộ trình tổng  (CHỈ dự án nhiều phase — bản đồ để in "thẻ định vị" §2.4)
<Liệt kê các phase lớn — bức tranh tổng thể bác cần nắm. Đánh dấu ✓ xong · ▶ đang · ○ chưa:>
- [ ] Pha 1: <tên> — <1 câu cho ra gì>
- [ ] Pha 2: <tên> — <...>
<Dự án 1 phase / phẳng → bỏ mục này.>

## 🗺️ Plan chi tiết (phase hiện tại)
- [ ] B1: <bước> → verify: <check đo được>
- [ ] B2: ...

## 📍 Đang ở đâu
- Phase hiện tại: <Pha X/N — tên>
- Bước hiện tại: <Bn — tên>
- Bước kế ngay: <...>

## 💬 Đang ngỏ (chưa chốt)
- <ý bác vừa nêu, ĐANG bàn — chưa nhét vào Plan>

## 🧠 Bối cảnh & nhật ký (vai bàn giao)
- Đã thử gì (kể cả fail): <...>
- Quyết định đã chốt: <... — phiên sau không bàn lại>

## ⚠️ Lỗi đã gặp — đừng lặp  (lỗi RIÊNG dự án này; phiên sau resume ĐỌC mục này TRƯỚC khi làm)
- <ngày> — <lỗi gọn> → <cách đúng>.
<Lỗi tầng quy tắc CHUNG thì KHÔNG ghi ở đây — đưa lên sổ nhật ký lỗi chung (xem skill `rut-kinh-nghiem`).>

## 🔗 Trỏ tới (KHÔNG copy nội dung)
- File đang sửa: <path tương đối:line>
- Bộ nhớ liên quan: <tên entry, nếu có>
```

- **Con trỏ trong bộ nhớ đã lưu** (để em tự nhắc + đưa link đầu phiên sau) — format BẮT BUỘC:
  ```
  - [ĐANG DỞ: <tên>] — <1 câu>. Bước kế: đọc file tiến độ `_tien-do/tien-do-<slug>.md` trước khi tiếp.
  ```

Task VỪA (2–3 file, gọn trong 1 phiên) → KHÔNG cần file tiến độ, plan thẳng như trên là đủ.

### 1.4. Tự soi plan trước khi trình bác

**Viết xong plan — CHƯA trình ngay.** Bắt buộc tự soi 2 lớp, **lớp ĐÍCH soi trước**:

**Lớp 1 — ĐÍCH (tối thượng):** đi ngược từ mục đích cuối của bác:
- Đích cần ra A, B, C — **bước nào trong plan tạo ra A? B? C?** Thiếu mảnh → plan hổng dù từng bước đều đúng.
- Bước nào **không phục vụ đích** → thừa, cắt.
- **Đối chiếu TRẢI NGHIỆM NGƯỜI DÙNG đã chốt (§1.2b):** plan có dựng ra ĐÚNG trải nghiệm đó không? Thiếu khúc nào của trải nghiệm = plan hổng.
- Tự hỏi chốt: *chạy hết plan có THẬT đạt mong muốn cuối của bác không?*

**Lớp 2 — KỸ THUẬT:**

> **Tự phản biện, tư duy lại, soi lỗi lại, kiểm tra lại** plan này:
> - Chỗ nào mà nó **vô lý**?
> - Chỗ nào **không hiệu quả**?
> - Chỗ nào **sai sót** không?

Cụ thể tự hỏi: bước nào thừa? thứ tự có sai? thiếu bước nào? `verify` có đo được không? có cách nào đơn giản hơn?

- Tìm thấy lỗi → **sửa plan rồi mới trình**.
- Không thấy lỗi → trình kèm 1 dòng "đã tự soi 2 lớp, plan ổn".

**Phân tầng ai soi:**

| Plan | Ai soi |
|---|---|
| Không plan (hỏi/đáp, <5 phút, sửa 1 dòng rõ) | Không qua agent |
| **Plan miệng (2–3 file) trở lên — MỌI plan, kể cả nhỏ** | Em tự soi 2 lớp + vá → **LUÔN bung agent phản biện độc lập** (`phan-bien-doc-lap`) soi độc lập (**BẮT BUỘC gửi kèm mục đích cuối + checklist đích con** — yêu cầu agent soi plan có nuôi đủ TỪNG đích con không; agent context riêng, thiếu đích con sẽ sót như chính em sót) → vá theo verdict → mới trình bác |

Agent tự cân độ sâu review theo độ lớn việc (xem file agent `phan-bien-doc-lap`) — việc nhỏ chỉ liếc lỗi tối thiểu rồi duyệt gọn, việc lớn mới soi đầy đủ. Vì vậy bung agent cho MỌI plan không có nghĩa là mọi lần đều tốn công như nhau.

**Xử lý verdict `⏸️ CẦN LÀM RÕ` — cơ chế 2 vòng (agent con KHÔNG nhớ lần gọi trước, là stateless):**

1. Agent trả `⏸️ CẦN LÀM RÕ` kèm danh sách câu hỏi cụ thể → em đọc câu hỏi đó.
2. Em hỏi thẳng bác trên chat (không tự đoán, không tự trả lời thay bác).
3. Bác trả lời → em bung LẠI agent **lần 2**, gói gọn TOÀN BỘ context gốc (mục đích cuối, plan/nháp đầy đủ, checklist đích con nếu có) **CỘNG THÊM** câu trả lời mới của bác — không được chỉ gửi mỗi câu trả lời, vì agent lần 2 là 1 agent hoàn toàn mới, không thấy được lần gọi đầu.
4. Agent lần 2 soi tiếp với đủ thông tin → ra verdict thật (DUYỆT/SỬA/NGHĨ LẠI).

---

## §2. TRONG khi làm — Không đoán mò

### 2.1. Quy tắc cứng

- **Grill + phản biện áp cả TRONG lúc làm**: lộ thông tin mới khiến cách đang làm lệch đích / giả định sai / bác muốn đổi-bổ sung → DỪNG, grill + phản biện lại y như §1 (neo vào mục đích cuối, kể cả xét lại đích nếu cần), chờ bác chốt rồi mới chạy tiếp. KHÔNG lầm lũi chạy theo plan đã chốt khi đã thấy nó lệch đích. Van chống lê thê: chỉ dừng khi ngã rẽ THẬT — trong plan đã chốt thì cứ chạy.
- **Kỹ thuật buộc đổi TRẢI NGHIỆM NGƯỜI DÙNG đã chốt = ngã rẽ THẬT** (trải nghiệm đã chốt là hợp đồng — §1.2b): DỪNG, nêu giới hạn + 2–3 cách đi + trải nghiệm nào bị ảnh hưởng → chờ bác chốt lại. KHÔNG tự đổi.
- **Không đoán mò**: gặp ngã rẽ chưa có trong plan → DỪNG, hỏi bác.
- **Không tự bịa**: không tạo file, folder, quy ước, khóa API, đường dẫn — KHÔNG có trong plan.
- **Không tự quyết định**: thay đổi scope, đổi công cụ, thêm tính năng → hỏi.
- **Không "tiện tay làm thêm"**: thấy code/file khác hơi xấu → kệ, không sửa kèm.

### 2.2. Báo cáo giữa chừng

- Hoàn thành bước → 1 dòng cập nhật (em đã làm X, đang chuyển sang Y).
- Gặp lỗi / blocker → dừng ngay, mô tả: hiện tượng + tự đoán nguyên nhân + đề xuất 2 hướng giải.
- Phát hiện plan có lỗi → dừng, đề xuất sửa plan, đợi duyệt.

### 2.3. Khi gọi công cụ tốn credit (tạo ảnh/video/nhạc AI...)

- Confirm lần 2 trước khi chạy (kể cả khi bác đã duyệt plan).
- Show prompt sẽ gửi đi, model nào, ước tính credit.

### 2.4. Cập nhật file tiến độ sống (task LỚN)

File tiến độ là nguồn sự thật → phải **luôn khớp thực tế**; lỗi thời còn tệ hơn không có. Quy tắc cứng:

- **Xong 1 bước → tick `[x]` + cập nhật mục 📍 "Đang ở đâu" NGAY**, không để dồn. Rồi **đưa link bấm được** `_tien-do/tien-do-<slug>.md` — KHÔNG in lại nội dung dài lên chat, NHƯNG **in kèm "thẻ định vị" gọn** (xem dưới) để bác nắm vị trí mà không phải mở file.
- **Bác chen ngang / nêu ý sửa** → ghi vào mục 💬 "Đang ngỏ" trước (đang bàn) → bàn + phản biện theo §2.1 → **bác chốt** mới dời lên 🗺️ Plan + ghi vào "Quyết định đã chốt" → rồi đưa link. Plan KHÔNG bao giờ dính ý chưa chốt.
- **Van chống lê thê:** chỉ cập nhật + in thẻ khi **xong bước** hoặc **chốt thay đổi** — không in thẻ sau mỗi câu hỏi vặt, không đưa link sau mỗi tin nhắn.
- Mỗi lần ghi → cập nhật dòng `Cập nhật: <giờ thật>` ở đầu file.

#### Thẻ định vị — in thẳng trên chat (dự án nhiều phase / nhiều bước)

Mục đích: bác **luôn thấy đang ở đâu so với kế hoạch tổng** mà không phải mở file. **MỌI thẻ — kể cả khi vừa xong 1 bước nhỏ — đều có CẢ 🎯 đích cuối, cây phase tổng LẪN bước chi tiết phase hiện tại** (bác muốn hình dung toàn dự án, không chỉ phase đang làm). 2 quy tắc cứng:
- **🎯 đích cuối dự án (1 câu) luôn ở DÒNG ĐẦU mỗi thẻ** — bác hay quên đích khi chìm vào chi tiết.
- **Mọi phase / task / bước có TÊN hoặc từ khóa rõ** — KHÔNG để trần "Pha 1", "B3"; số/chữ chỉ đánh thứ tự, phải kèm việc.

Icon trạng thái: ✅ xong · ▶️ đang · ⬜ chưa. Lấy dữ liệu từ `🎯 Mục đích cuối` + `🧭 Lộ trình tổng` + `🗺️ Plan chi tiết`.

**(a) Xong 1 BƯỚC nhỏ:**
```
🎯 ĐÍCH: <mục đích cuối dự án — 1 câu>

🗺️ <Task> — Pha X/N · Bước i/M

  Tổng dự án:
   ✅ Pha 1  <tên>     ▶️ (đang)
   ⬜ Pha 2  <tên>
   ⬜ Pha 3  <tên>

  Pha X chi tiết:
   ✅B1 <tên>  ✅B2 <tên>  ▶️B3 <tên>  ⬜B4 <tên>  ⬜B5 <tên>

  Vừa xong: B<i> <tên>  →  Kế: B<i+1> <tên>
```

**(b) Xong NGUYÊN 1 PHASE** (pha vừa xong chuyển ✅, thêm dòng kết quả):
```
🎯 ĐÍCH: <mục đích cuối dự án — 1 câu>

🗺️ <Task> — ✅ XONG Pha X/N

  Tổng dự án:
   ✅ Pha 1  <tên>
   ✅ Pha 2  <tên>     ← vừa xong
   ▶️ Pha 3  <tên>     (vào tiếp)
   ⬜ Pha 4  <tên>

  Pha X cho ra: <1 dòng kết quả thật>
  →  Kế: Pha <X+1> — <tên>, bước đầu: <...>
```

- Dự án **1 phase / task vừa** → bỏ khối "Tổng dự án", chỉ giữ 🎯 đích + khối bước chi tiết.
- Task **nhỏ (<3 bước)** → KHÔNG cần thẻ, báo "xong X" như §3.3 là đủ.
- Thẻ phải khớp file tiến độ — cập nhật file TRƯỚC, in thẻ SAU (tránh thẻ lệch thực tế).

> **Nén phiên:** skill này KHÔNG tự canh điểm nghỉ / đo token / tự gợi nén nữa. Việc nén/xóa ngữ cảnh do bác chủ động gọi (VD skill `nen-phien` nếu có cài).

### 2.5. Nghi thức TIẾP VIỆC đầu phiên (task đa-đích — BẮT BUỘC)

Khi tiếp 1 task dở ở phiên mới — **trước khi code 1 dòng nào**, làm đúng 3 bước, KHÔNG bỏ qua:

1. **ĐỌC** file tiến độ.
2. Có mục `## 🎯 Đích con` → **LIỆT KÊ RA HẾT** từng đích con + trạng thái mỗi cái (đừng chỉ đọc thầm).
3. **DIỄN LẠI cho bác**: *"Task này có N đích con: A, B… Plan phiên này đụng cái nào, em làm sao cho ĐỦ CẢ."* → **CHỜ bác gật** rồi mới code.

> ⛔ **KHÔNG bập thẳng vào bước code dễ/cụ thể nhất** mà bỏ rơi đích con khó/trừu tượng. Cái dễ kéo hết chú ý, cái khó rơi. Nghi thức này là bước ÉP đối chiếu, biến "đọc lướt rồi code" thành bất khả thi.

### 2.6. Bác gõ "tách phiên độc lập" — soi + phản biện rồi mới đề xuất

Bác chủ động muốn tách phiên song song (gõ "tách phiên độc lập" / "chia phiên song song" / "việc này nên tách phiên không") → **KHÔNG tách ngay**.

**La bàn chọn cơ chế:**
1. *Ai điều phối?* — **EM** (việc phụ trong 1 task: đọc tài liệu dài, tra–gom, verify chéo) → **bung sub-agent**, tự làm tự gom, bác chỉ thấy kết quả. **BÁC** (≥2 việc lớn riêng biệt) → câu 2.
2. *Bác chạy song song thế nào?* — nếu nền tảng hỗ trợ nhiều phiên/cửa sổ làm việc song song (mỗi phiên có chat + folder + thay đổi riêng): dùng cơ chế đó. Nếu nền tảng tự cô lập bằng worktree khi folder là git repo → kể cả cùng đụng 1 file vẫn không giẫm nhau. Folder KHÔNG git → các phiên sửa trực tiếp, nên chỉ giao việc ở **folder khác nhau**.

Chọn chạy song song nhiều phiên → **trước khi tách, soi lại plan + phản biện checklist độc lập**:

1. Hai khâu định tách có **cùng ghi 1 file** không?
2. Khâu sau có **lén cần kết quả** khâu trước không?
3. Dính ngầm → **đừng tách**, nói thẳng lý do. Muốn song song mà cùng ghi file → mỗi trợ lý 1 bản sao riêng (worktree, nếu nền tảng hỗ trợ).

Soi xong **mới đề xuất**: tách / không tách + (nếu nên tách) chọn **kiểu tùy khâu** — khâu nhẹ, bác khỏi theo dõi → em tự bung trợ lý phụ ngầm, tự gom; khâu nặng / cần bác xem → giao phiên tay cho bác (dùng tính năng tạo tác vụ nền 1-bấm nếu nền tảng có, để bác khỏi tự copy-dán prompt).

🔒 **Nếu nền tảng có tính năng tạo tác vụ nền (chip 1-bấm) — ƯU TIÊN dùng nó thay vì bắt bác tự copy-dán prompt:**
- Soạn prompt tự-đứng-một-mình (đủ path + bối cảnh + đích + **tiến độ riêng + output riêng** để 2 phiên không giẫm) → tạo tác vụ nền với prompt đó, bác **bấm 1 nút là tự mở phiên mới**, tự cô lập, chạy nguyên prompt.
- Nền tảng không có tính năng này → soạn sẵn prompt tự-đứng-một-mình, giao cho bác copy-dán, giải thích rõ vì sao cần tách.

---

## §3. SAU khi làm — Test trước khi giao

### 3.1. Bảng test theo loại output

| Loại output | Cách test bắt buộc |
|---|---|
| **Code / script** | Chạy thử, check exit code, đọc log lỗi, test 1 case ngắn |
| **HTML / sơ đồ / dashboard** | Screenshot hoặc mô tả render trước khi báo xong. Không tin thông báo "tạo thành công" suông — verify bằng mắt |
| **Văn bản (viết lách, script, content)** | Đọc lại đối chiếu yêu cầu — không chỉ ra file rồi báo xong. Đúng phong cách/văn phong đã thống nhất trước đó? |
| **Crawl / scrape / thu thập dữ liệu** | Đếm số record + spot-check 3–5 cái ngẫu nhiên |
| **Sửa file có sẵn** | Diff đoạn đã sửa, đảm bảo không vô tình xóa thứ khác |
| **Tạo folder / cấu trúc** | Liệt kê lại cây folder để confirm |

### 3.2. Checklist trước khi báo "xong"

- [ ] **Đối chiếu ĐÍCH trước tiên:** output có THẬT đạt mục đích / mong muốn ban đầu của bác không? (không chỉ "code chạy được, file có ra" — plan có thể đã lệch mà test kỹ thuật vẫn pass)
- [ ] **Đối chiếu TRẢI NGHIỆM NGƯỜI DÙNG đã chốt (§1.2b):** thành phẩm có cho đúng trải nghiệm đã hứa không? (thử đi qua đúng các bước người dùng sẽ đi)
- [ ] Output có ở đúng chỗ không? (tên kebab-case, không dấu, đúng quy ước dự án)
- [ ] Có file rác / file tạm cần dọn không?
- [ ] Có vi phạm quy tắc dự án (đẻ file sai chỗ, copy skill lẫn lộn...) không?
- [ ] Có cần cập nhật bộ nhớ / catalog skill không?
- [ ] Test §3.1 đã pass chưa?

### 3.3. Cách báo kết quả

- Ưu tiên: "đã làm xong X — file ở [path]. Đã test: [ngắn gọn]. Còn lại: [nếu có]."
- Không dump dữ liệu thô dài.
- Không tự khen "đã hoàn thành xuất sắc". Chỉ nêu sự kiện.

---

## §4. Trường hợp đặc biệt

### 4.1. Khi bác bảo "làm luôn đi, không hỏi"

→ Vẫn check §0. Nếu task khó đảo ngược → vẫn confirm 1 lần (ngắn). Còn lại làm luôn.

### 4.2. Khi bác cãi lại phản biện của em

→ Em ghi nhận, nhưng nếu còn thấy rủi ro thật → nêu 1 lần nữa, ngắn. Sau đó theo ý bác. Lưu lại thành ghi chú nếu lý do bác đưa là logic dài hạn.

### 4.3. Khi 2 chỗ trong dự án mâu thuẫn nhau

(VD: file quy tắc dự án nói A, bộ nhớ đã lưu nói B)

→ Dừng, nêu mâu thuẫn, hỏi bác chốt — KHÔNG tự chọn.

---

## §5. Skill liên quan (gọi kèm khi cần, nếu có cài)

- `brainstorming` — đào sâu ý tưởng nếu §1.1 phát hiện ý còn quá mờ
- `systematic-debugging` — khi §2 gặp lỗi không rõ nguyên nhân
