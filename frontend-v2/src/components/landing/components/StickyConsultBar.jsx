import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function StickyConsultBar({ onConsult }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Mobile sticky bottom bar */}
      <div
        data-testid="sticky-mobile-cta"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500 premium-ease ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          type="button"
          onClick={onConsult}
          data-testid="sticky-mobile-cta-button"
          className="w-full bg-[#1A3C34] text-white py-4 text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-colors duration-500"
        >
          Book a Consultation Call
        </button>
      </div>

      {/* Desktop floating "Back to top" */}
      <button
        type="button"
        aria-label="Back to top"
        data-testid="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`hidden md:flex fixed bottom-8 right-8 z-40 w-12 h-12 items-center justify-center bg-[#1A3C34] text-white hover:bg-[#D9AF61] hover:text-[#1A3C34] transition-all duration-500 premium-ease ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </>
  );
}
