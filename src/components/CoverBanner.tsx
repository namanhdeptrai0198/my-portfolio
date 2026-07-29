import Image from "next/image";
import { profile } from "@/data/profile";
import styles from "./CoverBanner.module.css";

/**
 * Full-bleed below 900px, where it spans the whole stacked layout. At 900px
 * and up, page.module.css squares it into a portrait at the top of the
 * sticky identity column instead — see `.identity > :first-child` there.
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
          sizes="(max-width: 899px) 100vw, 298px"
          className={styles.coverImage}
        />
      ) : (
        <p className="stripe-label">[ cover still — signature frame ]</p>
      )}
    </div>
  );
}
