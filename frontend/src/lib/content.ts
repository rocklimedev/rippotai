/**
 * Content access layer.
 *
 * Every component, landing page, API route and the admin console reads content through
 * these functions — never by importing src/content directly. When the admin console gets
 * a real backend (Postgres/Prisma, Sanity, Payload, Supabase…), only this file changes.
 */
import {
  departments,
  landingPages,
  nav,
  footerNav,
  projects,
  services,
  showcase,
  site,
  team,
  values,
  type LandingPage,
  type Project,
  type Service,
} from "@/content";

export const getSite = () => site;
export const getNav = () => nav;
export const getFooterNav = () => footerNav;

export const getProjects = (): Project[] => projects;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const projectHref = (slug: string) => `/projects/${slug}`;
/** Previous / next project in portfolio order (wraps around). */
export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  const n = projects.length;
  return { index: i, total: n, prev: projects[(i - 1 + n) % n], next: projects[(i + 1) % n] };
}

export const getServices = (): Service[] => services;
export const getService = (slug: string) => services.find((s) => s.slug === slug);

export const getShowcase = () => showcase;
export const getTeam = () => team;
export const getValues = () => values;
export const getDepartments = () => departments;

export const getLandingPages = (): LandingPage[] => landingPages;
export const getLandingPage = (slug: string) => landingPages.find((l) => l.slug === slug);

/** Numbers for the admin dashboard. */
export function getContentStats() {
  return {
    projects: projects.length,
    featured: projects.filter((p) => p.featured).length,
    services: services.length,
    team: team.length,
    landingPages: landingPages.length,
    byCategory: projects.reduce<Record<string, number>>((acc, p) => {
      acc[p.category] = (acc[p.category] ?? 0) + 1;
      return acc;
    }, {}),
  };
}
