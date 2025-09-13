import { useState } from "react";
import Masonry from "react-masonry-css"; // Ensure this is installed
import project1 from "../../assets/images/project-img.png";
import project2 from "../../assets/images/project-img-two.png";
import project3 from "../../assets/images/project-img-three.png";
import project4 from "../../assets/images/project-img-four.png";
import project5 from "../../assets/images/project-img-five.png";

const projects = [
  {
    title: "Project 1",
    image: project1,
    details:
      "Project 1: A modern office complex with sustainable design. Completed: 2024. Location: Mumbai.",
    height: "500px",
  },
  {
    title: "Project 2",
    image: project2,
    details:
      "Project 2: Luxury resort with a focus on nature. Completed: 2023. Location: Goa.",
    height: "250px",
  },
  {
    title: "Project 3",
    image: project3,
    details:
      "Project 3: Cultural center with innovative architecture. Completed: 2022. Location: Delhi.",
    height: "250px",
  },
  {
    title: "Project 4",
    image: project4,
    details:
      "Project 4: Residential tower with green spaces. Completed: 2025. Location: Bangalore.",
    height: "350px",
  },
  {
    title: "Project 5",
    image: project5,
    details:
      "Project 5: Commercial plaza with unique facade. Completed: 2024. Location: Hyderabad.",
    height: "350px",
  },
];

const ProjectsShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
  };

  // Masonry breakpoint columns
  const breakpointColumnsObj = {
    default: 3, // 3 columns by default
    1100: 2, // 2 columns at 1100px and below
    700: 1, // 1 column at 700px and below
  };

  return (
    <section className="projects-showcase">
      <div className="intro-text">
        <h3>Asna Architectural Firm</h3>
        <p>
          We are an interdisciplinary team that aspires to craft spaces that
          address the emerging future of work, leisure, and living, and the
          manner in which we build. Recognized among the 100 Best Architecture
          Firms in the World.
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
            className="bento-item"
            style={{ height: project.height }}
            onClick={() => handleProjectClick(project)}
          >
            <img
              src={project.image}
              alt={project.title}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
            <div className="project-overlay-text">{project.title}</div>
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
            <p>{selectedProject.details}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsShowcase;
