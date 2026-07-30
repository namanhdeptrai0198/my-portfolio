"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { Video } from "@/lib/videos";
import { VideoModal } from "./VideoModal";

/**
 * The layout switch, read from JavaScript. It has to stay in step with the
 * `@media (min-width: 900px)` blocks in app/page.module.css and
 * Spotlight.module.css: below it there is no spotlight to play anything in.
 */
const WIDE = "(min-width: 900px)";

type SpotlightState = {
  /** The video sitting in the spotlight. */
  featured: Video | null;
  /** Whether the spotlight should be a running player rather than a still. */
  playing: boolean;
  select: (video: Video) => void;
  spotlightRef: RefObject<HTMLElement | null>;
};

/**
 * Two contexts, not one. The reel only ever needs to say "this one" — and it
 * draws fifteen cards, none of which look any different afterwards. Handing it
 * a value that changed identity on every pick would re-render all of them for
 * nothing, so the callback travels on its own and only the spotlight
 * subscribes to what the pick changed.
 */
const SelectContext = createContext<((video: Video) => void) | null>(null);
const SpotlightContext = createContext<SpotlightState | null>(null);

function required<T>(value: T | null, hook: string): T {
  if (!value) throw new Error(`${hook} must be used inside <PlaybackProvider>`);
  return value;
}

/** For anything that offers a video to watch. */
export function useSelectVideo(): (video: Video) => void {
  return required(useContext(SelectContext), "useSelectVideo");
}

/** For the spotlight itself. */
export function useSpotlight(): SpotlightState {
  return required(useContext(SpotlightContext), "useSpotlight");
}

type Props = {
  /** What the spotlight shows before the visitor picks anything. */
  initial: Video | null;
  children: ReactNode;
};

/**
 * Owns which video is playing and where. The reel and the spotlight are
 * siblings under a server component, so neither can hold this state for the
 * other — clicking a card has to reach the strip at the top of the page.
 *
 * The same click means two different things at the two layouts, which is the
 * one thing CSS cannot express here: wide enough for a spotlight, a card sends
 * its video up there and starts it; too narrow for one, it opens the dialog,
 * exactly as before.
 */
export function PlaybackProvider({ initial, children }: Props) {
  const isWide = useMediaQuery(WIDE);
  const [featured, setFeatured] = useState<Video | null>(initial);
  const [playing, setPlaying] = useState(false);
  const [modal, setModal] = useState<Video | null>(null);
  const spotlightRef = useRef<HTMLElement | null>(null);

  const select = useCallback(
    (video: Video) => {
      if (!isWide) {
        setModal(video);
        return;
      }

      setFeatured(video);
      // A card with no link yet still travels to the spotlight — it just
      // arrives as the hatched "awaiting YouTube link" frame instead of a
      // player, the same thing the dialog shows for it.
      setPlaying(Boolean(video.youtubeId));

      // Without this, clicking a card near the bottom of a long reel changes
      // something a screenful above and reads as a dead click.
      const node = spotlightRef.current;
      if (!node) return;
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      node.scrollIntoView({ block: "start", behavior: still ? "auto" : "smooth" });
      // The scroll moves the page for the eye; this moves it for the keyboard
      // and the screen reader, which would otherwise be left on the card.
      node.focus({ preventScroll: true });
    },
    [isWide],
  );

  const spotlight = useMemo<SpotlightState>(
    () => ({
      featured,
      // Gated on the breakpoint rather than on the click alone: shrinking the
      // window below 900px mid-video hides the spotlight, and an iframe that
      // is merely `display: none` keeps playing its audio.
      playing: playing && isWide,
      select,
      spotlightRef,
    }),
    [featured, playing, isWide, select],
  );

  return (
    <SelectContext value={select}>
      <SpotlightContext value={spotlight}>
        {children}
        {modal ? <VideoModal video={modal} onClose={() => setModal(null)} /> : null}
      </SpotlightContext>
    </SelectContext>
  );
}
