// app/projects/page.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "../../components/AnimateIn";
import { useGetPublicProjectsQuery } from "@/api/rippotaiApi";

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6; // matches your API example (you can make this configurable later)

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetPublicProjectsQuery(
    { page: currentPage, limit },
    {
      keepUnusedDataFor: 60,
    },
  );

  const projects = apiResponse?.data ?? [];
  const pagination = apiResponse?.pagination ?? {
    page: 1,
    limit,
    total: 0,
    pages: 1,
  };

  const totalPages = pagination.pages || 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (hasPrevious) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {/* Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh", // 🔥 full screen
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
        data-testid="works-banner"
      >
        {/* Image */}
        <img
          src="/assets/projects_banner.jpeg"
          alt="Our Projects"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
            pointerEvents: "none",
          }}
        />

        {/* Heading */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "48px",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Our Projects
          </h1>

          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#d9af61",
              marginTop: "20px",
            }}
          />
        </div>
      </section>
      {/* Intro Text */}
      <section style={{ padding: "80px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={30} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666666",
                lineHeight: 1.8,
                maxWidth: "600px",
                margin: 0,
              }}
            >
              A curated selection of our work across architecture, interiors,
              and furniture design — each project shaped by precision, purpose,
              and the enduring simplicity of the cube.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Projects Grid + Pagination */}
      <section style={{ padding: "0 48px 120px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "120px 0",
                fontFamily: "'Lato', sans-serif",
                color: "#1a3c34",
                fontSize: "18px",
              }}
            >
              Loading projects...
            </div>
          ) : isError ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#d32f2f",
                fontSize: "16px",
              }}
            >
              <p>Failed to load projects.</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {error?.data?.message || error?.message || "Unknown error"}
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 0",
                color: "#666",
                fontSize: "17px",
              }}
            >
              No projects found at the moment.
            </div>
          ) : (
            <>
              {/* Project Rows */}
              {projects.map((project, idx) => (
                <AnimateIn
                  key={project._id || project.slug}
                  delay={0.1 * idx}
                  distance={70}
                  duration={1.3}
                >
                  <ProjectRow project={project} reverse={idx % 2 !== 0} />
                </AnimateIn>
              ))}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "32px",
                    marginTop: "100px",
                    fontFamily: "'Lato', sans-serif",
                  }}
                >
                  <button
                    onClick={handlePrevious}
                    disabled={!hasPrevious || isLoading}
                    style={{
                      padding: "12px 28px",
                      backgroundColor: hasPrevious ? "#1a3c34" : "#e8ecef",
                      color: hasPrevious ? "#ffffff" : "#999999",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: 500,
                      cursor: hasPrevious ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ← Previous
                  </button>

                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "#1a3c34",
                    }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNext}
                    disabled={!hasNext || isLoading}
                    style={{
                      padding: "12px 28px",
                      backgroundColor: hasNext ? "#1a3c34" : "#e8ecef",
                      color: hasNext ? "#ffffff" : "#999999",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "15px",
                      fontWeight: 500,
                      cursor: hasNext ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function ProjectRow({ project, reverse }) {
  const displayImage =
    project.image || project.images?.[0] || "/placeholder-project.jpg";

  const displayDesc =
    project.description?.substring(0, 160) ||
    "A thoughtful integration of form and function, designed to resonate with those who inhabit the space — reflecting the cube's clarity and versatility.";

  return (
    <Link
      href={`/project/${project.slug}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      prefetch={true}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: reverse ? "1fr 1.4fr" : "1.4fr 1fr",
          gap: "60px",
          alignItems: "center",
          marginBottom: "100px",
          cursor: "pointer",
        }}
        className="project-row-grid"
      >
        {/* Image Column */}
        <div style={{ overflow: "hidden", order: reverse ? 2 : 1 }}>
          <Image
            src={displayImage}
            alt={project.title || "Project image"}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 58vw"
            quality={85}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
            className="project-hover-zoom"
          />
        </div>

        {/* Text Column */}
        <div style={{ order: reverse ? 1 : 2, padding: "20px 0" }}>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#d9af61",
              marginBottom: "16px",
            }}
          >
            {project.category ? project.category.toUpperCase() : "PROJECT"}
          </div>

          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400,
              color: "#1a3c34",
              letterSpacing: "1px",
              lineHeight: 1.3,
              margin: 0,
              marginBottom: "20px",
              position: "relative",
              display: "inline-block",
            }}
          >
            {project.title}
            <span
              style={{
                position: "absolute",
                bottom: "-6px",
                left: 0,
                height: "1px",
                backgroundColor: "#d9af61",
                width: "0%",
                transition: "width 0.5s ease",
              }}
              className="underline-expand"
            />
          </h2>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              color: "#666666",
              lineHeight: 1.9,
              margin: 0,
              maxWidth: "400px",
            }}
          >
            {displayDesc}
          </p>

          <div
            style={{
              marginTop: "32px",
              fontFamily: "'Lato', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#1a3c34",
              transition: "color 0.3s ease",
            }}
            className="view-project-text"
          >
            VIEW PROJECT →
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-row-grid:hover .project-hover-zoom {
          transform: scale(1.04);
        }
        .project-row-grid:hover .underline-expand {
          width: 100% !important;
        }
        .project-row-grid:hover .view-project-text {
          color: #d9af61 !important;
        }
      `}</style>
    </Link>
  );
}
