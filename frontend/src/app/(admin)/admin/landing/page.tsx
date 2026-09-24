import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLandingPages } from "@/lib/content";

export const metadata = { title: "Landing pages" };

export default function AdminLanding() {
  const pages = getLandingPages();
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Landing pages render from <code>src/content/landing.ts</code> at <code>/lp/[slug]</code>, using Tailwind +
        shadcn blocks and the site&apos;s own showcase.
      </p>
      {pages.map((p) => (
        <Card key={p.slug}>
          <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
            <div>
              <CardDescription>/lp/{p.slug}</CardDescription>
              <CardTitle className="mt-1 text-primary">{p.title}</CardTitle>
            </div>
            {p.noindex ? <Badge variant="accent">noindex</Badge> : <Badge>live</Badge>}
          </CardHeader>
          <CardContent>
            <Button asChild size="sm">
              <Link href={`/lp/${p.slug}`}>Preview</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
