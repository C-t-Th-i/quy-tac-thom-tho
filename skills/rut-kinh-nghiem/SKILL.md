---
name: rut-kinh-nghiem
description: >-
  Rút kinh nghiệm từ lỗi của Claude Code — tìm nguyên nhân gốc, phân loại
  theo thang 3 bậc (sửa gốc / lính gác / viết quy tắc), đề xuất chỗ sửa để
  lỗi KHÔNG tái diễn ở các phiên sau.
  Trigger: LỖI CLAUDE ("lại lỗi rồi", "sai rồi", "sao lại làm thế này", "bị lặp lại lỗi", "cái này kém hiệu quả",
  "vô lý quá", "lỗi kiểu cũ", "hôm qua cũng bị", "mấy lần rồi", "sao cứ sai chỗ này",
  "làm ngược yêu cầu", "em lại quên", "đã nói rồi mà", "sửa đi sửa lại hoài") ·
  RÚT BÀI HỌC ("rút kinh nghiệm đi", "ghi nhớ cái này", "lần sau đừng lặp lại", "học từ lỗi này",
  "tìm nguyên nhân gốc", "tại sao bị vậy", "sửa tận gốc đi", "đừng để tái diễn",
  "nguyên nhân ở đâu", "root cause là gì") ·
  ẢNH LỖI (dán ảnh chỗ Claude làm sai).
  KHÔNG bật cho lỗi kỹ thuật bên ngoài (mạng nghẽn, dịch vụ ngoài chặn, thư viện bug).
---

# Rút kinh nghiệm — biến lỗi của Claude thành cải tiến lâu dài

Mỗi phiên trò chuyện của Claude là một tờ giấy trắng — Claude không tự nhớ
phiên trước làm gì, sai gì. Thứ duy nhất đi xuyên phiên là **file được nạp
lại**: file quy tắc dự án, output-style, skill, hook (lính gác tự động).

→ "Claude thông minh hơn qua mỗi phiên" = mấy file đó tốt dần lên. Skill này
là công cụ giữ cho chúng tốt dần — **mà không phình to**.

---

## §0. Khi nào bật + lọc lỗi

**Bật khi:** bác gõ `/rut-kinh-nghiem`, hoặc bác chỉ ra một lỗi do Claude gây
ra (xem trigger ở phần mô tả trên).

**Lọc trước — chỉ xử lý lỗi DO CLAUDE.** Hỏi nhanh:

> Lỗi này do Claude **quyết định / làm / bỏ sót** sai — hay do một thứ bên
> ngoài (dịch vụ ngoài chặn, mạng hỏng, thư viện lỗi)?

- Do Claude → tiếp tục skill này.
- Do bên ngoài → KHÔNG phải việc của skill. Báo bác, xử lý như sự cố kỹ thuật
  thường (gọi `systematic-debugging` nếu có cài).
- Lỗi hỗn hợp (vừa do code Claude viết sai, vừa do Claude verify qua loa) →
  tách từng mặt, mặt nào do Claude thì xử.

---

## §1. Nguyên lý nền — chưng cất, không tích lũy

File quy tắc **càng dài thì càng kém hiệu quả**: trí nhớ làm việc của Claude
có giới hạn chú ý, thêm quy tắc thứ 50 làm mờ 49 cái kia. Nên:

- **Không đo "ghi được bao nhiêu lỗi".** Đo: file quy tắc có gọn không + lỗi
  cũ có thật sự tuyệt chủng không.
- **Mỗi lỗi mới → quy về gốc, gộp vào quy tắc cũ.** Không đẻ dòng rời.
- **Cách ngăn lỗi tốt nhất KHÔNG phải viết quy tắc** — mà làm cho lỗi không
  thể xảy ra nữa. Đó là lý do có thang 3 bậc ở §3, ưu tiên từ trên xuống.
- 🔒 **"Cập nhật lỗi X" ≠ ghi 1 dòng ghi chú cho có.** Áp cho lỗi
  về **CÁCH LÀM VIỆC CHUNG** (quy trình, thao tác, điều phối — đụng file quy
  tắc dự án / skill quy trình / output-style, ảnh hưởng mọi việc).
  **KHÔNG áp** cho lỗi nội dung 1 dự án cụ thể (câu từ, chi tiết riêng) —
  mấy cái đó ghi vào sổ lỗi riêng của dự án đó (mục "⚠️ Lỗi đã gặp" trong file
  tiến độ, xem skill `hoi-roi-lam` §1.3). Khi bác bảo cập nhật / rút kinh
  nghiệm 1 lỗi cách-làm-việc-chung, MẶC ĐỊNH KHÔNG được dừng ở việc ghi 1 dòng
  ghi chú rời — ghi chú là note thụ động, chỉ hiện khi tình cờ recall trúng
  → lỗi vẫn lặp. BẮT BUỘC chạy cây §3 tìm **điểm-chặn cứng nhất**: sửa gốc
  code/skill (Bậc 1) > hook lính gác (Bậc 2) > luật cứng ở file NẠP-MỖI-PHIÊN
  đúng chỗ tình huống xảy ra (file quy tắc dự án / skill / output-style — Bậc 3).
  Ghi chú chỉ là **phụ trợ** cho Bậc 3, không thay được điểm-chặn.
  → Tự test: "lần sau tình huống này lặp lại, có file nào Claude CHẮC CHẮN đọc
  đúng lúc để bị chặn không?" Chưa có → chưa xong, mới chỉ ghi note.
