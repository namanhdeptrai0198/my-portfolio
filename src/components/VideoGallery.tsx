"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  filterByCategory,
  type CategoryKey,
  type CategoryOption,
  type Video,
} from "@/lib/videos";
import { CategoryFilter } from "./CategoryFilter";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";
import styles from "./VideoGallery.module.css";

const PAGE_SIZE = 6;

type Props = {
  videos: Video[];
  categories: CategoryOption[];
};

/**
 * The one interactive island on the page: category filter, "load more"
 * pagination and the video dialog. Everything above it stays a server
 * component.
 */
export function VideoGallery({ videos, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey | "all">("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const matching = useMemo(
    () => filterByCategory(videos, activeCategory),
    [videos, activeCategory],
  );
  const visible = matching.slice(0, visibleCount);
  const hasMore = matching.length > visibleCount;
  const selected = selectedId ? videos.find((v) => v.id === selectedId) ?? null : null;

  function handleCategoryChange(key: CategoryKey | "all") {
    setActiveCategory(key);
    // Changing filter starts the list over, as in the handoff spec.
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <>
      <section id="reel" className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.heading}>
            {matching.length} {matching.length === 1 ? "Video" : "Videos"}
          </h2>
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onOpen={(v) => setSelectedId(v.id)}
              />
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
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
          >
            Load more
            <ChevronDown size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      ) : null}

      {selected ? (
        <VideoModal video={selected} onClose={() => setSelectedId(null)} />
      ) : null}
    </>
  );
}
