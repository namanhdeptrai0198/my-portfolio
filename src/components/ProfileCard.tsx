import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { VietnamFlag } from "./VietnamFlag";
import styles from "./ProfileCard.module.css";

/** Lucide at stroke-width 1.5 at interface size, per the design system. */
const ICON = { size: 15, strokeWidth: 1.5 } as const;

/**
 * Twice the interface icon size. It is no longer a bullet in front of a phrase
 * that says the same thing — it is the whole statement now, alone at the end of
 * a row, and at 15px a red rectangle that small reads as a stray swatch rather
 * than as a flag.
 */
const FLAG_SIZE = ICON.size * 2;

/**
 * Name, role and the two ways to reach him. On a wide screen this is the left
 * column and it stays put while the reel scrolls past — the whole point of the
 * page is that a client who likes something can act on it without hunting back
 * up for a phone number.
 */
export function ProfileCard() {
  return (
    <header className={styles.card}>
      {/* No headshot yet means no avatar at all — an empty block, or one
          holding initials, is a placeholder standing where a face should be.
          Set profile.avatarImage and the whole row comes back. */}
      {profile.avatarImage ? (
        <div className={`${styles.avatar} duotone`}>
          <Image
            src={profile.avatarImage}
            alt={profile.name}
            fill
            priority
            sizes="96px"
            className={styles.avatarImage}
          />
        </div>
      ) : null}

      <h1 className={styles.name}>{profile.name}</h1>

      <p className={styles.role}>{profile.role}</p>

      <p className={styles.contactRow}>
        <Mail {...ICON} aria-hidden="true" />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>

      {/* Where he is, at the far end of the last line of how to reach him — the
          three rows now read as one block of contact details rather than as a
          fact about him and then a way to call him.
          The words are gone and the flag is not decoration any more: it is the
          only thing left saying "Vietnam", which is why `VietnamFlag` carries
          that sentence as its accessible name. */}
      <p className={`${styles.contactRow} ${styles.lastRow}`}>
        <Phone {...ICON} aria-hidden="true" />
        <a href={`tel:${profile.phoneHref}`}>{profile.phoneLabel}</a>
        <VietnamFlag size={FLAG_SIZE} label={profile.location} />
      </p>

      {/* Only earns its keep in the stacked layout, where it separates this
          block from the reel below it. */}
      <div className={`hr ${styles.rule}`} />
    </header>
  );
}
