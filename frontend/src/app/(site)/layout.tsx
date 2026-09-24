import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import SiteChrome from "@/components/site/SiteChrome";
import { getNav, getServices, getSite } from "@/lib/content";
import "@/styles/site.css";

/*
 * Root layout for the PUBLIC SITE route group.
 * It is one of several root layouts ((site), (landing), (admin)) — each owns its own
 * <html>/<body> and stylesheet, so the admin console's Tailwind/shadcn CSS can never
 * leak into these pages (navigating between groups is a full document load).
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rippotaiarchitecture.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Rippotai Architecture", template: "%s" },
  description:
    "Rippotai Architecture — architectural design, interiors, façades, bespoke furniture and project execution from New Delhi.",
  openGraph: { siteName: "Rippotai Architecture", type: "website", images: ["/images/hero1.webp"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#103E31", width: "device-width", initialScale: 1 };

export default function SiteLayout({ children }: { children: ReactNode }) {
  const site = getSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome
          nav={getNav()}
          services={getServices().map((s) => s.name)}
          site={{ email: site.email, phone: site.phone, wordmark: site.wordmark }}
        />
        {children}
      </body>
    </html>
  );
}
