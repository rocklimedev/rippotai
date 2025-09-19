import React, { useState } from "react";
import {
  useGetJobsQuery,
  useCreateApplicationMutation,
} from "../../api/rippotaiApi";

const CareersPage = () => {
  // Fetch jobs using the useGetJobsQuery hook
  const { data: jobs = [], error, isLoading } = useGetJobsQuery({});

  const [formStatus, setFormStatus] = useState(null);
  const [resumeFileName, setResumeFileName] = useState("");
  const [errors, setErrors] = useState({});

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
    if (!formData.get("position") || formData.get("position") === "")
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

      {/* Application Form */}
      <section className="careers-form">
        <div className="custom-container">
          <h2 className="text-center">Apply Now</h2>
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
              <select
                id="position"
                name="position"
                className={`form-input ${errors.position ? "form-error" : ""}`}
                required
                aria-required="true"
              >
                <option value="">Select a position</option>
                {isLoading ? (
                  <option disabled>Loading jobs...</option>
                ) : error ? (
                  <option disabled>Error loading jobs</option>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <option key={job._id} value={job.title}>
                      {job.title}
                    </option>
                  ))
                ) : (
                  <option disabled>No positions available</option>
                )}
              </select>
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
                <span className="form-error-text">{errors.coverLetter}</span>
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
      </section>
    </div>
  );
};

export default CareersPage;
