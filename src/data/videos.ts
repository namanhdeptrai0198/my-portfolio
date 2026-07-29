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
   * From https://youtube.com/shorts/dQw4w9WgXcQ       →  "dQw4w9WgXcQ"
   * Leave as "" and the card renders the blueprint placeholder instead.
   */
  youtubeId: string;
  /**
   * Shape of the footage. Omit for normal 16:9 work; set "portrait" for
   * vertical pieces so the player opens tall instead of stranding the frame
   * between two black bars. Not always the same as whether YouTube calls it a
   * Short — several of these are vertical but published as normal videos.
   */
  orientation?: "landscape" | "portrait";
  year?: number;
};

/**
 * The reel. Order here is the order on the page — put the strongest work first.
 */
export const videos: Video[] = [
  {
    id: "lg-another-saigon",
    title: "Another Saigon",
    client: "LG",
    role: "Camera Operator, VFX Animation",
    category: "commercial",
    duration: "02:04",
    youtubeId: "68jBERI3RSo",
  },
  {
    id: "geely-x-chi-pu",
    title: "Geely x Chi Pu",
    client: "Geely",
    role: "Camera Operator",
    category: "commercial",
    duration: "00:36",
    youtubeId: "QlVltJShCTA",
  },
  {
    id: "1664-blanc-x-wokeup",
    title: "1664 Blanc x WOKEUP",
    client: "1664 Blanc",
    role: "Camera Operator, Editor",
    category: "commercial",
    duration: "00:30",
    youtubeId: "kH3kZYyvYjE",
    orientation: "portrait",
  },
  {
    id: "somersby-escape-tour-quoc-anh",
    title: "Escape Tour 2025 — Quốc Anh",
    client: "Somersby",
    role: "Camera Operator, Editor",
    category: "commercial",
    duration: "00:55",
    youtubeId: "ldJAIithDZ4",
    orientation: "portrait",
  },
  {
    id: "dove-deo-summer-01",
    title: "Deo Summer 01",
    client: "Dove",
    role: "Camera Operator",
    category: "commercial",
    duration: "00:21",
    youtubeId: "Fj8aHfhE1Js",
    orientation: "portrait",
  },
  {
    id: "dove-deo-summer-02",
    title: "Deo Summer 02",
    client: "Dove",
    role: "Camera Operator",
    category: "commercial",
    duration: "00:24",
    youtubeId: "QD-a6wYXqD0",
    orientation: "portrait",
  },
  {
    id: "closeup-hailee",
    title: "Hailee",
    client: "Closeup",
    role: "Editor",
    category: "commercial",
    duration: "00:20",
    youtubeId: "OILTsQDTmlU",
    orientation: "portrait",
  },
  {
    id: "tiktok-shop-voucher-extra",
    title: "Voucher Extra — Aug 2025",
    client: "TikTok Shop",
    role: "Camera Operator",
    category: "social",
    duration: "00:37",
    youtubeId: "PakRqj7aGYA",
    orientation: "portrait",
  },
  {
    id: "tiktok-shop-10-10-bumper",
    title: "10.10 Bumper",
    client: "TikTok Shop",
    role: "Editor",
    category: "social",
    duration: "00:26",
    youtubeId: "96PIdl2_JiQ",
    orientation: "portrait",
  },
];
