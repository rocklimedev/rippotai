/**
 * Content model shared by the public site, landing pages, the admin console and the API.
 * Today these are typed TS modules; swap `src/lib/content.ts` to read from a CMS/DB later
 * without touching any component.
 */
export type ProjectCategory = "residential" | "commercial" | "hospitality" | "institutional";

export interface Project {
  /** URL segment: /projects/[slug] (matches the live site) */
  slug: string;
  name: string;
  category: ProjectCategory | string;
  /** display label for the category */
  type: string;
  location: string;
  scope: string;
  status: string;
  /** grid / card image */
  cover: string;
  /** wide image for the project page banner */
  banner: string;
  shape?: "F" | "W" | "H" | "V" | string;
  featured?: boolean;
  /** one-paragraph lead */
  summary: string;
  /** body paragraphs, interleaved with the gallery */
  details: string[];
  /** images shown on the project page, in order */
  gallery: string[];
  /** extra source photographs not shown by default */
  archive?: string[];
}

export interface ShowcaseSlide {
  /** project page this slide opens */
  slug?: string;
  name: string;
  type: string;
  image: string;
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  /** small image that follows the cursor in the home accordion */
  peek: string;
  /** large "built" photo on /services */
  image: string;
  imageCaption: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  group: "studio" | "collab" | "alumni";
}

export interface Value {
  title: string;
  body: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** preview image shown beside the rolling menu wheel */
  preview: string;
}

export interface SiteInfo {
  name: string;
  wordmark: string;
  tagline: string;
  address: string[];
  email: string;
  phone: string;
  phoneHref: string;
  social: { label: string; href: string }[];
  copyright: string;
  credit: string;
}

export interface LandingPage {
  slug: string;
  title: string;
  kicker: string;
  intro: string;
  hero: string;
  services: string[];
  cta: { label: string; href: string };
  /** keep campaign pages out of search until they launch */
  noindex?: boolean;
}
