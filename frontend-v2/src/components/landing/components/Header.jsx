import { useEffect, useState } from 'react';
import { SITE } from '@/data/site';

const NAV = [
  { label: 'Architecture', href: '/services/architecture' },
  { label: 'Turnkey', href: '/services/turnkey-projects' },
  { label: 'Interior', href: '/services/interiors' },
  { label: 'Furniture', href: '/services/furniture' },
];

export default function Header({ onConsult }) {
  const [scrolled, setScrolled] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-4 flex flex-col items-center justify-center">
        {/* Logo / Brand */}
        <a href="#top" className="flex flex-col items-center gap-2 group">
          {/* Brand Name */}
          <span
            className={`font-heading text-lg sm:text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-center ${
              scrolled ? 'text-[#1A3C34]' : 'text-white'
            }`}
          >
            {SITE.brand}
          </span>

          {/* Logo Image */}
          <img
            src="/assets/logos/logo@typo.png"
            alt="Logo"
            className="h-12 sm:h-16 md:h-20 object-contain mt-2"
          />
        </a>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-5">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`link-underline text-[10px] sm:text-xs tracking-[0.12em] uppercase transition-colors duration-300 ${
                scrolled ? 'text-[#1A3C34]' : 'text-white'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
