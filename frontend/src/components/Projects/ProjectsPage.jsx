import React, { useState } from "react";
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch projects using the useGetProjectsQuery hook
  const {
    data: projects,
    error,
    isLoading,
  } = useGetProjectsQuery(
    selectedCategory !== "All" ? { category: selectedCategory } : {},
    { refetchOnMountOrArgChange: true }
  );

  // Handle nested data or fallback to empty array
  const projectsArray = projects?.data || projects || [];

  console.log(
    "Projects:",
    projectsArray,
    "Loading:",
    isLoading,
    "Error:",
    error
  );

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Interiors",
    "Furniture",
  ];

  const openProjectModal = (project) => {
    console.log("Selected project:", project);
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // Base URL for images (update with your actual base URL)
  const baseImageUrl = "https://your-api.com/images/"; // Replace with actual URL

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-overlay">
          <h1>Our Portfolio</h1>
          <p>
            Discover how Rippotai Architecture shapes spaces with balance,
            innovation, and harmony.
          </p>
          <a href="#project-grid" className="cta-button">
            Explore Projects
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio, from residential masterpieces
                  to innovative furniture designs.
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
                    key={project._id}
                  >
                    <div
                      className="project-details"
                      onClick={() => openProjectModal(project)}
                    >
                      <img
                        src={`${baseImageUrl}${project.image}`}
                        className="project-img"
                        alt={project.title}
                      />
                      <div className="project-overlay">
                        <h5>{project.title}</h5>
                        <p>{project.description}</p>
                      </div>
                    </div>
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

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeProjectModal}>
              &times;
            </span>
            <h3>{selectedProject.title}</h3>
            <img
              src={`${baseImageUrl}${selectedProject.image}`}
              alt={selectedProject.title}
              className="modal-image"
            />
            <p>{selectedProject.details}</p>
            {selectedProject.images?.length > 0 && (
              <div className="modal-gallery">
                {selectedProject.images.map((img, index) => (
                  <img
                    src={`${baseImageUrl}${img}`}
                    alt={`${selectedProject.title} ${index + 1}`}
                    key={index}
                  />
                ))}
              </div>
            )}
            <a href="/contact" className="cta-button">
              Contact Us for Similar Projects
            </a>
          </div>
        </div>
      )}

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
          <a href="/contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
