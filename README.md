# SHRM Study App

> 🇻🇳 Tiếng Việt is the primary language of this document; an English version
> follows in each section. The app itself defaults to Vietnamese and ships a
> VI | EN toggle.

Ứng dụng web học và ôn luyện chứng chỉ **SHRM-CP / SCP**, dựa trên SHRM BASK
2022. Ứng dụng chạy hoàn toàn cục bộ trên trình duyệt: không có backend, không
cần đăng nhập, cài được như một ứng dụng (PWA) và dùng được **offline**.

A local-first study & review web app for the **SHRM-CP / SCP** certification,
based on the SHRM BASK 2022. It runs entirely in the browser — no backend, no
login — is installable as a PWA, and works **offline**.

---

## Ngôn ngữ / Language

- **VI (tiếng Việt)** là ngôn ngữ **mặc định**. Dùng nút **VI | EN** trên thanh
  đầu trang để đổi giữa tiếng Việt và tiếng Anh; lựa chọn được lưu cục bộ.
- Các thuật ngữ SHRM (ví dụ *People*, *Business Acumen*, tên các năng lực) được
  giữ nguyên tiếng Anh theo đúng tài liệu BASK ở cả hai chế độ.

- **VI (Vietnamese)** is the **default** language. Use the **VI | EN** toggle in
  the top bar to switch; your choice is saved locally.
- SHRM proper terms (e.g. *People*, *Business Acumen*, competency names) stay in
  English in both modes, matching the BASK source.

---

## Tính năng / Features

- **Dashboard** — 6 mô-đun theo hai nhóm *HR Knowledge* (People, Organization,
  Workplace) và *Behavioral Competencies* (Leadership, Interpersonal, Business),
  kèm tiến độ flashcard, điểm quiz cao nhất và trạng thái đã học.
- **Trang mô-đun — 4 tab**: **Nội dung học** (mặc định: mục tiêu, ý chính, sơ đồ
  Mermaid, áp dụng thực tiễn), **Flashcards**, **Quiz**, **Notes**.
- **PWA**: cài đặt được + dùng offline.
- **Đặt lại tiến độ**: xóa toàn bộ dữ liệu cục bộ (có xác nhận).

- **Dashboard** — 6 modules across *HR Knowledge* and *Behavioral Competencies*,
  with flashcard progress, best quiz score, and studied status.
- **Module page — 4 tabs**: **Lesson content** (default: objectives, key points,
  a Mermaid diagram, real-world applications), **Flashcards**, **Quiz**, **Notes**.
- **PWA**: installable + offline-capable.
- **Reset progress**: clears all local data (with confirmation).

> **Đã gỡ trình đọc PDF.** Phiên bản trước nhúng trình đọc PDF; nay nội dung được
> viết trực tiếp dưới dạng bài học song ngữ, nên không còn phụ thuộc `react-pdf`
> / `pdfjs-dist`. **Các file PDF gốc trong thư mục cha `d:\Hoc tap\SHRM\*.pdf`
> KHÔNG bị đụng đến** — chỉ bản sao bên trong `app/public/` bị gỡ.
>
> **The PDF reader was removed.** Content is now authored directly as bilingual
> lessons, so `react-pdf` / `pdfjs-dist` are gone. **The original PDFs in the
> parent folder `d:\Hoc tap\SHRM\*.pdf` are untouched** — only the copies under
> `app/public/` were removed.

---

## Yêu cầu / Requirements

- **Node.js 20 trở lên** (CI dùng Node 22 LTS; máy phát triển có thể dùng 20/22/24).
- **Node.js 20+** (CI uses Node 22 LTS; local dev works on 20/22/24).

---

## Cài đặt & chạy / Install & run

```bash
npm install     # cài phụ thuộc / install dependencies
npm run dev      # chạy dev tại http://localhost:5173/  /  dev server
npm run build    # build bản phát hành vào dist/  /  production build to dist/
npm run preview  # xem thử bản build  /  preview the build
```

