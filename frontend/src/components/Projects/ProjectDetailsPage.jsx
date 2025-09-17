import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProjectBySlugQuery } from "../../api/rippotaiApi";
const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { data: project, error, isLoading } = useGetProjectBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="project-detail-page">
        <div className="custom-container">
          <p>Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-page">
        <div className="custom-container">
          <p>Error: {error.message || "Failed to load project."}</p>
          <Link to="/projects" className="back-button">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="custom-container">
          <p>Project not found.</p>
          <Link to="/projects" className="back-button">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const baseImageUrl = "https://static.cmtradingco.com/";

  return (
    <div className="project-detail-page">
      <section className="projects-hero"></section>
      {/* Hero Section */}
      <section
        className="project-hero"
        style={{
          backgroundImage: `url(${baseImageUrl}${project.image})`,
        }}
      >
        <div className="hero-overlay">
          <h1>{project.title}</h1>
          <p>{project.category}</p>
        </div>
      </section>

      {/* Project Details Section */}
      <section className="project-details-section">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <h2>{project.title}</h2>
              <p className="project-description">{project.description}</p>
              <p className="project-details">{project.details}</p>
            </div>
          </div>

          {/* Gallery Section */}
          {project.images?.length > 0 && (
            <div className="project-gallery">
              <h3>Project Gallery</h3>
              <div className="gallery-grid">
                {project.images.map((img, index) => (
                  <img
                    src={`${img}`}
                    alt={`${project.title} - Image ${index + 1}`}
                    key={index}
                    className="gallery-image"
                  />
                ))}
              </div>
            </div>
          )}

          {/* CTA and Navigation */}
          <div className="project-actions">
            <Link to="/contact" className="cta-button">
              Contact Us for Similar Projects
            </Link>
            <Link to="/projects" className="back-button">
              Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
