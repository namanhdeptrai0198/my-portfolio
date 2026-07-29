import { ProfileHeader } from "@/components/ProfileHeader";
import { VideoGallery } from "@/components/VideoGallery";
import { getFilters, getVideos } from "@/lib/videos";
import styles from "./page.module.css";

export default function Page() {
  const videos = getVideos();
  const filters = getFilters();

  return (
    <main className={styles.page}>
      <ProfileHeader />
      <VideoGallery videos={videos} filters={filters} />
    </main>
  );
}