Không còn script `postinstall`/`prebuild` nào — `npm ci` chạy sạch, không có hook
cài đặt tùy biến (cần thiết cho CI).

There are no `postinstall`/`prebuild` scripts anymore — `npm ci` runs cleanly with
no custom install hook (required by CI).

### Kiểm tra dữ liệu (gate bắt buộc) / Data check (required gate)

```bash
npm run check-data
```

`npm run check-data` kiểm tra tính toàn vẹn của `lessons.json` / `quiz.json` /
`flashcards.json`: đủ 6 nhóm, ≥10 câu quiz/nhóm, đúng 4 phương án, `correctIndex`
là số nguyên 0..3, id duy nhất và liền mạch, mọi trường song ngữ `vi`+`en` không
rỗng, mỗi bài học có ≥6 mục tiêu / ≥6 ý chính / ≥4 áp dụng. Lệnh này **bắt buộc**
và chạy cả cục bộ lẫn trong CI (xem workflow deploy).

`npm run check-data` validates `lessons.json` / `quiz.json` / `flashcards.json`:
all 6 groups, ≥10 quiz questions/group, exactly 4 options, integer `correctIndex`
0..3, unique contiguous ids, non-empty `vi`+`en` on every bilingual field, and
≥6 objectives / ≥6 key points / ≥4 applications per lesson. This gate is
**required** and runs both locally and in CI (see the deploy workflow).

---

## Base path (`VITE_BASE`) / Đường dẫn cơ sở

Mặc định `base` là `'/'` (dev cục bộ). Khi deploy lên GitHub Pages dưới
`/<repo>/`, đặt biến môi trường `VITE_BASE=/<repo>/` lúc build:

The default `base` is `'/'` (local dev). When deploying to GitHub Pages under
`/<repo>/`, set `VITE_BASE=/<repo>/` at build time:

```bash
VITE_BASE=/shrm-study-app/ npm run build
```

Manifest, service worker, icon và kịch bản SPA 404 đều dùng đường dẫn **tương
đối**, nên cùng một bản build chạy được ở cả `/` lẫn `/shrm-study-app/` — chỉ biến
môi trường thay đổi.

The manifest, service worker, icons, and the SPA 404 scripts all use **relative**
paths, so the same build works at both `/` and `/shrm-study-app/` — only the env
var differs.

---

## Deploy lên GitHub Pages / Deploy to GitHub Pages

Repo đã có sẵn `.github/workflows/deploy.yml`. Workflow này kích hoạt khi push lên
`master` (hoặc chạy tay qua *workflow_dispatch*), rồi: `npm ci` → `npm run
check-data` → `npm run build` với `VITE_BASE=/${{ github.event.repository.name }}/`
(base **lấy từ tên repo**, không hardcode) → tải `dist/` lên và deploy bằng các
action Pages chính thức. Cần quyền `pages: write` và `id-token: write` cùng môi
trường `github-pages`.

The repo ships `.github/workflows/deploy.yml`. It triggers on push to `master`
(or manual *workflow_dispatch*), then runs `npm ci` → `npm run check-data` →
`npm run build` with `VITE_BASE=/${{ github.event.repository.name }}/` (base is
**derived from the repo name**, never hardcoded) → uploads `dist/` and deploys via
the official Pages actions. It needs `pages: write` + `id-token: write` and the
`github-pages` environment.

### Các bước thủ công cho người dùng (AnhDuy85) / Manual steps for the user (AnhDuy85)

1. Tạo repo **`shrm-study-app`** trống trên GitHub dưới tài khoản
   **`AnhDuy85`** (chưa cần README).
   Create an **empty** repo **`shrm-study-app`** on GitHub under **`AnhDuy85`**.

