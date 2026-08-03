"use client";

/**
 * Brings `node` to the top of the viewport, at the speed the visitor asked for.
 *
 * Both callers change something the visitor may not be looking at —
 * PlaybackProvider when a card sends its video up to the spotlight,
 * VideoGallery when turning to a page whose first row is above the fold — and
 * without the scroll both read as a dead click.
 *
 * `scroll-margin-top` on the target is what keeps the target's own top margin
 * from being scrolled out of frame along with it.
 */
export function scrollToStart(node: HTMLElement | null) {
  if (!node) return;

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ block: "start", behavior: still ? "auto" : "smooth" });
}
