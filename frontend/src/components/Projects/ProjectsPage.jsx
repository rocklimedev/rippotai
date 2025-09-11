import React, { useState } from "react";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "The Cube House",
      category: "Residential",
      description:
        "A modern residential masterpiece blending minimalist design with sustainable materials.",
      details:
        "Located in Melbourne, this award-winning home features open-plan living spaces, energy-efficient systems, and a seamless connection to the outdoors. Completed in 2020.",
      image: "/images/cube-house.jpg",
      images: ["/images/cube-house-1.jpg", "/images/cube-house-2.jpg"],
    },
    {
      id: 2,
      title: "TechCorp Headquarters",
      category: "Commercial",
      description:
        "An innovative office space designed for collaboration and productivity.",
      details:
        "This state-of-the-art office in Sydney incorporates smart technology and ergonomic design. Completed in 2022.",
      image: "/images/techcorp-hq.jpg",
      images: ["/images/techcorp-hq-1.jpg", "/images/techcorp-hq-2.jpg"],
    },
    {
      id: 3,
      title: "Serenity Interiors",
      category: "Interiors",
      description:
        "Bespoke interior design for a luxury apartment, focusing on comfort and elegance.",
      details:
        "Crafted for a high-end client in Brisbane, this project features custom furniture and premium finishes. Completed in 2023.",
      image: "/images/serenity-interiors.jpg",
      images: [
        "/images/serenity-interiors-1.jpg",
        "/images/serenity-interiors-2.jpg",
      ],
    },
    {
      id: 4,
      title: "Cube Chair",
      category: "Furniture",
      description: "A minimalist furniture piece inspired by the cube concept.",
      details:
        "Designed as part of our bespoke furniture line, the Cube Chair combines form and function. Launched in 2024.",
      image: "/images/cube-chair.jpg",
      images: ["/images/cube-chair-1.jpg", "/images/cube-chair-2.jpg"],
    },
    {
      id: 5,
      title: "Eco Villa",
      category: "Residential",
      description: "A sustainable villa designed for eco-conscious living.",
      details:
        "Located in Perth, this villa uses solar energy and recycled materials. Completed in 2025.",
      image: "/images/eco-villa.jpg",
      images: ["/images/eco-villa-1.jpg", "/images/eco-villa-2.jpg"],
    },
  ];

  const categories = [
    "All",
    "Residential",
    "Commercial",
    "Interiors",
    "Furniture",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero">
        <div className="hero-overlay">
          <h1>Our Portfolio</h1>
          <p>
            Discover how Rippotai Architecture shapes spaces with balance,
            innovation, and harmony.
          </p>
          <a href="#project-grid" className="cta-button">
            Explore Projects
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio, from residential masterpieces
                  to innovative furniture designs.
                </p>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="project-filters mt-3" id="project-grid">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="project-grid mt-3">
            <div className="custom-row">
              {filteredProjects.map((project) => (
                <div
                  className="custom-col-4 custom-col-lg-6 custom-col-md-12 mt-5"
                  key={project.id}
                >
                  <div
                    className="project-details"
                    onClick={() => openProjectModal(project)}
                  >
                    <img
                      src={project.image}
                      className="project-img"
                      alt={project.title}
                    />
                    <div className="project-overlay">
                      <h5>{project.title}</h5>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeProjectModal}>
              &times;
            </span>
            <h3>{selectedProject.title}</h3>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="modal-image"
            />
            <p>{selectedProject.details}</p>
            {selectedProject.images.length > 0 && (
              <div className="modal-gallery">
                {selectedProject.images.map((img, index) => (
                  <img
                    src={img}
                    alt={`${selectedProject.title} ${index + 1}`}
                    key={index}
                  />
                ))}
              </div>
            )}
            <a href="/contact" className="cta-button">
              Contact Us for Similar Projects
            </a>
          </div>
        </div>
      )}

      {/* Testimonial Section */}
      <section className="projects-testimonial">
        <div className="custom-container">
          <h2 className="text-center">What Our Clients Say</h2>
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="testimonial">
                <p>
                  "Rippotai Architecture delivered a stunning commercial space
                  that exceeded our expectations. Their attention to detail is
                  unmatched."
                </p>
                <p className="client-name">
                  — James Carter, CEO, Innovate Inc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="projects-cta">
        <div className="custom-container text-center">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact Rippotai Architecture to bring your vision to life.</p>
          <a href="/contact" className="cta-button">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
