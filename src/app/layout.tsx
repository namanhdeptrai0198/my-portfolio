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

export const metadata: Metadata = {
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
