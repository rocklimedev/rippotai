import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict-mode double effects would double-bind the imperative page behaviours in dev.
  reactStrictMode: false,
  outputFileTracingRoot: process.cwd(),
  // Remote images (team photos, awards, CDN project covers) are rendered with plain <img>,
  // so no remotePatterns are required. Add them here if you switch to next/image.
  async redirects() {
    // Keep the old static-file URLs working.
    return [
      { source: "/rippotai-v8.html", destination: "/", permanent: true },
      { source: "/rippotai-:page.html", destination: "/:page", permanent: true },
    ];
  },
};

export default nextConfig;
