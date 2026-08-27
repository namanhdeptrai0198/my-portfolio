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

Hai dòng `facebook` và `instagram` nhận link profile đầy đủ. Để `null` thì icon
tương ứng biến mất khỏi hàng liên hệ, không cần đụng vào giao diện.

### 3. Đổi ảnh bìa / video spotlight

**Ảnh bìa đã có** (`public/images/cover.jpg`). Nó hiện hai kiểu tuỳ màn hình:
ở bản xếp dọc là dải ngang full-bleed, còn ở layout hai cột nó được cắt vuông
vào đầu cột identity bên phải. Muốn thay ảnh khác:

1. Thu nhỏ ảnh gốc trước khi chép vào — máy ảnh cho ra file 9MB, trang không
   cần quá 2400px:

```bash
sips -Z 2400 -s formatOptions 82 ~/duong-dan/anh-goc.jpg --out public/images/cover.jpg
```

2. Nếu mặt bị cắt, chỉnh `object-position` trong
   `src/components/CoverBanner.module.css` — số càng nhỏ thì khung càng lấy
   phần trên của ảnh. Vì ảnh dùng chung cho cả hai kiểu cắt (ngang và vuông),
   kiểm tra lại cả hai cỡ màn hình sau khi đổi số.

**Video spotlight** (khung lớn phía trên cùng, **chỉ hiện trên desktop** — xem
mục quyết định kỹ thuật bên dưới): mở `src/data/videos.ts`, sửa `spotlightId`
thành `id` của video muốn đưa lên đầu.
Video đó vẫn nằm nguyên trong reel bên dưới — spotlight chỉ là một cách hiển
thị thêm, không phải cắt nó ra khỏi danh sách.

`spotlightId` chỉ quyết định video **mở màn**. Ở đâu có spotlight thì khách bấm
thẻ nào trong reel, video đó lên spotlight và chạy ngay tại đó, không mở popup —
nên bạn không cần sửa gì để họ xem được cái khác. Ở đâu không có (tablet và điện
thoại) thì bấm thẻ vẫn mở popup như cũ.

Chiều cao dải spotlight nằm ở `--band-h` trong
`src/components/Spotlight.module.css`. Đổi số đó là đổi luôn cả ảnh tĩnh và
player, vì cả hai đo theo nó — không có chỗ thứ hai phải sửa theo.

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
| `src/data/profile.ts` | Tên, vai trò, email, điện thoại, link mạng xã hội, ảnh bìa |
| `src/lib/videos.ts` | Suy ra dọc/ngang và lọc reel theo tỉ lệ |
| `src/lib/youtube.ts` | Suy ra link nhúng và link thumbnail từ id |
| `src/lib/breakpoints.ts` | Hai mốc layout, viết một lần cho cả CSS lẫn JS đọc chung |
| `src/styles/industry.css` | Design system gốc — **không sửa**, để còn đồng bộ lại được khi design cập nhật |
| `src/app/globals.css` | Phần bổ sung của riêng dự án (bề rộng trang, màn hình nhỏ) |
| `src/components/` | Các thành phần giao diện |

### Vài quyết định kỹ thuật đáng nhớ

- **Iframe YouTube chỉ được tạo khi bấm mở video**, không nạp sẵn 16 cái —
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
- Popup video là thẻ `<dialog>` của trình duyệt, mở bằng `showModal()`. Bốn
  hành vi của một popup thật — Esc để đóng, Tab không lọt ra ngoài, trang phía
  sau thành inert, con trỏ bàn phím trả về đúng thẻ đã bấm — đều là của nền
  tảng, trước đây phải tự viết tay. Mọi đường đóng đều đi qua `dialog.close()`
  và chỉ một chỗ duy nhất báo cho React: đóng kiểu khác thì iframe còn sống và
  tiếp tục phát tiếng từ một cái hộp không ai thấy.
- **Hai mốc chứ không phải một**, cả hai nằm trong `src/lib/breakpoints.ts` và
  được cả CSS lẫn JS đọc từ đó:
  - `WIDE` = `min-width: 700px` **và** `min-height: 600px` — mốc mở layout hai
    cột, cột identity dính lại khi cuộn. 700px là chỗ thẻ video lần đầu rộng
    hơn cột 300px bên cạnh nó; điều kiện chiều cao là để loại điện thoại nằm
    ngang (852×393 — thừa bề ngang nhưng cột identity sẽ ăn một phần ba màn).
  - `HAS_SPOTLIGHT` = `WIDE` **cộng** `pointer: fine` — mốc cho phép spotlight
    tồn tại, tức là **chỉ desktop**. Không dùng `min-width` cao hơn vì bề ngang
    không trả lời được câu này: iPad Pro 12.9" nằm ngang là 1366px, rộng hơn
    phần lớn laptop. Cái phân biệt là thiết bị trỏ.
- Ba bậc, không phải hai. Dưới `WIDE` mọi thứ xếp dọc: ảnh bìa full-bleed, bấm
  thẻ mở popup — y hệt bản gốc. Giữa hai mốc (tablet dựng đứng) có hai cột nhưng
  không có spotlight, bấm thẻ vẫn mở popup. Từ `HAS_SPOTLIGHT` mới có đủ cả ba.
