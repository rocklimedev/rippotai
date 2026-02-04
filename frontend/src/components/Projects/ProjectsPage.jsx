import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetPublicProjectsQuery } from "../../api/rippotaiApi";

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
    return () => observer.disconnect();
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

/* ---------------- Main Page ---------------- */
const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get("category");
  const normalizedCategory = urlCategory
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).toLowerCase()
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(normalizedCategory);
  const [page, setPage] = useState(1);
  const LIMIT = 6;

  /* Sync URL → state */
  useEffect(() => {
    setSelectedCategory(normalizedCategory);
    setPage(1);
  }, [normalizedCategory]);

  /* Query params */
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

  /* Build categories from loaded data */
  const categories = useMemo(() => {
    const core = ["Residential", "Institutional"];
    const dynamic = projects.map((p) => p.category).filter(Boolean);

    return ["All", ...new Set([...core, ...dynamic])];
  }, [projects]);

  /* Handle category click */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1);

    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: category.toLowerCase() });
    }
  };

  const isContentLoading = isLoading || isFetching;

  return (
    <div className="projects-page">
      {/* Hero */}
      <section className="projects-hero" />

      {/* Content */}
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

          {/* Filters */}
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

          {/* Grid */}
          <div className="project-grid mt-3">
            <div className="custom-row">
              {isContentLoading && page === 1 ? (
                <div className="text-center w-100 py-5">
                  <p>Loading projects...</p>
                </div>
              ) : error ? (
                <p className="text-danger text-center w-100">
                  Failed to load projects.
                </p>
              ) : projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project.slug}
                    className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5 project-details"
                  >
                    <LazyImage
                      src={project.image || "/placeholder-image.jpg"}
                      alt={project.title}
                    />

                    <div className="project-overlay">
                      <h5>{project.title}</h5>
                      <p className="project-type">{project.category}</p>

                      {/* KEEP LISTING LIGHT */}
                      <Link
                        to={`/project/${project.slug}?category=${encodeURIComponent(
                          project.category || "",
                        )}`}
                        className="view-project-btn"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100 py-5">
                  <p>No projects available.</p>
                </div>
              )}
            </div>
          </div>

          {/* Load More */}
          {projects.length === LIMIT && (
            <div className="text-center mt-5">
              <button
                className="view-project-btn"
                disabled={isFetching}
                onClick={() => setPage((p) => p + 1)}
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
