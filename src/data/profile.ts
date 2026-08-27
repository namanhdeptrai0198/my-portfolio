export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  /** Digits only, in E.164 — used for the tel: link. */
  phoneHref: string;
  /** Human-readable form shown on screen. */
  phoneLabel: string;
  siteTitle: string;
  siteDescription: string;
  /** Wide cover still. `null` draws the blueprint placeholder instead. */
  coverImage: string | null;
};

/**
 * Single source of truth for every piece of personal / contact information on
 * the site. Nothing else in the codebase should hard-code an email, a phone
 * number or the role line.
 */
export const profile: Profile = {
  name: "Nguyễn Ngọc Nam Anh",
  role: "Camera Operator - Editor",
  location: "Based in Vietnam",
  email: "anh0198hcm@gmail.com",
  phoneHref: "+84938588157",
  phoneLabel: "+84 938 588 157",

  /** Shown in the browser tab and when the link is pasted into a chat app. */
  siteTitle: "Nguyễn Ngọc Nam Anh — Camera Operator",
  siteDescription:
    "Selected work from a Vietnam-based camera operator and editor. Commercials and social campaigns for LG, Geely, Pharmaton, Shopee, 1664 Blanc, Dove, Closeup, Somersby, Panasonic and TikTok Shop.",

  /**
   * Downscaled from ~/Downloads/BTS/DOVE/CNH00637.jpg — the 6301px original is
   * 9MB and nothing on the page renders wider than 1280.
   */
  coverImage: "/images/cover.jpg",
};
