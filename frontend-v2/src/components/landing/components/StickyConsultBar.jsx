'use client';

import { Phone } from 'lucide-react';

export default function StickyConsultBar() {
  const phoneNumber = '918882830560';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2">
        {/* Call */}
        <a
          href={`tel:+${phoneNumber}`}
          className="flex items-center justify-center gap-2 py-4 text-white bg-[#1A3C34] hover:bg-[#143029] transition-all duration-300"
        >
          <Phone size={18} />

          <span className="text-sm tracking-[0.12em] uppercase font-medium">
            Call Now
          </span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            "Hi, I'm interested in your services. Let's discuss.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 text-[#1A3C34] bg-white hover:bg-[#f7f7f7] transition-all duration-300 border-l border-[#1A3C3420] shadow-[-10px_0_30px_rgba(0,0,0,0.04)]"
        >
          {/* WhatsApp Icon */}
          <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
            <path d="M19.11 17.205c-.372-.186-1.1-.543-1.27-.605-.17-.062-.294-.093-.418.093-.124.186-.48.605-.588.729-.108.124-.217.14-.403.047-.186-.093-.785-.289-1.495-.923-.552-.492-.924-1.1-1.032-1.286-.108-.186-.011-.287.082-.38.084-.083.186-.217.279-.326.093-.108.124-.186.186-.31.062-.124.031-.233-.015-.326-.047-.093-.418-1.008-.573-1.38-.149-.357-.302-.31-.418-.316-.108-.005-.233-.007-.357-.007-.124 0-.326.046-.496.233-.17.186-.65.636-.65 1.55 0 .915.666 1.798.759 1.922.093.124 1.31 2 3.176 2.804.444.192.79.306 1.06.39.446.142.852.122 1.173.074.357-.053 1.1-.45 1.255-.884.155-.434.155-.806.108-.884-.046-.077-.17-.124-.356-.217zM16.003 3C8.82 3 3 8.82 3 16c0 2.54.745 4.995 2.153 7.1L3 29l6.067-2.092A12.94 12.94 0 0016.003 29C23.18 29 29 23.18 29 16S23.18 3 16.003 3zm0 23.667a10.6 10.6 0 01-5.4-1.48l-.387-.23-3.6 1.24 1.173-3.507-.25-.403A10.61 10.61 0 015.333 16c0-5.882 4.787-10.667 10.67-10.667 5.88 0 10.664 4.785 10.664 10.667 0 5.883-4.785 10.667-10.664 10.667z" />
          </svg>

          <span className="text-sm tracking-[0.12em] uppercase font-medium">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
