"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Video } from "@/lib/videos";
import { fallbackThumbnailUrl, thumbnailUrl } from "@/lib/youtube";
import { BlueprintCorners } from "./Blueprint";
import styles from "./VideoCard.module.css";

type Props = {
  video: Video;
  onOpen: (video: Video) => void;
};

export function VideoCard({ video, onOpen }: Props) {
  /* maxresdefault.jpg only exists when the upload had an HD source; mqdefault
     is generated for every video and keeps the same 16:9 crop. */
  const [thumbSrc, setThumbSrc] = useState(() =>
    video.youtubeId ? thumbnailUrl(video.youtubeId) : null,
  );

  return (
    <button
      type="button"
      onClick={() => onOpen(video)}
      className={`card blueprint elev-sm ${styles.card}`}
      aria-label={`Play ${video.title} — ${video.client}`}
    >
      <BlueprintCorners />

      <div
        className={`${styles.thumb} duotone reveal-on-hover ${thumbSrc ? "" : "stripe-fill"}`}
      >
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt=""
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 1280px) 50vw, 400px"
            className={styles.thumbImage}
            onError={() =>
              setThumbSrc(
                video.youtubeId ? fallbackThumbnailUrl(video.youtubeId) : null,
              )
            }
          />
        ) : (
          <span className="stripe-label">[ awaiting YouTube link ]</span>
        )}

        {/* Suppressed on placeholder cards so it does not sit on top of the
            centred "awaiting link" caption. */}
        {thumbSrc ? (
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
