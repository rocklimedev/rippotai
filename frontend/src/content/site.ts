import type { NavItem, SiteInfo } from "./types";

export const site: SiteInfo = {
  name: "Rippotai Architecture",
  wordmark: "RIPPŌTAI",
  tagline: "It's all about the perspective",
  address: ["487/64, National Market, Peeragarhi,", "Paschim Vihar, New Delhi 110087"],
  email: "sagar@rippotai.in",
  phone: "+91 99110 80605",
  phoneHref: "tel:+919911080605",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/rippotai/" },
    { label: "LinkedIn", href: "https://in.linkedin.com/company/rippotaiarchitecture" },
    { label: "Facebook", href: "https://www.facebook.com/rippotaiarchitecture/" },
    { label: "Pinterest", href: "https://in.pinterest.com/rippotaiarchitecture/" },
    { label: "Threads", href: "https://www.threads.com/@rippotai" },
  ],
  copyright: "© 2026 Rippotai Architecture. All rights reserved.",
  credit: "Powered by Rocklime",
};

/** Rolling menu wheel (order matters — it is the wheel order). */
export const nav: NavItem[] = [
  { label: "Home", href: "/", preview: "/images/hero1.webp" },
  { label: "About", href: "/about", preview: "/images/about.webp" },
  { label: "Works", href: "/projects", preview: "/images/L1.webp" },
  { label: "Process", href: "/#process", preview: "/images/fb1.webp" },
  { label: "Services", href: "/services", preview: "/images/d10.webp" },
  { label: "Contact", href: "/contact", preview: "/images/fb4.webp" },
  { label: "Career", href: "/career", preview: "/images/L2.webp" },
];

/** Footer "Menu" column. */
export const footerNav = [
  { label: "About", href: "/about" },
  { label: "Works", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Process", href: "/#process" },
  { label: "Services", href: "/services" },
  { label: "Career", href: "/career" },
];
