"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// You should move this to data/mock.js or data/process.js
const processSteps = [
  {
    id: 1,
    title: "Discovery",
    description:
      "We begin by deeply understanding your vision, needs, site context, and aspirations. Through site visits, client workshops, and research, we establish a clear foundation for the project.",
  },
  {
    id: 2,
    title: "Concept",
    description:
      "Ideas take shape through sketches, diagrams, and initial models. We explore multiple directions, balancing creativity with practicality, materiality, and spatial logic.",
  },
  {
    id: 3,
    title: "Execution",
    description:
      "Detailed drawings, material specifications, and coordination with consultants ensure precision from concept to construction. We maintain rigorous oversight throughout.",
  },
  {
    id: 4,
    title: "Realisation",
    description:
      "The final phase brings the design to life. We collaborate closely with builders and craftsmen to achieve the intended quality, detail, and atmosphere.",
  },
];

const bannerImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/saa7noph_Scene%2029.png";

const ProcessCurveSlider = () => {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [pathLength, setPathLength] = useState(5200);

  const updateProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;

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
    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  // Measure real path length once SVG is mounted
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  const totalSteps = processSteps.length;
  const activeIndex = Math.min(
    totalSteps - 1,
    Math.floor(progress * totalSteps),
  );
  const localProgress = progress * totalSteps - activeIndex;

  // Gentle zoom effect
  const zoomAmount = Math.sin(localProgress * Math.PI) * 0.15;
  const scale = 1 + zoomAmount;

  // Pan the wide container
  const panPercent = progress * 75;

  // Node positions (viewBox 0 0 4000 1000)
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

  const dashOffset = pathLength * (1 - progress);

  return (
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
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
          {/* SVG – Curvy Timeline */}
          <svg
            viewBox="0 0 4000 1000"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {/* Faint background path */}
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(26, 60, 52, 0.1)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Gold animated progress line */}
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

            {/* Nodes */}
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
                    r={isActive ? 14 : 8}
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

          {/* Step Cards – positioned absolutely */}
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
                  transform: "translateX(-50%)",
                  textAlign: pos.align,
                  opacity: isActive ? 1 : isPassed ? 0.5 : 0.25,
                  zIndex: 2,
                  maxWidth: "320px",
                  pointerEvents: "none", // prevent interaction issues
                }}
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
                    transition: "opacity 0.4s ease, max-height 0.6s ease",
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
      {/* <Header /> */}

      {/* Hero Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "60vh",
          minHeight: "400px",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img
          src={bannerImage}
          alt="Our Process"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "48px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#d9af61",
              marginBottom: "16px",
            }}
          >
            HOW WE WORK
          </div>
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "1px",
              margin: 0,
            }}
          >
            Our Process
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#d9af61",
              marginTop: "20px",
            }}
          />
        </div>
      </section>

      {/* Main Interactive Section */}
      <ProcessCurveSlider />

      {/* <Footer /> */}
      {/* <FloatingCTA /> */}
    </>
  );
}
