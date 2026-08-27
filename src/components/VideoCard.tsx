"use client";

import Image from "next/image";
import type { Video } from "@/data/videos";
import { useThumbnailSrc } from "@/lib/useThumbnailSrc";
import { PlayMark } from "./PlayMark";
import styles from "./VideoCard.module.css";

type Props = {
  video: Video;
  onOpen: (video: Video) => void;
};

export function VideoCard({ video, onOpen }: Props) {
  const { src: thumbSrc, onError } = useThumbnailSrc(video.youtubeId);

  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      className={`card elev-sm ${styles.card}`}
      aria-label={`Play ${video.title} — ${video.client}`}
    >
      {/* The design system duotones every photograph. A cinematographer's reel
          is the one place that cannot apply: the grade is the work being shown,
          so thumbnails stay in true colour. */}
      <div className={`${styles.thumb} ${thumbSrc ? "" : "stripe-fill"}`}>
        {thumbSrc ? (
          /* These stops mirror layout maths kept in two other files — the
             auto-fit/minmax(280px) grid in VideoGallery.module.css, and the
             300px sticky column that page.module.css inserts beside the reel
             once lib/breakpoints.ts's query is met. A card is never the
             fraction of the viewport a plain two-column layout would suggest:
             the grid adds columns instead of widening them, and beside the
             sticky column the reel starts 361px in. Change either file and
             these have to move with it.
             One number has to cover both layouts at each width, because the
             same 800px window is a sticky column plus one wide card on a tablet
             and a plain two-up grid on a phone held sideways. Each stop takes
             whichever of the two is larger: an over-estimate costs a slightly
             heavier file, an under-estimate costs a visibly soft thumbnail.
             The first stop is the one place that is worth splitting rather than
             rounding up. Between 622 and 699 a tall window is pinned to one
             card and a short one still runs two, and the gap is a whole rung of
             the srcset ladder — 100vw on a 667px phone buys the 1920w tile for
             a 303px box. `sizes` takes any media condition, not only width, so
             it can just say which of the two it is. */
          <Image
            src={thumbSrc}
            alt=""
            fill
            sizes="(min-width: 622px) and (max-width: 699px) and (max-height: 599px) 48vw, (max-width: 699px) 100vw, (max-width: 941px) 62vw, (max-width: 1241px) 36vw, 300px"
            className={styles.thumbImage}
            onError={onError}
          />
        ) : null}

        {/* A card with no id is a reel entry still waiting on a link and says
            so; one that has an id but no still is playable, and reads better as
            a plain hatched frame than as an apology. */}
        {video.youtubeId ? null : (
          <span className="stripe-label">[ awaiting YouTube link ]</span>
        )}

        {video.youtubeId ? (
          <span className={styles.play}>
            <PlayMark size={48} />
          </span>
        ) : null}

        {video.duration ? (
          <span className={styles.duration}>{video.duration}</span>
        ) : null}
      </div>

      <div className={styles.body}>
        <div className={`card-title ${styles.title}`}>{video.title}</div>
        <div className={`card-meta ${styles.meta}`}>
          <span>{video.client}</span>
          <span aria-hidden="true">·</span>
          <span>{video.role}</span>
        </div>
      </div>
    </button>
  );
}
