import React, { useState } from "react";
import Masonry from "react-masonry-css";

const projects = [
  {
    type: "image",
    title: "Cultural Heritage Pavilion",
    src: "/assets/projects/building1.jpg",
    height: "500px",
    details: "Culture India Exhibit",
  },
  {
    type: "image",
    title: "Architectural Facade",
    src: "/assets/projects/detail1.jpg",
    height: "240px",
    details: "Intricate Brick Design",
  },
  {
    type: "image",
    title: "Sublime Exterior",
    src: "/assets/projects/exterior1.jpg",
    height: "240px",
    details: "Daylight Perspective",
  },
  {
    type: "text",
    title: "Award-Winning Retail",
    details: "Sunita Shekhawat Flagship Store",
    height: "200px",
    bgColor: "#f8f1e9",
  },
  {
    type: "image",
    title: "Nighttime Elegance",
    src: "/assets/projects/building3.jpg",
    height: "300px",
    details: "Illuminated Architectural View",
  },
  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: "/assets/projects/building2.jpg",
    height: "400px",
    details: "Winner | Retail<br>Sunita Shekhawat Flagship Store",
  },
];

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = (e) => {
    e.stopPropagation();
    setSelectedProject(null);
  };

  const breakpointColumnsObj = {
    default: 2,
    1100: 1,
    700: 1,
  };

  return (
    <section className="projects-showcase">
      <div className="intro-text">
        <h3>Asna Architectural Firm</h3>
        <p>
          Pioneers in crafting visionary spaces for the future of work, leisure,
          and living. Recognized among the 100 Best Architecture Firms globally.
        </p>
      </div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="bento-grid"
        columnClassName="masonry-column"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className={`bento-item ${project.type}`}
            style={{
              height: project.height,
              backgroundColor: project.bgColor || "transparent",
            }}
            onClick={() => handleProjectClick(project)}
          >
            {project.type === "image" && (
              <img
                src={project.src}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            {project.type === "text" && (
              <div className="text-block">
                <h4>{project.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
            )}
            {project.type === "image" && (
              <div className="project-overlay-text">{project.title}</div>
            )}
          </div>
        ))}
      </Masonry>

      {selectedProject && (
        <div className="project-overlay active" onClick={handleCloseOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={handleCloseOverlay}>
              &times;
            </span>
            <h3>{selectedProject.title}</h3>
            {selectedProject.details && (
              <p
                dangerouslySetInnerHTML={{ __html: selectedProject.details }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
