import { CoverBanner } from "@/components/CoverBanner";
import { PlaybackProvider } from "@/components/PlaybackProvider";
import { ProfileCard } from "@/components/ProfileCard";
import { Spotlight } from "@/components/Spotlight";
import { VideoGallery } from "@/components/VideoGallery";
import { getFilters, getSpotlight, getVideos } from "@/lib/videos";
import styles from "./page.module.css";

export default function Page() {
  const videos = getVideos();
  const filters = getFilters();
  const spotlight = getSpotlight();

  return (
    <main className={styles.page}>
      {/* Only the spotlight and the reel read this context; CoverBanner and
          ProfileCard pass through it as children and stay server components. */}
      <PlaybackProvider initial={spotlight}>
        <Spotlight />
        <div className={styles.body}>
          <div className={styles.identity}>
            <CoverBanner />
            <ProfileCard />
          </div>
          <div className={styles.reel}>
            <VideoGallery videos={videos} filters={filters} />
          </div>
        </div>
      </PlaybackProvider>
    </main>
  );
}
