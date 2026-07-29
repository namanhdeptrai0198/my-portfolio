import Image from "next/image";
import { profile } from "@/data/profile";
import styles from "./CoverBanner.module.css";

/** The full-bleed still across the top. Spans both columns of the layout. */
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
          sizes="(max-width: 1280px) 100vw, 1280px"
          className={styles.coverImage}
        />
      ) : (
        <p className="stripe-label">[ cover still — signature frame ]</p>
      )}
    </div>
  );
}
