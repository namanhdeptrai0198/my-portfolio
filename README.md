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

**Video spotlight** (khung lớn phía trên cùng, chỉ hiện từ 900px trở lên): mở
`src/data/videos.ts`, sửa `spotlightId` thành `id` của video muốn đưa lên đầu.
Video đó vẫn nằm nguyên trong reel bên dưới — spotlight chỉ là một cách hiển
thị thêm, không phải cắt nó ra khỏi danh sách.

`spotlightId` chỉ quyết định video **mở màn**. Từ 900px trở lên, khách bấm thẻ
nào trong reel thì video đó lên spotlight và chạy ngay tại đó, không mở popup —
nên bạn không cần sửa gì để họ xem được cái khác.

Chiều cao dải spotlight nằm ở `--band-h` trong
`src/components/Spotlight.module.css`. Đổi số đó là đổi luôn cả ảnh tĩnh và
player, vì cả hai đo theo nó — không có chỗ thứ hai phải sửa theo.

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
  trang, và video chạy ngay trên "spotlight" phía trên thay vì mở popup —
  bấm thẻ nào thì trang tự cuộn lên đó. Dưới 900px cả hai điều này tắt hẳn: ảnh
  bìa quay lại full-bleed, spotlight không render, bấm thẻ vẫn mở popup —
  layout y hệt bản gốc.
- Spotlight là một **dải chiếu cao cố định** (`clamp(382px, 62dvh, 560px)`), nền
  tối, và mọi thứ chỉ thay đổi *bên trong* nó: ảnh tĩnh phủ kín dải, player thì
  lấy đúng tỉ lệ của video và nằm giữa. Nhờ vậy bấm phát không làm trang nhảy
  một pixel nào — trước đó ảnh tĩnh cao cố định 380px còn player tự cao theo
  video, nên ở màn 1280×800 một cú bấm đẩy trang xuống 265px và bóp dải từ
  1239px còn 315px.
- 13 trong 15 video là 9:16, nên phần lớn thời gian player chỉ chiếm một phần
  tư dải. Chỗ còn lại là chính tấm thumbnail đó phóng to và làm mờ
  (`blur(36px)`) — màu của video tràn ra quanh nó thay vì để lại một khoảng
  trắng. Ảnh mờ dùng `sizes="320px"`, ra đúng tile 640w mà thẻ trong reel đã
  tải, nên không tốn thêm request nào.
- Nút phóng to của player là nút **của YouTube**, nằm trong iframe khác origin.
  Nó gọi Fullscreen API của trình duyệt bọc ngoài, nên có ăn hay không là quyết
  định của trình duyệt đó — trang không biết và không can thiệp được. Webview
  xem trước của Claude Code chẳng hạn, nuốt luôn mọi yêu cầu fullscreen, kể cả
  của chính trang (`document.documentElement.requestFullscreen()` treo vĩnh
  viễn, không resolve cũng không reject). Trên trình duyệt thật thì bình thường.
- Dòng liên hệ cuối (số điện thoại) có **lá cờ Việt Nam ở đầu bên kia**, cỡ
  30×20 — không còn chữ "Based in Vietnam" bên cạnh, nên lá cờ tự nó là câu nói
  đó và `aria-label` của nó là chỗ duy nhất còn ghi. Đẩy sang phải bằng
  `margin-left: auto` chứ không phải `space-between`: `space-between` sẽ tách
  luôn icon điện thoại khỏi con số nó đứng trước.
- Ảnh bìa được **lật ngang** (`scaleX(-1)`) nhưng chỉ từ 900px trở lên: ở đó anh
  ấy nhìn về phía tên và reel thay vì nhìn ra ngoài trang. Dưới 900px banner
  chiếm trọn bề ngang, không có gì bên cạnh để nhìn về, nên giữ nguyên khung
  gốc.
- Reel có hai cách đi hết danh sách: dưới 900px là "Load more", từ 900px trở lên
  là **sang trang, 6 video một trang**. Sáu vì lưới ở cỡ đó là 3 cột ở 1280px và
  2 cột từ 900–1228px — sáu chia hết cho cả hai nên hàng cuối không bao giờ bị
  lẻ. Cả hai chế độ dùng **cùng một biến state** ("khách đã xin đi sâu thêm mấy
  lần"), mỗi bên đọc theo cách của mình, nên co giãn cửa sổ qua mốc 900px vẫn
  giữ đúng chỗ đang xem chứ không nhảy về đầu.
- Dòng "Camera Operator - Editor" và lá cờ Việt Nam dàn hai đầu một hàng. Trong
  cột trái hẹp (300px) chỉ còn lá cờ: hai đoạn chữ cộng lại cần 291px mà cột chỉ
  có 277px. Lá cờ được vẽ bằng SVG chứ không dùng emoji 🇻🇳 — Chrome trên
  Windows vẽ emoji đó thành hai chữ "VN".
- **Favicon và mã QR** không sửa tay được — cả hai đều là output của script.
  Logo gốc nằm ở `tools/logo-source.jpg`; `sh tools/trace-icon.sh` cắt, phóng to,
  rồi vector hoá nó bằng `potrace` thành `src/app/icon.svg` (cần
  `brew install potrace`). Đổi logo thì thay file JPEG rồi chạy lại, đừng sửa
  path trong SVG. Tham số đáng nhớ là độ nhoè `-b 1.2`: trace thẳng ảnh JPEG thì
  potrace bám theo từng vệt nhiễu nén ở mép và cho ra path 7800 ký tự, để nhoè
  1.2 thì vẫn hình đó nhưng chỉ 2155 ký tự, đặt cạnh nhau ở 300px không phân
  biệt được. Nhoè mạnh hơn nữa thì bốn góc vuông bắt đầu tròn đi.
- Mã QR (`public/qr.svg`, sinh bởi `node tools/make-qr.mjs`) dùng mức sửa lỗi
  **H** — chịu mất được ~30% diện tích, và đó là ngân sách để nhét logo vào
  giữa. Chạy lại script mỗi khi đổi domain: không ai đọc soát được một mã QR,
  nên mã sai domain vẫn cứ được quét và dẫn sai rất lâu sau khi một cái link
  hỏng trong bài viết đã bị phát hiện. Kiểm bằng cách render ra ảnh ở 720 / 360 /
  180px rồi **giải mã ngược** (jsQR) cả bản trơn lẫn bản có logo — 6/6 đều ra
  đúng URL. Đổi cỡ hay vị trí logo thì kiểm lại như vậy, đừng tin vào phần trăm
  diện tích.
