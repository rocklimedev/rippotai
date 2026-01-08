import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get category from URL query param (e.g., ?category=residential)
  const urlCategoryParam = searchParams.get("category");

  // Normalize: "residential" → "Residential", etc.
  const normalizedUrlCategory = urlCategoryParam
    ? urlCategoryParam.charAt(0).toUpperCase() +
      urlCategoryParam.slice(1).toLowerCase()
    : null;

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sync state with URL on mount and when URL changes
  useEffect(() => {
    if (normalizedUrlCategory) {
      // Only accept valid categories (core + ones from data later)
      // We'll validate fully once data loads
      setSelectedCategory(normalizedUrlCategory);
    } else {
      setSelectedCategory("All");
    }
  }, [normalizedUrlCategory]);

  // Update URL when user clicks a filter button
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setSearchParams({}); // Clear query params → /projects
    } else {
      const slug = category.toLowerCase();
      setSearchParams({ category: slug }); // → ?category=residential
    }
  };

  // API query: only filter if not "All"
  const queryParams = useMemo(
    () => (selectedCategory !== "All" ? { category: selectedCategory } : {}),
    [selectedCategory]
  );

  const {
    data: projectsResponse,
    error,
    isLoading,
    isFetching,
  } = useGetProjectsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  // Safely extract projects
  const projectsArray = useMemo(() => {
    if (!projectsResponse) return [];
    return Array.isArray(projectsResponse.data)
      ? projectsResponse.data
      : Array.isArray(projectsResponse)
      ? projectsResponse
      : [];
  }, [projectsResponse]);

  // Always show core categories + any dynamic ones
  const categories = useMemo(() => {
    const dynamicCategories = [
      ...new Set(
        projectsArray
          .map((project) => project.category)
          .filter(Boolean)
          .filter((cat) => cat.trim() !== "")
      ),
    ];

    const coreCategories = ["Residential", "Institutional"];
    const allUnique = [...new Set([...coreCategories, ...dynamicCategories])];

    const sorted = allUnique.sort((a, b) => {
      const order = ["Residential", "Institutional"];
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });

    return ["All", ...sorted];
  }, [projectsArray]);

  // Client-side filtering fallback
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsArray;
    return projectsArray.filter(
      (project) => project.category === selectedCategory
    );
  }, [projectsArray, selectedCategory]);

  // Validate if current selectedCategory is allowed; if not, reset to All
  useEffect(() => {
    if (selectedCategory !== "All" && !categories.includes(selectedCategory)) {
      setSelectedCategory("All");
      setSearchParams({});
    }
  }, [categories, selectedCategory, setSearchParams]);

  const isContentLoading = isLoading || isFetching;

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero" />

      {/* Projects Section */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio, from residential masterpieces
                  to innovative product designs and institutional developments.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="project-filters mt-3" id="project-grid">
            {isLoading ? (
              <p>Loading categories...</p>
            ) : categories.length > 1 ? (
              categories.map((category) => (
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
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>

          {/* Project Grid */}
          <div className="project-grid mt-3">
            <div className="custom-row">
              {isContentLoading ? (
                <div className="text-center w-100 py-5">
                  <p>Loading projects...</p>
                </div>
              ) : error ? (
                <p className="no-projects text-center text-danger">
                  Error loading projects. Please try again later.
                </p>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5 project-details"
                    key={project.slug}
                  >
                    <div className="project-image-wrapper">
                      <img
                        src={project.image || "/placeholder-image.jpg"}
                        className="project-img"
                        alt={project.title || "Project"}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg";
                        }}
                      />
                    </div>
                    <div className="project-overlay">
                      <h5>{project.title || "Untitled Project"}</h5>
                      <p className="project-type">
                        {project.category || "Uncategorized"}
                      </p>
                      <p className="project-description">
                        {project.description || "No description available."}
                      </p>
                      <Link
                        to={`/project/${
                          project.slug
                        }?category=${encodeURIComponent(
                          project.category || ""
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
                  <p className="no-projects">
                    Currently there are no projects under this category.
                  </p>
                  <p className="text-muted">Check back soon for updates!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
