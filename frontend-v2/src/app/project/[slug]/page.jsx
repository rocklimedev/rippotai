// src/app/projects/[slug]/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { use } from "react"; // ← important import
import { useGetProjectBySlugQuery } from "@/app/api/rippotaiApi"; // adjust path if needed

export default function ProjectDetailPage({ params }) {
  // Unwrap the params promise
  const { slug } = use(params);

  const { data: project, error, isLoading } = useGetProjectBySlugQuery(slug);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index) => {
    if (!project?.images || project.images.length === 0) return;
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
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

  if (error || !project) {
    return (
      <div className="project-detail-page">
        <div className="custom-container">
          <p>{error?.message || "Project not found or failed to load."}</p>
          <Link href="/projects" className="back-button">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Hero / Banner */}
      <section className="project-hero">
        <img
          src={project.image || "/placeholder.png"}
          alt={project.title || "Project hero image"}
        />
      </section>

      {/* Basic Info */}
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
              {project.location && (
                <p>
                  <strong>Location:</strong> {project.location}
                </p>
              )}
              {project.scope && (
                <p>
                  <strong>Scope:</strong> {project.scope}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Two images + details */}
      <section className="project-two-image-section">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-6">{project.details}</div>
            <div className="custom-col-6">
              <img
                src={project.images?.[0] || "/placeholder.png"}
                alt={`${project.title} - Image 1`}
                className="half-width-image"
                onClick={() => openModal(0)}
                style={{ cursor: project.images?.[0] ? "pointer" : "default" }}
              />
            </div>
          </div>

          <div className="custom-row">
            <div className="custom-col-6">
              <img
                src={project.images?.[1] || "/placeholder.png"}
                alt={`${project.title} - Image 2`}
                className="half-width-image"
                onClick={() => openModal(1)}
                style={{ cursor: project.images?.[1] ? "pointer" : "default" }}
              />
            </div>
            <div className="custom-col-6">{project.description}</div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images?.length > 2 && (
        <section className="project-gallery">
          <div className="custom-container">
            <div className="gallery-grid">
              {project.images.slice(2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${project.title} - Gallery image ${index + 3}`}
                  className={`gallery-image ${index === 0 ? "large-image" : ""}`}
                  onClick={() => openModal(index + 2)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Modal */}
      {isModalOpen && project.images && project.images.length > 0 && (
        <div className="modal-gallery">
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-content">
            <img
              src={project.images[selectedImageIndex]}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="modal-image"
            />

            <div className="modal-toolbar">
              <button onClick={prevImage} className="modal-nav-button">
                ← Prev
              </button>

              <span>
                {selectedImageIndex + 1} / {project.images.length}
              </span>

              <button onClick={nextImage} className="modal-nav-button">
                Next →
              </button>

              <button onClick={closeModal} className="modal-close-button">
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
