import React, { useState } from "react";
import { useCreateQueryMutation } from "../../api/rippotaiApi";

const ContactUsPage = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [createQuery, { isLoading: isSubmitting }] = useCreateQueryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const queryData = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      subject: formData.get("subject")?.trim(),
      message: formData.get("message")?.trim(),
    };

    // Client-side validation
    if (
      !queryData.name ||
      !queryData.email ||
      !queryData.subject ||
      !queryData.message
    ) {
      setFormStatus({
        type: "error",
        message: "Please fill out all required fields.",
      });
      setTimeout(() => setFormStatus(null), 5000);
      return;
    }

    // Log the payload for debugging
    console.log("Sending queryData:", queryData);

    try {
      await createQuery(queryData).unwrap();
      setFormStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        "Failed to send message. Please try again.";
      console.error("Error response:", err); // Log error for debugging
      setFormStatus({
        type: "error",
        message: errorMessage,
      });
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero"></section>

      {/* Contact Section */}
      <section className="contact-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Contact Us</h2>
                <p>
                  Whether you’re envisioning a new home, a commercial space, or
                  bespoke furniture, our team is here to help. Reach out to
                  discuss your project or schedule a consultation.
                </p>
              </div>
            </div>
          </div>

          <div className="contact-content mt-3">
            <div className="custom-row">
              {/* Contact Form */}
              <div className="custom-col-6">
                <div className="contact-form" id="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Name
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
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-input"
                        required
                        aria-required="true"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-input"
                        rows="5"
                        required
                        aria-required="true"
                      ></textarea>
                    </div>
                    {formStatus && (
                      <div
                        className={`form-alert form-alert-${formStatus.type}`}
                        role="alert"
                      >
                        {formStatus.message}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="form-submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info and Map */}
              <div className="custom-col-6">
                <div className="contact-info">
                  <h4>Our Office</h4>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> 123 Cube Street,
                    Melbourne, VIC 3000, Australia
                  </p>
                  <p>
                    <i className="fas fa-phone"></i>{" "}
                    <a href="tel:+61312345678">+61 3 1234 5678</a>
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i>{" "}
                    <a href="mailto:info@rippotai.com">info@rippotai.com</a>
                  </p>
                  <div className="social-links">
                    <h4>Follow Us</h4>
                    <a
                      href="https://instagram.com/rippotai"
                      className="social-icon instagram"
                      aria-label="Follow us on Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="https://linkedin.com/company/rippotai"
                      className="social-icon linkedin"
                      aria-label="Follow us on LinkedIn"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a
                      href="https://pinterest.com/rippotai"
                      className="social-icon pinterest"
                      aria-label="Follow us on Pinterest"
                    >
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </div>
                </div>
                <div className="map-container">
                  <h4>Find Us</h4>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9220205218063!2d144.963057815316!3d-37.81621497975132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d47612ab14f%3A0x2f7b1b8a8f6a5e5c!2sFederation%20Square!5e0!3m2!1sen!2sin!4v1645689512580!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    title="Rippotai Architecture Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="contact-testimonial">
        <div className="custom-container">
          <h2 className="text-center">What Our Clients Say</h2>
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="testimonial">
                <p>
                  "Rippotai Architecture turned our vision into reality with
                  unparalleled creativity and professionalism. Their team was a
                  pleasure to work with!"
                </p>
                <p className="client-name">
                  — Lisa Thompson, Commercial Client
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
