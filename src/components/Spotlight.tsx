"use client";

import Image from "next/image";
import { useThumbnailSrc } from "@/lib/useThumbnailSrc";
import { orientationOf, type Video } from "@/lib/videos";
import { PlayMark } from "./PlayMark";
import { useSpotlight } from "./PlaybackProvider";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./Spotlight.module.css";

/** Title and credits — over the still, then under the player. */
function Caption({ video }: { video: Video }) {
  return (
    <>
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
    </>
  );
}

/**
 * The frame before anything is playing. Keyed by `video.id` where it is
 * mounted, so its thumbnail walk (see `useThumbnailSrc`) starts over for each
 * video rather than inheriting where the last one gave up.
 */
function SpotlightStill({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (video: Video) => void;
}) {
  const { src: thumbSrc, onError } = useThumbnailSrc(video.youtubeId);

  return (
    <button
      type="button"
      onClick={() => onPlay(video)}
      className={`card ${styles.button}`}
      aria-label={`Play ${video.title} — ${video.client}`}
    >
      <div className={`${styles.frame} ${thumbSrc ? "" : "stripe-fill"}`}>
        {thumbSrc ? (
          /* The strip is the page's full width less one gutter each side, and
             the page stops widening at `--page-max` — so above 1280px the box
             is a fixed 1239px and below it tracks the viewport. Saying
             "1280px" flat instead would have the browser buy a 1280px slot on
             a 1024px window and fetch the 3840w tile for a 983px box. */
          <Image
            src={thumbSrc}
            alt=""
            fill
            sizes="(min-width: 1280px) 1239px, calc(100vw - 41px)"
            className={styles.image}
            onError={onError}
          />
        ) : null}

        {video.youtubeId ? null : (
          <span className="stripe-label">[ awaiting YouTube link ]</span>
        )}

        <div className={styles.scrim} />

        {video.youtubeId ? (
          <span className={styles.play}>
            <PlayMark size={72} />
          </span>
        ) : null}

        <div className={styles.caption}>
          <Caption video={video} />
        </div>
      </div>
    </button>
  );
}

/**
 * The strip above the two-column layout, and the one place video plays on a
 * wide screen — picking anything in the reel sends it up here rather than
 * opening a dialog over it. Hidden below 900px entirely (see
 * Spotlight.module.css), where the reel falls back to the dialog and the
 * identity block carries the cover photo instead.
 *
 * Until the visitor picks something this is a still of `spotlightId`, and the
 * image is deliberately not `priority`: while the section is `display: none`
 * the browser never fetches it, so a phone pays nothing for a strip it will
 * not see.
 */
export function Spotlight() {
  const { featured, playing, select, spotlightRef } = useSpotlight();

  // Only when `spotlightId` matches nothing and nothing has been clicked yet.
  if (!featured) return null;

  const isPortrait = orientationOf(featured) === "portrait";
  const isPlaying = playing && Boolean(featured.youtubeId);

  return (
    /* `tabIndex` is what lets PlaybackProvider move focus here after a card is
       clicked — without it the keyboard would stay behind on the card while
       the video started a screenful away. */
    <section
      ref={spotlightRef}
      tabIndex={-1}
      aria-label="Spotlight"
      className={styles.section}
    >
      {isPlaying ? (
        <div className={`${styles.stage} ${isPortrait ? styles.stagePortrait : ""}`}>
          <div className={`${styles.player} ${isPortrait ? styles.playerPortrait : ""}`}>
            {/* Keyed by id so choosing another video builds a fresh player
                rather than handing the running one a new src. */}
            <VideoEmbed key={featured.id} video={featured} />
          </div>
          {/* Under the player, not over it: overlaid text would sit on top of
              YouTube's scrubber and controls. */}
          <div className={styles.captionBelow}>
            <Caption video={featured} />
          </div>
        </div>
      ) : (
        <SpotlightStill key={featured.id} video={featured} onPlay={select} />
      )}
    </section>
  );
}
