"use client";

import Link from "next/link";

import EndZone from "@/components/site/EndZone";
import SplitHeading from "@/components/site/SplitHeading";

import Behavior from "@/components/sections/project/Behavior";
import ProjectGallery from "@/components/sections/project/ProjectGallery";
import ProjectLightbox from "@/components/sections/project/ProjectLightbox";
import ProjectNext from "@/components/sections/project/ProjectNext";

import { useGetProjectBySlugQuery, useGetPublicProjectsQuery } from "@/api/projectsApi";

export default function ProjectPageClient({ slug }: { slug: string }) {
  /*
   * Primary project request.
   */
  const { data: project, isLoading, isError } = useGetProjectBySlugQuery(slug);

  /*
   * Public list is used only for previous/next navigation
   * and the project counter.
   */
  const { data: publicProjectsResponse } = useGetPublicProjectsQuery({
    page: 1,
    limit: 100,
  });

  const projects = publicProjectsResponse?.data ?? [];

  /*
   * Loading state.
   */
  if (isLoading) {
    return (
      <main className="project-loading">
        <div className="wrap">
          <p>Loading project…</p>
        </div>
      </main>
    );
  }

  /*
   * API failure / project not found.
   */
  if (isError || !project) {
    return (
      <main className="project-error">
        <div className="wrap">
          <Link href="/projects">← All projects</Link>

          <h1>Project not found</h1>

          <p>The project you're looking for could not be found.</p>
        </div>
      </main>
    );
  }

  /*
   * Find current project inside the same public
   * project ordering used by the projects page.
   */
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);

  /*
   * Fallback to the first position if the
   * public listing hasn't arrived yet.
   */
  const index = projectIndex >= 0 ? projectIndex : 0;

  const total = projects.length > 0 ? projects.length : 1;

  /*
   * Circular previous / next navigation.
   */
  const prev = projects.length > 1 ? projects[(index - 1 + projects.length) % projects.length] : project;

  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : project;

  /*
   * API images.
   *
   * The banner should not be duplicated inside
   * the gallery.
   */
  const gallery = (project.images ?? []).filter((src) => Boolean(src) && src !== project.banner);

  /*
   * ProjectGallery previously expected:
   *
   *   gallery: string[]
   *   details: string[]
   *
   * The API currently provides:
   *
   *   description
   *   moreDetails
   *
   * So convert those into the editorial
   * paragraph array expected by the gallery.
   */
  const details = [project.description, project.moreDetails].filter((value): value is string =>
    Boolean(value && value.trim().length > 0),
  );

  const story = {
    ...project,
    gallery,
    details,
  };

  return (
    <>
      {/* =====================================================
          PROJECT BANNER
      ====================================================== */}

      <section className="pg-banner pd-banner" id="top-anchor">
        <div className="bimg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.banner || project.image || ""} alt="" data-fallback="remove" />
        </div>

        <div className="bin">
          <div className="wrap">
            <div>
              <span className="k">
                {project.category || "Project"}

                {" · "}

                {project.location || ""}
              </span>

              <SplitHeading id="h1" text={project.title} step={0.08} />
            </div>

            <div className="bmeta">
              <b>
                {String(index + 1).padStart(2, "0")}

                {" / "}

                {String(total).padStart(2, "0")}
              </b>

              {project.scope || ""}

              <br />

              <span className="cue">
                <i />
                Scroll
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="pd-intro">
        <div className="wrap">
          <div className="pd-lead">
            <Link href="/projects" className="pd-back" data-m="" data-rev="">
              ← All projects
            </Link>

            <p data-rev="">{project.description || ""}</p>
          </div>

          <dl className="pd-facts" data-rev="">
            <div>
              <dt>Location</dt>

              <dd>{project.location || "—"}</dd>
            </div>

            <div>
              <dt>Typology</dt>

              <dd>{project.category || "—"}</dd>
            </div>

            <div>
              <dt>Scope</dt>

              <dd>{project.scope || "—"}</dd>
            </div>

            <div>
              <dt>Status</dt>

              <dd>{project.status || "—"}</dd>
            </div>

            <div>
              <dt>Images</dt>

              <dd>{gallery.length}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* =====================================================
          GALLERY
      ====================================================== */}

      <ProjectGallery project={story} />

      {/* =====================================================
          NEXT / PREVIOUS
      ====================================================== */}

      {projects.length > 1 && <ProjectNext prev={prev} next={next} />}

      {/* =====================================================
          END ZONE
      ====================================================== */}

      <EndZone
        id="endz"
        image={project.banner || project.image || ""}
        imageAlt={project.title}
        title={
          <>
            Imagine yours <em>next.</em>
          </>
        }
        href="/contact"
        label="Start a project"
      />

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      <ProjectLightbox images={gallery} name={project.title} />

      {/* =====================================================
          PAGE BEHAVIOUR
      ====================================================== */}

      <Behavior />
    </>
  );
}
