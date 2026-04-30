import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/data/site";

const NAV = [
  { label: "Process", href: "#process" },
  { label: "What You Get", href: "#what-you-get" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

export default function Header({ onConsult }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 premium-ease ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a
          href="#top"
          data-testid="brand-link"
          className="flex items-center gap-3 group"
        >
          <span
            className={`font-heading text-xl md:text-2xl font-light tracking-[0.2em] uppercase ${
              scrolled ? "text-[#1A3C34]" : "text-white"
            }`}
          >
            {SITE.brand}
          </span>
          <span
            className={`hidden lg:inline-block w-10 h-px ${
              scrolled ? "bg-[#D9AF61]" : "bg-white/70"
            }`}
          />
          <span
            className={`hidden lg:inline text-[10px] font-bold uppercase tracking-[0.25em] ${
              scrolled ? "text-[#4A6B63]" : "text-white/80"
            }`}
          >
            Architecture
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-${n.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`link-underline text-sm tracking-[0.15em] uppercase ${
                scrolled ? "text-[#1A3C34]" : "text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            data-testid="header-cta-consult"
            onClick={onConsult}
            className={`hidden sm:inline-flex items-center px-6 py-3 text-sm tracking-[0.15em] uppercase border transition-colors duration-500 premium-ease ${
              scrolled
                ? "bg-[#1A3C34] text-white border-[#1A3C34] hover:bg-[#D9AF61] hover:text-[#1A3C34] hover:border-[#D9AF61]"
                : "bg-white text-[#1A3C34] border-white hover:bg-[#D9AF61] hover:border-[#D9AF61]"
            }`}
          >
            Book Consultation
          </button>
          <button
            type="button"
            aria-label="Toggle menu"
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((s) => !s)}
            className={`lg:hidden p-2 ${
              scrolled ? "text-[#1A3C34]" : "text-white"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${n.label
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="text-sm tracking-[0.15em] uppercase text-[#1A3C34]"
              >
                {n.label}
              </a>
            ))}
            <button
              type="button"
              data-testid="mobile-cta-consult"
              onClick={() => {
                setOpen(false);
                onConsult();
              }}
              className="mt-2 inline-flex items-center justify-center px-6 py-4 text-sm tracking-[0.15em] uppercase bg-[#1A3C34] text-white"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
