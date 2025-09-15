import React, { useState } from "react";
import interior from "../../assets/images/INTERIOR 01.jpg";
import interior2 from "../../assets/images/INTERIOR 02.jpg";
import interiorset2 from "../../assets/images/interior_set02.png";
import kitchen from "../../assets/images/kitchen.jpg";
import kitchenset2 from "../../assets/images/kitchen_set02.png";
import officeinterior from "../../assets/images/office interior.png";
import wardrobe from "../../assets/images/wadrobe.png";

const projects = [
  { type: "image", title: "Cultural Heritage Pavilion", src: interior },
  { type: "image", title: "Architectural Facade", src: interior2 },
  { type: "image", title: "Sublime Exterior", src: interiorset2 },
  {
    type: "text",
    title: "Award-Winning Retail",
    details: "Sunita Shekhawat Flagship Store",
  },
  { type: "image", title: "Nighttime Elegance", src: kitchen },
  { type: "image", title: "Luxury Retail Pavilion", src: kitchenset2 },
  { type: "image", title: "Luxury Retail Pavilion", src: officeinterior },
  { type: "image", title: "Luxury Retail Pavilion", src: wardrobe },
];

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`bento-item ${project.type}`}
            onClick={() => setSelectedProject(project)}
          >
            {project.type === "image" && (
              <img src={project.src} alt={project.title} />
            )}
            {project.type === "text" && (
              <div className="text-block">
                <h4>{project.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedProject && (
        <div
          className="project-overlay active"
          onClick={() => setSelectedProject(null)}
        >
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
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
