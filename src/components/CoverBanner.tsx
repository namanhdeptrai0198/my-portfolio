import Image from "next/image";
import { profile } from "@/data/profile";
import styles from "./CoverBanner.module.css";

/**
 * Full-bleed in the stacked layout, where it spans the whole width. Once
 * lib/breakpoints.ts's query is met, page.module.css squares it into a portrait
 * at the top of the sticky identity column instead — see
 * `.identity > :first-child` there.
 *
 * The `sizes` stops say the same thing twice because that query has two halves:
 * a window under 700px is stacked, and so is a short one at any width — a phone
 * on its side is 852px wide and still gets the full-bleed banner. This image is
 * `priority`, so an under-estimate here is a soft LCP.
 */
export function CoverBanner() {
  return (
    /* No `duotone` here: the system would wash this flat blue, and the red and
       blue practicals raking across him are the whole photograph. */
    <div className={`${styles.cover} ${profile.coverImage ? "" : "stripe-fill"}`}>
      {profile.coverImage ? (
        <Image
          src={profile.coverImage}
          alt=""
          fill
          priority
          sizes="(max-width: 699px) 100vw, (max-height: 599px) 100vw, 298px"
          className={styles.coverImage}
        />
      ) : (
        <p className="stripe-label">[ cover still — signature frame ]</p>
      )}
    </div>
  );
}
