import Link from "next/link";
import type { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/landing", label: "Landing pages" },
];

function Mark() {
  return (
    <svg viewBox="150 -10 1360 1400" className="h-7 w-7" aria-hidden="true">
      <polyline points="510,135 817,5 1150,137" fill="none" stroke="hsl(var(--gold))" strokeWidth="40" />
      <ellipse cx="830" cy="295" rx="165" ry="82" fill="hsl(var(--gold))" />
      <polygon points="176,287 835,605 832,1003 475,832 470,1192 172,1048" fill="hsl(var(--primary))" />
      <polygon points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" fill="hsl(var(--primary))" />
    </svg>
  );
}

/** Admin console frame: sidebar + content. Tailwind + shadcn only. */
export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-secondary/40">
      <aside className="hidden w-60 shrink-0 border-r bg-background md:flex md:flex-col">
        <div className="flex items-center gap-3 px-5 py-5">
          <Mark />
          <div>
            <div className="text-sm font-bold tracking-[0.2em] text-primary">RIPPŌTAI</div>
            <div className="text-xs text-muted-foreground">Admin console</div>
          </div>
        </div>
        <Separator />
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <a href="/" className="px-5 py-4 text-xs text-muted-foreground hover:text-primary">
          ← View public site
        </a>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
