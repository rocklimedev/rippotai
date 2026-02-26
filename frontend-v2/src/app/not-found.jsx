"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function NotFound() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        backgroundColor: "#1a3c34",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Subtle background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(217,175,97,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(217,175,97,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main content */}
      <div
        style={{
          textAlign: "center",
          padding: "0 24px",
          zIndex: 2,
          maxWidth: "700px",
        }}
      >
        <AnimateIn delay={0} distance={40} duration={1}>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#d9af61",
              marginBottom: "24px",
            }}
          >
            Error 404
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1} distance={50} duration={1.1}>
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(56px, 12vw, 140px)",
              fontWeight: 200,
              color: "#f5f5f5",
              letterSpacing: "2px",
              margin: 0,
              lineHeight: 1,
            }}
          >
            404
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.2} distance={50} duration={1.2}>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 300,
              color: "#ffffff",
              marginTop: "24px",
              marginBottom: "20px",
            }}
          >
            The page you’re looking for doesn’t exist
          </h2>
        </AnimateIn>

        <AnimateIn delay={0.3} distance={50} duration={1.2}>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.8,
              marginBottom: "40px",
            }}
          >
            It may have been moved, removed, or never created. Let’s guide you
            back to something meaningful.
          </p>
        </AnimateIn>

        <AnimateIn delay={0.4} distance={40} duration={1}>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "14px 36px",
              fontFamily: "'Lato', sans-serif",
              fontSize: "13px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#1a3c34",
              backgroundColor: "#d9af61",
              borderRadius: "2px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c89a4f";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#d9af61";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Back to Home
          </Link>
        </AnimateIn>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "#d9af61",
          opacity: 0.7,
        }}
      />
    </section>
  );
}
