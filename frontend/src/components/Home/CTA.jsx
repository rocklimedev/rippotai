import { Link } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const CTA = () => {
  return (
    <>
      <div className="cta-container">
        <a
          href="https://wa.me/+918882830560"
          className="cta-icon whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp size={22} color="white" />
        </a>
        <a
          href="tel:+918882830560"
          className="cta-icon phone"
          aria-label="Call us"
        >
          <FaPhone size={22} color="white" />
        </a>
      </div>
      <Link
        to="/contact"
        className="cta-contact"
        aria-label="Go to contact page"
      >
        Contact Us
      </Link>
    </>
  );
};

export default CTA;
