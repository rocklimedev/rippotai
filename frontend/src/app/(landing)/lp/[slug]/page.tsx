import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getLandingPage, getLandingPages, getService, getSite } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getLandingPages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = getLandingPage((await params).slug);
  if (!page) return {};
  return {
    title: `${page.title} | Rippotai Architecture`,
    description: page.intro,
    robots: page.noindex ? { index: false, follow: false } : undefined,
    openGraph: { images: [page.hero] },
  };
}

/** Landing-page template. Every block is Tailwind + shadcn and reads from the content layer. */
export default async function LandingPage({ params }: Params) {
  const page = getLandingPage((await params).slug);
  if (!page) notFound();
  const site = getSite();
  const services = page.services.map(getService).filter((s) => !!s);

  return (
    <main>
      <section className="relative flex min-h-[88vh] items-end overflow-hidden text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={page.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#103E31]/85 via-[#103E31]/20 to-transparent" />
        <div className="container relative pb-16">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">{page.kicker}</p>
          <h1 className="max-w-3xl font-sans text-4xl font-light leading-tight md:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-xl text-lg font-light text-white/85">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="accent">
              <a href={page.cta.href}>{page.cta.label} →</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-transparent text-white hover:bg-white/10"
            >
              <a href="/projects">See our work</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="container grid gap-6 py-20 md:grid-cols-3">
        {services.map((s) => (
          <Card key={s!.slug} className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s!.image} alt={s!.imageCaption} className="aspect-[4/3] w-full object-cover" />
            <CardHeader>
              <CardTitle className="text-primary">{s!.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{s!.summary}</p>
              <div className="flex flex-wrap gap-2">
                {s!.tags.map((t) => (
                  <Badge key={t} variant="secondary">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <footer className="border-t bg-secondary/60">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
          <span className="font-bold tracking-[0.25em] text-primary">{site.wordmark}</span>
          <span>
            <a href={`mailto:${site.email}`} className="hover:text-primary">
              {site.email}
            </a>{" "}
            · {site.phone}
          </span>
          <Link href="/" className="hover:text-primary">
            rippotaiarchitecture.com →
          </Link>
        </div>
      </footer>
    </main>
  );
}
