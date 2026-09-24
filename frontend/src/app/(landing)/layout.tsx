import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/admin.css";

/*
 * Root layout for campaign LANDING PAGES (/lp/*).
 * Built with Tailwind + shadcn/ui so marketing can assemble pages quickly,
 * without touching the hand-crafted public site CSS.
 */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rippotaiarchitecture.com"),
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
