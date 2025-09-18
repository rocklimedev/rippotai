import React from "react";
import lawyer from "../../assets/images/projects/lawyers_office/MAIN 1.png";
import banga from "../../assets/images/projects/02 C1- Banga Residence/op-1/op-1 v1.png";
import kohli from "../../assets/images/projects/kohli/LR 3.png";
import gk from "../../assets/images/projects/d54-gk/L2.png";
import gkm53 from "../../assets/images/projects/gkm-53/banner.png";
import gurugram from "../../assets/images/projects/gurugram/banner.png";
import pitampura from "../../assets/images/projects/7_KP-18 Pitampura Residence/Facade/OP 3/1.png";

const projects = [
  {
    type: "image",
    title: "Cultural Heritage Pavilion",
    src: lawyer,
    details: "sfddsfsdfsdfsdfSDfsdafsadf",
    slug: "cultural-heritage",
  },
  {
    type: "image",
    title: "Architectural Facade",
    src: banga,
    slug: "architectural-facade",
  },
  {
    type: "image",
    title: "Sublime Exterior",
    src: kohli,
    slug: "sublime-exterior",
  },
  {
    type: "text",
    title: "Award-Winning Retail",
    details: "Sunita Shekhawat Flagship Store",
    slug: "award-winning-retail",
  },
  {
    type: "image",
    title: "Nighttime Elegance",
    src: gk,
    slug: "nighttime-elegance",
  },
  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: gkm53,
    slug: "luxury-retail-1",
  },
  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: gurugram,
    slug: "luxury-retail-2",
  },
  {
    type: "image",
    title: "Luxury Retail Pavilion",
    src: pitampura,
    slug: "luxury-retail-3",
  },
];

const ProjectsShowcase = () => {
  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`bento-item ${project.type} item-${index + 1}`}
          >
            {project.type === "image" && (
              <img src={project.src} alt={project.title} />
            )}
            {project.type === "text" && (
              <div className="text-block">
                <h4>{project.title}</h4>
                <span>{project.category}</span>
                <p dangerouslySetInnerHTML={{ __html: project.details }} />
              </div>
            )}
            {project.type === "image" && (
              <div className="project-overlay">
                <h5>{project.title}</h5>
                {project.details && <p>{project.details}</p>}
                <a
                  href={`/project/${project.slug}`}
                  className="view-project-btn"
                >
                  View Project
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
