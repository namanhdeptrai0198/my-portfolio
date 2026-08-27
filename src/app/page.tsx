import { CoverBanner } from "@/components/CoverBanner";
import { PlaybackProvider } from "@/components/PlaybackProvider";
import { ProfileCard } from "@/components/ProfileCard";
import { Spotlight } from "@/components/Spotlight";
import { VideoGallery } from "@/components/VideoGallery";
import { spotlightId, videos } from "@/data/videos";
import { FILTERS } from "@/lib/videos";
import styles from "./page.module.css";

export default function Page() {
  // A typo in `spotlightId` drops the strip rather than breaking the page.
  const spotlight = videos.find((v) => v.id === spotlightId) ?? null;

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
            <VideoGallery videos={videos} filters={FILTERS} />
          </div>
        </div>
      </PlaybackProvider>
    </main>
  );
}
