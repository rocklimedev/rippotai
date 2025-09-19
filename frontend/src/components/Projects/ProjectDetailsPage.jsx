import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetProjectBySlugQuery } from "../../api/rippotaiApi";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { data: project, error, isLoading } = useGetProjectBySlugQuery(slug);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Open modal with the clicked image
  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navigate to previous image
  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  // Navigate to next image
  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

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
      {/* Hero Section (Banner) */}
      <section className="project-hero">
        <img src={project.image} alt="" />
      </section>

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
                onClick={() => openModal(1)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="custom-row">
            <div className="custom-col-6">
              <img
                src={`${project.images?.[1] || "placeholder.png"}`}
                alt={`${project.title} - Image 2`}
                className="half-width-image"
                onClick={() => openModal(2)}
                style={{ cursor: "pointer" }}
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
                  key={index}
                  className={`gallery-image item-${index + 1}`}
                  style={{ gridArea: `item${index + 1}`, cursor: "pointer" }}
                  onClick={() => openModal(index + 2)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Modal Gallery */}
      {isModalOpen && (
        <div className="modal-gallery">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content">
            <img
              src={`${project.images[selectedImageIndex] || project.image}`}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="modal-image"
            />
            <div className="modal-toolbar">
              <button onClick={prevImage} className="modal-nav-button">
                &larr; Prev
              </button>
              <span>
                {selectedImageIndex + 1} / {project.images?.length || 1}
              </span>
              <button onClick={nextImage} className="modal-nav-button">
                Next &rarr;
              </button>
              <button onClick={closeModal} className="modal-close-button">
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
