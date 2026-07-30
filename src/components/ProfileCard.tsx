import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { VietnamFlag } from "./VietnamFlag";
import styles from "./ProfileCard.module.css";

/** Lucide at stroke-width 1.5 at interface size, per the design system. */
const ICON = { size: 15, strokeWidth: 1.5 } as const;

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

      {/* What he does and where he is are the two facts a client checks first,
          so they share a line and sit at opposite ends of it. */}
      <div className={styles.roleRow}>
        <p className={styles.role}>{profile.role}</p>
        <p className={`${styles.contactRow} ${styles.location}`}>
          <VietnamFlag size={ICON.size} label={profile.location} />
          {/* The flag already carries this as its accessible name — see
              VietnamFlag — so the text here is decoration for the eye only. */}
          <span data-location aria-hidden="true">
            {profile.location}
          </span>
        </p>
      </div>

      <p className={styles.contactRow}>
        <Mail {...ICON} aria-hidden="true" />
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
      </p>

      <p className={`${styles.contactRow} ${styles.lastRow}`}>
        <Phone {...ICON} aria-hidden="true" />
        <a href={`tel:${profile.phoneHref}`}>{profile.phoneLabel}</a>
      </p>

      {/* Only earns its keep in the stacked layout, where it separates this
          block from the reel below it. */}
      <div className={`hr ${styles.rule}`} />
    </header>
  );
}
