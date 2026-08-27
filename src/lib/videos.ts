import type { Orientation, Video } from "@/data/videos";

export type FilterKey = Orientation | "all";

export type FilterOption = {
  key: FilterKey;
  label: string;
};

/** Omitting `orientation` means ordinary 16:9 work. */
export function orientationOf(video: Video): Orientation {
  return video.orientation ?? "landscape";
}

/** Widest first, so the strip never reorders itself as the reel grows. */
export const FILTERS: FilterOption[] = [
  { key: "all", label: "All" },
  { key: "landscape", label: "16:9" },
  { key: "portrait", label: "9:16" },
];

export function filterByOrientation(all: Video[], key: FilterKey): Video[] {
  return key === "all" ? all : all.filter((v) => orientationOf(v) === key);
}
