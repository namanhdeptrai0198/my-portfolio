# Portfolio — Nguyễn Ngọc Nam Anh

Trang portfolio một trang, dựng theo bộ design handoff "Industry".
Next.js 16 (App Router) + TypeScript + CSS thuần. Video nhúng từ YouTube.

## Chạy trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000

Các lệnh khác: `npm run build` (build thật), `npm run lint` (kiểm lỗi code).

---

## Việc bạn sẽ làm thường xuyên

### 1. Thêm / sửa video

Mở đúng **một** file: `src/data/videos.ts`

Mỗi dự án là một khối như sau — copy khối cũ, dán xuống dưới, sửa lại nội dung:

```ts
{
  id: "shopee-gil-le",          // mã riêng, không trùng, viết-liền-có-gạch-ngang
  title: "Shopee x Gil Lê",     // tên hiện trên thẻ
  client: "Shopee",             // khách hàng
  role: "Camera Operator",      // vai trò của bạn trong dự án
  category: "commercial",       // xem danh sách bên dưới
  duration: "01:20",            // phút:giây — để "" nếu không muốn hiện
  youtubeId: "aqz-KE-bpKQ",     // xem cách lấy bên dưới
  orientation: "portrait",      // CHỈ thêm dòng này nếu video quay dọc
},
```

**Thứ tự trong file = thứ tự trên trang.** Dự án mạnh nhất để lên đầu.

**Cách lấy `youtubeId`:** mở video trên YouTube, nhìn thanh địa chỉ:

```
https://www.youtube.com/watch?v=aqz-KE-bpKQ
                                └──── đây, 11 ký tự ────┘
https://youtu.be/aqz-KE-bpKQ
                 └──── hoặc đây ────┘
https://youtube.com/shorts/aqz-KE-bpKQ
                           └──── hoặc đây ────┘
```

Chỉ dán 11 ký tự đó, **không dán cả link**.

**`orientation`:** video quay dọc (9:16) thì thêm `orientation: "portrait"`,
popup sẽ mở khung đứng thay vì kẹp video giữa hai dải đen. Video ngang bình
thường thì **bỏ hẳn dòng này**. Lưu ý: dọc hay ngang không liên quan tới việc
link là `/shorts/` hay `youtu.be` — nhiều video dọc vẫn đăng dạng thường.

**`category` chọn một trong:** `commercial` · `social` · `mv` · `short` · `doc`
(Đổi tên hiển thị của các nhóm ở đầu file, mục `CATEGORY_LABELS`.
Nhóm nào chưa có video nào thì tự động không hiện trong bộ lọc.)

Ảnh thumbnail **không cần làm** — hệ thống tự lấy từ YouTube theo id.

### 2. Sửa thông tin liên hệ / tên / vai trò

Mở `src/data/profile.ts`. Đây là **nơi duy nhất** chứa email, số điện thoại,
tên và dòng vai trò — sửa ở đây là đổi khắp trang.

### 3. Đổi ảnh bìa / thêm ảnh chân dung

**Ảnh bìa đã có** (`public/images/cover.jpg`). Muốn thay ảnh khác:

1. Thu nhỏ ảnh gốc trước khi chép vào — máy ảnh cho ra file 9MB, trang không
   cần quá 2400px:

```bash
sips -Z 2400 -s formatOptions 82 ~/duong-dan/anh-goc.jpg --out public/images/cover.jpg
```

2. Ảnh bìa là khung ngang rất dẹt nên phần trên dưới bị cắt nhiều. Nếu mặt bị
   cắt, chỉnh `object-position` trong `src/components/ProfileHeader.module.css`
   — số càng nhỏ thì khung càng lấy phần trên của ảnh.

**Ảnh chân dung**: chép ảnh vuông (~400×400) vào `public/images/`, rồi mở
`src/data/profile.ts` sửa `avatarImage: "/images/avatar.jpg"`. Khi còn `null`
thì khối avatar không hiện.

---

## Đưa lên mạng (Vercel, miễn phí)

Lần đầu:

1. Tạo repo trống trên GitHub (để **Private** cũng được).
2. Trong thư mục này chạy:

```bash
git remote add origin https://github.com/<tên-tài-khoản>/<tên-repo>.git
git push -u origin main
```

3. Vào https://vercel.com → **Add New → Project** → chọn repo vừa đẩy lên →
   **Deploy**. Không cần chỉnh gì, Vercel tự nhận Next.js.

Từ lần sau, mỗi khi sửa xong:

```bash
git add -A
git commit -m "them video moi"
git push
```

Vercel tự build lại và cập nhật trang sau khoảng 1 phút.

---

## Bản đồ mã nguồn

| Đường dẫn | Việc của nó |
|---|---|
| `src/data/videos.ts` | Danh sách dự án — **file bạn sửa nhiều nhất** |
| `src/data/profile.ts` | Tên, vai trò, email, điện thoại, ảnh |
| `src/lib/videos.ts` | Cửa duy nhất giữa dữ liệu và giao diện. Sau này chuyển sang CMS thì chỉ sửa file này, không đụng giao diện |
| `src/lib/youtube.ts` | Suy ra link nhúng và link thumbnail từ id |
| `src/styles/industry.css` | Design system gốc — **không sửa**, để còn đồng bộ lại được khi design cập nhật |
| `src/app/globals.css` | Phần bổ sung của riêng dự án (bề rộng trang, màn hình nhỏ) |
| `src/components/` | Các thành phần giao diện |

### Vài quyết định kỹ thuật đáng nhớ

- **Iframe YouTube chỉ được tạo khi bấm mở video**, không nạp sẵn 12 cái —
  đây là lý do trang tải nhanh.
- Nhúng qua `youtube-nocookie.com` nên YouTube không đặt cookie theo dõi
  người xem cho tới khi họ thật sự bấm play.
- Font Barlow được **tự host** qua `next/font` (đã bỏ dòng `@import` Google
  Fonts trong `industry.css`) — không có request nào rời khỏi máy chủ của bạn,
  và chữ không bị nhảy khi tải.
- Thumbnail lấy bản `maxresdefault`; video nào không có bản HD thì tự động
  lùi về `mqdefault` (vẫn đúng khung 16:9).
- Ảnh thumbnail bị phủ lớp xanh thép theo đúng design system, nhưng **rê chuột
  vào thì trở về màu thật** để khách thấy được màu phim. Muốn bám 100% design
  gốc thì xoá 2 rule `.reveal-on-hover` trong `src/app/globals.css`.
- Popup video đóng được bằng Esc, bằng nút X và bằng bấm ra nền; khoá cuộn
  trang phía sau và trả con trỏ bàn phím về đúng thẻ video đã bấm.
