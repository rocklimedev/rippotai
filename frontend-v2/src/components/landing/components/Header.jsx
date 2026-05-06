import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/data/site';

const NAV = [
  { label: 'Architecture', href: '/services/architecture' },
  { label: 'Turnkey', href: '/services/turnkey-projects' },
  { label: 'Interior', href: '/services/interiors' },
  { label: 'Furniture', href: '/services/furniture' },
];

export default function Header({ onConsult }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 premium-ease ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col items-center justify-center relative">
        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
          className={`lg:hidden absolute right-6 top-6 p-2 ${
            scrolled ? 'text-[#1A3C34]' : 'text-white'
          }`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo / Brand */}
        <a href="#top" className="flex flex-col items-center gap-2 group">
          {/* Brand Name */}
          <span
            className={`font-heading text-xl md:text-2xl font-light tracking-[0.2em] uppercase ${
              scrolled ? 'text-[#1A3C34]' : 'text-white'
            }`}
          >
            {SITE.brand}
          </span>

          {/* Logo Image */}
          <img
            src="/assets/logos/logo@typo.png"
            alt="Logo"
            className="h-14 md:h-20 object-contain mt-2"
          />
        </a>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 mt-4">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`link-underline text-xs tracking-[0.12em] uppercase ${
                scrolled ? 'text-[#1A3C34]' : 'text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-6 flex flex-col items-center gap-5">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.15em] uppercase text-[#1A3C34]"
              >
                {n.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
