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

  return (
    <div className="project-detail-page">
      {/* Hero Section (Banner) - Already aligned with mockup */}
      <section className="projects-hero"></section>

      {/* Project Info Section */}
      <section className="project-info-section">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <p>
                <strong>Name of Project:</strong> {project.title}
              </p>
              <p>
                <strong>Type:</strong> {project.category}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Full-Length Banner Image */}
      <section className="project-banner-image">
        <div className="custom-container">
          <img
            src={`${project.image}`}
            alt={`${project.title} Banner`}
            className="full-width-image"
          />
        </div>
      </section>

      {/* Two Images and Details Section */}
      <section className="project-two-image-section">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-6">
              <p className="project-details">{project.details}</p>
            </div>
            <div className="custom-col-6">
              <img
                src={`${project.images?.[0] || "placeholder.png"}`}
                alt={`${project.title} - Image 1`}
                className="half-width-image"
              />
            </div>
          </div>
          <div className="custom-row">
            <div className="custom-col-6">
              <img
                src={`${project.images?.[1] || "placeholder.png"}`}
                alt={`${project.title} - Image 2`}
                className="half-width-image"
              />
            </div>
            <div className="custom-col-6">
              <p className="project-description">{project.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section (Bento Grid) */}
      {project.images?.length > 2 && (
        <section className="project-gallery">
          <div className="custom-container">
            <div className="gallery-grid">
              {project.images.slice(2).map((img, index) => (
                <img
                  src={`${img}`}
                  alt={`${project.title} - Image ${index + 3}`}
                  key={index + 2}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectDetailPage;
