/** The shape the piece was shot in — also what the reel filter sorts on. */
export type Orientation = "landscape" | "portrait";

export type Video = {
  /** Stable slug — used as the React key and the modal lookup. */
  id: string;
  title: string;
  /** Brand or production the piece was made for. */
  client: string;
  /** What Nam Anh did on it. */
  role: string;
  /** mm:ss — shown as a badge on the thumbnail. */
  duration: string;
  /**
   * The 11-character YouTube id, NOT the full URL.
   * From https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  "dQw4w9WgXcQ"
   * From https://youtu.be/dQw4w9WgXcQ                 →  "dQw4w9WgXcQ"
   * From https://youtube.com/shorts/dQw4w9WgXcQ       →  "dQw4w9WgXcQ"
   * Leave as "" and the card renders the blueprint placeholder instead.
   */
  youtubeId: string;
  /**
   * Omit for normal 16:9 work; set "portrait" for vertical pieces. This drives
   * two things: the player opens tall instead of stranding the frame between
   * two black bars, and the reel's 16:9 / 9:16 filter. Not the same as whether
   * YouTube calls it a Short — several of these are vertical but published as
   * normal videos, so check the footage rather than the URL.
   */
  orientation?: Orientation;
};

/** What the desktop spotlight holds before the visitor picks anything — from
 *  then on it holds whatever they clicked in the reel. Change the id to change
 *  that opening piece; it stays in the reel below either way. */
export const spotlightId = "geely-x-chi-pu";

/**
 * The reel. Order here is the order on the page — put the strongest work first.
 */
export const videos: Video[] = [
  {
    id: "lg-another-saigon",
    title: "Another Saigon by LG Video",
    client: "LG",
    role: "Camera Operator, VFX Animation",
    duration: "02:04",
    youtubeId: "68jBERI3RSo",
  },
  {
    id: "geely-x-chi-pu",
    title: "Geely x ChiPu",
    client: "Geely",
    role: "Camera Operator",
    duration: "00:36",
    youtubeId: "QlVltJShCTA",
  },
  {
    id: "pharmaton-tet-song-luan",
    title: "Pharmaton Tet X Song Luân",
    client: "Pharmaton",
    role: "Editor",
    duration: "01:54",
    youtubeId: "N3Uk2fkM3wk",
    orientation: "portrait",
  },
  {
    id: "shopee-dinh-ngoc-diep-t04",
    title: "Teaser Shopee x Đinh Ngọc Diệp T04",
    client: "Shopee",
    role: "Camera Operator",
    duration: "01:25",
    youtubeId: "fMGBr0NjLfk",
    orientation: "portrait",
  },
  {
    id: "1664-blanc-x-wokeup",
    title: "1664 Blanc x WOKEUP",
    client: "1664 Blanc",
    role: "Camera Operator, Editor",
    duration: "00:30",
    youtubeId: "kH3kZYyvYjE",
    orientation: "portrait",
  },
  {
    id: "somersby-escape-tour-quoc-anh",
    title: "Somersby escape tour 2025 - Quốc Anh",
    client: "Somersby",
    role: "Camera Operator, Editor",
    duration: "00:55",
    youtubeId: "ldJAIithDZ4",
    orientation: "portrait",
  },
  {
    id: "dove-deo-summer-01",
    title: "Dove Deo Summer 01",
    client: "Dove",
    role: "Camera Operator",
    duration: "00:21",
    youtubeId: "Fj8aHfhE1Js",
    orientation: "portrait",
  },
  {
    id: "dove-deo-summer-02",
    title: "Dove Deo Summer 02",
    client: "Dove",
    role: "Camera Operator",
    duration: "00:24",
    youtubeId: "QD-a6wYXqD0",
    orientation: "portrait",
  },
  {
    id: "closeup-hailee",
    title: "CLOSEUP HAILEE",
    client: "Closeup",
    role: "Editor",
    duration: "00:20",
    youtubeId: "OILTsQDTmlU",
    orientation: "portrait",
  },
  {
    id: "panasonic-ac-heatpump",
    title: "Panasonic AC HEATPUMP",
    client: "Panasonic",
    role: "Editor",
    duration: "00:34",
    youtubeId: "0O2LKaLvzas",
    orientation: "portrait",
  },
  {
    id: "tiktok-shop-voucher-extra",
    title: "TikTokShop Voucher Extra Aug 2025",
    client: "TikTok Shop",
    role: "Camera Operator",
    duration: "00:37",
    youtubeId: "PakRqj7aGYA",
    orientation: "portrait",
  },
  {
    id: "tiktok-shop-10-10-bumper",
    title: "[BUMPER] Tiktok Shop 10.10",
    client: "TikTok Shop",
    role: "Editor",
    duration: "00:26",
    youtubeId: "96PIdl2_JiQ",
    orientation: "portrait",
  },
  {
    id: "shopee-duy-khanh",
    title: "Teaser Shopee x Duy Khánh T01",
    client: "Shopee",
    role: "Camera Operator",
    duration: "04:25",
    youtubeId: "BmTqH3iZWGM",
    orientation: "portrait",
  },
  {
    id: "shopee-dinh-ngoc-diep-t06",
    title: "Teaser Shopee x Đinh Ngọc Diệp T06",
    client: "Shopee",
    role: "Camera Operator",
    duration: "04:08",
    youtubeId: "kSRhcRSaw4U",
    orientation: "portrait",
  },
  {
    id: "surf-social-funtional-asset",
    title: "Surf Social Funtional Asset",
    client: "Surf",
    role: "Editor",
    duration: "00:19",
    youtubeId: "TiWGT0cG32I",
    orientation: "portrait",
  },
];
