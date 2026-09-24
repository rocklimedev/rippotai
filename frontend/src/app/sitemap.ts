import type { MetadataRoute } from "next";
import { getLandingPages, getProjects } from "@/lib/content";

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
  const projects = getProjects().map((p) => ({
    url: `${base}/projects/${p.slug}`,
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.8 : 0.6,
    images: p.gallery.slice(0, 5).map((src) => (src.startsWith("http") ? src : `${base}${src}`)),
  }));
  return [...pages, ...projects, ...landing];
}
