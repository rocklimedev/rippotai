'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const scrollToSection = (href) => {
    setMenuOpen(false);

    if (href.startsWith('/')) {
      router.push(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (href === '#') {
      if (pathname !== '/') {
        router.push('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (pathname !== '/') {
      router.push('/' + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* MAIN HEADER - No background when scrolled */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'transparent', // Always transparent
          transition: 'all 0.4s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '20px 48px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#');
            }}
          >
            <img
              src={
                menuOpen
                  ? '/assets/logo_mono.png'
                  : scrolled
                    ? '/logo.png'
                    : '/assets/logo_mono.png'
              }
              alt="Rippotai"
              style={{
                height: '62px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s ease',
              }}
            />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '15px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: menuOpen ? '#ffffff' : scrolled ? '#1a3c34' : '#ffffff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* FULL SCREEN MENU - Smaller Items */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#1a3c34',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.5s ease',
          overflowX: 'hidden',
        }}
      >
        <nav
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '0 20px',
          }}
        >
          {[
            { label: 'About', href: '/about' },
            { label: 'Works', href: '/projects' },
            { label: 'Team', href: '/team' },
            { label: 'Services', href: '/services' },
            { label: 'Process', href: '/process' },
            { label: 'Career', href: '/careers' },
            { label: 'Contact', href: '/contact' },
            { label: 'Achievements', href: '/achievements' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(18px, 4.5vw, 28px)',
                fontWeight: 300,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '14px 0',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#d9af61';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
