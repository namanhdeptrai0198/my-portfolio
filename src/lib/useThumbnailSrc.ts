"use client";

import { useState } from "react";
import { fallbackThumbnailUrl, thumbnailUrl } from "@/lib/youtube";

/**
 * Walks a YouTube thumbnail through its quality tiers, falling back when a
 * size 404s. `maxresdefault.jpg` only exists when the upload had an HD
 * source, and a video YouTube has not finished processing has no still at
 * all — so the walk has to end at "none" rather than retrying the fallback
 * forever.
 */
export function useThumbnailSrc(youtubeId: string) {
  const [stage, setStage] = useState<"max" | "fallback" | "none">(
    youtubeId ? "max" : "none",
  );

  const src =
    stage === "max"
      ? thumbnailUrl(youtubeId)
      : stage === "fallback"
        ? fallbackThumbnailUrl(youtubeId)
        : null;

  function onError() {
    setStage((current) => (current === "max" ? "fallback" : "none"));
  }

  return { src, onError };
}
