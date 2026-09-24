import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContentStats, getProjects, getTeam } from "@/lib/content";

export const metadata = { title: "Overview" };

export default function AdminHome() {
  const stats = getContentStats();
  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      hint: `${stats.featured} featured · each has a page`,
      href: "/admin/projects",
    },
    { label: "Services", value: stats.services, hint: "Drive header rotator + accordion", href: "/admin/services" },
    { label: "Team", value: stats.team, hint: "Shown on /about", href: "/admin" },
    { label: "Landing pages", value: stats.landingPages, hint: "Under /lp/[slug]", href: "/admin/landing" },
  ];
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Rippotai</p>
          <h1 className="font-serif text-4xl text-primary">Content overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Read-only for now — content comes from <code>src/content</code> through <code>src/lib/content.ts</code>.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href="/">Open site</a>
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>{c.label}</CardDescription>
                <CardTitle className="text-4xl text-primary">{c.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground">{c.hint}</CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <Tabs defaultValue="categories">
        <TabsList>
          <TabsTrigger value="categories">Projects by category</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>
        <TabsContent value="categories">
          <Card>
            <CardContent className="flex flex-wrap gap-3 pt-6">
              {Object.entries(stats.byCategory).map(([k, v]) => (
                <Badge key={k} variant="secondary" className="px-3 py-1 text-sm capitalize">
                  {k} · {v}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardContent className="grid gap-2 pt-6 sm:grid-cols-2">
              {getTeam().map((m) => (
                <div key={m.name} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                  <span>
                    <b className="font-bold text-primary">{m.name}</b> — {m.role}
                  </span>
                  <Badge variant={m.group === "studio" ? "default" : "outline"}>{m.group}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="roadmap">
          <Card>
            <CardContent className="space-y-2 pt-6 text-sm">
              <p>
                1. Swap <code>src/lib/content.ts</code> to a database or headless CMS.
              </p>
              <p>2. Add create/edit forms here with server actions (shadcn Form + zod).</p>
              <p>
                3. Replace basic auth in <code>src/middleware.ts</code> with Auth.js / Clerk.
              </p>
              <p>
                4. Wire <code>/api/contact</code> and <code>/api/careers</code> to email/CRM; keep an inbox view here.
              </p>
              <p className="pt-2 text-muted-foreground">
                Recent covers:{" "}
                {getProjects()
                  .slice(0, 3)
                  .map((p) => p.name)
                  .join(", ")}
                …
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
