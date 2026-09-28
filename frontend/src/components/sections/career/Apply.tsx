"use client";

import { FormEvent, useState } from "react";
import { useCreateApplicationMutation } from "@/api/applicationsApi";

export default function Apply() {
  const [createApplication, { isLoading }] = useCreateApplicationMutation();

  const [step, setStep] = useState(0);
  const [submittedName, setSubmittedName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    interest: "Architecture",
    note: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    setSubmitError("");

    if (step === 0) {
      if (!form.name.trim()) {
        setSubmitError("Please enter your full name.");
        return;
      }

      if (!form.email.trim()) {
        setSubmitError("Please enter your email.");
        return;
      }

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());

      if (!emailValid) {
        setSubmitError("Please enter a valid email address.");
        return;
      }
    }

    setStep((current) => Math.min(current + 1, 2));
  };

  const previousStep = () => {
    setSubmitError("");
    setStep((current) => Math.max(current - 1, 0));
  };

  const handleFileChange = (file: File | null) => {
    setFileError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ["application/pdf", "application/zip", "application/x-zip-compressed"];

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !["pdf", "zip"].includes(extension ?? "")) {
      setFileError("Please upload a PDF or ZIP file.");
      setSelectedFile(null);
      return;
    }

    // 5 MB max
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be 5 MB or less.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setFileError("");

    if (!form.name.trim()) {
      setStep(0);
      setSubmitError("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      setStep(0);
      setSubmitError("Please enter your email.");
      return;
    }

    if (!selectedFile) {
      setFileError("Please upload your portfolio or resume.");
      return;
    }

    try {
      await createApplication({
        name: form.name.trim(),
        email: form.email.trim(),
        designation: form.designation.trim(),
        interestedIn: form.interest,
        phone: form.phone.trim(),
        resume: selectedFile,
        coverLetter: form.note.trim(),
      }).unwrap();

      setSubmittedName(form.name.trim());
      setStep(3);
    } catch (error: any) {
      console.error("Application submission failed:", error);

      const message = error?.data?.message || error?.error || "Failed to submit your application. Please try again.";

      setSubmitError(message);
    }
  };

  const startAgain = () => {
    setStep(0);
    setSubmittedName("");
    setSelectedFile(null);
    setFileError("");
    setSubmitError("");

    setForm({
      name: "",
      email: "",
      phone: "",
      designation: "",
      interest: "Architecture",
      note: "",
    });
  };

  return (
    <section className="apply" id="apply">
      <div className="wrap">
        <h2 data-rev="">
          Apply in <em>three steps.</em>
        </h2>

        <div className="wz">
          {step < 3 && (
            <div>
              <ol className="wz-steps" id="wzs">
                <li className={step >= 0 ? "on" : ""}>
                  <i>1</i>
                  <span>About you</span>
                </li>

                <li className={step >= 1 ? "on" : ""}>
                  <i>2</i>
                  <span>Your role</span>
                </li>

                <li className={step >= 2 ? "on" : ""}>
                  <i>3</i>
                  <span>Your work</span>
                </li>
              </ol>

              <div className="wz-bar">
                <b
                  id="wzb"
                  style={{
                    width: `${(step / 2) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          <form className="wz-card" id="wz" noValidate onSubmit={handleSubmit}>
            {/* =====================================================
                STEP 1
            ===================================================== */}
            {step === 0 && (
              <div className="pane on" data-p="0">
                <h3>First, who are you?</h3>

                <div className="fl">
                  <input
                    name="name"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                  />
                  <label>Full name</label>
                </div>

                <div className="fl">
                  <input
                    name="email"
                    type="email"
                    placeholder=" "
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="fl">
                  <input
                    name="phone"
                    type="tel"
                    placeholder=" "
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                  <label>Phone number</label>
                </div>

                {submitError && (
                  <p className="note" role="alert">
                    {submitError}
                  </p>
                )}

                <div className="nav-row">
                  <span />

                  <button type="button" className="nxt" onClick={nextStep}>
                    Next <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* =====================================================
                STEP 2
            ===================================================== */}
            {step === 1 && (
              <div className="pane on" data-p="1">
                <h3>What do you do?</h3>

                <div className="fl">
                  <input
                    name="designation"
                    placeholder=" "
                    value={form.designation}
                    onChange={(e) => updateField("designation", e.target.value)}
                  />
                  <label>Current designation</label>
                </div>

                <p className="note" style={{ margin: "0 0 10px" }}>
                  Interested in
                </p>

                <div className="dchips" id="dchips">
                  {[
                    "Architecture",
                    "Interior Design",
                    "Furniture Design",
                    "Project Management",
                    "3D Visualization",
                    "Other",
                  ].map((interest) => (
                    <label key={interest}>
                      <input
                        type="radio"
                        name="interest"
                        value={interest}
                        checked={form.interest === interest}
                        onChange={(e) => updateField("interest", e.target.value)}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>

                {submitError && (
                  <p className="note" role="alert">
                    {submitError}
                  </p>
                )}

                <div className="nav-row">
                  <button type="button" className="back" onClick={previousStep}>
                    ← Back
                  </button>

                  <button type="button" className="nxt" onClick={nextStep}>
                    Next <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* =====================================================
                STEP 3
            ===================================================== */}
            {step === 2 && (
              <div className="pane on" data-p="2">
                <h3>Show us your work.</h3>

                <label className="drop" id="drop">
                  <input
                    type="file"
                    id="cv"
                    accept=".pdf,.zip,application/pdf,application/zip"
                    onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                  />

                  <span id="cvn">
                    {selectedFile ? selectedFile.name : "Drop your portfolio / resume here, or click to choose"}
                  </span>

                  <small>PDF or ZIP · max 5 MB</small>
                </label>

                {fileError && (
                  <p className="note" role="alert">
                    {fileError}
                  </p>
                )}

                <div className="fl">
                  <textarea
                    name="note"
                    rows={2}
                    placeholder=" "
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                  />
                  <label>Anything you’d like us to know (optional)</label>
                </div>

                {submitError && (
                  <p className="note" role="alert">
                    {submitError}
                  </p>
                )}

                <div className="summary" id="sum">
                  <strong>Application summary</strong>

                  <div>
                    <span>Name</span>
                    <span>{form.name || "—"}</span>
                  </div>

                  <div>
                    <span>Email</span>
                    <span>{form.email || "—"}</span>
                  </div>

                  <div>
                    <span>Interest</span>
                    <span>{form.interest || "—"}</span>
                  </div>

                  <div>
                    <span>File</span>
                    <span>{selectedFile?.name || "No file selected"}</span>
                  </div>
                </div>

                <div className="nav-row">
                  <button type="button" className="back" onClick={previousStep} disabled={isLoading}>
                    ← Back
                  </button>

                  <button type="submit" className="nxt" disabled={isLoading}>
                    {isLoading ? "Submitting..." : "Submit application"}
                    {!isLoading && <span>→</span>}
                  </button>
                </div>

                <p className="note">
                  Your portfolio / resume will be uploaded securely with your application. You do not need to open an
                  email application.
                </p>
              </div>
            )}

            {/* =====================================================
                SUCCESS
            ===================================================== */}
            {step === 3 && (
              <div className="pane sent on" data-p="3">
                <svg className="mono" viewBox="150 -10 1360 1400" aria-hidden="true">
                  <polyline className="gl" points="510,135 817,5 1150,137" />

                  <ellipse className="gd" cx="830" cy="295" rx="165" ry="82" />

                  <polygon className="dk a" points="176,287 835,605 832,1003 475,832 470,1192 172,1048" />

                  <polygon className="dk b" points="1186,415 1486,265 1490,1052 834,1378 833,1004 1190,845" />

                  <line className="ln" x1="835" y1="605" x2="1186" y2="415" />

                  <line className="ln" x1="470" y1="1192" x2="834" y2="1374" />
                </svg>

                <h3>
                  Thank you, <em>{submittedName || "friend"}</em>.
                </h3>

                <p className="note" style={{ fontSize: "15px" }}>
                  Your application has been submitted successfully. We&apos;ll review your details and portfolio and get
                  back to you if there&apos;s a suitable opportunity.
                </p>

                <div className="nav-row">
                  <button type="button" className="back" onClick={startAgain}>
                    Start another
                  </button>

                  <span />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
