"use client";

import Link from "next/link";
import { useGetPublicProjectsQuery } from "@/api/projectsApi";

const FALLBACK_IMAGE = "/images/p_tropical.webp";

const CARD_STYLES = ["sF", "sV", "sW", "sH", "sH", "sW", "sV", "sV", "sV", "sV", "sF", "sV", "sW", "sH", "sH", "sF"];

function ProjectCard({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  const title = project.title || "Untitled project";
  const category = project.category || "";
  const image = project.image || FALLBACK_IMAGE;
  const slug = project.slug || "";
  const cardStyle = CARD_STYLES[index] || "sV";

  const content = (
    <>
      <figure>
        <img src={image} alt={title} loading="lazy" />
      </figure>

      <div className="pj-meta">
        <span className="i">{number}</span>
        <span className="nm">{title}</span>
        <span className="ty">{category}</span>
      </div>
    </>
  );

  if (!slug) {
    return (
      <div className={`pj-card ${cardStyle}`} data-c={category.toLowerCase()} data-m="" data-rev="">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/projects/${slug}`}
      className={`pj-card ${cardStyle}`}
      data-c={category.toLowerCase()}
      data-m=""
      data-rev=""
    >
      {content}
    </Link>
  );
}

function ProjectRow({ project, index }) {
  const number = String(index + 1).padStart(2, "0");
  const title = project.title || "Untitled project";
  const category = project.category || "";
  const image = project.image || FALLBACK_IMAGE;
  const slug = project.slug || "";

  const content = (
    <>
      <span className="i">{number}</span>
      <span className="nm">{title}</span>
      <span className="ty">{category}</span>
      <span className="ar">→</span>
    </>
  );

  if (!slug) {
    return (
      <div className="pj-row" data-c={category.toLowerCase()} data-img={image} data-m="">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/projects/${slug}`} className="pj-row" data-c={category.toLowerCase()} data-img={image} data-m="">
      {content}
    </Link>
  );
}

export default function WorksWrap() {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({
    page: 1,
    limit: 100,
  });

  /*
   * IMPORTANT:
   *
   * getPublicProjects transforms the API response into:
   *
   * {
   *   success: true,
   *   data: Project[]
   * }
   *
   * Therefore:
   *
   * response.data
   *
   * is already the projects array.
   */
  const projects = response?.data ?? [];

  if (isLoading) {
    return (
      <section className="works-wrap" id="pjwrap">
        <div className="pj-grid" id="pjgrid">
          <div className="pj-loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (isError || !projects.length) {
    return (
      <section className="works-wrap" id="pjwrap">
        <div className="pj-grid" id="pjgrid">
          <div className="pj-loading">No projects available.</div>
        </div>
      </section>
    );
  }

  /*
   * Build the exact same visual order as the original
   * hardcoded component.
   *
   * 01
   * 02
   * 03
   * 04
   * 05
   * 06
   * 07
   * INTERLUDE
   * 08
   * 09
   * 10
   * 11
   * INTERLUDE
   * 12
   * 13
   * 14
   * 15
   * INTERLUDE
   * 16
   */
  const gridItems = [];

  projects.forEach((project, index) => {
    gridItems.push(<ProjectCard key={project.projectId} project={project} index={index} />);

    if (index === 6) {
      gridItems.push(
        <blockquote key="interlude-1" className="pj-inter" data-rev="">
          <span>Translating ideas into built realities through discipline, detail, and design integrity.</span>
        </blockquote>,
      );
    }

    if (index === 10) {
      gridItems.push(
        <blockquote key="interlude-2" className="pj-inter" data-rev="">
          <span>
            Shaping environments that endure beyond time and trend — clarity of form, purposeful materiality, and
            spatial intelligence.
          </span>
        </blockquote>,
      );
    }

    if (index === 14) {
      gridItems.push(
        <blockquote key="interlude-3" className="pj-inter" data-rev="">
          <span>Our process begins with listening. Good design comes from collaboration and thoughtful execution.</span>
        </blockquote>,
      );
    }
  });

  return (
    <section className="works-wrap" id="pjwrap">
      <div className="pj-grid" id="pjgrid">
        {gridItems}
      </div>

      <div className="wrap">
        <nav className="pj-list" id="pjlist">
          {projects.map((project, index) => (
            <ProjectRow key={project.projectId} project={project} index={index} />
          ))}
        </nav>
      </div>
    </section>
  );
}
