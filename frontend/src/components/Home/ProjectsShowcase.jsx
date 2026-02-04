// src/components/Home/ProjectsShowcase.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useGetPublicProjectsQuery } from "../../api/rippotaiApi";

const ProjectsShowcase = () => {
  // 🔥 PUBLIC + LIGHTWEIGHT QUERY ONLY
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({
    page: 1,
    limit: 6, // homepage MUST be limited
  });

  // Safety: ensure array
  const featuredProjects = useMemo(
    () => (Array.isArray(projects) ? projects.slice(0, 6) : []),
    [projects],
  );

  /* ---------------- Loading / Error States ---------------- */

  if (isLoading) {
    return (
      <section className="projects-showcase">
        <div className="text-center py-5">Loading featured projects…</div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="projects-showcase">
        <div className="text-center text-danger py-5">
          Failed to load projects.
        </div>
      </section>
    );
  }

  if (featuredProjects.length === 0) {
    return (
      <section className="projects-showcase">
        <div className="text-center py-5">No projects to showcase yet.</div>
      </section>
    );
  }

  /* ---------------- Render ---------------- */

  return (
    <section className="projects-showcase">
      <div className="bento-grid">
        {featuredProjects.map((project, index) => (
          <div
            key={project.slug}
            className={`bento-item item-${index + 1}`}
            style={{ gridArea: `item${index + 1}` }}
          >
            <div className="project-image-container">
              <LazyLoadImage
                src={project.image || "/placeholder-image.jpg"}
                alt={project.title || "Featured project"}
                effect="blur"
                className="project-image"
                wrapperClassName="w-100 h-100"
                height={400} // prevents CLS
                width={600}
                threshold={120}
                decoding="async"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />

              <div className="project-overlay">
                <h5>{project.title}</h5>

                {project.category && (
                  <span className="project-category">{project.category}</span>
                )}

                {/* ❌ NO long description on homepage */}
                <Link
                  to={`/project/${project.slug}`}
                  className="view-project-btn"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Static CTA Block */}
        <div
          className="bento-item text item-text"
          style={{ gridArea: "item-text" }}
        >
          <div className="text-block">
            <h4>Explore Our Work</h4>
            <p>
              Discover our diverse portfolio of residential and institutional
              architecture projects.
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
