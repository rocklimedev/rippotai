import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetJobsQuery,
  useCreateApplicationMutation,
} from "../../api/rippotaiApi";

const CareersApplicationPage = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [errors, setErrors] = useState({});
  const location = useLocation();

  // Get job title from query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const job = params.get("job");
    if (job) setSelectedJob(decodeURIComponent(job));
  }, [location]);

  // Fetch jobs
  const {
    data: jobs = [],
    isLoading: isJobsLoading,
    error: jobsError,
  } = useGetJobsQuery({});
  const selectedJobData = jobs.find((job) => job.title === selectedJob) || null;

  // Use the createApplication mutation
  const [createApplication, { isLoading: isSubmitting }] =
    useCreateApplicationMutation();

  // Form validation
  const validateForm = (formData, resumeFile) => {
    const errors = {};
    if (!formData.get("name").trim()) errors.name = "Full name is required";
    if (
      !formData.get("email").trim() ||
      !/\S+@\S+\.\S+/.test(formData.get("email"))
    )
      errors.email = "Valid email is required";
    if (!formData.get("position").trim())
      errors.position = "Position is required";
    if (!resumeFile) errors.resume = "Resume is required";
    if (!formData.get("coverLetter").trim())
      errors.coverLetter = "Cover letter is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const resumeFile = e.target.elements.resume.files[0]; // Get the file directly from the input
    const validationErrors = validateForm(formData, resumeFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Create a new FormData object to match the backend expectations
      const submissionFormData = new FormData();
      submissionFormData.append("name", formData.get("name"));
      submissionFormData.append("email", formData.get("email"));
      submissionFormData.append("position", formData.get("position"));
      submissionFormData.append("coverLetter", formData.get("coverLetter"));
      if (resumeFile) submissionFormData.append("resume", resumeFile);

      const response = await createApplication({
        name: formData.get("name"),
        email: formData.get("email"),
        position: formData.get("position"),
        resume: resumeFile,
        coverLetter: formData.get("coverLetter"),
      }).unwrap();
      setFormStatus({
        type: "success",
        message: `Application submitted successfully! Resume uploaded: ${response.filename}`,
      });
      setErrors({});
      e.target.reset();
      setSelectedJob("");
      setResumeFileName("");
      setTimeout(() => setFormStatus(null), 5000);
    } catch (err) {
      const errorMessage =
        err.data?.message || "Failed to submit application. Please try again.";
      setFormStatus({
        type: "error",
        message: errorMessage.includes(
          "Only PDF, DOC, and DOCX files are allowed"
        )
          ? "Please upload a PDF, DOC, or DOCX file."
          : errorMessage,
      });
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFileName(file.name);
      setErrors((prev) => ({ ...prev, resume: null }));
    } else {
      setResumeFileName("");
    }
  };

  return (
    <div className="careers-application-page">
      {/* Hero Section */}
      <section className="application-hero"></section>

      {/* Application Content Section */}
      <section className="application-content">
        <div className="custom-container">
          <div className="custom-row">
            {/* Left: Description Section */}
            <div className="custom-col-6 application-description">
              {/* Job Description Section */}
              <div className="job-description">
                <h2>{selectedJob || "Apply for a Position"}</h2>
                {isJobsLoading ? (
                  <p>Loading job details...</p>
                ) : jobsError ? (
                  <p className="job-error">
                    Error loading job details. Please try again later.
                  </p>
                ) : selectedJobData ? (
                  <>
                    <p className="job-meta">
                      <i className="fas fa-map-marker-alt"></i>{" "}
                      {selectedJobData.location}
                    </p>
                    <p>{selectedJobData.description}</p>
                    <div className="job-details">
                      <h3>Responsibilities & Qualifications</h3>
                      <p>{selectedJobData.details}</p>
                    </div>
                  </>
                ) : (
                  <p className="no-job-selected">
                    No specific job selected. Please choose a position from our{" "}
                    <a href="/careers" className="job-link">
                      careers page
                    </a>{" "}
                    or enter a position below.
                  </p>
                )}
              </div>

              {/* Why Join Rippotai Section */}
              <h2 className="mt-4">Why Join Rippotai?</h2>
              <p>
                At Rippotai Architecture, we are driven by a passion for
                creating spaces that harmonize innovation, sustainability, and
                human experience. Inspired by the Japanese concept of "Rippotai"
                (cube), our work reflects precision, balance, and creativity.
              </p>
              <p className="mt-2">
                Joining our team means becoming part of a collaborative,
                multidisciplinary environment where your ideas can shape the
                built environment. Whether you’re an architect, designer, or
                craftsman, you’ll contribute to projects that push boundaries
                and prioritize environmental responsibility.
              </p>
              <h3 className="mt-3">Application Process</h3>
              <ul className="application-process">
                <li>
                  <i className="fas fa-check-circle"></i> Submit your
                  application with resume and cover letter.
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Our HR team reviews
                  applications within 1-2 weeks.
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Selected candidates
                  are invited for interviews.
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Final offers are made
                  to top candidates.
                </li>
              </ul>
              <p className="mt-2">
                We value diversity, creativity, and a commitment to excellence.
                Apply now to start your journey with us.
              </p>
            </div>

            {/* Right: Application Form */}
            <div className="custom-col-6 application-form-container">
              <h2 className="text-center">Submit Your Application</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-input ${errors.name ? "form-error" : ""}`}
                    required
                    aria-required="true"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <span className="form-error-text">{errors.name}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${errors.email ? "form-error" : ""}`}
                    required
                    aria-required="true"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <span className="form-error-text">{errors.email}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="position" className="form-label">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className={`form-input ${
                      errors.position ? "form-error" : ""
                    }`}
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    required
                    aria-required="true"
                    placeholder="Enter the position you're applying for"
                  />
                  {errors.position && (
                    <span className="form-error-text">{errors.position}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="resume" className="form-label">
                    Resume/CV (PDF, DOC, DOCX)
                  </label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      className={`form-input file-input ${
                        errors.resume ? "form-error" : ""
                      }`}
                      accept=".pdf,.doc,.docx"
                      required
                      aria-required="true"
                      onChange={handleFileChange}
                    />
                    <span className="file-name">
                      {resumeFileName || "No file selected"}
                    </span>
                  </div>
                  {errors.resume && (
                    <span className="form-error-text">{errors.resume}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="coverLetter" className="form-label">
                    Cover Letter
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    className={`form-input ${
                      errors.coverLetter ? "form-error" : ""
                    }`}
                    rows="6"
                    required
                    aria-required="true"
                    placeholder="Tell us why you're a great fit for Rippotai"
                  ></textarea>
                  {errors.coverLetter && (
                    <span className="form-error-text">
                      {errors.coverLetter}
                    </span>
                  )}
                </div>
                {formStatus && (
                  <div className={`form-alert form-alert-${formStatus.type}`}>
                    {formStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  className="form-submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersApplicationPage;
