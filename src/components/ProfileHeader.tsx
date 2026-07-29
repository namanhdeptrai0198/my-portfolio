import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import styles from "./ProfileHeader.module.css";

/** Lucide at stroke-width 1.5 at interface size, per the design system. */
const ICON = { size: 15, strokeWidth: 1.5 } as const;

export function ProfileHeader() {
  return (
    <header>
      {/* No `duotone` here: the system would wash this flat blue, and the red
          and blue practicals raking across him are the whole photograph. */}
      <div className={`${styles.cover} ${profile.coverImage ? "" : "stripe-fill"}`}>
        {profile.coverImage ? (
          <Image
            src={profile.coverImage}
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={styles.coverImage}
          />
        ) : (
          <p className="stripe-label">[ cover still — signature frame ]</p>
        )}
      </div>

      {/* No headshot yet means no avatar at all — an empty block, or one
          holding initials, is a placeholder standing where a face should be.
          Set profile.avatarImage and the whole row comes back. */}
      {profile.avatarImage ? (
        <div className={styles.avatarRow}>
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
        </div>
      ) : null}

      <div className={styles.identity}>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.role}>{profile.role}</p>

        <p className={`${styles.contactRow} ${styles.location}`}>
          <MapPin {...ICON} aria-hidden="true" />
          <span>{profile.location}</span>
        </p>

        <p className={styles.contactRow}>
          <Mail {...ICON} aria-hidden="true" />
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>

        <p className={`${styles.contactRow} ${styles.lastRow}`}>
          <Phone {...ICON} aria-hidden="true" />
          <a href={`tel:${profile.phoneHref}`}>{profile.phoneLabel}</a>
        </p>
      </div>

      <div className={`hr ${styles.rule}`} />
    </header>
  );
}
