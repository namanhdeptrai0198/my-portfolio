import type { Video } from "@/data/videos";
import { embedUrl } from "@/lib/youtube";
import styles from "./VideoEmbed.module.css";

type Props = {
  /** Callers guarantee a `youtubeId`; an entry still waiting on a link never
   *  reaches a player. */
  video: Video;
};

/**
 * The one place a YouTube player is created — the dialog on a narrow screen,
 * the spotlight on a wide one. Which host the embed comes from and what the
 * page grants it are decided here and in `embedUrl`, so the privacy posture
 * cannot end up different in the two players.
 */
export function VideoEmbed({ video }: Props) {
  return (
    <iframe
      src={embedUrl(video.youtubeId)}
      title={`${video.title} — ${video.client}`}
      className={styles.iframe}
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
      allowFullScreen
    />
  );
}
