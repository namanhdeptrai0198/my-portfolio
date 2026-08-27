"use client";

import Image from "next/image";
import { useThumbnailSrc } from "@/lib/useThumbnailSrc";
import type { Video } from "@/data/videos";
import { orientationOf } from "@/lib/videos";
import { PlayMark } from "./PlayMark";
import { useSpotlight } from "./PlaybackProvider";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./Spotlight.module.css";

/**
 * The strip is the page's full width less one gutter each side, and the page
 * stops widening at `--page-max` — so above 1280px the box is a fixed 1239px
 * and below it tracks the viewport. Saying "1280px" flat instead would have the
 * browser buy a 1280px slot on a 1024px window and fetch the 3840w tile for a
 * 983px box.
 */
const FRAME_SIZES = "(min-width: 1280px) 1239px, calc(100vw - 41px)";

/** Title and credits — under the frame, in both states. */
function Caption({ video }: { video: Video }) {
  return (
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
  );
}

/**
 * The frame before anything is playing: the thumbnail cropped to fill the whole
 * band. Keyed by `video.id` where it is mounted, so its thumbnail walk (see
 * `useThumbnailSrc`) starts over for each video rather than inheriting where
 * the last one gave up.
 */
function Still({
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
      className={`${styles.still} ${thumbSrc ? "" : "stripe-fill"}`}
      aria-label={`Play ${video.title} — ${video.client}`}
    >
      {thumbSrc ? (
        <Image
          src={thumbSrc}
          alt=""
          fill
          sizes={FRAME_SIZES}
          className={styles.image}
          onError={onError}
        />
      ) : null}

      {video.youtubeId ? (
        <>
          <div className={styles.veil} />
          <span className={styles.play}>
            <PlayMark size={72} />
          </span>
        </>
      ) : (
        <span className="stripe-label">[ awaiting YouTube link ]</span>
      )}
    </button>
  );
}

/**
 * The video's own colours behind the player, blown up and thrown out of focus.
 *
 * Thirteen of the fifteen pieces are 9:16, so most of the time the player covers
 * a quarter of the band and the rest of it is backdrop. A flat dark rectangle
 * there would only be a tidier version of the hole this replaces; the piece's
 * own light spilling out around it is what makes the strip read as a screening
 * rather than as an empty row.
 *
 * Keyed by `video.id` for the same reason as `Still` — the thumbnail walk is
 * per-mount.
 */
function Ambient({ video }: { video: Video }) {
  const { src, onError } = useThumbnailSrc(video.youtubeId);

  // Nothing to blur: a video YouTube has no still for at all. The band's own
  // dark is the backdrop then.
  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      fill
      /* Deliberately small. A 36px blur cannot show detail no matter what is
         fed to it, and this stop resolves to the same tile the reel card
         already fetched for this video, so the backdrop costs no request. */
      sizes="320px"
      className={styles.ambient}
      onError={onError}
    />
  );
}

/**
 * The strip at the top of the desktop layout, and the one place video plays
 * there — picking anything in the reel sends it up here rather than opening a
 * dialog over it. Absent everywhere else (see Spotlight.module.css), including
 * on a tablet upright, which keeps the two columns but not this: the reel falls
 * back to the dialog and the identity block carries the cover photo instead.
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
      <div className={styles.band}>
        {isPlaying ? (
          <>
            <Ambient key={featured.id} video={featured} />
            <div
              className={`${styles.player} ${isPortrait ? styles.playerPortrait : ""}`}
            >
              {/* Keyed by id so choosing another video builds a fresh player
                  rather than handing the running one a new src. */}
              <VideoEmbed key={featured.id} video={featured} />
            </div>
          </>
        ) : (
          <Still key={featured.id} video={featured} onPlay={select} />
        )}
      </div>

      <Caption video={featured} />
    </section>
  );
}
