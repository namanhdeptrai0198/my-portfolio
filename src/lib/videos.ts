import { CATEGORY_LABELS, videos, type CategoryKey, type Video } from "@/data/videos";

export type { CategoryKey, Video };

export type CategoryOption = {
  key: CategoryKey | "all";
  label: string;
  count: number;
};

/**
 * The only door between the UI and the reel data.
 *
 * Components import from here, never from `@/data/videos` directly — so
 * swapping the static array for a CMS or an API later is a change to this file
 * alone. Both functions are sync today; if the source becomes remote, make them
 * async and await them in the server component that calls them.
 */
export function getVideos(): Video[] {
  return videos;
}

/**
 * "All" plus one entry per category that actually has work in it, in the fixed
 * order declared by CATEGORY_LABELS — so the filter never shows an empty tab
 * and never reorders itself as the reel grows.
 */
export function getCategories(): CategoryOption[] {
  const all = getVideos();
  const used = (Object.keys(CATEGORY_LABELS) as CategoryKey[])
    .map((key) => ({
      key,
      label: CATEGORY_LABELS[key],
      count: all.filter((v) => v.category === key).length,
    }))
    .filter((option) => option.count > 0);

  return [{ key: "all" as const, label: "All", count: all.length }, ...used];
}

export function filterByCategory(all: Video[], category: CategoryKey | "all"): Video[] {
  return category === "all" ? all : all.filter((v) => v.category === category);
}
