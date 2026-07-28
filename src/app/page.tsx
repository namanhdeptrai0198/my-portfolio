import { ProfileHeader } from "@/components/ProfileHeader";
import { VideoGallery } from "@/components/VideoGallery";
import { getCategories, getVideos } from "@/lib/videos";
import styles from "./page.module.css";

export default function Page() {
  const videos = getVideos();
  const categories = getCategories();

  return (
    <main className={styles.page}>
      <ProfileHeader />
      <VideoGallery videos={videos} categories={categories} />
    </main>
  );
}
