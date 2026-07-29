import { spotlightId, videos, type Orientation, type Video } from "@/data/videos";

export type { Orientation, Video };

export type FilterKey = Orientation | "all";

export type FilterOption = {
  key: FilterKey;
  label: string;
};

/** Omitting `orientation` means ordinary 16:9 work. */
export function orientationOf(video: Video): Orientation {
  return video.orientation ?? "landscape";
}

const ORIENTATION_LABELS: Record<Orientation, string> = {
  landscape: "16:9",
  portrait: "9:16",
};

/**
 * The only door between the UI and the reel data.
 *
 * Components import from here, never from `@/data/videos` directly — so
 * swapping the static array for a CMS or an API later is a change to this file
 * alone. All three functions are sync today; if the source becomes remote, make
 * them async and await them in the server component that calls them.
 */
export function getVideos(): Video[] {
  return videos;
}

/**
 * The video for the desktop spotlight. `null` if `spotlightId` doesn't match
 * anything in the reel, so a typo there just drops the spotlight rather than
 * breaking the page.
 */
export function getSpotlight(): Video | null {
  return videos.find((v) => v.id === spotlightId) ?? null;
}

/**
 * "All" plus one entry per shape that actually has work in it, always widest
 * first — so the filter never shows an empty tab and never reorders itself as
 * the reel grows.
 */
export function getFilters(): FilterOption[] {
  const all = getVideos();
  const used = (Object.keys(ORIENTATION_LABELS) as Orientation[])
    .filter((key) => all.some((v) => orientationOf(v) === key))
    .map((key) => ({ key, label: ORIENTATION_LABELS[key] }));

  return [{ key: "all" as const, label: "All" }, ...used];
}

export function filterByOrientation(all: Video[], key: FilterKey): Video[] {
  return key === "all" ? all : all.filter((v) => orientationOf(v) === key);
}
