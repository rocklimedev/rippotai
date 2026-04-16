"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

import { useGetFeaturedProjectsQuery } from "@/api/projectsApi";

export const WorksSection = () => {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetFeaturedProjectsQuery(6); // Request max 6 from API

  // Filter: Only featured projects with priority > 0 (no zero priority projects)
  const rawProjects = projectsData?.data ?? [];

  const projects = rawProjects
    .filter(
      (project) => project.featured === true && (project.priority ?? 0) > 0,
    )
    .slice(0, 6); // Strict limit to 6 projects

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <section style={{ backgroundColor: "#ffffff", padding: "80px 20px" }}>
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

  // Hide section if no valid projects after filtering
  if (isError || projects.length === 0) {
    return null;
  }

  return (
    <section
      id="works"
      style={{
        backgroundColor: "#ffffff",
        padding: isMobile ? "80px 20px 100px" : "100px 48px 120px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Section Title */}
        <AnimateIn delay={0}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "50px" : "80px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: isMobile ? "12px" : "14px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#1a3c34",
                fontWeight: 500,
              }}
            >
              WORKS
            </h2>
          </div>
        </AnimateIn>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? "24px" : "48px",
          }}
        >
          {projects.map((project, idx) => (
            <AnimateIn key={project._id || project.slug} delay={0.08 * idx}>
              <ProjectCard project={project} isMobile={isMobile} />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ textAlign: "center", marginTop: isMobile ? "50px" : "80px" }}
        >
          <Link
            href="/projects"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "15px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#1a3c34",
              textDecoration: "none",
              borderBottom: "2px solid #1a3c34",
              paddingBottom: "4px",
            }}
          >
            SEE ALL PROJECTS →
          </Link>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isMobile }) => {
  const [hovered, setHovered] = useState(false);

  const imageSrc = project.image
    ? `${project.image}?v=${project.updatedAt || Date.now()}`
    : project.images?.[0]
      ? `${project.images[0]}?v=${project.updatedAt || Date.now()}`
      : "/placeholder.jpg";

  const title = project.title || "Untitled Project";
  const slug = project.slug;

  if (!slug) return null;

  return (
    <Link
      href={`/project/${slug}`}
      style={{ textDecoration: "none", color: "inherit" }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      {/* Image Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          minHeight: isMobile ? "220px" : "auto",
          overflow: "hidden",
          borderRadius: "8px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
          unoptimized
          style={{
            objectFit: "cover",
            transition: "transform 0.6s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      </div>

      {/* Title */}
      <div style={{ paddingTop: "18px" }}>
        <h3
          style={{
            fontSize: isMobile ? "16px" : "18px",
            color: "#1a3c34",
            lineHeight: "1.35",
            fontWeight: 600,
            letterSpacing: "-0.2px",
          }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};
