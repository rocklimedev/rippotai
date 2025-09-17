import React, { useState } from "react";
import { useGetProjectsQuery } from "../../api/rippotaiApi";
import { Link } from "react-router-dom"; // Import Link for navigation

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsQuery(
    selectedCategory !== "All" ? { category: selectedCategory } : {},
    { refetchOnMountOrArgChange: true }
  );

  const projectsArray = projects?.data || projects || [];

  console.log(
    "Projects:",
    projectsArray,
    "Loading:",
    isLoading,
    "Error:",
    error
  );

  const categories = ["All", "Residential", "Commercial"];

  const baseImageUrl = "https://static.cmtradingco.com/"; // Use the correct base URL from projects.json

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
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="project-grid mt-3">
            <div className="custom-row">
              {isLoading ? (
                <p>Loading projects...</p>
              ) : error ? (
                <p className="no-projects">
                  Error: {error.message || "Failed to load projects."}
                </p>
              ) : projectsArray.length > 0 ? (
                projectsArray.map((project) => (
                  <div
                    className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5"
                    key={project.slug} // Use slug instead of _id
                  >
                    <Link
                      to={`/project/${project.slug}`} // Link to project page using slug
                      className="project-details"
                    >
                      <img
                        src={`${project.image}`}
                        className="project-img"
                        alt={project.title}
                      />
                      <div className="project-overlay">
                        <h5>{project.title}</h5>
                        <p>{project.description}</p>
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

      {/* Testimonial Section */}
      <section className="projects-testimonial">
        <div className="custom-container">
          <h2 className="text-center">What Our Clients Say</h2>
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="testimonial">
                <p>
                  "Rippotai Architecture delivered a stunning commercial space
                  that exceeded our expectations. Their attention to detail is
                  unmatched."
                </p>
                <p className="client-name">
                  — James Carter, CEO, Innovate Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="custom-container text-center">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact Rippotai Architecture to bring your vision to life.</p>
          <Link to="/contact" className="cta-button">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
