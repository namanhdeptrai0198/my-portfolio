"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import type { Video } from "@/data/videos";
import { orientationOf } from "@/lib/videos";
import { VideoEmbed } from "./VideoEmbed";
import styles from "./VideoModal.module.css";

type Props = {
  video: Video;
  onClose: () => void;
};

/**
 * Mounted only while a video is selected, so the YouTube iframe — and the
 * ~700KB of player it pulls in — is never created for a reel the visitor has
 * not asked to watch.
 *
 * A native <dialog> opened with showModal(), which is what supplies the four
 * behaviours a real dialog needs: Escape to dismiss, Tab kept inside, the page
 * behind made inert, and focus handed back to the card that opened it. All four
 * used to be hand-written here.
 *
 * The two things the element does not do are still done below: the page behind
 * a modal dialog can still be scrolled, and `autoFocus` is what puts the caret
 * on the close button rather than on the YouTube iframe.
 *
 * Every way out goes through `dialog.close()` — Escape natively, the button and
 * the scrim by calling it — and the `close` event is the single place that tells
 * React. Closing any other way would leave `modal` set with the dialog gone: the
 * iframe would keep playing audio from a box nobody can see. It also means the
 * element is always closed properly rather than yanked out of the DOM mid-open,
 * which is what makes the browser hand focus back to the card.
 */
export function VideoModal({ video, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const isPortrait = orientationOf(video) === "portrait";

  // Nothing puts a <dialog> in the top layer but this call — rendering it with
  // an `open` attribute instead gives a non-modal dialog and none of the four
  // behaviours above.
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    dialog?.addEventListener("close", onClose);
    return () => dialog?.removeEventListener("close", onClose);
  }, [onClose]);

  // Freeze the page behind the scrim.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.backdrop}
      aria-labelledby={titleId}
      // The scrim is ::backdrop, which is not an element and cannot be clicked.
      // A click that lands anywhere the inner box does not cover reports the
      // dialog itself as its target, and that is the scrim.
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
    >
      <div
        className={`dialog ${styles.dialog} ${isPortrait ? styles.dialogPortrait : ""}`}
      >
        <div className={styles.head}>
          <div className={styles.heading}>
            <div id={titleId} className={`dialog-title ${styles.title}`}>
              {video.title}
            </div>
            {/* What he did on it, in the same muted `card-meta` the card that
                opened this dialog uses for the line — the dialog should not be
                the one place on the page where the credit is missing. */}
            <div className={`card-meta ${styles.role}`}>{video.role}</div>
          </div>
          <button
            autoFocus
            type="button"
            onClick={() => dialogRef.current?.close()}
            className={`btn btn-icon btn-secondary ${styles.close}`}
            aria-label="Close video"
          >
            <X size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.frame}>
          {video.youtubeId ? (
            <VideoEmbed video={video} />
          ) : (
            <p className={styles.placeholder}>
              [ paste the YouTube id for &ldquo;{video.title}&rdquo; into
              src/data/videos.ts ]
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
