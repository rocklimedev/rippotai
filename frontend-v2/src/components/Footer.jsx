// src/components/Footer.jsx
'use client';

import Link from 'next/link';
import { navigationLinks, socialLinks, contactInfo } from '@/lib/config';

export const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        padding: '80px 48px 40px',
        borderTop: '1px solid rgba(26, 60, 52, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Main footer content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: '60px',
            paddingBottom: '60px',
            borderBottom: '1px solid rgba(26, 60, 52, 0.15)',
          }}
          className="footer-grid"
        >
          {/* Left - Logo & Contact */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <img
                src="/logo.png"
                alt="Rippotai"
                style={{
                  height: '56px',
                  width: 'auto',
                  display: 'block',
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(26, 60, 52, 0.6)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {contactInfo.address}
              </p>

              <a
                href={`mailto:${contactInfo.email}`}
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(26, 60, 52, 0.6)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  width: 'fit-content',
                }}
                className="hover-gold"
              >
                {contactInfo.email}
              </a>

              <p
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(26, 60, 52, 0.6)',
                  margin: 0,
                }}
              >
                {contactInfo.phone}
              </p>
            </div>
          </div>

          {/* Middle - Navigation */}
          <div>
            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {navigationLinks.map((link, i) => {
                // If internal link (starts with /) → use next/link
                // If external (http, mailto, tel, etc.) → use <a>
                if (link.href.startsWith('/')) {
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '16px',
                        fontWeight: 300,
                        color: '#1a3c34',
                        textDecoration: 'none',
                        letterSpacing: '0.5px',
                        width: 'fit-content',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={i}
                    href={link.href}
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '16px',
                      fontWeight: 300,
                      color: '#1a3c34',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      letterSpacing: '0.5px',
                      width: 'fit-content',
                    }}
                    className="hover-gold"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right - Social */}
          <div>
            <h4
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(26, 60, 52, 0.35)',
                margin: 0,
                marginBottom: '24px',
              }}
            >
              Follow
            </h4>

            <nav
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#1a3c34',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    letterSpacing: '0.5px',
                    width: 'fit-content',
                  }}
                  className="hover-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '12px',
              fontWeight: 300,
              letterSpacing: '1px',
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} Rippotai Architecture. All rights
            reserved.
          </p>

          {/* Powered by */}
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px', // ⬆️ increased from 12px
              fontWeight: 300,
              letterSpacing: '1px',
              marginTop: '8px',
            }}
          >
            Powered by
            <a
              href="https://www.rocklime.com/"
              className="rocklime-link ms-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Rocklime website"
              style={{
                fontSize: '14px', // ⬆️ match or slightly bigger
                fontWeight: 400, // ⬆️ makes "Rocklime" stand out
              }}
            >
              Rocklime
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
