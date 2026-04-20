"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "./AnimateIn";

import { useGetPublicProjectsQuery } from "@/api/projectsApi";

export const WorksSection = () => {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({
    page: 1,
    limit: 20,
  });

  const rawProjects = projectsData?.data ?? [];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ ONLY CATEGORY FILTER HERE
  const projects = rawProjects
    .filter((project) => {
      const matchesCategory = !selectedCategory
        ? true
        : project.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchesCategory;
    })

    // ✅ FEATURED FIRST + PRIORITY SORT
    .sort((a, b) => {
      const aFeatured = a.featured ? 1 : 0;
      const bFeatured = b.featured ? 1 : 0;

      if (aFeatured !== bFeatured) return bFeatured - aFeatured;

      return (a.priority ?? 0) - (b.priority ?? 0);
    })

    // ✅ HOME LIMIT
    .slice(0, 6);

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

  if (isError) return null;

  return (
    <section
      id="works"
      style={{
        backgroundColor: "#ffffff",
        padding: isMobile ? "80px 20px 100px" : "100px 48px 120px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* TITLE */}
        <AnimateIn delay={0}>
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "30px" : "40px",
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

        {/* FILTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: isMobile ? "30px" : "60px",
          }}
        >
          {["Residential", "Commercial", "Institutional", "Hospitality"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory((prev) => (prev === cat ? null : cat))
                }
                style={{
                  flex: isMobile ? "1 1 45%" : "1",
                  padding: "10px 14px",
                  backgroundColor: "transparent", // removed green background
                  color: selectedCategory === cat ? "#c6a15b" : "#1a3c34",
                  cursor: "pointer",
                  fontSize: "13px",
                  letterSpacing: "1px",
                  textAlign: "center",
                  border: "none",
                  borderBottom:
                    selectedCategory === cat
                      ? "2px solid #c6a15b"
                      : "2px solid transparent",
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? "24px" : "48px",
          }}
        >
          {projects.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              NO PROJECTS FOUND
            </div>
          ) : (
            projects.map((project, idx) => (
              <AnimateIn key={project._id || project.slug} delay={0.08 * idx}>
                <ProjectCard project={project} isMobile={isMobile} />
              </AnimateIn>
            ))
          )}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? "50px" : "80px",
          }}
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
            }}
          >
            SEE ALL PROJECTS →
          </Link>
        </div>
      </div>
    </section>
  );
};
/* =========================
   PROJECT CARD
========================= */

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
