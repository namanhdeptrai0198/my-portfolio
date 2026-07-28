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

/**
 * Accepts anything you can copy out of the YouTube address bar or Share panel
 * and returns the bare id. Handy when filling in `src/data/videos.ts`.
 */
export function parseYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const fromQuery = url.searchParams.get("v");
    if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

    // youtu.be/<id>, /embed/<id>, /shorts/<id>, /live/<id>
    const last = url.pathname.split("/").filter(Boolean).pop();
    if (last && /^[\w-]{11}$/.test(last)) return last;
  } catch {
    // not a URL — fall through
  }
  return null;
}
