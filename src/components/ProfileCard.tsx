import { profile } from "@/data/profile";
import { ContactLinks, MARK_SIZE } from "./ContactLinks";
import { VietnamFlag } from "./VietnamFlag";
import styles from "./ProfileCard.module.css";

/**
 * The flag is 3:2, so this is the width that makes it exactly as tall as the
 * marks beside it — the thing that decides whether it reads as part of their
 * row or as something parked at the end of it. Derived rather than typed so the
 * two cannot drift: change MARK_SIZE and the flag follows.
 */
const FLAG_SIZE = MARK_SIZE * 1.5;

/**
 * Name, role and the two ways to reach him. On a wide screen this is the left
 * column and it stays put while the reel scrolls past — the whole point of the
 * page is that a client who likes something can act on it without hunting back
 * up for a phone number.
 */
export function ProfileCard() {
  return (
    <header className={styles.card}>
      <h1 className={styles.name}>{profile.name}</h1>

      <p className={styles.role}>{profile.role}</p>

      {/* One row now: the ways to reach him, then where he is at the far end of
          it. The flag is not decoration — it is the only thing left saying
          "Vietnam", which is why `VietnamFlag` carries that sentence as its
          accessible name. */}
      <div className={styles.contact}>
        <ContactLinks />
        <VietnamFlag size={FLAG_SIZE} label={profile.location} />
      </div>

      {/* Only earns its keep in the stacked layout, where it separates this
          block from the reel below it. */}
      <div className={`hr ${styles.rule}`} />
    </header>
  );
}
