"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/videos";
import { useThumbnailSrc } from "@/lib/useThumbnailSrc";
import { PlayMark } from "./PlayMark";
import { VideoModal } from "./VideoModal";
import styles from "./Spotlight.module.css";

type Props = {
  video: Video;
};

/**
 * The full-width strip above the two-column layout on desktop, standing in
 * for the old full-bleed cover photo — a still from the work itself instead
 * of a behind-the-scenes shot. Hidden below 900px entirely (see
 * Spotlight.module.css); the component still mounts there, but no
 * `priority` on the image means the browser never fetches it while it's
 * `display: none`, so mobile pays nothing for it.
 */
export function Spotlight({ video }: Props) {
  const [open, setOpen] = useState(false);
  const { src: thumbSrc, onError } = useThumbnailSrc(video.youtubeId);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`card ${styles.button}`}
        aria-label={`Play ${video.title} — ${video.client}`}
      >
        <div className={`${styles.frame} ${thumbSrc ? "" : "stripe-fill"}`}>
          {thumbSrc ? (
            <Image
              src={thumbSrc}
              alt=""
              fill
              sizes="1280px"
              className={styles.image}
              onError={onError}
            />
          ) : null}

          <div className={styles.scrim} />

          <span className={styles.play}>
            <PlayMark size={72} />
          </span>

          <div className={styles.caption}>
            <div className={`card-title ${styles.title}`}>{video.title}</div>
            <div className={styles.meta}>
              <span>{video.client}</span>
              <span aria-hidden="true">·</span>
              <span>{video.role}</span>
              {video.duration ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{video.duration}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </button>

      {open ? <VideoModal video={video} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
