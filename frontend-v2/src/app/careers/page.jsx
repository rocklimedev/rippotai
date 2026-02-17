// app/careers/page.jsx
"use client";
import { useState } from "react";
import { useCreateApplicationMutation } from "@/api/rippotaiApi";
import { AnimateIn } from "@/components/AnimateIn";
import { toast } from "sonner";

const teamImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/ty0yqr54_05b1c7b1-3dfc-4182-ae7b-5b43a03124eb.jpg";

export default function CareerPage() {
  const [createApplication, { isLoading: pending }] =
    useCreateApplicationMutation();

  const [fileName, setFileName] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "'Lato', sans-serif",
    fontSize: "15px",
    fontWeight: 300,
    color: "#1a3c34",
    backgroundColor: "#ffffff",
    border: "1px solid rgba(26, 60, 52, 0.2)",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    letterSpacing: "2px",
    textTransform: "uppercase",
    color: "#1a3c34",
    marginBottom: "8px",
    display: "block",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Rename / map fields to match backend expectation
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      position: formData.get("interestedIn"), // ← map "interestedIn" → "position"
      resume: formData.get("portfolio"), // ← map "portfolio" → "resume"
      // coverLetter: optional — you can add a textarea later if needed
    };

    try {
      await createApplication(payload).unwrap();
      toast.success("Application submitted successfully! We'll be in touch.");
      e.target.reset();
      setFileName("");
    } catch (err) {
      const errorMsg =
        err?.data?.message || err?.message || "Failed to submit application.";
      toast.error(errorMsg);
    }
  };

  return (
    <>
      {/* Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
          minHeight: "350px",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img
          src={teamImage}
          alt="Join Rippotai"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "48px",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            Careers
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#d9af61",
              marginTop: "20px",
            }}
          />
        </div>
      </section>

      <section style={{ padding: "100px 48px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={40} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666666",
                lineHeight: 1.8,
                marginBottom: "60px",
              }}
            >
              We are always looking for talented individuals who share our
              passion for design and architecture. Fill out the form below and
              we will get back to you.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2} distance={50} duration={1.2}>
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Full Name</label>
                <input type="text" name="name" required style={inputStyle} />
              </div>

              {/* Phone – optional for this API, but you can keep it */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" name="phone" style={inputStyle} />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" required style={inputStyle} />
              </div>

              {/* Current Designation – optional */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Current Designation</label>
                <input type="text" name="designation" style={inputStyle} />
              </div>

              {/* Interested In → becomes position */}
              <div style={{ marginBottom: "32px" }}>
                <label style={labelStyle}>Interested In</label>
                <select
                  name="interestedIn"
                  required
                  style={{ ...inputStyle, appearance: "none" }}
                >
                  <option value="">Select a department</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Furniture Design">Furniture Design</option>
                  <option value="Project Management">Project Management</option>
                  <option value="3D Visualization">3D Visualization</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Portfolio → becomes resume */}
              <div style={{ marginBottom: "48px" }}>
                <label style={labelStyle}>Upload Portfolio / Resume</label>
                <label
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    color: fileName ? "#1a3c34" : "#999999",
                  }}
                >
                  {fileName || "Choose a file (PDF, ZIP, max 5MB recommended)"}
                  <input
                    type="file"
                    name="portfolio"
                    accept=".pdf,.zip,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFileName(file.name);
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={pending}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  backgroundColor: "#1a3c34",
                  border: "none",
                  padding: "16px 48px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                {pending ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
