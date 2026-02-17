// src/components/Header.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const noBannerPages = []; // ← add paths like ["/admin", "/dashboard"] if needed
  const hasBanner = !noBannerPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = hasBanner
    ? scrolled
      ? "rgba(26, 60, 52, 0.6)"
      : "transparent"
    : "rgba(26, 60, 52, 0.95)";

  const scrollToSection = (href) => {
    setMenuOpen(false);

    if (href === "#" || href === "/") {
      if (pathname !== "/") {
        router.push("/");
        // wait a tiny bit for navigation then scroll top
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Anchor link on current page
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // Internal page navigation
    router.push(href);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: headerBg,
          transition: "background-color 0.4s ease",
          backdropFilter: scrolled || !hasBanner ? "blur(12px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "24px 48px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                menuOpen
                  ? "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/m8qgu5v4_white%20logo%20X2.png"
                  : "/logo.png"
              }
              alt="Rippotai"
              style={{
                height: "68px",
                width: "auto",
                display: "block",
              }}
            />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "15.5px",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: menuOpen
                ? "#ffffff"
                : hasBanner && !scrolled
                  ? "#ffffff"
                  : "#1a3c34",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
              transition: "color 0.4s ease",
            }}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1a3c34",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.5s ease",
        }}
      >
        <nav style={{ textAlign: "center" }}>
          {[
            { label: "Home", href: "#" },
            { label: "About", href: "/about" },
            { label: "Works", href: "/projects" },
            { label: "Team", href: "/team" },
            { label: "Services", href: "/services" },
            { label: "Process", href: "/process" },
            { label: "Career", href: "/careers" }, // ← note: /career → /careers (match your route)
            { label: "Contact", href: "/contact" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              style={{
                display: "block",
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(28px, 6vw, 42px)",
                fontWeight: 300,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: "#ffffff",
                textDecoration: "none",
                padding: "20px 0",
                transition: "color 0.3s ease, transform 0.3s ease",
              }}
            >
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                }}
                className="menu-item"
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Optional: better hover effect with CSS instead of JS */}
      <style jsx>{`
        .menu-item {
          position: relative;
        }
        .menu-item::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -8px;
          left: 50%;
          background-color: #d9af61;
          transition:
            width 0.4s ease,
            left 0.4s ease;
        }
        .menu-item:hover::after {
          width: 100%;
          left: 0;
        }
        .menu-item:hover {
          color: #d9af61 !important;
          transform: scale(1.08);
        }
      `}</style>
    </>
  );
};
