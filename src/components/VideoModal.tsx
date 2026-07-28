"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import type { Video } from "@/lib/videos";
import { embedUrl } from "@/lib/youtube";
import styles from "./VideoModal.module.css";

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  video: Video;
  onClose: () => void;
};

/**
 * Mounted only while a video is selected, so the YouTube iframe — and the
 * ~700KB of player it pulls in — is never created for a reel the visitor has
 * not asked to watch.
 *
 * The mock only closed on a backdrop click; a real dialog also has to handle
 * Escape, keep Tab inside itself, stop the page behind it from scrolling and
 * hand focus back to the card that opened it.
 */
export function VideoModal({ video, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Move focus in on open, and put it back on the opening card on close.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => opener?.focus?.();
  }, []);

  // Freeze the page behind the scrim.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Escape closes; Tab cycles within the dialog.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className={`dialog-backdrop ${styles.backdrop}`}
      role="presentation"
      // Only a click on the scrim itself closes — a click that lands on the
      // dialog bubbles up here with a different target and is ignored.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={`dialog ${styles.dialog}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.head}>
          <div id={titleId} className={`dialog-title ${styles.title}`}>
            {video.title}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className={`btn btn-icon btn-secondary ${styles.close}`}
            aria-label="Close video"
          >
            <X size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.frame}>
          {video.youtubeId ? (
            <iframe
              src={embedUrl(video.youtubeId)}
              title={`${video.title} — ${video.client}`}
              className={styles.iframe}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          ) : (
            <p className={styles.placeholder}>
              [ paste the YouTube id for &ldquo;{video.title}&rdquo; into
              src/data/videos.ts ]
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
