import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import EndZone from "@/components/site/EndZone";
import SplitHeading from "@/components/site/SplitHeading";
import Behavior from "@/components/sections/project/Behavior";
import ProjectGallery from "@/components/sections/project/ProjectGallery";
import ProjectLightbox from "@/components/sections/project/ProjectLightbox";
import ProjectNext from "@/components/sections/project/ProjectNext";
import { getAdjacentProjects, getProject, getProjects, getSite } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.name} — ${p.type}, ${p.location} | Rippotai Architecture`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.name, description: p.summary, images: [p.cover], type: "article" },
  };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const { index, total, prev, next } = getAdjacentProjects(project.slug);
  const site = getSite();
  // the banner already opens the page — don't repeat it as the first gallery frame
  const shots = project.gallery.length > 4 ? project.gallery.filter((src) => src !== project.banner) : project.gallery;
  const story = { ...project, gallery: shots };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    image: project.gallery.slice(0, 6),
    genre: project.type,
    locationCreated: { "@type": "Place", name: project.location },
    creator: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <section className="pg-banner pd-banner" id="top-anchor">
        <div className="bimg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.banner} alt="" data-fallback="remove" />
        </div>
        <div className="bin">
          <div className="wrap">
            <div>
              <span className="k">
                {project.type} · {project.location}
              </span>
              <SplitHeading id="h1" text={project.name} step={0.08} />
            </div>
            <div className="bmeta">
              <b>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </b>
              {project.scope}
              <br />
              <span className="cue">
                <i />
                Scroll
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pd-intro">
        <div className="wrap">
          <div className="pd-lead">
            <Link href="/projects" className="pd-back" data-m="" data-rev="">
              ← All projects
            </Link>
            <p data-rev="">{project.summary}</p>
          </div>
          <dl className="pd-facts" data-rev="">
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
            <div>
              <dt>Typology</dt>
              <dd>{project.type}</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>{project.scope}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>Images</dt>
              <dd>{shots.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      <ProjectGallery project={story} />
      <ProjectNext prev={prev} next={next} />

      <EndZone
        id="endz"
        image={project.banner}
        imageAlt={project.name}
        title={
          <>
            Imagine yours <em>next.</em>
          </>
        }
        href="/contact"
        label="Start a project"
      />
      <ProjectLightbox images={shots} name={project.name} />
      <Behavior />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
