import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  // Sample data for benefits and testimonials (replace with API data if available)
  const benefits = [
    {
      icon: "fas fa-hand-holding-heart",
      title: "Creative Freedom",
      description:
        "Work on innovative projects with the freedom to express your architectural vision.",
    },
    {
      icon: "fas fa-users",
      title: "Collaborative Culture",
      description:
        "Join a team of passionate professionals in a supportive environment.",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Growth Opportunities",
      description:
        "Access continuous learning and career development programs.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Working here has allowed me to push the boundaries of design while collaborating with an inspiring team.",
      name: "Jane Doe, Senior Architect",
    },
    {
      quote:
        "The culture of innovation and support has made this the best place to grow my career.",
      name: "John Smith, Interior Designer",
    },
  ];

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero"></section>

      {/* Culture Section */}
      <section className="careers-culture">
        <div className="custom-container">
          <div className="heading text-center">
            <h2>Our Culture</h2>
            <p>
              We foster a collaborative, innovative, and inclusive environment
              where creativity thrives and every voice is heard.
            </p>
          </div>
          <div className="culture-content mt-2">
            <p>
              Our firm is built on a passion for design excellence and
              sustainable architecture. We value creativity, teamwork, and a
              commitment to pushing boundaries in every project.
            </p>
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
                    to={`/careers/apply?job=${encodeURIComponent(job.title)}`}
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
    </div>
  );
};

export default CareersPage;