- 🔒 **Lỗi meta phát sinh giữa lúc làm việc A — xử theo ĐỘ LỚN, KHÔNG tự tách
  phiên bừa.** Đang làm việc A mà lộ ra lỗi thuộc *cách làm việc chung* (đụng
  skill / file quy tắc dự án / output-style, ảnh hưởng mọi việc):
  - **Nhỏ** (sửa vài dòng, cần context vừa xảy ra) → **sửa NGAY tại phiên**,
    bác gật, báo 1 dòng, quay lại A. KHÔNG tách phiên (tách = mất context tại
    chỗ + overhead > việc + bác phải theo 2 nơi).
  - **Lớn / độc lập / không gấp** (viết lại cả skill, dựng hook nhiều bước) →
    tạo 1 tác vụ nền (nếu nền tảng có tính năng này) cho bác bấm sau — tách mà
    không cắt mạch A.
  - File meta ảnh hưởng mọi việc → **luôn cần bác duyệt**, đừng để phiên ngầm
    tự sửa. → Chi tiết cơ chế tách: skill `hoi-roi-lam` §2.6.
- 🔒 **Feedback tầng chung KHÔNG được dừng ở "note sổ rồi để đó".** Mỗi phiếu
  **tầng chung** phải có LỐI RA rõ: **nhỏ + bác gật ngay** → sửa tại phiên;
  **lớn / độc lập / không gấp** → tạo tác vụ nền ngay lúc note (không đợi
  cuối phiên). Không lối ra = còn treo, tính là CHƯA xử. Lỗi **riêng 1 dự án**
  → không lên sổ chung, ghi thẳng mục "⚠️ Lỗi đã gặp" ở file tiến độ dự án
  (`hoi-roi-lam` §1.3).

---

## §2. Quy trình 6 bước

1. **Nhận diện** — nắm rõ hiện tượng lỗi (hỏi bác nếu chưa rõ).
2. **Tìm gốc** — không dừng ở triệu chứng. Hỏi "vì sao" tới khi chạm nguyên
   nhân thật sự (thường là một bước bị thiếu, một phán đoán sai).
3. **Phân loại bậc** — chạy cây quyết định §3.
4. **Canh phình** — nếu rơi xuống Bậc 3, bắt buộc qua §4.
5. **Trình phiếu** — định dạng §7. Bác duyệt từng đề xuất.
6. **Áp + ghi sổ** — bác duyệt thì áp; ghi 1 dòng vào sổ nhật ký §5.

---

## §3. Cây phân loại bậc (cứng — không cảm tính)

Trả lời lần lượt, dừng ở bậc đầu tiên khớp:

```
Q1. Lỗi này có một nguyên nhân nằm trong CODE / cấu hình của một skill
    hoặc đoạn lệnh cụ thể không?
    CÓ  → BẬC 1 — Sửa thẳng code/skill đó. Lỗi tuyệt chủng, khỏi ghi nhớ.
          ↳ Q1b. Kiến thức rút ra có dùng cho skill / việc KHÁC nữa không?
                 CÓ    → ngoài sửa code, ghi thêm 1 ghi chú tra cứu
                         (loại "reference"). VD: 1 hành vi lạ của dịch vụ
                         ngoài — đúng cho mọi skill dùng dịch vụ đó.
                 KHÔNG → xong, không ghi gì thêm.
    KHÔNG → Q2.

Q2. Có thể đặt một "lính gác" tự động bắt đúng sự kiện gây lỗi rồi
    chặn / nhắc không? (hook bắt được hành động máy cụ thể: sửa file X,
    chạy lệnh Y, tạo folder Z, kết thúc lượt trả lời...)
    CÓ  → BẬC 2 — Đề xuất hook (nếu nền tảng hỗ trợ cấu hình hook).
    KHÔNG → Q3.

Q3. Lỗi thuần phán đoán / thói quen, không máy nào bắt cứng được.
    → BẬC 3 — Viết quy tắc. BẮT BUỘC qua §4 Canh phình trước khi ghi.
```

**Một lỗi có thể chạm nhiều bậc** (vd một phần do code → Bậc 1; phần verify
qua loa → Bậc 3). Tách từng mặt, xử từng mặt.

---

## §4. Canh phình (chỉ áp khi rơi xuống Bậc 3)

Trước khi thêm BẤT KỲ chữ nào vào file quy tắc:

**1. Gộp được không?** Tìm trong file đích xem đã có quy tắc nào bao lỗi này.
- Có → **nâng cấp** quy tắc cũ (thêm 1 mệnh đề / 1 ví dụ đắt giá). KHÔNG thêm
  dòng rời.
