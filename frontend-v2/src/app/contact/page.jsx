// app/contact/page.jsx
"use client";
import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";
import { useCreateQueryMutation } from "@/api/rippotaiApi";

const contactInfo = {
  address:
    "487/64, National Market, Peeragarhi, Paschim Vihar, New Delhi, Delhi 110087",
  email: "sagar@rippotai.in",
  phone: "+91 99110 80605",
};

const teamImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/ty0yqr54_05b1c7b1-3dfc-4182-ae7b-5b43a03124eb.jpg";

const googleMapsLink =
  "https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIVCAEQLhhDGMcBGLEDGNEDGIAEGIoFMgYIAhBFGEAyBggDEEUYOTIGCAQQRRg7MgYIBRBFGDwyBggGEEUYPDIGCAcQRRg80gEHNzYwajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KbHnzh2cBQ05MZlLNlNYBa34&daddr=487/64,+National+Market,+peeragarhi,+Paschim+Vihar,+New+Delhi,+Delhi,+110087";

export default function ContactPage() {
  const [createQuery, { isLoading: pending }] = useCreateQueryMutation();
  const [fileName, setFileName] = useState("");

  // ✅ ADDED: form state (no style changes)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // ✅ ADDED: change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

    const { name, email, phone, subject, message } = formData;

    let finalMessage = message;
    if (phone) {
      finalMessage = `Phone: ${phone}\n\n${message}`;
    }

    try {
      await createQuery({
        name,
        email,
        subject,
        message: finalMessage,
      }).unwrap();

      toast.success("Message sent successfully! We'll get back to you soon.");

      // ✅ Reset controlled form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      const errorMsg =
        err?.data?.message || err?.message || "Failed to send message.";
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
          alt="Contact Rippotai"
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
            Contact Us
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

      {/* Contact Content */}
      <section style={{ padding: "100px 48px" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
          }}
          className="contact-grid"
        >
          {/* Left - Form */}
          <div>
            <AnimateIn delay={0.2} distance={50} duration={1.2}>
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
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
                  }}
                >
                  {pending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </AnimateIn>
          </div>

          {/* Right - Info + Map */}
          <div>
            <AnimateIn delay={0.1} distance={50} duration={1.2}>
              <div style={{ marginBottom: "48px" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "start",
                    marginBottom: "24px",
                  }}
                >
                  <MapPin
                    size={18}
                    color="#d9af61"
                    style={{ marginTop: "3px", flexShrink: 0 }}
                  />
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "#444444",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {contactInfo.address}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <Mail size={18} color="#d9af61" style={{ flexShrink: 0 }} />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "#444444",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d9af61")}
                    onMouseLeave={(e) => (e.target.style.color = "#444444")}
                  >
                    {contactInfo.email}
                  </a>
                </div>
                <div
                  style={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                  <Phone size={18} color="#d9af61" style={{ flexShrink: 0 }} />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "#444444",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d9af61")}
                    onMouseLeave={(e) => (e.target.style.color = "#444444")}
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </AnimateIn>

            {/* Google Maps */}
            <AnimateIn delay={0.3} distance={40} duration={1.2}>
              <div
                style={{ width: "100%", height: "350px", overflow: "hidden" }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=Rippotai+Architecture,+487/64,+National+Market,+Peeragarhi,+Paschim+Vihar,+New+Delhi,+Delhi+110087&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0, filter: "grayscale(0.5)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Rippotai Location"
                />
              </div>
              <a
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "16px",
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#1a3c34",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#d9af61")}
                onMouseLeave={(e) => (e.target.style.color = "#1a3c34")}
              >
                Get Directions \u2192
              </a>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
