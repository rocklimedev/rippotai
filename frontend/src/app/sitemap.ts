import type { MetadataRoute } from "next";
import { getLandingPages } from "@/lib/content";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rippotaiarchitecture.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/about", "/services", "/contact", "/career"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const landing = getLandingPages()
    .filter((l) => !l.noindex)
    .map((l) => ({ url: `${base}/lp/${l.slug}`, priority: 0.5 }));
  return [...pages, ...landing];
}
