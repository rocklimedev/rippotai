import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Construct query parameters for the API
  const queryParams =
    selectedCategory !== "All" ? { category: selectedCategory } : {};

  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  // Normalize projects data to ensure it's always an array
  const projectsArray = Array.isArray(projects?.data)
    ? projects.data
    : Array.isArray(projects)
    ? projects
    : [];

  // Derive unique categories from projects and include "All"
  const categories = useMemo(() => {
    const uniqueCategories = [
      "All",
      ...new Set(
        projectsArray.map((project) => project.category).filter(Boolean)
      ),
    ];
    return uniqueCategories;
  }, [projectsArray]);

  // Client-side filtering to ensure correct projects are displayed
  const filteredProjects =
    selectedCategory === "All"
      ? projectsArray
      : projectsArray.filter(
          (project) => project.category === selectedCategory
        );

  // Log for debugging
  console.log(
    "Projects:",
    projectsArray,
    "Filtered Projects:",
    filteredProjects,
    "Categories:",
    categories,
    "Loading:",
    isLoading,
    "Error:",
    error
  );

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero"></section>

      {/* Projects Section */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio, from residential masterpieces
                  to innovative product designs.
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
                  onClick={() => setSelectedCategory(category)}
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
              {isLoading ? (
                <p>Loading projects...</p>
              ) : error ? (
                <p className="no-projects">
                  Error:{" "}
                  {error?.message ||
                    error?.toString() ||
                    "Failed to load projects."}
                </p>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5"
                    key={project.slug}
                  >
                    <Link
                      to={`/project/${
                        project.slug
                      }?category=${encodeURIComponent(project.category)}`}
                      className="project-details"
                    >
                      <img
                        src={project.image || "/placeholder-image.jpg"}
                        className="project-img"
                        alt={project.title || "Project image"}
                      />
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
                          }?category=${encodeURIComponent(project.category)}`}
                          className="view-project-btn"
                        >
                          View Project
                        </Link>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="no-projects">
                  No projects available in this category. Check back soon!
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
