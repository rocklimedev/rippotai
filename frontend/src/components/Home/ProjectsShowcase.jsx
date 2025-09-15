import React, { useState } from "react";
import Masonry from "react-masonry-css";
import interior from "../../assets/images/INTERIOR 01.jpg";
import interior2 from "../../assets/images/INTERIOR 02.jpg";
import interiorset2 from "../../assets/images/interior_set02.png";
import kitchen from "../../assets/images/kitchen.jpg";
import kitchenset2 from "../../assets/images/kitchen_set02.png";
import officeinterior from "../../assets/images/office interior.png";
import wardrobe from "../../assets/images/wadrobe.png";
const projects = [
  {
    type: "image",
    title: "Cultural Heritage Pavilion",
    src: interior,
    height: "500px",
    details: "Culture India Exhibit",
  },
  {
    type: "image",
    title: "Architectural Facade",
    src: interior2,
    height: "240px",
    details: "Intricate Brick Design",
  },
  {
    type: "image",
    title: "Sublime Exterior",
    src: interiorset2,
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
    src: kitchen,
    height: "300px",
    details: "Illuminated Architectural View",
  },
  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: kitchenset2,
    height: "400px",
    details: "Winner | Retail<br>Sunita Shekhawat Flagship Store",
  },

  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: officeinterior,
    height: "400px",
    details: "Winner | Retail<br>Sunita Shekhawat Flagship Store",
  },

  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: wardrobe,
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
