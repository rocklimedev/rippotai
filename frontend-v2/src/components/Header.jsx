"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const noBannerPages = [];
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

    // Route navigation
    if (href.startsWith("/")) {
      router.push(href);
      window.scrollTo({ top: 0 });
      return;
    }

    // Home navigation
    if (href === "#") {
      if (pathname !== "/") {
        router.push("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Anchor links — go home first if needed
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
          backgroundColor: "transparent",
          transition: "background-color 0.4s ease",
          borderBottom: "none",
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#");
            }}
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
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
          </a>

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

      {/* Full-screen menu overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#1a3c34",
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
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
            { label: "Career", href: "/career" },
            { label: "Contact", href: "/contact" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              style={{
                display: "block",
                fontFamily: "'Lato', sans-serif",
                fontSize: "36px",
                fontWeight: 300,
                letterSpacing: "6px",
                textTransform: "uppercase",
                color: "#ffffff",
                textDecoration: "none",
                padding: "16px 0",
                transition: "color 0.3s ease, transform 0.3s ease",
                transformOrigin: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#d9af61";
                e.currentTarget.style.transform = "scale(1.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span className="hover-underline">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};
