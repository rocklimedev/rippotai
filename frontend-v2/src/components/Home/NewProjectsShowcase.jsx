// src/components/Home/ProjectsShowcaseStacked.tsx
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useGetPublicProjectsQuery } from "@/app/api/rippotaiApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./projectshowcase.module.css";
const stackVariants = {
  active: (i) => ({
    scale: 1 - i * 0.055,
    y: i * 22,
    opacity: 1 - i * 0.18,
    rotate: i * 2.4,
    zIndex: 20 - i,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 24,
      mass: 0.9,
      duration: 0.55,
    },
  }),
  enter: (i) => ({
    scale: 0.94,
    y: 40,
    opacity: 0,
    rotate: -3,
  }),
  exit: {
    scale: 0.84,
    y: 80,
    opacity: 0,
    rotate: -8,
    x: -30,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const ProjectsShowcaseStacked = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({ page: 1, limit: 6 });

  const featuredProjects = useMemo(
    () => (Array.isArray(projects) ? projects.slice(0, 6) : []),
    [projects],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProjects = featuredProjects.slice(activeIndex);
  const hasNext = activeIndex < featuredProjects.length - 1;
  const hasPrev = activeIndex > 0;

  const handleNext = () => hasNext && setActiveIndex((i) => i + 1);
  const handlePrev = () => hasPrev && setActiveIndex((i) => i - 1);

  if (isLoading) {
    return (
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "#f8f8f8",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "1.125rem",
          }}
        >
          Loading featured projects...
        </p>
      </section>
    );
  }

  if (isError || featuredProjects.length === 0) {
    return (
      <section
        style={{
          padding: "5rem 1.5rem",
          background: "#f8f8f8",
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "1.125rem",
          }}
        >
          {isError ? "Failed to load projects." : "No projects to display yet."}
        </p>
      </section>
    );
  }

  return (
    <section
      style={{
        padding: "5rem 1.5rem",
        background: "#f8f8f8",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              color: "#111",
              margin: 0,
            }}
          >
            Featured Work
          </h2>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.125rem",
              color: "#555",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6,
            }}
          >
            Selected residential and institutional architecture projects
          </p>
        </div>

        {/* Card Stack */}
        <div
          style={{
            position: "relative",
            minHeight: "540px",
            marginBottom: "3rem",
          }}
          className="sm:min-h-[580px] md:min-h-[620px]"
        >
          <AnimatePresence initial={false} mode="wait">
            {visibleProjects.map((project, relIndex) => (
              <motion.div
                key={project.slug}
                custom={relIndex}
                variants={stackVariants}
                initial="enter"
                animate="active"
                exit="exit"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: "520px",
                  aspectRatio: "5 / 6",
                  borderRadius: "2rem",
                  overflow: "hidden",
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                  transformOrigin: "top center",
                }}
                className="sm:aspect-[4/5]"
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                  className="group"
                >
                  <LazyLoadImage
                    src={project.image || "/placeholder-image.jpg"}
                    alt={project.title || "Project"}
                    effect="blur"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    wrapperClassName="block w-full h-full"
                    height={620}
                    width={520}
                    threshold={300}
                    onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                    className="transition-transform duration-[1200ms] group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, transparent 100%)",
                      opacity: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1.75rem",
                      transition: "opacity 0.5s ease",
                    }}
                    className="group-hover:opacity-100 sm:p-9"
                  >
                    <h3
                      style={{
                        fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                        fontWeight: 500,
                        color: "white",
                        margin: 0,
                        letterSpacing: "-0.02em",
                        textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      {project.title}
                    </h3>

                    {project.category && (
                      <span
                        style={{
                          marginTop: "0.75rem",
                          display: "inline-block",
                          padding: "0.375rem 1rem",
                          background: "rgba(255,255,255,0.18)",
                          backdropFilter: "blur(8px)",
                          color: "white",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      >
                        {project.category}
                      </span>
                    )}

                    <Link
                      href={`/project/${project.slug}`}
                      style={{
                        marginTop: "1.5rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.875rem 1.75rem",
                        background: "white",
                        color: "#111",
                        fontWeight: 500,
                        borderRadius: "1rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        textDecoration: "none",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      className="hover:bg-[#f5f5f5] hover:-translate-y-px"
                    >
                      View Project
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          <button
            onClick={handlePrev}
            disabled={!hasPrev}
            aria-label="Previous project"
            style={{
              padding: "0.875rem",
              borderRadius: "9999px",
              background: "white",
              border: "1px solid #e5e5e5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: hasPrev ? "pointer" : "not-allowed",
              opacity: hasPrev ? 1 : 0.4,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="hover:bg-[#f9f9f9] hover:-translate-y-px disabled:hover:bg-white disabled:hover:translate-y-0"
          >
            <ChevronLeft
              style={{ width: "1.75rem", height: "1.75rem" }}
              strokeWidth={1.8}
            />
          </button>

          <span
            style={{
              fontSize: "1rem",
              fontWeight: 500,
              color: "#666",
              letterSpacing: "0.03em",
            }}
          >
            {activeIndex + 1} — {featuredProjects.length}
          </span>

          <button
            onClick={handleNext}
            disabled={!hasNext}
            aria-label="Next project"
            style={{
              padding: "0.875rem",
              borderRadius: "9999px",
              background: "white",
              border: "1px solid #e5e5e5",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: hasNext ? "pointer" : "not-allowed",
              opacity: hasNext ? 1 : 0.4,
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="hover:bg-[#f9f9f9] hover:-translate-y-px disabled:hover:bg-white disabled:hover:translate-y-0"
          >
            <ChevronRight
              style={{ width: "1.75rem", height: "1.75rem" }}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* All Projects */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link
            href="/projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "1.25rem 2.25rem",
              background: "#111",
              color: "white",
              fontWeight: 500,
              fontSize: "1.125rem",
              borderRadius: "2rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            className="hover:bg-[#222] hover:-translate-y-[2px]"
          >
            See All Projects
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcaseStacked;
