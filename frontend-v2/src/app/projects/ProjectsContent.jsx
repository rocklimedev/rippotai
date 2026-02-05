// app/projects/ProjectsContent.jsx   ← Client Component

"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetPublicProjectsQuery } from "@/app/api/rippotaiApi";

// LazyImage remains the same (can stay here or move to separate file)
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

export default function ProjectsContent() {
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");
  const normalizedCategory = urlCategory
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).toLowerCase()
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(normalizedCategory);
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  useEffect(() => {
    setSelectedCategory(normalizedCategory);
    setPage(1);
  }, [normalizedCategory]);

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

  const categories = useMemo(() => {
    const core = ["Residential", "Institutional"];
    const dynamic = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set([...core, ...dynamic])];
  }, [projects]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);

    const newParams = new URLSearchParams();
    if (category !== "All") {
      newParams.set("category", category.toLowerCase());
    }

    window.history.replaceState(null, "", `?${newParams.toString()}`);
  };

  const isContentLoading = isLoading || isFetching;

  return (
    <>
      {/* Category Filters */}
      <div className="project-filters mt-3">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
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

      {/* Load More */}
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
    </>
  );
}
