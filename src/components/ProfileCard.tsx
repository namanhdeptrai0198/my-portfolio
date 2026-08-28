import { profile } from "@/data/profile";
import { ContactLinks, MARK_SIZE } from "./ContactLinks";
import { VietnamFlag } from "./VietnamFlag";
import styles from "./ProfileCard.module.css";

/**
 * Matched to the marks beside it, but to their ink rather than to their boxes.
 *
 * 1.5 used to be right, because it made the flag exactly as tall as a mark and
 * the marks were filled tiles that used their whole box. Drawn as outlines they
 * only cover the middle 20 units of their 24-unit grid, so a flag built to the
 * full box now stands taller than every glyph in the row — and it is the one
 * solid block of colour among four thin grey strokes, so it was already winning
 * the row on weight alone. It is a fact about him; the four things beside it are
 * what a client came to press. 1.25 is 20/24 of the old ratio: the flag now
 * measures what the glyphs actually draw.
 *
 * Still derived rather than typed, so the two cannot drift: change MARK_SIZE
 * and the flag follows.
 */
const FLAG_SIZE = MARK_SIZE * 2;

/**
 * Name, role and the ways to reach him. On a wide screen this is the right
 * column and it stays put while the reel scrolls past — the whole point of the
 * page is that a client who likes something can act on it without hunting back
 * up for a phone number.
 */
export function ProfileCard() {
  return (
    <header className={styles.card}>
      <h1 className={styles.name}>{profile.name}</h1>

      <p className={styles.role}>{profile.role}</p>

      {/* Where he is, then how to reach him, at opposite ends of one line.
          The flag leads because it belongs to the two lines above it — name,
          role, country share a left edge and read as one column of facts about
          him, while everything that can be clicked is gathered at the other
          end. It is also the only thing in this row that is not a link, and
          sitting among four that are, it invited a tap that does nothing.
          It is not decoration either: it is the only thing left saying
          "Vietnam", which is why `VietnamFlag` carries that sentence as its
          accessible name. */}
      <div className={styles.contact}>
        <VietnamFlag size={FLAG_SIZE} label={profile.location} />
        <ContactLinks />
      </div>

      {/* Only earns its keep in the stacked layout, where it separates this
          block from the reel below it. */}
      <div className={`hr ${styles.rule}`} />
    </header>
  );
}
