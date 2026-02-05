// src/app/projects/page.jsx   ← recommended file location for /projects route

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetPublicProjectsQuery } from "@/app/api/rippotaiApi"; // adjust path if needed

/* ---------------- Lazy Image Component ---------------- */
const LazyImage = React.memo(({ src, alt }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="project-image-wrapper">
      {visible && (
        <img
          src={src}
          alt={alt}
          className="project-img"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg";
          }}
        />
      )}
    </div>
  );
});

/* ---------------- Main Projects Page ---------------- */
export default function ProjectsPage() {
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");
  const normalizedCategory = urlCategory
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).toLowerCase()
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(normalizedCategory);
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  // Sync URL → state when category in URL changes
  useEffect(() => {
    setSelectedCategory(normalizedCategory);
    setPage(1);
  }, [normalizedCategory]);

  // Build query params for RTK Query
  const queryParams = useMemo(
    () => ({
      page,
      limit: LIMIT,
      ...(selectedCategory !== "All" && { category: selectedCategory }),
    }),
    [page, selectedCategory],
  );

  const {
    data: projects = [],
    error,
    isLoading,
    isFetching,
  } = useGetPublicProjectsQuery(queryParams);

  // Derive available categories (core + dynamic from data)
  const categories = useMemo(() => {
    const core = ["Residential", "Institutional"];
    const dynamic = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set([...core, ...dynamic])];
  }, [projects]);

  // Update category + reset page + update URL
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);

    // Update URL search params
    const newParams = new URLSearchParams();
    if (category !== "All") {
      newParams.set("category", category.toLowerCase());
    }

    // Use replace to avoid adding to history stack unnecessarily
    window.history.replaceState(null, "", `?${newParams.toString()}`);
  };

  const isContentLoading = isLoading || isFetching;

  return (
    <div className="projects-page">
      {/* Hero Section (empty or add background/image if needed) */}
      <section className="projects-hero" />

      {/* Main Content */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio across residential and
                  institutional developments.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="project-filters mt-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(category)}
                disabled={isFetching}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="project-grid mt-3">
            <div className="custom-row">
              {isContentLoading && page === 1 ? (
                <div className="text-center w-100 py-5">
                  <p>Loading projects...</p>
                </div>
              ) : error ? (
                <p className="text-danger text-center w-100">
                  Failed to load projects. Please try again later.
                </p>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.slug}
                    className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5 project-details"
                  >
                    <LazyImage
                      src={project.image || "/placeholder-image.jpg"}
                      alt={project.title || "Project image"}
                    />

                    <div className="project-overlay">
                      <h5>{project.title}</h5>
                      <p className="project-type">{project.category}</p>

                      <Link
                        href={`/project/${project.slug}`}
                        className="view-project-btn"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100 py-5">
                  <p>No projects found in this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Load More Button */}
          {projects.length === LIMIT && !isContentLoading && (
            <div className="text-center mt-5">
              <button
                className="view-project-btn"
                disabled={isFetching}
                onClick={() => setPage((p) => p + 1)}
              >
                {isFetching ? "Loading more..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
