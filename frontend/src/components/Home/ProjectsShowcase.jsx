import React from "react";
import { Link } from "react-router-dom"; // Better than <a> for SPA navigation
import { useGetProjectsQuery } from "../../api/rippotaiApi";

const ProjectsShowcase = () => {
  const {
    data: projectsResponse,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery();

  // Safely extract projects array
  const projectsArray = React.useMemo(() => {
    if (!projectsResponse) return [];
    return Array.isArray(projectsResponse.data)
      ? projectsResponse.data
      : Array.isArray(projectsResponse)
      ? projectsResponse
      : [];
  }, [projectsResponse]);

  // Limit to first 7 projects
  const limitedProjects = projectsArray.slice(0, 7);

  if (isLoading) {
    return (
      <section className="projects-showcase">
        <div className="text-center py-5">Loading featured projects...</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="projects-showcase">
        <div className="text-center text-danger py-5">
          Error loading projects. Please try again later.
        </div>
      </section>
    );
  }

  if (limitedProjects.length === 0) {
    return (
      <section className="projects-showcase">
        <div className="text-center py-5">No projects to showcase yet.</div>
      </section>
    );
  }

  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {limitedProjects.map((project, index) => (
          <div
            key={project.slug || index} // fallback key if slug missing
            className={`bento-item ${project.type || "image"} item-${
              index + 1
            }`}
            style={{ gridArea: `item${index + 1}` }}
          >
            {project.type === "text" ? (
              <div className="text-block">
                <h4>{project.title || "Untitled"}</h4>
                {project.category && (
                  <span className="project-category">{project.category}</span>
                )}
                {project.description && (
                  <p
                    className="project-description"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
              </div>
            ) : (
              <div className="project-image-container">
                <img
                  src={project.image || "/placeholder-image.jpg"}
                  alt={project.title || "Project showcase"}
                  className="project-image"
                  loading="lazy" // Huge performance win!
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-image.jpg";
                  }}
                />
                <div className="project-overlay">
                  <h5>{project.title || "Untitled Project"}</h5>
                  {project.category && (
                    <span className="project-category">{project.category}</span>
                  )}
                  {project.description && (
                    <p className="project-description">{project.description}</p>
                  )}
                  <Link
                    to={`/project/${project.slug}`}
                    className="view-project-btn"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Static Text Block */}
        <div
          className="bento-item text item-text"
          style={{ gridArea: "item-text" }}
        >
          <div className="text-block">
            <h4>Explore Our Work</h4>
            <p>
              Discover our diverse portfolio of innovative projects, showcasing
              creativity and expertise across residential, institutional, and
              product design domains.
            </p>
            <Link to="/projects" className="view-all-btn">
              View All Projects →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;
