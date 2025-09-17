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
      <section className="careers-hero"></section>

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
    </div>
  );
};

export default CareersPage;
