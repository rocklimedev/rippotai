import React, { useState } from "react";

const CareersPage = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: "Senior Architect",
      category: "Architecture",
      location: "Melbourne, VIC",
      description:
        "Lead innovative residential and commercial projects, overseeing design and execution.",
      details:
        "Requires 7+ years of experience, proficiency in AutoCAD and Revit, and a passion for sustainable design.",
    },
    {
      id: 2,
      title: "Interior Designer",
      category: "Interiors",
      location: "Sydney, NSW",
      description:
        "Create bespoke interior spaces that blend aesthetics with functionality.",
      details:
        "Requires 5+ years of experience, expertise in 3D modeling, and a strong portfolio.",
    },
    {
      id: 3,
      title: "Furniture Designer",
      category: "Furniture",
      location: "Brisbane, QLD",
      description:
        "Design custom furniture pieces inspired by the cube concept.",
      details:
        "Requires 3+ years of experience, knowledge of materials, and creative design skills.",
    },
  ];

  const categories = ["All", "Architecture", "Interiors", "Furniture"];

  const filteredJobs = selectedJob
    ? jobs.filter((job) => job.category === selectedJob)
    : jobs;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    setFormStatus({
      type: "success",
      message: "Your application has been submitted successfully!",
    });
    e.target.reset();
    setTimeout(() => setFormStatus(null), 5000);
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="hero-overlay">
          <h1>Join Our Creative Team</h1>
          <p>
            Shape the future of design with Rippotai Architecture, where
            innovation meets harmony.
          </p>
          <a href="#job-listings" className="cta-button">
            Explore Opportunities
          </a>
        </div>
      </section>

      {/* Culture Section */}
      <section className="careers-culture">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Culture</h2>
                <p>
                  At Rippotai Architecture, we believe in the power of design to
                  transform lives. Inspired by the Japanese concept of
                  "Rippotai" (cube), our team thrives in a collaborative
                  environment where creativity, sustainability, and innovation
                  shape every project.
                </p>
                <p className="mt-2">
                  Join a multidisciplinary team of architects, designers, and
                  craftsmen dedicated to crafting spaces and objects that
                  inspire. We foster a culture of growth, creativity, and
                  balance, where your ideas can redefine the built environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="careers-jobs" id="job-listings">
        <div className="custom-container">
          <h2 className="text-center">Open Positions</h2>
          <div className="job-filters mt-3">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  selectedJob === category ? "active" : ""
                }`}
                onClick={() =>
                  setSelectedJob(category === "All" ? null : category)
                }
              >
                {category}
              </button>
            ))}
          </div>
          <div className="job-list mt-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div className="job-item" key={job.id}>
                  <h3>{job.title}</h3>
                  <p className="job-meta">
                    <i className="fas fa-map-marker-alt"></i> {job.location}
                  </p>
                  <p>{job.description}</p>
                  <p className="job-details">{job.details}</p>
                  <a href="#application-form" className="cta-button apply-btn">
                    Apply Now
                  </a>
                </div>
              ))
            ) : (
              <p className="no-jobs">
                No positions available in this category. Check back soon!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="careers-benefits">
        <div className="custom-container">
          <h2 className="text-center">Why Work With Us?</h2>
          <div className="custom-row">
            <div className="custom-col-4">
              <div className="benefit-item">
                <i className="fas fa-drafting-compass"></i>
                <h3>Creative Freedom</h3>
                <p>
                  Work on diverse projects that push the boundaries of
                  architectural design.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="benefit-item">
                <i className="fas fa-leaf"></i>
                <h3>Sustainability Focus</h3>
                <p>
                  Contribute to eco-friendly projects that prioritize
                  environmental responsibility.
                </p>
              </div>
            </div>
            <div className="custom-col-4">
              <div className="benefit-item">
                <i className="fas fa-users"></i>
                <h3>Collaborative Culture</h3>
                <p>
                  Join a supportive team that values your ideas and fosters
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="careers-application" id="application-form">
        <div className="custom-container">
          <h2 className="text-center">Apply Now</h2>
          <div className="custom-row">
            <div className="custom-col-8 custom-col-offset-2">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <select
                    id="position"
                    name="position"
                    className="form-input"
                    required
                  >
                    <option value="">Select a position</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={job.title}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="resume" className="form-label">
                    Resume/CV
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    className="form-input"
                    accept=".pdf,.doc,.docx"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cover-letter" className="form-label">
                    Cover Letter
                  </label>
                  <textarea
                    id="cover-letter"
                    name="cover-letter"
                    className="form-input"
                    rows="5"
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                {formStatus && (
                  <div className={`form-alert form-alert-${formStatus.type}`}>
                    {formStatus.message}
                  </div>
                )}
                <button type="submit" className="form-submit-button">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="careers-testimonial">
        <div className="custom-container">
          <h2 className="text-center">What Our Team Says</h2>
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="testimonial">
                <p>
                  "Working at Rippotai has been a transformative experience. The
                  collaborative environment and focus on innovative design have
                  allowed me to grow as an architect."
                </p>
                <p className="employee-name">— Sarah Lee, Senior Architect</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