- Không → mới được thêm mục mới.

**2. Đặt đúng tầng:**

| Lỗi về | Ghi vào |
|---|---|
| Cách trả lời (giọng văn, trình bày, dẫn link) | file output-style |
| Quy trình làm việc chung | file quy tắc dự án (root) |
| Một mảng/dự án cụ thể | file quy tắc của mảng/dự án đó |
| Quy trình làm việc cẩn thận (phản biện/plan/test) | skill `hoi-roi-lam` |
| **Cửa lưu thứ 4 — lỗi chỉ riêng 1 skill/mảng, hẹp, không đáng đưa lên tầng chung** | Sổ/ghi chú cục bộ ngay trong chính skill/mảng đó (1 mục "⚠️ Lỗi đã gặp" cuối `SKILL.md` của skill đó — mọi skill mới tạo đều có sẵn mục này rỗng ngay từ đầu) — tránh phình file quy tắc gốc bằng chi tiết chỉ 1 chỗ dùng |
| **Cửa lưu thứ 5 — lỗi riêng 1 DỰ ÁN đang chạy** | Mục **"⚠️ Lỗi đã gặp — đừng lặp"** cuối **file tiến độ dự án** `_tien-do/tien-do-<slug>.md` (khung ở `hoi-roi-lam` §1.3) — phiên sau resume dự án đọc file này TRƯỚC khi làm → khỏi lặp đúng lỗi cũ của dự án đó |

**3. File có phình quá không?** File đích đã quá dài hoặc có quy tắc trùng lặp
→ đề xuất **nén file trước** (gộp quy tắc gần nhau, cắt cái lỗi thời), rồi mới
thêm. Số dòng file quy tắc nên đứng yên hoặc giảm — không tăng đều.

---

## §5. Sổ nhật ký lỗi + phát hiện "lờn thuốc"

Mỗi lỗi xử xong → ghi 1 dòng vào `nhat-ky-loi.md` (cùng folder skill này — đã có sẵn file rỗng, chỉ cần thêm dòng).
Cột: ngày | lỗi gọn | loại | bậc đã xử | nơi sửa | số lần gặp.

**Phát hiện lờn thuốc:** trước khi xử một lỗi mới, tra sổ. Nếu lỗi này (hoặc
cùng gốc) **đã từng được xử rồi mà vẫn tái diễn** → cờ đỏ:

> Cách xử cũ đã thất bại. KHÔNG ghi lại quy tắc y như cũ. Phải **nâng bậc**:
> Bậc 3 (quy tắc) thất bại → leo lên Bậc 2 (lính gác tự động).

Đây là cơ chế "thông minh dần" thật sự: không ghi nhiều hơn, mà biết khi nào
cách cũ hỏng và leo thang.

---

## §6. Quét lịch sử (tùy chọn — chạy khi muốn vét lỗi cũ đã quên)

Vét các lỗi cũ bác đã quên, nếu Claude Code lưu lịch sử phiên chat dạng file
(thường ở thư mục transcript của nền tảng, dạng `*.jsonl`). **Không đọc trọn
mọi file** — lọc trước:

1. Dùng công cụ tìm kiếm nội dung (Grep) trên thư mục transcript.
2. Từ khóa lọc (câu bác phản hồi lỗi):
   `sai rồi`, `bị lỗi`, `lỗi rồi`, `lại lỗi`, `sửa lại`, `không đúng`,
   `sao lại`, `nhầm`, `vẫn bị`, `kém`, `vô lý`, `không hiệu quả`,
   `bị lặp`, `chưa đúng`, `tại sao lại`.
3. Chỉ đọc 5–10 dòng quanh mỗi chỗ khớp — không đọc trọn file.
4. Gom các chỗ khớp → **quy về nhóm gốc** (nhiều lỗi bề mặt cùng 1 gốc).
5. Trình bảng nhóm cho bác, xử từng nhóm theo §3 — nhóm gặp nhiều lần trước.

---

## §7. Định dạng phiếu rút kinh nghiệm

```
🔍 PHIẾU RÚT KINH NGHIỆM #<số>                          <ngày>

Hiện tượng
  <mô tả ngắn lỗi>

Nguyên nhân gốc
  <gốc thật, không phải triệu chứng — nếu nhiều mặt thì liệt kê>

Xử lý theo thang 3 bậc
  <mặt nào → bậc nào, vì sao>
  ↳ Canh phình (nếu Bậc 3): gộp vào quy tắc nào / đặt tầng nào

Đề xuất (chờ bác duyệt)
  <thay đổi cụ thể: file nào, sửa câu gì → thành câu gì>

  [1] Duyệt   [2] Sửa lời   [3] Bỏ qua
```

---

## §8. Quyền hạn

Skill **chỉ ĐỀ XUẤT** — không tự ghi vào file quy tắc dự án / output-style /
sửa skill khác. Bác duyệt từng cái rồi skill mới áp. Riêng việc ghi sổ nhật
ký §5 thì làm luôn (chỉ là theo dõi, không phải quy tắc).
