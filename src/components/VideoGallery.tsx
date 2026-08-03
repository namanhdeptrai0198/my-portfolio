"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { WIDE } from "@/lib/breakpoints";
import { scrollToStart } from "@/lib/scrollToStart";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  filterByOrientation,
  type FilterKey,
  type FilterOption,
  type Video,
} from "@/lib/videos";
import { useSelectVideo } from "./PlaybackProvider";
import { ReelFilter } from "./ReelFilter";
import { VideoCard } from "./VideoCard";
import styles from "./VideoGallery.module.css";

/** Enough to fill the first screen; every "Load more" adds a shorter run. */
const INITIAL_COUNT = 6;
const LOAD_MORE_COUNT = 4;

/**
 * A page of the reel above 900px. Six, because the grid there is three columns
 * at the page's full 1280px and two from 900px to 1228px — six is the smaller
 * number that divides both, so the last row is never left ragged at one width to
 * suit the other. It also comes to roughly one screenful, which is the whole
 * point of turning a page instead of scrolling.
 */
const PAGE_SIZE = 6;

type Props = {
  videos: Video[];
  filters: FilterOption[];
};

/**
 * The reel: an aspect-ratio filter, and one of two ways through the list.
 *
 * Below 900px it grows downwards on "Load more". Above it the same list is
 * paged, because there the reel is a column beside a fixed identity card rather
 * than the whole page, and a column that only ever gets longer pushes its own
 * end further away with every click.
 *
 * What a click on a card does is not decided here — PlaybackProvider owns that,
 * because above 900px the answer is "play it in the spotlight at the top of the
 * page" and below it "open the dialog".
 */
export function VideoGallery({ videos, filters }: Props) {
  const select = useSelectVideo();
  const isWide = useMediaQuery(WIDE);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const reelRef = useRef<HTMLElement | null>(null);

  /**
   * One number for both layouts: how many times the visitor has asked to go
   * further into the reel. Each layout reads it its own way — accumulating
   * below 900px, a window above it — so resizing across the breakpoint lands
   * you at the same depth in the list rather than back at the top.
   */
  const [page, setPage] = useState(1);

  const matching = useMemo(
    () => filterByOrientation(videos, activeFilter),
    [videos, activeFilter],
  );

  const pageCount = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
  // Derived rather than stored: a filter that shrinks the reel would otherwise
  // leave `page` pointing past the end, and there is no second copy of it to
  // keep in step.
  const current = Math.min(page, pageCount);

  const visible = isWide
    ? matching.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE)
    : matching.slice(0, INITIAL_COUNT + (page - 1) * LOAD_MORE_COUNT);
  const hasMore = !isWide && visible.length < matching.length;

  function handleFilterChange(key: FilterKey) {
    setActiveFilter(key);
    // Changing filter starts the list over, as in the handoff spec.
    setPage(1);
  }

  function goToPage(next: number) {
    setPage(next);
    // The row that just arrived is above the fold if the visitor had scrolled
    // to reach these buttons.
    scrollToStart(reelRef.current);
  }

  return (
    <>
      <section id="reel" ref={reelRef} className={styles.section}>
        {/* `data-reel-header` is the handle page.module.css hides this by above
            900px, rather than a class this file would style: every rule the
            900px switch owns stays in that one file. */}
        <div data-reel-header className={styles.header}>
          <h2 className={styles.heading}>
            {matching.length} {matching.length === 1 ? "Video" : "Videos"}
          </h2>
          <ReelFilter
            options={filters}
            active={activeFilter}
            onChange={handleFilterChange}
          />
        </div>

        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((video) => (
              <VideoCard key={video.id} video={video} onOpen={select} />
            ))}
          </div>
        ) : (
          <p className={styles.empty}>[ nothing in this category yet ]</p>
        )}
      </section>

      {isWide ? (
        pageCount > 1 ? (
          <nav className={styles.foot} aria-label="Reel pages">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => goToPage(current - 1)}
              disabled={current === 1}
            >
              <ChevronLeft size={15} strokeWidth={1.5} aria-hidden="true" />
              Prev
            </button>

            {/* Spoken as well as drawn: the buttons stay exactly where they are
                while the grid above them changes, so without this a screen
                reader hears nothing happen. */}
            <span className={styles.count} aria-live="polite">
              {current} / {pageCount}
            </span>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => goToPage(current + 1)}
              disabled={current === pageCount}
            >
              Next
              <ChevronRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </nav>
        ) : null
      ) : hasMore ? (
        <div className={styles.foot}>
          <button
            type="button"
            className={`btn btn-secondary ${styles.loadMoreButton}`}
            onClick={() => setPage((count) => count + 1)}
          >
            Load more
            <ChevronDown size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
