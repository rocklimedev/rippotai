"use client";

import Link from "next/link";
import { useGetFeaturedProjectsQuery } from "@/api/projectsApi";
import ShowcaseBehavior from "./ShowcaseBehavior";

export default function Showcase() {
  const { data: projects = [], isLoading, isError } = useGetFeaturedProjectsQuery(6);

  if (isLoading) {
    return (
      <section className="works" id="works">
        <div className="ms-top">
          <div className="wrap">
            <Link href="/projects" data-m="" style={{ color: "var(--green)" }}>
              All projects →
            </Link>

            <span className="c">Loading</span>
          </div>
        </div>

        <div className="ms-stage" id="msstage" />
      </section>
    );
  }

  if (isError || !projects.length) {
    return (
      <section className="works" id="works">
        <div className="ms-top">
          <div className="wrap">
            <Link href="/projects" data-m="" style={{ color: "var(--green)" }}>
              All projects →
            </Link>

            <span className="c">Projects</span>
          </div>
        </div>
      </section>
    );
  }

  const firstProject = projects[0];

  return (
    <section className="works" id="works">
      <div className="ms-top">
        <div className="wrap">
          <Link href="/projects" data-m="" style={{ color: "var(--green)" }}>
            All projects →
          </Link>

          <span className="c" id="mstype">
            {firstProject.category ?? ""}
          </span>
        </div>
      </div>

      <div className="ms-stage" id="msstage">
        {projects.map((project) => {
          const name = project.title ?? "Untitled project";

          return (
            <figure
              key={project.projectId}
              className="ms-card"
              data-name={name}
              data-type={project.category ?? ""}
              data-slug={project.slug ?? ""}
              data-location={project.location ?? ""}
              data-scope={project.scope ?? ""}
            >
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={name} />
              )}
            </figure>
          );
        })}
      </div>

      <div className="ms-cap" id="mscap">
        <span className="nm" id="msname">
          {firstProject.title ?? "Untitled project"}
        </span>

        <span className="ty" id="msty">
          {firstProject.category ?? ""}
        </span>
      </div>

      <div className="ms-timer">
        <i id="mstimer" />
      </div>

      <ShowcaseBehavior />
    </section>
  );
}
