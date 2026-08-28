import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { AppLink } from "./AppLink";
import styles from "./ContactLinks.module.css";

/**
 * One number governs the row, and the flag beside it is derived from this —
 * see ProfileCard. Exported for that reason.
 */
export const MARK_SIZE = 26;

/**
 * lucide's own attributes, so the two marks drawn below sit on exactly the grid
 * the two imported ones do: 24 units, a 2px stroke, round ends, and the colour
 * inherited rather than set. Anything that differs — the 48-unit viewBox the
 * Gmail envelope used to need, a heavier stroke — shows up at once as one mark
 * being denser than its neighbours.
 */
const MARK_PROPS = {
  viewBox: "0 0 24 24",
  width: MARK_SIZE,
  height: MARK_SIZE,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

/**
 * Only two marks are still drawn by hand, and only because lucide dropped its
 * brand set — mail and phone are the package's own.
 *
 * These are the outline of each logo rather than the logo: no gradient tile, no
 * blue disc, no white knockout. That is a real trade. A brand mark in its own
 * colours is recognised before it is read, and these are not — a client
 * scanning the card now has to look at the shape. What it buys is a row that
 * has one voice: four saturated app tiles were the loudest thing on a card
 * whose loudest thing should be his name, and they made the row read as four
 * separate destinations rather than as one set of ways to reach one person.
 *
 * Losing the colours also costs the "these are pressable" signal the tiles gave
 * for free. The pill around them is what carries it now (see
 * ContactLinks.module.css), which is why it is no longer optional.
 */
function InstagramMark() {
  return (
    <svg {...MARK_PROPS}>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      {/* The flash. A stroked circle this small would close into a blob, so it
          is filled and the stroke taken off it. */}
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg {...MARK_PROPS}>
      {/* The f as its own silhouette, not an f sitting in a disc: a filled
          glyph among three outlines would be the one heavy mark in the row. */}
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/**
 * The four ways to reach him, as marks rather than as lines of text.
 *
 * An icon says less than the address it replaces: a client reading the card can
 * no longer copy the email or dial the number off the screen without opening
 * something first. `title` is what buys most of that back — the address and the
 * number are still in the markup, still read aloud by a screen reader through
 * the label, and still shown on hover.
 *
 * The order runs from the cheapest thing to ask of a visitor to the most
 * expensive: two profiles to look through before deciding anything, then mail,
 * then the phone at the end. Ringing someone is the largest of the four — it
 * interrupts him, it happens now, and it cannot be drafted — so it sits where
 * the eye stops rather than in the middle of the row. It is also roughly how a
 * client actually arrives: scroll the work, write, then call.
 *
 * `instagram://` takes a bare username, while Facebook's app has no username
 * form and takes the whole web address instead. Both are derived from the URLs
 * in `data/profile.ts` so there is still only one place to change them.
 */
export function ContactLinks() {
  const instagramUser = profile.instagram
    ? new URL(profile.instagram).pathname.replaceAll("/", "")
    : "";

  return (
    <p className={styles.row}>
      {profile.instagram ? (
        <AppLink
          className={styles.link}
          href={profile.instagram}
          appHref={`instagram://user?username=${instagramUser}`}
          androidPackage="com.instagram.android"
          title="Instagram"
          label="Instagram profile"
        >
          <InstagramMark />
        </AppLink>
      ) : null}
      {profile.facebook ? (
        <AppLink
          className={styles.link}
          href={profile.facebook}
          appHref={`fb://facewebmodal/f?href=${encodeURIComponent(profile.facebook)}`}
          androidPackage="com.facebook.katana"
          title="Facebook"
          label="Facebook profile"
        >
          <FacebookMark />
        </AppLink>
      ) : null}
      <a
        className={styles.link}
        href={`mailto:${profile.email}`}
        title={profile.email}
        aria-label={`Email ${profile.email}`}
      >
        <Mail size={MARK_SIZE} aria-hidden="true" />
      </a>
      <a
        className={styles.link}
        href={`tel:${profile.phoneHref}`}
        title={profile.phoneLabel}
        aria-label={`Call ${profile.phoneLabel}`}
      >
        <Phone size={MARK_SIZE} aria-hidden="true" />
      </a>
    </p>
  );
}
