'use client';

import { useState } from 'react';
import { Phone, Calendar } from 'lucide-react';

export default function StickyConsultBar({ onConsult }) {
  const [hovered, setHovered] = useState(null);

  const phoneNumber = '918882830560';

  const CTA = ({ id, label, href, onClick, children }) => (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center no-underline"
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {/* Label */}
      <div
        className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
          hovered === id
            ? 'max-w-[180px] opacity-100 mr-2'
            : 'max-w-0 opacity-0'
        }`}
      >
        <span className="text-[12px] font-medium tracking-wider bg-white text-[#1A3C34] px-4 py-2 border border-[#1A3C3426]">
          {label}
        </span>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#1A3C34] text-white rounded-full shadow-lg hover:scale-110 transition">
        {children}
      </div>
    </a>
  );

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* ✅ Book Call */}
      <CTA id="book" label="Book Call" onClick={onConsult}>
        <Calendar size={18} />
      </CTA>

      {/* ✅ WhatsApp */}
      <CTA
        id="whatsapp"
        label="Chat on WhatsApp"
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          "Hi, I'm interested in your services. Let's discuss.",
        )}`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
        </svg>
      </CTA>

      {/* ✅ Call */}
      <CTA id="call" label="Call Us" href="tel:8882830560">
        <Phone size={18} />
      </CTA>
    </div>
  );
}
