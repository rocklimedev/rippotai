// src/components/WorksSection.jsx
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
  } = useGetFeaturedProjectsQuery(6);

  const projects = projectsData?.data ?? [];

  // Responsive check
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        {/* Title */}
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
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: isMobile ? "24px" : "48px",
          }}
        >
          {projects.map((project, idx) => (
            <AnimateIn key={project._id || project.slug} delay={0.1 * idx}>
              <ProjectCard project={project} isMobile={isMobile} />
            </AnimateIn>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{ textAlign: "center", marginTop: isMobile ? "50px" : "80px" }}
        >
          <Link href="/projects">SEE ALL PROJECTS →</Link>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, isMobile }) => {
  const [hovered, setHovered] = useState(false);

  const imageSrc = `${project.image}?v=${project.updatedAt || project._id}`;
  const title = project.title || "Untitled Project";
  const slug = project.slug;

  if (!slug) return null;

  return (
    <Link
      href={`/project/${slug}`}
      style={{ textDecoration: "none" }}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          minHeight: isMobile ? "220px" : "auto",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          quality={82}
          unoptimized
          style={{
            objectFit: "cover",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.03)" : "scale(1)",
          }}
        />
      </div>

      {/* Title */}
      <div style={{ paddingTop: "16px" }}>
        <h3
          style={{
            fontSize: isMobile ? "16px" : "18px",
            color: "#1a3c34",
            lineHeight: "1.4",
          }}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
};
