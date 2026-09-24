import type { LandingPage } from "./types";

/**
 * Campaign / landing pages rendered by src/app/(landing)/lp/[slug].
 * Add an entry here (or later, from the admin console) to publish a new page.
 */
export const landingPages: LandingPage[] = [
  {
    slug: "design-consultation",
    title: "An hour with an architect, before you build.",
    kicker: "Design consultation · New Delhi",
    intro:
      "Bring your site, your plans or just a brief. We review feasibility, layouts and budgets with you and leave you with a clear next step.",
    hero: "/images/p_khanna.webp",
    services: ["design-consultation", "concept-development", "architectural-design"],
    cta: { label: "Book a consultation", href: "/contact?svc=Design%20Consultation" },
    noindex: true,
  },
];
