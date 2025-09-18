import React from "react";
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsShowcase = () => {
  // Fetch all projects
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

  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {projects.map((project, index) => (
          <div
            key={project.slug} // Use slug for uniqueness
            className={`bento-item ${project.type || "image"} item-${
              index + 1
            }`} // Fallback to "image" if type is undefined
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
      </div>
    </section>
  );
};

export default ProjectsShowcase;
