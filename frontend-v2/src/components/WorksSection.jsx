// src/components/WorksSection.jsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

import { useGetPublicProjectsQuery } from "@/api/projectsApi";

export const WorksSection = () => {
  const {
    data: projectsData = [],
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({ page: 1, limit: 6 });

  const projects = projectsData?.data ?? [];

  const displayedProjects = useMemo(
    () => (Array.isArray(projects) ? projects.slice(0, 6) : []),
    [projects],
  );

  if (isLoading) {
    return (
      <section style={{ backgroundColor: "#ffffff", padding: "100px 48px" }}>
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
    return null;
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
        {/* Title */}
        <AnimateIn delay={0}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "14px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#1a3c34",
              }}
            >
              WORKS
            </h2>
          </div>
        </AnimateIn>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
            gap: "48px",
          }}
        >
          {displayedProjects.map((project, idx) => (
            <AnimateIn key={project._id || project.slug} delay={0.15 * idx}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <Link href="/projects">SEE ALL PROJECTS →</Link>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [hovered, setHovered] = useState(false);

  // ✅ CACHE BUSTING FIX
  const imageSrc = `${project.image}?v=${project.updatedAt || project._id}`;

  const title = project.title || "Untitled Project";
  const slug = project.slug;

  if (!slug) return null;

  return (
    <Link
      href={`/project/${slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
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
          unoptimized // ✅ IMPORTANT: bypass Next.js cache
          style={{
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.06)" : "scale(1)",
          }}
        />
      </div>

      {/* Title */}
      <div style={{ paddingTop: "20px" }}>
        <h3 style={{ fontSize: "18px", color: "#1a3c34" }}>{title}</h3>
      </div>
    </Link>
  );
};
