// src/components/WorksSection.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

import { useGetPublicProjectsQuery } from "@/api/rippotaiApi";

export const WorksSection = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetPublicProjectsQuery(
    { page: 1, limit: 6 }, // e.g. show only 6 latest/featured on homepage — adjust as needed
    {
      // Optional: select only needed fields if your endpoint supports it
      // Or add polling/refetchOnMountOrArgChange if desired
    },
  );
  console.log(projects);
  // Optional: limit displayed projects (e.g. show 3–6 on homepage)
  const displayedProjects = useMemo(
    () => (Array.isArray(projects) ? projects.slice(0, 6) : []),
    [projects],
  );
  console.log(displayedProjects);
  if (isLoading) {
    return (
      <section
        id="works"
        style={{ backgroundColor: "#ffffff", padding: "100px 48px" }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}
        >
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#1a3c34" }}>
            Loading works...
          </p>
        </div>
      </section>
    );
  }

  if (isError || displayedProjects.length === 0) {
    return null; // or show fallback message / static cards — hide section if no data
  }

  return (
    <section
      id="works"
      style={{
        backgroundColor: "#ffffff",
        padding: "100px 48px 120px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section title */}
        <AnimateIn delay={0} distance={40} duration={1}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#1a3c34",
                margin: 0,
              }}
            >
              WORKS
            </h2>
            <div
              style={{
                width: "30px",
                height: "1px",
                backgroundColor: "#d9af61",
                margin: "16px auto 0",
              }}
            />
          </div>
        </AnimateIn>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "48px",
          }}
          className="works-grid"
        >
          {displayedProjects.map((project, idx) => (
            <AnimateIn
              key={project._id || project.slug}
              delay={0.15 * idx}
              distance={70}
              duration={1.3}
            >
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>

        {/* See all projects link */}
        <AnimateIn delay={0.6} distance={30} duration={1}>
          <div style={{ textAlign: "center", marginTop: "80px" }}>
            <Link
              href="/projects"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#1a3c34",
                textDecoration: "none",
                display: "inline-block",
                paddingBottom: "4px",
                transition: "color 0.35s ease",
              }}
              className="hover-gold"
            >
              SEE ALL PROJECTS →
            </Link>
          </div>
        </AnimateIn>
      </div>

      <style jsx>{`
        .hover-gold {
          position: relative;
        }
        .hover-gold::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background-color: #d9af61;
          transition: width 0.4s ease;
        }
        .hover-gold:hover::after {
          width: 100%;
        }
        .hover-gold:hover {
          color: #d9af61 !important;
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 24px 100px;
          }
        }
      `}</style>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  const imageSrc =
    project.image || project.images?.[0] || "/placeholder-project.jpg";
  const title = project.title || "Untitled Project";
  const slug = project.slug;

  if (!slug) return null; // skip if no slug

  return (
    <Link
      href={`/project/${slug}`}
      style={{ cursor: "pointer", textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      prefetch={true}
    >
      {/* Image container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          overflow: "hidden",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          quality={82}
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />

        {/* Subtle hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.25))",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Project info */}
      <div style={{ paddingTop: "20px" }}>
        <h3
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: "clamp(17px, 2.2vw, 19px)",
            fontWeight: 500,
            color: "#1a3c34",
            letterSpacing: "0.8px",
            margin: 0,
            position: "relative",
            display: "inline-block",
          }}
        >
          {title}
          <span
            style={{
              position: "absolute",
              bottom: "-6px",
              left: 0,
              height: "1.5px",
              backgroundColor: "#d9af61",
              width: hovered ? "100%" : "0%",
              transition: "width 0.45s ease",
            }}
          />
        </h3>
      </div>
    </Link>
  );
};
