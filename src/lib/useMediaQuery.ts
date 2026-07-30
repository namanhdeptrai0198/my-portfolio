"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads a CSS media query from JavaScript, for the cases where a layout switch
 * also changes behaviour and CSS alone cannot express it.
 *
 * The server snapshot is `false` — the narrow, stacked layout — so the markup
 * React sends down always matches what it hydrates into. Anything that depends
 * on this must therefore be something the first paint can live without: a
 * click handler's branch, or an element that starts hidden either way.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