- Spotlight là một **dải chiếu cao cố định** (`clamp(382px, 62dvh, 560px)`), nền
  tối, và mọi thứ chỉ thay đổi *bên trong* nó: ảnh tĩnh phủ kín dải, player thì
  lấy đúng tỉ lệ của video và nằm giữa. Nhờ vậy bấm phát không làm trang nhảy
  một pixel nào — trước đó ảnh tĩnh cao cố định 380px còn player tự cao theo
  video, nên ở màn 1280×800 một cú bấm đẩy trang xuống 265px và bóp dải từ
  1239px còn 315px.
- 14 trong 16 video là 9:16, nên phần lớn thời gian player chỉ chiếm một phần
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
- Hàng liên hệ là **lá cờ bên trái, bốn icon bên phải**, dàn hai đầu bằng
  `space-between`. Đọc từ trên xuống ra "tên / vai trò / quốc gia ---- cách liên
  lạc": cờ thuộc về hai dòng chữ phía trên nó, còn thứ bấm được thì gom hết về
  đầu kia. Không còn chữ "Based in Vietnam" bên cạnh, nên lá cờ tự nó là câu nói
  đó và `aria-label` của nó là chỗ duy nhất còn ghi.
- Bốn icon nằm trong **một viên nang viền mảnh**, không phải bốn cái nền riêng.
  Gom lại vì thẻ identity vốn đã là một mặt phẳng nổi có đổ bóng — bốn hộp nổi
  đặt lên nó là độ cao chồng độ cao. Viên nang vẫn làm đúng việc cần: nó là thứ
  tách bốn cái bấm được khỏi lá cờ đứng trần bên ngoài. Nền viên nang là trắng
  còn viền nặng hơn `--color-divider` một chút, vì nó phải giữ được trên hai
  nền khác nhau — xám của trang khi xếp dọc, và trắng của cột identity.
- Mỗi icon là ô **44×44**, đúng chuẩn vùng chạm của cả iOS lẫn Android, và bốn ô
  kề khít nhau: không có khe rơi vào giữa, cũng không chồng lấn để sinh ra vùng
  mập mờ. Thứ tự Instagram → Facebook → Gmail → Phone đi từ việc dễ nhất tới
  việc nặng nhất: gọi điện cắt ngang, xảy ra ngay, không soạn trước được, nên
  nó đứng cuối chỗ mắt dừng lại.
- Icon Facebook và Instagram **mở thẳng ứng dụng trên điện thoại**. `href` vẫn
  là link https bình thường nên desktop, máy không bật JS và crawler dùng nguyên
  nó; deeplink chỉ chen vào ở tầng click. Android nhận URL `intent://` — dạng
  này tự mang theo địa chỉ dự phòng, Chrome tự chọn giữa app và web, không thể
  hỏng. iOS không có dạng tương đương nên thử scheme rồi hẹn giờ quay về web,
  `visibilitychange` huỷ hẹn giờ ngay khi app chiếm màn hình. Giá phải trả của
  nhánh iOS: ai không cài app sẽ thấy một alert của Safari trước khi rơi về web
  — xoá khối `ios` trong `src/components/AppLink.tsx` là bỏ được, Universal Link
  của iOS tự gánh phần còn lại.
- Ở layout hai cột, **reel nằm bên trái và khối identity nằm bên phải** — công
  việc dẫn trước, danh tính đứng cạnh. Thứ tự trong markup thì ngược lại:
  identity vẫn là phần tử đầu tiên, vì khi xếp dọc nó là header của trang và
  `<h1>` của nó phải là heading đầu tiên của document ở cả hai layout. Hai thứ
  tự khác nhau được tách ra bằng `grid-column` đặt tên cho từng cột, không phần
  tử nào phải đổi chỗ trong markup.
- Ảnh bìa **giữ nguyên khung gốc**, không lật. Anh ấy được chụp nghiêng nhìn về
  bên trái; với cột identity nằm bên phải thì ánh nhìn đó vốn đã hướng vào trong
  trang, về phía reel.
- Reel có hai cách đi hết danh sách: dưới `WIDE` là "Load more", từ `WIDE` trở
  lên là **sang trang, 6 video một trang**. Sáu vì lưới ở layout đó chạy 1 cột
  từ 700px, 2 cột từ 942px và 3 cột ở bề ngang tối đa 1280px — sáu là số nhỏ
  nhất chia hết cho cả ba, nên hàng cuối không bao giờ lẻ ở cỡ này để chiều cỡ
  kia. Cả hai chế độ dùng **cùng một biến state** ("khách đã xin đi sâu thêm mấy
  lần"), mỗi bên đọc theo cách của mình, nên co giãn cửa sổ qua mốc vẫn giữ đúng
  chỗ đang xem chứ không nhảy về đầu.
- Dải 622–699px bị **ghim về một cột** dù lưới `auto-fit` thừa chỗ cho hai. Nếu
  không ghim, cửa sổ nới từ 600 lên 700 sẽ đi một cột → hai cột → rồi tụt lại
  một cột khi cột identity xuất hiện. Ghim rồi thì 700px là mốc duy nhất có gì
  đó thay đổi.
- Lá cờ được vẽ bằng SVG chứ không dùng emoji 🇻🇳 — Chrome trên Windows vẽ
  emoji đó thành hai chữ "VN". Bốn icon liên hệ cũng vẽ tay vì lucide đã bỏ bộ
  brand, và chúng không phải icon giao diện: logo Gmail là bốn màu cụ thể xếp
  theo một cách cụ thể, vẽ xấp xỉ thì thành hàng nhái.
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
