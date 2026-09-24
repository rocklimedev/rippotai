import Link from "next/link";
import type { Project } from "@/content/types";
import { projectHref } from "@/lib/content";

/** Full-bleed "next project" band + quiet previous link. */
export default function ProjectNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section className="pd-next">
      <Link href={projectHref(next.slug)} className="pd-next-band" data-m="">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={next.cover} alt="" loading="lazy" decoding="async" />
        <span className="wrap">
          <small>Next project</small>
          <b>{next.name}</b>
          <em>{next.type}</em>
        </span>
      </Link>
      <div className="wrap pd-next-row">
        <Link href={projectHref(prev.slug)} data-m="">
          ← {prev.name}
        </Link>
        <Link href="/projects" data-m="">
          All projects
        </Link>
      </div>
    </section>
  );
}
