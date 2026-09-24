/**
 * Content model shared by the public site, landing pages, the admin console and the API.
 * Today these are typed TS modules; swap `src/lib/content.ts` to read from a CMS/DB later
 * without touching any component.
 */
export type ProjectCategory = "residential" | "commercial" | "hospitality" | "institutional";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory | string;
  type: string;
  cover: string;
  shape?: "F" | "W" | "H" | "V" | string;
  featured?: boolean;
}

export interface ShowcaseSlide {
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
