"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Video } from "@/lib/videos";
import { fallbackThumbnailUrl, thumbnailUrl } from "@/lib/youtube";
import styles from "./VideoCard.module.css";

type Props = {
  video: Video;
  onOpen: (video: Video) => void;
};

export function VideoCard({ video, onOpen }: Props) {
  /* maxresdefault.jpg only exists when the upload had an HD source, and a
     video YouTube has not finished processing has no still at all — so the
     walk has to end at "none" rather than retrying the fallback forever. */
  const [thumbStage, setThumbStage] = useState<"max" | "fallback" | "none">(
    video.youtubeId ? "max" : "none",
  );

  const thumbSrc =
    thumbStage === "max"
      ? thumbnailUrl(video.youtubeId)
      : thumbStage === "fallback"
        ? fallbackThumbnailUrl(video.youtubeId)
        : null;

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
             above 900px. A card is never the fraction of the viewport a plain
             two-column layout would suggest: the grid adds columns instead of
             widening them, and above 900px the reel starts 361px in. Change
             either file and these have to move with it. */
          <Image
            src={thumbSrc}
            alt=""
            fill
            sizes="(max-width: 614px) 100vw, (max-width: 899px) 48vw, (max-width: 934px) 62vw, (max-width: 1228px) 36vw, 300px"
            className={styles.thumbImage}
            onError={() =>
              setThumbStage((stage) => (stage === "max" ? "fallback" : "none"))
            }
          />
        ) : null}

        {/* A card with no id is a reel entry still waiting on a link and says
            so; one that has an id but no still is playable, and reads better as
            a plain hatched frame than as an apology. */}
        {video.youtubeId ? null : (
          <span className="stripe-label">[ awaiting YouTube link ]</span>
        )}

        {video.youtubeId ? (
          <span className={styles.play} aria-hidden="true">
            <span className={styles.playMark}>
              <Play size={18} fill="var(--color-bg)" stroke="none" />
            </span>
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
