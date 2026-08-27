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
import { HAS_SPOTLIGHT } from "@/lib/breakpoints";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { Video } from "@/data/videos";
import { VideoModal } from "./VideoModal";

type SpotlightState = {
  /** The video sitting in the spotlight. */
  featured: Video | null;
  /** Whether the spotlight should be a running player rather than a still. */
  playing: boolean;
  select: (video: Video) => void;
  spotlightRef: RefObject<HTMLElement | null>;
};

const SpotlightContext = createContext<SpotlightState | null>(null);

function usePlayback(hook: string): SpotlightState {
  const value = useContext(SpotlightContext);
  if (!value) throw new Error(`${hook} must be used inside <PlaybackProvider>`);
  return value;
}

/** For anything that offers a video to watch. */
export function useSelectVideo(): (video: Video) => void {
  return usePlayback("useSelectVideo").select;
}

/** For the spotlight itself. */
export function useSpotlight(): SpotlightState {
  return usePlayback("useSpotlight");
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
 * The same click means two different things depending on where the video can
 * play, which is the one thing CSS cannot express here: where there is a
 * spotlight, a card sends its video up there and starts it; everywhere else it
 * opens the dialog, exactly as before.
 *
 * Note this is HAS_SPOTLIGHT, not WIDE. A tablet upright gets the two-column
 * layout but no strip to play in, so it takes the dialog — the same branch a
 * phone takes, for a different reason.
 */
export function PlaybackProvider({ initial, children }: Props) {
  const hasSpotlight = useMediaQuery(HAS_SPOTLIGHT);
  const [featured, setFeatured] = useState<Video | null>(initial);
  const [playing, setPlaying] = useState(false);
  const [modal, setModal] = useState<Video | null>(null);
  const spotlightRef = useRef<HTMLElement | null>(null);

  const select = useCallback(
    (video: Video) => {
      if (!hasSpotlight) {
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
      node?.scrollIntoView({ block: "start" });
      // The scroll moves the page for the eye; this moves it for the keyboard
      // and the screen reader, which would otherwise be left on the card.
      node?.focus({ preventScroll: true });
    },
    [hasSpotlight],
  );

  const spotlight = useMemo<SpotlightState>(
    () => ({
      featured,
      // Gated on the query rather than on the click alone: shrinking the window
      // past it mid-video hides the spotlight, and an iframe that is merely
      // `display: none` keeps playing its audio.
      playing: playing && hasSpotlight,
      select,
      spotlightRef,
    }),
    [featured, playing, hasSpotlight, select],
  );

  return (
    <SpotlightContext value={spotlight}>
      {children}
      {modal ? <VideoModal video={modal} onClose={() => setModal(null)} /> : null}
    </SpotlightContext>
  );
}
