export const CATEGORY_LABELS = {
  commercial: "Commercial",
  social: "Social",
  mv: "Music Video",
  short: "Short Film",
  doc: "Documentary",
} as const;

export type CategoryKey = keyof typeof CATEGORY_LABELS;

export type Video = {
  /** Stable slug — used as the React key and the modal lookup. */
  id: string;
  title: string;
  /** Brand or production the piece was made for. */
  client: string;
  /** What Nam Anh did on it. */
  role: string;
  category: CategoryKey;
  /** mm:ss — shown as a badge on the thumbnail. */
  duration: string;
  /**
   * The 11-character YouTube id, NOT the full URL.
   * From https://www.youtube.com/watch?v=dQw4w9WgXcQ  →  "dQw4w9WgXcQ"
   * From https://youtu.be/dQw4w9WgXcQ                 →  "dQw4w9WgXcQ"
   * Leave as "" and the card renders the blueprint placeholder instead.
   */
  youtubeId: string;
  year?: number;
};

/**
 * The reel. Order here is the order on the page — put the strongest work first.
 *
 * Titles, clients and durations below were drawn from the master files in
 * ~/Desktop/PORT and are a starting point: correct anything that is off, and
 * paste the YouTube id for each piece into `youtubeId`.
 */
export const videos: Video[] = [
  {
    id: "shopee-gil-le",
    title: "Shopee x Gil Lê",
    client: "Shopee",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "tiktok-shop-super-brand-festival",
    title: "Super Brand Festival",
    client: "TikTok Shop",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "1664-blanc-festive-stunt",
    title: "Festive Stunt",
    client: "1664 Blanc",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "dove-deo-thematic",
    title: "Deo Thematic",
    client: "Dove",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "geely-x-chi-pu",
    title: "Geely x Chi Pu",
    client: "Geely",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "pharmaton-tet-x-song-luan",
    title: "Tết Campaign x Song Luân",
    client: "Pharmaton",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "omo-x-vo-tan-phat",
    title: "OMO x Võ Tấn Phát",
    client: "OMO",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "another-saigon-lg",
    title: "Another Saigon",
    client: "LG",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
  {
    id: "somersby-escape-tour-quoc-anh",
    title: "Escape Tour 2025 — Quốc Anh",
    client: "Somersby",
    role: "Camera Operator",
    category: "social",
    duration: "",
    youtubeId: "",
  },
  {
    id: "lazada-x-quynh-luong",
    title: "Lazada x Quỳnh Lương",
    client: "Lazada",
    role: "Camera Operator",
    category: "social",
    duration: "",
    youtubeId: "",
  },
  {
    id: "tiktok-shop-fashion",
    title: "Fashion",
    client: "TikTok Shop",
    role: "Camera Operator",
    category: "social",
    duration: "",
    youtubeId: "",
  },
  {
    id: "panasonic-ac-heatpump",
    title: "Nanoe-X AC Heatpump",
    client: "Panasonic",
    role: "Camera Operator",
    category: "commercial",
    duration: "",
    youtubeId: "",
  },
];
