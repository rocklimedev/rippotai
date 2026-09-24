# Rippotai Architecture — Next.js

The Rippotai site (home, projects, about, services, contact, career) ported to **Next.js 15 (App Router) + TypeScript** with a `src/` folder. The public pages keep their own hand-written CSS and motion exactly as in the static build. **Tailwind, shadcn/ui and Radix are installed but used only by the admin console and landing pages**, which are separate from the public site.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set `ADMIN_USER` / `ADMIN_PASSWORD` to password-protect `/admin`.

## Structure

```
src/
  app/
    (site)/                 ← PUBLIC SITE — root layout #1 (site.css only, no Tailwind)
      layout.tsx            loader · cursor · header "WE DO" rotator · rolling-wheel menu (SiteChrome)
      page.tsx              /
      projects|about|services|contact|career/page.tsx
      [...missing]/ + not-found.tsx   branded 404
    (landing)/              ← LANDING PAGES — root layout #2 (Tailwind + shadcn)
      lp/[slug]/page.tsx    template driven by src/content/landing.ts
    (admin)/                ← ADMIN CONSOLE — root layout #3 (Tailwind + shadcn + Radix)
      admin/                overview · projects · services · landing pages
    api/contact|careers|content/route.ts   ready-to-wire endpoints
    sitemap.ts · robots.ts
  components/
    site/                   SiteChrome, EndZone (CTA + glass footer), Monogram, SplitHeading
    sections/<page>/        each page split into section components + behavior.ts
    sections/shared/        Showcase (motion poster), ServicesAccordion — data-driven, reusable
    ui/                     shadcn/ui (button, card, badge, input, label, separator, tabs, table)
    admin/                  AdminShell
  content/                  typed content: projects, services, team, showcase, nav, site, landing
  lib/
    content.ts              the ONLY way components read content (swap for a CMS/DB later)
    scope.ts                disposable scope for the imperative page behaviours
    utils.ts                cn() for shadcn
  styles/
    site.css                public site styles (the original CSS, merged)
    admin.css               Tailwind directives + shadcn theme tokens (brand green/gold)
  middleware.ts             basic auth for /admin
public/images/              all project imagery (WebP)
```

## Why Tailwind never touches the existing pages

- The public site, landing pages and admin are three **separate root layouts** (route groups). Each imports only its own stylesheet, and moving between groups is a full page load, so the stylesheets never share a document.
- `tailwind.config.ts` `content` only scans `(admin)`, `(landing)`, `components/ui`, `components/admin` and `components/landing`.
- `site.css` has no `@tailwind` directives, so Preflight and utilities never reach the public pages.

## How the original motion was carried over

Every page is server-rendered JSX. Its interactive behaviour (showcase autoplay, scrollytelling, cube, wizards, forms…) is the original vanilla JS, moved into `sections/<page>/behavior.ts` and mounted by a tiny client component. Global listeners, timers, `requestAnimationFrame` loops and observers go through a `Scope` (`src/lib/scope.ts`) and are cleaned up on route change. The header, menu and loader live once in the layout. On each client navigation the headline entrance plays again.

`reactStrictMode` is off so these imperative behaviours are not bound twice in development.

## Growing into the admin console

1. Replace the bodies of `src/lib/content.ts` with database/CMS queries. The components, landing pages, API and admin all read content through it.
2. Add create and edit forms in `(admin)` with server actions (shadcn Form + zod).
3. Swap the basic auth in `middleware.ts` for Auth.js, Clerk or similar.
4. Connect `/api/contact` and `/api/careers` to email or a CRM. The public forms still use `mailto:` today, so nothing depends on these yet.
5. Make more sections data-driven the same way `Showcase` and `ServicesAccordion` are (the projects grid and team are next in line).

## Adding a landing page

Add an entry to `src/content/landing.ts`. It is published at `/lp/<slug>` and listed in the admin. Set `noindex: true` to keep it out of search engines until launch.
