// components/Common/CTA.tsx
import Link from "next/link";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

const CTA = () => {
  return (
    <>
      <div className="cta-container">
        {/* Expandable WhatsApp Button */}
        <a
          href="https://wa.me/+918882830560?text=Hello!%20I'd%20like%20to%20know%20more..."
          className="cta-icon whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <span className="icon-wrapper">
            <FaWhatsapp size={28} color="white" />
          </span>
          <span className="label">Chat on WhatsApp</span>
        </a>

        {/* Phone Button (compact circle) */}
        <a
          href="tel:+918882830560"
          className="cta-icon phone"
          aria-label="Call us"
        >
          <FaPhone size={28} color="white" />
        </a>
      </div>
    </>
  );
};

export default CTA;
