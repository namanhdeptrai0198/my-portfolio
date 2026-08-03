import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

/* Self-hosted by next/font, so no request ever leaves for Google. The
   vietnamese subset is not optional here — the name and several project titles
   carry diacritics. */
const barlow = Barlow({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  variable: "--font-body-src",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600"],
  variable: "--font-heading-src",
  display: "swap",
});

/**
 * Where this site actually lives, needed because `openGraph.images` below is a
 * relative path and a scraper reading the page from Facebook or Zalo has no
 * page to resolve it against. Without this Next falls back to
 * `http://localhost:3000` — the build says so in a warning — and every shared
 * link renders a card with a broken image.
 *
 * Read from the environment rather than typed in, because the answer changes
 * and a hardcoded one goes stale silently. Vercel sets
 * `VERCEL_PROJECT_PRODUCTION_URL` to the project's production hostname on every
 * build, including after a custom domain is attached, so this follows the
 * domain instead of having to be chased. `NEXT_PUBLIC_SITE_URL` is the override
 * for anywhere that is not Vercel; localhost is only ever the local fallback.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.siteTitle,
  description: profile.siteDescription,
  openGraph: {
    title: profile.siteTitle,
    description: profile.siteDescription,
    type: "profile",
    locale: "en_US",
    ...(profile.coverImage ? { images: [{ url: profile.coverImage }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: profile.siteTitle,
    description: profile.siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
