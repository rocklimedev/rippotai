'use client';

import Link from 'next/link';
import { navigationLinks, socialLinks, contactInfo } from '@/lib/config';

export const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#ffffff',
        padding: '80px 24px 40px',
        borderTop: '1px solid rgba(26, 60, 52, 0.1)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Main footer */}
        <div className="footer-grid">
          {/* Logo + Contact */}
          <div>
            <div style={{ marginBottom: '32px' }}>
              <img
                src="/logo.png"
                alt="Rippotai"
                style={{
                  height: '56px',
                  width: 'auto',
                }}
              />
            </div>

            <div className="footer-contact">
              <p className="footer-text">{contactInfo.address}</p>

              <a
                href={`mailto:${contactInfo.email}`}
                className="footer-text hover-gold"
              >
                {contactInfo.email}
              </a>

              <p className="footer-text">{contactInfo.phone}</p>
            </div>
          </div>

          {/* Nav + Social (grouped for mobile) */}
          <div className="footer-links-row">
            {/* Navigation */}
            <nav className="footer-links">
              {navigationLinks.map((link, i) =>
                link.href.startsWith('/') ? (
                  <Link key={i} href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={i}
                    href={link.href}
                    className="footer-link hover-gold"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      link.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            {/* Social */}
            <div>
              <h4 className="footer-heading">Follow</h4>

              <nav className="footer-links">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="footer-link hover-gold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Rippotai Architecture. All rights
            reserved.
          </p>

          <p className="footer-powered">
            Powered by{' '}
            <a
              href="https://www.rocklime.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rocklime-link"
            >
              Rocklime
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
