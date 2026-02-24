"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

const processSteps = [
  {
    id: 1,
    title: "BRIEFING",
    description:
      "Understanding context, constraints, and client vision to define architectural direction.",
  },
  {
    id: 2,
    title: "DESIGN",
    description:
      "Translating vision into spatial concepts through rigorous design exploration.",
  },
  {
    id: 3,
    title: "EXECUTION",
    description:
      "Precise realization of design intent through meticulous material selection.",
  },
  {
    id: 4,
    title: "HANDOVER",
    description:
      "Final delivery ensuring every detail meets the uncompromising standard.",
  },
];

const bannerImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/saa7noph_Scene%2029.png";

const ProcessCurveSlider = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / scrollable));
    setProgress(p);
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  const totalSteps = processSteps.length;
  const activeIndex = Math.min(
    totalSteps - 1,
    Math.floor(progress * totalSteps),
  );
  const localProgress = progress * totalSteps - activeIndex;

  // Gentler zoom
  const zoomAmount = Math.sin(localProgress * Math.PI) * 0.15;
  const scale = 1 + zoomAmount;

  // Pan across the wide container
  const panPercent = progress * 75;

  // Node positions on SVG (viewBox 0 0 4000 1000)
  const nodes = [
    { cx: 500, cy: 650 },
    { cx: 1500, cy: 280 },
    { cx: 2500, cy: 680 },
    { cx: 3500, cy: 300 },
  ];

  const cardPositions = [
    { left: "12.5%", top: "18%", align: "center" },
    { left: "37.5%", top: "55%", align: "center" },
    { left: "62.5%", top: "22%", align: "center" },
    { left: "87.5%", top: "55%", align: "center" },
  ];

  const curvePath =
    "M 0,500 C 200,500 250,650 500,650 S 1000,280 1500,280 S 2000,680 2500,680 S 3000,300 3500,300 C 3750,300 4000,400 4000,400";

  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(5200);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const dashOffset = pathLength * (1 - progress);

  return (
    <div
      ref={containerRef}
      style={{ height: "500vh", position: "relative" }}
      data-testid="process-curve-slider"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            width: "400vw",
            height: "100%",
            position: "relative",
            transform: `translateX(-${panPercent}%) scale(${scale})`,
            transformOrigin: `${panPercent + 12.5}% 50%`,
            willChange: "transform",
          }}
        >
          <svg
            viewBox="0 0 4000 1000"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(26, 60, 52, 0.1)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d={curvePath}
              fill="none"
              stroke="#d9af61"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={pathLength}
              strokeDashoffset={dashOffset}
            />

            {nodes.map((node, idx) => {
              const isActive = idx === activeIndex;
              const isPassed = idx < activeIndex;
              return (
                <g key={idx}>
                  {isActive && (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="24"
                      fill="rgba(217, 175, 97, 0.12)"
                    />
                  )}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={isActive ? "14" : "8"}
                    fill={isActive || isPassed ? "#d9af61" : "transparent"}
                    stroke="#d9af61"
                    strokeWidth="2"
                  />
                  {(isActive || isPassed) && (
                    <circle cx={node.cx} cy={node.cy} r="4" fill="#ffffff" />
                  )}
                </g>
              );
            })}
          </svg>

          {processSteps.map((step, idx) => {
            const isActive = idx === activeIndex;
            const isPassed = idx < activeIndex;
            const pos = cardPositions[idx];

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: pos.left,
                  top: pos.top,
                  transform: "translate(-50%, 0)",
                  textAlign: pos.align,
                  opacity: isActive ? 1 : isPassed ? 0.5 : 0.25,
                  zIndex: 2,
                  maxWidth: "320px",
                }}
                data-testid={`process-step-${idx}`}
              >
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "13px",
                    fontWeight: 500,
                    letterSpacing: "4px",
                    color: "#d9af61",
                    marginBottom: "16px",
                  }}
                >
                  {String(step.id).padStart(2, "0")}
                </div>

                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: isActive ? "clamp(24px, 2.5vw, 32px)" : "20px",
                    fontWeight: 300,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#1a3c34",
                    margin: 0,
                    marginBottom: "16px",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "15px",
                    fontWeight: 300,
                    color: "#555555",
                    lineHeight: 1.9,
                    margin: 0,
                    maxHeight: isActive ? "200px" : "0px",
                    overflow: "hidden",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function ProcessPage() {
  return (
    <>
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "320px",
          overflow: "hidden",
        }}
      >
        <Image
          src={bannerImage}
          alt="Our Process"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "5%",
            right: "5%",
            maxWidth: "800px",
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: "clamp(10px,2vw,12px)",
              letterSpacing: "3px",
              color: "#d9af61",
              marginBottom: "10px",
            }}
          >
            HOW WE WORK
          </div>

          <h1
            style={{
              fontSize: "clamp(32px,6vw,56px)",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Our Process
          </h1>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "#d9af61",
              marginTop: "18px",
            }}
          />
        </div>
      </section>

      {/* Always use same timeline now */}
      <ProcessCurveSlider />
    </>
  );
}
