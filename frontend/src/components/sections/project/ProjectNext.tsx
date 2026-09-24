import Link from "next/link";
import type { Project } from "@/api/projectsApi";

/**
 * Full-bleed "next project" band + quiet previous link.
 */
export default function ProjectNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section className="pd-next">
      <Link href={`/projects/${next.slug}`} className="pd-next-band" data-m="">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={next.banner || next.image || ""} alt="" loading="lazy" decoding="async" />

        <span className="wrap">
          <small>Next project</small>

          <b>{next.title}</b>

          <em>{next.category || ""}</em>
        </span>
      </Link>

      <div className="wrap pd-next-row">
        <Link href={`/projects/${prev.slug}`} data-m="">
          ← {prev.title}
        </Link>

        <Link href="/projects" data-m="">
          All projects
        </Link>
      </div>
    </section>
  );
}
