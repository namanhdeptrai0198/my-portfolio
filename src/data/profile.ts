export type Profile = {
  name: string;
  initials: string;
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
  /** Square headshot. `null` falls back to the initials block. */
  avatarImage: string | null;
};

/**
 * Single source of truth for every piece of personal / contact information on
 * the site. Nothing else in the codebase should hard-code an email, a phone
 * number or the role line.
 */
export const profile: Profile = {
  name: "Nguyễn Ngọc Nam Anh",
  initials: "NA",
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
   * TO FILL IN: drop the files into public/images/ and point these at them,
   * e.g. "/images/cover.jpg" and "/images/avatar.jpg". While they are null the
   * page draws the blueprint placeholders from the design mock.
   */
  coverImage: null,
  avatarImage: null,
};
