import { CoverBanner } from "@/components/CoverBanner";
import { ProfileCard } from "@/components/ProfileCard";
import { VideoGallery } from "@/components/VideoGallery";
import { getFilters, getVideos } from "@/lib/videos";
import styles from "./page.module.css";

export default function Page() {
  const videos = getVideos();
  const filters = getFilters();

  return (
    <main className={styles.page}>
      <CoverBanner />
      <div className={styles.body}>
        <ProfileCard />
        <div className={styles.reel}>
          <VideoGallery videos={videos} filters={filters} />
        </div>
      </div>
    </main>
  );
}
