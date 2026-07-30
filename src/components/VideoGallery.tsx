"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
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

type Props = {
  videos: Video[];
  filters: FilterOption[];
};

/**
 * The reel: aspect-ratio filter and "load more" pagination. What a click on a
 * card does is not decided here — PlaybackProvider owns that, because above
 * 900px the answer is "play it in the spotlight at the top of the page" and
 * below it "open the dialog".
 */
export function VideoGallery({ videos, filters }: Props) {
  const select = useSelectVideo();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const matching = useMemo(
    () => filterByOrientation(videos, activeFilter),
    [videos, activeFilter],
  );
  const visible = matching.slice(0, visibleCount);
  const hasMore = matching.length > visibleCount;

  function handleFilterChange(key: FilterKey) {
    setActiveFilter(key);
    // Changing filter starts the list over, as in the handoff spec.
    setVisibleCount(INITIAL_COUNT);
  }

  return (
    <>
      <section id="reel" className={styles.section}>
        <div className={styles.header}>
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

      {hasMore ? (
        <div className={styles.loadMore}>
          <button
            type="button"
            className={`btn btn-secondary ${styles.loadMoreButton}`}
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
          >
            Load more
            <ChevronDown size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </>
  );
}
