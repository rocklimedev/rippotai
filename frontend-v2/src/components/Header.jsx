"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const scrollToSection = (href) => {
    setMenuOpen(false);

    if (href.startsWith("/")) {
      router.push(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href === "#") {
      if (pathname !== "/") router.push("/");
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }

    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Main Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "background-color 0.4s ease",
          backgroundColor: scrolled ? "rgba(26, 60, 52, 0.95)" : "transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "16px 20px",
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
          >
            <img
              src={
                menuOpen
                  ? "/assets/logo_mono.png"
                  : scrolled
                    ? "/logo.png"
                    : "/assets/logo_mono.png"
              }
              alt="Rippotai"
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: menuOpen ? "#ffffff" : scrolled ? "#1a3c34" : "#ffffff",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "10px 16px",
            }}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Full Screen Menu - Fixed for Mobile */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1a3c34",
          zIndex: 999,
          display: "flex",
          alignItems: "flex-start", // Changed from center
          justifyContent: "center",
          paddingTop: "100px", // ← Important: Space from top
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.4s ease",
          overflowY: "auto",
        }}
      >
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "420px",
            padding: "0 24px 40px",
          }}
        >
          {[
            { label: "About", href: "/about" },
            { label: "Works", href: "/projects" },
            { label: "Achievements", href: "/achievements" },
            { label: "Team", href: "/team" },
            { label: "Services", href: "/services" },
            { label: "Process", href: "/process" },
            { label: "Career", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(17px, 5.2vw, 26px)",
                fontWeight: 300,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#ffffff",
                textDecoration: "none",
                padding: "17px 0", // Good touch target
                width: "100%",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#d9af61";
                e.currentTarget.style.letterSpacing = "4px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.letterSpacing = "2px";
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
