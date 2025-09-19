import React from "react";
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsShowcase = () => {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  if (isLoading) {
    return <section className="projects-showcase">Loading projects...</section>;
  }

  if (isError) {
    return (
      <section className="projects-showcase">
        Error:{" "}
        {error?.message || error?.toString() || "Failed to load projects"}
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return <section className="projects-showcase">No projects found</section>;
  }

  // Limit to 7 projects
  const limitedProjects = projects.slice(0, 7);

  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {limitedProjects.map((project, index) => (
          <div
            key={project.slug}
            className={`bento-item ${project.type || "image"} item-${
              index + 1
            }`}
            style={{
              gridArea: `item${index + 1}`,
            }}
          >
            {project.type === "text" ? (
              <div className="text-block">
                <h4>{project.title}</h4>
                {project.category && <span>{project.category}</span>}
                {project.description && (
                  <p
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
              </div>
            ) : (
              <>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  style={{ width: "100%" }}
                />
                <div className="project-overlay">
                  <h5>{project.title}</h5>
                  {project.category && (
                    <span className="project-category">{project.category}</span>
                  )}
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  <a
                    href={`/project/${project.slug}`}
                    className="view-project-btn"
                  >
                    View Project
                  </a>
                </div>
              </>
            )}
          </div>
        ))}
        {/* Hardcoded Text Item */}
        <div
          className="bento-item text item-text"
          style={{ gridArea: "item-text" }}
        >
          <div className="text-block">
            <h4>Explore Our Work</h4>
            <p>
              Discover our diverse portfolio of innovative projects, showcasing
              creativity and expertise across various domains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