2. Từ thư mục `app/`, chạy đúng các lệnh sau (thay bằng tài khoản của bạn nếu
   khác). Run exactly the following from the `app/` folder:

   ```bash
   git init
   git add .
   git commit -m "feat: SHRM Study App (bilingual PWA, GitHub Pages)"
   git branch -M master
   git remote add origin https://github.com/AnhDuy85/shrm-study-app.git
   git push -u origin master
   ```

   > Nếu repo đã là một git repo (đang có lịch sử commit), bỏ qua `git init` và
   > `git commit`; chỉ cần `git remote add origin …` rồi `git push -u origin
   > master`. / If this is already a git repo with history, skip `git init` and
   > `git commit`; just add the remote and `git push -u origin master`.

3. Trên GitHub: **Settings → Pages → Build and deployment → Source** chọn
   **“GitHub Actions”**. On GitHub, open **Settings → Pages → Build and
   deployment → Source** and choose **“GitHub Actions”**.

4. Sau khi workflow chạy xong, trang sẽ ở:
   After the workflow finishes, the site is live at:

   **https://anhduy85.github.io/shrm-study-app/**

   (Lưu ý URL viết thường. / Note the lowercased URL.)

---

## Cài PWA & dùng offline / Install the PWA & offline use

- Mở trang web trong Chrome/Edge và dùng nút **Cài đặt** trên thanh địa chỉ (hoặc
  “Thêm vào Màn hình chính” trên di động) để cài như một ứng dụng.
- Sau lần tải đầu, service worker (Workbox) lưu cache app-shell nên ứng dụng chạy
  được **offline**. Khi có bản mới, service worker tự cập nhật (`autoUpdate`).

- In Chrome/Edge, use the **Install** button in the address bar (or “Add to Home
  screen” on mobile) to install it as an app.
- After the first load, the Workbox service worker caches the app shell, so the
  app runs **offline**. New versions update automatically (`autoUpdate`).

---

## Lưu trữ dữ liệu — cục bộ, không đồng bộ / Data storage — local, no sync

Toàn bộ tiến độ (trạng thái flashcard, điểm quiz, câu trả lời sai gần nhất, ghi
chú, trạng thái đã học, ngôn ngữ) được lưu trong **localStorage** dưới một khóa
duy nhất `shrm-study-app:v1`. **Dữ liệu chỉ nằm trên từng thiết bị / trình duyệt
và KHÔNG đồng bộ giữa các thiết bị.** Xóa dữ liệu trình duyệt hoặc nhấn **Đặt lại
tiến độ** sẽ xóa sạch. Không có gì được gửi lên máy chủ.

All progress (flashcard state, quiz scores, last wrong answers, notes, studied
status, language) is stored in **localStorage** under a single key
`shrm-study-app:v1`. **Data lives on each device / browser only and does NOT sync
across devices.** Clearing browser data or pressing **Reset progress** wipes it.
Nothing is sent to any server.

---

## Thêm / sửa nội dung học / Editing study content

Flashcards, quiz và nội dung học là JSON trong `src/data/`. Cả ba file là object
đúng 6 khóa (`GroupId`): `people`, `organization`, `workplace`, `leadership`,
`interpersonal`, `business`. Mọi trường văn bản song ngữ là object `{ "vi": …,
"en": … }`; `term` (thuật ngữ) giữ một chuỗi tiếng Anh. Sau khi sửa, chạy
`npm run check-data` rồi `npm run build`.

Flashcards, quiz, and lesson content are JSON files under `src/data/`. Each file
is an object with exactly 6 keys (`GroupId`). Every bilingual text field is a
`{ "vi": …, "en": … }` object; `term` stays a single English string. After
editing, run `npm run check-data` then `npm run build`.

> **Về sơ đồ Mermaid (quan trọng):** với mỗi bài học, giá trị `diagram.vi` và
> `diagram.en` **cố ý giống hệt nhau** — nhãn các nút sơ đồ là tên riêng SHRM nên
> giữ nguyên tiếng Anh ở cả hai ngôn ngữ. Đây là **chủ đích**, đừng “sửa” cho khác
> nhau.
>
> **About the Mermaid diagrams (important):** for every lesson, `diagram.vi` and
> `diagram.en` are **intentionally identical** — the node labels are SHRM proper
> nouns kept in English in both languages. This is **by design**; do not “fix”
> them to differ.
