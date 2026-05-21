'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Works', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Career', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Achievements', href: '/achievements' },
];

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const scrollToSection = useCallback(
    (href) => {
      setMenuOpen(false);

      if (href.startsWith('/')) {
        router.push(href);

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        return;
      }

      if (href === '#') {
        if (pathname !== '/') {
          router.push('/');
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }

        return;
      }

      if (pathname !== '/') {
        router.push('/' + href);
        return;
      }

      const el = document.querySelector(href);

      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        });
      }
    },
    [pathname, router],
  );

  return (
    <>
      {/* DESKTOP HEADER */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          height: '95px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div
          style={{
            maxWidth: '1450px',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 48px',
            position: 'relative',
          }}
        >
          {/* LOGO */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#');
            }}
            style={{
              backgroundColor: '#ffffff',
              padding: '8px 14px',
              zIndex: 2,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
            aria-label="Home"
          >
            <img
              src="/logo.png"
              alt="Rippotai"
              width={100}
              height={100}
              loading="eager"
              decoding="async"
              style={{
                height: '78px',
                width: '64px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </a>

          {/* DESKTOP NAV */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '38px',
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#1a3c34',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#d9af61';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#1a3c34';
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={menuOpen}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '15px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1a3c34',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
            }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
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
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
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
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* RESPONSIVE */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
};
