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

**`orientation` — dòng quan trọng nhất.** Video quay dọc thì thêm
`orientation: "portrait"`; video ngang bình thường thì **bỏ hẳn dòng này**.
Nó quyết định hai thứ: popup mở khung đứng thay vì kẹp video giữa hai dải đen,
và video nằm ở nhóm nào trong bộ lọc **16:9 / 9:16**.

Lưu ý: dọc hay ngang **không** suy ra được từ link. Nhiều video dọc của bạn vẫn
đăng dạng thường (`youtu.be`) chứ không phải `/shorts/` — phải nhìn vào footage.

Nhóm nào chưa có video nào thì tự động không hiện trong bộ lọc, nên nếu cả reel
đều quay dọc thì nút "16:9" tự biến mất.

Ảnh thumbnail **không cần làm** — hệ thống tự lấy từ YouTube theo id.

### 2. Sửa thông tin liên hệ / tên / vai trò

Mở `src/data/profile.ts`. Đây là **nơi duy nhất** chứa email, số điện thoại,
tên và dòng vai trò — sửa ở đây là đổi khắp trang.

### 3. Đổi ảnh bìa / video spotlight / ảnh chân dung

**Ảnh bìa đã có** (`public/images/cover.jpg`). Nó hiện hai kiểu tuỳ màn hình:
dưới 900px là dải ngang full-bleed, từ 900px trở lên nó được cắt vuông vào
đầu cột trái. Muốn thay ảnh khác:

1. Thu nhỏ ảnh gốc trước khi chép vào — máy ảnh cho ra file 9MB, trang không
   cần quá 2400px:

```bash
sips -Z 2400 -s formatOptions 82 ~/duong-dan/anh-goc.jpg --out public/images/cover.jpg
```

2. Nếu mặt bị cắt, chỉnh `object-position` trong
   `src/components/CoverBanner.module.css` — số càng nhỏ thì khung càng lấy
   phần trên của ảnh. Vì ảnh dùng chung cho cả hai kiểu cắt (ngang và vuông),
   kiểm tra lại cả hai cỡ màn hình sau khi đổi số.

**Video spotlight** (dải lớn phía trên cùng, chỉ hiện từ 900px trở lên): mở
`src/data/videos.ts`, sửa `spotlightId` thành `id` của video muốn đưa lên đầu.
Video đó vẫn nằm nguyên trong reel bên dưới — spotlight chỉ là một cách hiển
thị thêm, không phải cắt nó ra khỏi danh sách.

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
- Design system phủ lớp xanh thép lên mọi ảnh, nhưng thumbnail thì **không** —
  màu và ánh sáng chính là thứ khách cần thấy ở một người quay phim, và trên
  điện thoại không có thao tác rê chuột để lộ màu thật.
- Popup video đóng được bằng Esc, bằng nút X và bằng bấm ra nền; khoá cuộn
  trang phía sau và trả con trỏ bàn phím về đúng thẻ video đã bấm.
- Từ 900px trở lên, cột trái (ảnh bìa + thông tin liên hệ) dính lại khi cuộn
  trang, và một video "spotlight" hiện full-bề-ngang phía trên — bấm vào mở
  đúng popup như thẻ video thường. Dưới 900px cả hai điều này tắt hẳn: ảnh bìa
  quay lại full-bleed, spotlight không render, layout y hệt bản gốc.
