"use client";

import type { ReactNode } from "react";

/**
 * Android's own escape hatch. `intent:` carries the package it wants *and* the
 * address to fall back on, and Chrome picks between them itself — so a visitor
 * without the app installed lands on the web profile instead of on an error.
 * Nothing about it needs a timer or a guess.
 */
function intentHref(webHref: string, androidPackage: string) {
  const url = new URL(webHref);
  return (
    `intent://${url.host}${url.pathname}${url.search}` +
    `#Intent;scheme=https;package=${androidPackage}` +
    `;S.browser_fallback_url=${encodeURIComponent(webHref)};end`
  );
}

/** iPadOS reports itself as a Mac, and only the touch count gives it away. */
function platform(): "android" | "ios" | null {
  const ua = navigator.userAgent;
  if (/Android/.test(ua)) return "android";
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return "ios";
  return null;
}

type Props = {
  /** The public profile URL. Stays the `href`, so this works with no JS. */
  href: string;
  /** iOS scheme URL — `instagram://…`, `fb://…`. */
  appHref: string;
  androidPackage: string;
  className?: string;
  title: string;
  label: string;
  children: ReactNode;
};

/**
 * A profile link that opens the app rather than a browser tab on a phone.
 *
 * The `href` is the ordinary https address and stays that way: desktop, no-JS
 * and every crawler get a normal link, and on iOS that address is already a
 * Universal Link, so an installed app claims it without any of this. What this
 * adds is the case Universal Links miss — Instagram's web profile shows a
 * login wall to a logged-out visitor, and a visitor who once chose "open in
 * Safari" has disabled the Universal Link for that domain for good.
 *
 * The two platforms need opposite treatments. Android is exact: `intent:`
 * states its own fallback and Chrome resolves it. iOS has no such form, so the
 * scheme is tried and the web address follows on a timer — cancelled the
 * moment the page goes hidden, which is what happens when the app takes over.
 *
 * The cost of the iOS half is one dismissible "cannot open the page" alert for
 * a visitor who does not have the app, before the fallback runs. Deleting the
 * `ios` branch below leaves Universal Links doing the job on their own.
 */
export function AppLink({
  href,
  appHref,
  androidPackage,
  className,
  title,
  label,
  children,
}: Props) {
  function open(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = platform();
    // Desktop: leave the anchor alone, new tab and all.
    if (!target) return;

    event.preventDefault();

    if (target === "android") {
      window.location.href = intentHref(href, androidPackage);
      return;
    }

    const fallback = window.setTimeout(() => {
      window.location.href = href;
    }, 1200);
    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) window.clearTimeout(fallback);
      },
      { once: true },
    );

    window.location.href = appHref;
  }

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="me noreferrer"
      title={title}
      aria-label={label}
      onClick={open}
    >
      {children}
    </a>
  );
}
