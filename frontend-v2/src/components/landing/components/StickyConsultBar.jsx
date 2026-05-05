'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function StickyConsultBar({ onConsult }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ✅ Mobile Floating CTA (Right Side) */}
      <div
        className={`md:hidden fixed bottom-5 right-5 z-40 transition-all duration-500 ${
          show
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
        style={{
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        <button
          onClick={onConsult}
          className="bg-[#1A3C34] text-white px-5 py-3 text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-all duration-500"
        >
          Book Call
        </button>
      </div>

      {/* ✅ Tablet + Desktop Floating Controls */}
      <div
        className={`hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 transition-all duration-500 ${
          show
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        {/* CTA Button */}
        <button
          onClick={onConsult}
          className="hidden sm:block bg-[#1A3C34] text-white px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-all duration-500"
        >
          Book Call
        </button>

        {/* Back to Top */}
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 flex items-center justify-center bg-[#1A3C34] text-white rounded-full shadow-lg hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-all duration-500"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </>
  );
}
