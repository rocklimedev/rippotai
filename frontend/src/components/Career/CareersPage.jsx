import React, { useState } from "react";
import { Link } from "react-router-dom"; // Add react-router-dom for navigation
import { useGetJobsQuery } from "../../api/rippotaiApi";

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs using the useGetJobsQuery hook
  const {
    data: jobs = [],
    error,
    isLoading,
  } = useGetJobsQuery(selectedJob ? { category: selectedJob } : {});

  const categories = ["All", "Architecture", "Interiors", "Furniture"];

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
          <Link to="#job-listings" className="cta-button">
            Explore Opportunities
          </Link>
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
            {isLoading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p className="no-jobs">
                Error loading jobs. Please try again later.
              </p>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div className="job-item" key={job._id}>
                  <h3>{job.title}</h3>
                  <p className="job-meta">
                    <i className="fas fa-map-marker-alt"></i> {job.location}
                  </p>
                  <p>{job.description}</p>
                  <p className="job-details">{job.details}</p>
                  <Link
                    to={`/careers/apply?job=${encodeURIComponent(job.title)}`} // Pass job title as query param
                    className="cta-button apply-btn"
                  >
                    Apply Now
                  </Link>
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
