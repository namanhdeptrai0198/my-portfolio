import { profile } from "@/data/profile";
import styles from "./ContactLinks.module.css";

/**
 * The marks are drawn here rather than imported: lucide dropped its brand set,
 * and these four are not interface icons anyway — a Gmail envelope is four
 * specific colours in a specific arrangement, and an approximation of a logo
 * reads as a counterfeit of it. Same reason `VietnamFlag` is drawn by hand.
 *
 * All four sit on a 24-unit grid so one `size` governs the row. Exported
 * because the flag beside them is sized from it — see ProfileCard.
 */
export const MARK_SIZE = 26;

function GmailMark() {
  return (
    <svg viewBox="0 0 48 48" width={MARK_SIZE} height={MARK_SIZE} aria-hidden="true">
      <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75V40h7a3 3 0 0 0 3-3V16.2z" />
      <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6a3 3 0 0 1-3-3V16.2z" />
      <path fill="#e53935" d="M35 11.2L24 19.45 13 11.2l-1 5.8 1 6.7 11 8.25 11-8.25 1-6.7z" />
      <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859A4.298 4.298 0 0 0 3 12.298z" />
      <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.298 4.298 0 0 1 45 12.298z" />
    </svg>
  );
}

/* No brand behind this one — green with a white handset is simply what a phone
   affordance looks like on both mobile platforms, which is the convention worth
   borrowing next to three logos. */
function PhoneMark() {
  return (
    <svg viewBox="0 0 24 24" width={MARK_SIZE} height={MARK_SIZE} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#22a45d" />
      <path
        fill="#fff"
        d="M16.42 14.6l-1.9-.22a1.5 1.5 0 0 0-1.23.43l-1.38 1.38a11.3 11.3 0 0 1-4.95-4.95l1.39-1.39c.32-.32.48-.78.42-1.23l-.22-1.88A1.5 1.5 0 0 0 7.06 5.4H5.76c-.85 0-1.56.71-1.51 1.56A14.34 14.34 0 0 0 17.5 19.75c.85.05 1.56-.66 1.56-1.51v-1.3c0-.76-.57-1.4-1.32-1.49z"
      />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg viewBox="0 0 24 24" width={MARK_SIZE} height={MARK_SIZE} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877f2" />
      <path
        fill="#fff"
        d="M16.67 15.47l.53-3.47h-3.33v-2.25c0-.95.47-1.88 1.96-1.88h1.51V4.9s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.66V12H7.08v3.47h3.05v8.39a12.1 12.1 0 0 0 3.74 0v-8.39z"
      />
    </svg>
  );
}

/* The wordless camera outline, on the corner-to-corner gradient the brand uses.
   A gradient needs an id, and an id has to be unique in the document — this
   component renders once, in the identity card. */
function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" width={MARK_SIZE} height={MARK_SIZE} aria-hidden="true">
      <defs>
        <linearGradient id="ig-mark" x1="0" y1="24" x2="24" y2="0">
          <stop offset="0" stopColor="#ffdd55" />
          <stop offset="0.25" stopColor="#ff543e" />
          <stop offset="0.5" stopColor="#c837ab" />
          <stop offset="1" stopColor="#3771c8" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#ig-mark)" />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="4.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.6" r="1.05" fill="#fff" />
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
 */
export function ContactLinks() {
  return (
    <p className={styles.row}>
      <a
        className={styles.link}
        href={`mailto:${profile.email}`}
        title={profile.email}
        aria-label={`Email ${profile.email}`}
      >
        <GmailMark />
      </a>
      <a
        className={styles.link}
        href={`tel:${profile.phoneHref}`}
        title={profile.phoneLabel}
        aria-label={`Call ${profile.phoneLabel}`}
      >
        <PhoneMark />
      </a>
      {profile.facebook ? (
        <a
          className={styles.link}
          href={profile.facebook}
          target="_blank"
          rel="me noreferrer"
          title="Facebook"
          aria-label="Facebook profile"
        >
          <FacebookMark />
        </a>
      ) : null}
      {profile.instagram ? (
        <a
          className={styles.link}
          href={profile.instagram}
          target="_blank"
          rel="me noreferrer"
          title="Instagram"
          aria-label="Instagram profile"
        >
          <InstagramMark />
        </a>
      ) : null}
    </p>
  );
}
