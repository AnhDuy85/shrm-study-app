# SHRM Study App

Ứng dụng web học và ôn luyện chứng chỉ **SHRM-CP / SCP**. Ứng dụng chạy hoàn toàn
cục bộ trên trình duyệt: không có backend, không cần đăng nhập, và **toàn bộ dữ
liệu học tập của bạn được lưu ngay trong trình duyệt** (localStorage).

Giao diện tiếng Việt; các thuật ngữ chuyên môn SHRM (ví dụ: *People*,
*Behavioral Competencies*, tên các năng lực) được giữ nguyên tiếng Anh theo đúng
tài liệu BASK.

## Tính năng

- **Dashboard**: liệt kê 6 mô-đun theo hai nhóm *HR Knowledge* (People,
  Organization, Workplace) và *Behavioral Competencies* (Leadership,
  Interpersonal, Business). Mỗi thẻ hiển thị tiến độ ôn thẻ ghi nhớ, điểm quiz
  cao nhất và trạng thái đã học / chưa học.
- **Trang mô-đun** với 4 tab:
  - **Read**: trình đọc PDF nhúng (react-pdf) với điều hướng trang, thu phóng và
    bộ chọn khi mô-đun có nhiều tài liệu.
  - **Flashcards**: bộ thẻ lật (mặt trước là thuật ngữ tiếng Anh, mặt sau là giải
    thích tiếng Việt); đánh dấu "Đã thuộc" / "Đang học" cho từng thẻ.
  - **Quiz**: bộ câu hỏi trắc nghiệm, chấm điểm cuối bài và xem lại các câu sai
    kèm giải thích.
  - **Notes**: ô ghi chú tự động lưu.
- **Đặt lại tiến độ**: nút trên Dashboard xóa toàn bộ dữ liệu cục bộ (có hộp thoại
  xác nhận trước khi xóa).

## Yêu cầu

- **Node.js 18 trở lên** (khuyến nghị 18 hoặc 20+; Vite 5 yêu cầu `^18 || >=20`).

## Cài đặt

```bash
npm install
```

Lệnh `postinstall` sẽ tự động sao chép worker của pdf.js
(`node_modules/pdfjs-dist/build/pdf.worker.min.mjs`) vào `public/` để trình đọc
PDF hoạt động offline.

## Chạy ở chế độ phát triển

```bash
npm run dev
```

Mặc định ứng dụng chạy tại `http://localhost:5173/`.

## Build bản phát hành

```bash
npm run build
```

Lệnh này chạy `tsc -b` (kiểm tra kiểu) rồi `vite build`, kết quả nằm trong thư
mục `dist/`. Xem thử bản build với:

```bash
npm run preview
```

## Tài liệu PDF

Các file PDF nằm trong `public/pdfs/` và được phục vụ tại đường dẫn
`/pdfs/<tên-file>.pdf`. Ứng dụng sử dụng 9 file có tiền tố `SHRM`. Ánh xạ PDF cho
từng mô-đun được định nghĩa trong `src/data/modules.ts`.

Để thêm hoặc đổi tài liệu, đặt file PDF vào `public/pdfs/` rồi cập nhật danh sách
`pdfs` của mô-đun tương ứng trong `src/data/modules.ts`.

## Thêm / sửa nội dung học

Flashcards và quiz là dữ liệu JSON, dễ chỉnh sửa. Cả hai file đều là một object có
đúng 6 khóa (GroupId): `people`, `organization`, `workplace`, `leadership`,
`interpersonal`, `business`.

### `src/data/flashcards.json`

Mỗi khóa là một mảng các thẻ (`Flashcard`):

```json
{
  "people": [
    {
      "id": "people-01",
      "term": "Talent Acquisition",
      "definition": "Giải thích ngắn gọn bằng tiếng Việt."
    }
  ]
}
```

- `id`: chuỗi duy nhất, ổn định (ví dụ `people-02`).
- `term`: thuật ngữ (nên giữ tiếng Anh theo tài liệu SHRM).
- `definition`: giải thích tiếng Việt.

### `src/data/quiz.json`

Mỗi khóa là một mảng câu hỏi (`QuizQuestion`):

```json
{
  "people": [
    {
      "id": "people-q1",
      "question": "Câu hỏi bằng tiếng Việt?",
      "options": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
      "correctIndex": 0,
      "explanation": "Giải thích ngắn gọn bằng tiếng Việt."
    }
  ]
}
```

- `options`: **đúng 4** phương án.
- `correctIndex`: chỉ số đáp án đúng, giá trị từ `0` đến `3`.
- `explanation`: giải thích tiếng Việt, hiển thị khi xem lại câu sai.

Sau khi sửa JSON, chạy lại `npm run build` để TypeScript kiểm tra đúng kiểu
(`FlashcardsData` / `QuizData` trong `src/types.ts`).

> Lưu ý: chỉ dùng nội dung đúng với tài liệu SHRM BASK; không bịa đặt thông tin
> về kỳ thi hay chứng chỉ.

## Lưu trữ dữ liệu

Toàn bộ tiến độ (trạng thái thẻ ghi nhớ, điểm quiz, câu trả lời sai gần nhất, ghi
chú, trạng thái đã học và trang PDF đang đọc) được lưu trong **localStorage** của
trình duyệt dưới một khóa duy nhất `shrm-study-app:v1`. Không có dữ liệu nào được
gửi lên máy chủ.

Nhấn **Đặt lại tiến độ** trên Dashboard để xóa toàn bộ dữ liệu này. Dữ liệu cũng
chỉ tồn tại trên trình duyệt / máy bạn đang dùng, không đồng bộ giữa các thiết bị.
