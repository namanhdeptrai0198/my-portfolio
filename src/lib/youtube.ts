/**
 * Everything the site needs about a YouTube video is derived from its id, so
 * the data file only ever stores the id.
 */

/** Privacy-enhanced host: no tracking cookie is set until playback starts. */
const EMBED_HOST = "https://www.youtube-nocookie.com";

/** 1280×720 — only exists if the upload had an HD source. */
export function thumbnailUrl(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/** 320×180 — same 16:9 crop, generated for every upload. Used when maxres 404s. */
export function fallbackThumbnailUrl(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg`;
}

/**
 * Autoplays because the user has just clicked the card to open the modal —
 * `rel=0` keeps end-cards to the same channel rather than suggesting a
 * competitor's work.
 */
export function embedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `${EMBED_HOST}/embed/${youtubeId}?${params}`;
}
