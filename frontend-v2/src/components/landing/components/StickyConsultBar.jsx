'use client';

import { Phone, Calendar } from 'lucide-react';

export default function StickyConsultBar({ onConsult }) {
  const phoneNumber = '918882830560';

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#1A3C3420] shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2">
        {/* Book Call */}
        <button
          type="button"
          onClick={onConsult}
          className="flex items-center justify-center gap-2 py-4 text-white bg-[#1A3C34] hover:bg-[#143029] transition-all duration-300"
        >
          <Calendar size={18} />
          <span className="text-sm tracking-[0.12em] uppercase font-medium">
            Book Call
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            "Hi, I'm interested in your services. Let's discuss.",
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 text-[#1A3C34] bg-white hover:bg-[#f7f7f7] transition-all duration-300 border-l border-[#1A3C3420]"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
          </svg>

          <span className="text-sm tracking-[0.12em] uppercase font-medium">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
