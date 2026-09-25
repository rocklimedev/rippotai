"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/queries", label: "Queries" },
  { href: "/admin/user-roles", label: "Users & Roles" },
];

function Mark() {
  return (
    <svg viewBox="150 -10 1360 1400" className="h-8 w-8 shrink-0" aria-hidden="true">
      <polyline points="510,135 817,5 1150,137" fill="none" stroke="hsl(var(--gold))" strokeWidth="40" />

      <ellipse cx="830" cy="295" rx="165" ry="82" fill="hsl(var(--gold))" />

      <polygon points="176,287 835,605 832,1003 475,832 470,1192 172,1048" fill="hsl(var(--primary))" />

      <polygon points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" fill="hsl(var(--primary))" />
    </svg>
  );
}

/**
 * Admin console frame:
 * sidebar + content
 *
 * Uses the shadcn/Tailwind theme tokens defined in tailwind.config.ts.
 */
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen bg-secondary/30 text-foreground">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
          {/* Brand */}
          <div className="px-5 py-5">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Mark />

              <div className="min-w-0">
                <div className="text-sm font-bold tracking-[0.2em] text-primary">RIPPŌTAI</div>

                <div className="mt-0.5 text-xs text-muted-foreground">Admin console</div>
              </div>
            </Link>
          </div>

          <Separator />

          {/* Navigation */}
          <nav aria-label="Admin navigation" className="flex flex-1 flex-col gap-1 p-3">
            <div className="mb-2 px-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Management
            </div>

            {NAV.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2.5 text-sm font-medium",
                    "transition-colors outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {active && <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary" />}

                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="p-3">
            <a
              href="/"
              className={cn(
                "block rounded-md px-3 py-2.5 text-xs",
                "text-muted-foreground transition-colors",
                "hover:bg-secondary hover:text-primary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              ← View public site
            </a>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-5 sm:p-6 lg:p-8 xl:p-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
