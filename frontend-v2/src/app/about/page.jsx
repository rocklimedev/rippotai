// app/about/page.jsx   ← recommended location in Next.js App Router
"use client";
import { useEffect, useRef, useState } from "react";
import { FloatingCTA } from "@/components/FloatingCTA";
import { AnimateIn } from "@/components/AnimateIn";
const teamImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/ty0yqr54_05b1c7b1-3dfc-4182-ae7b-5b43a03124eb.jpg";

const HorizontalSlider = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const slides = [
    {
      label: "Our Vision",
      text: "To shape environments that endure beyond time and trend. At Rippotai Architecture, we envision spaces that are thoughtful, restrained, and deeply contextual. Our vision is to redefine contemporary architecture through clarity of form, purposeful materiality, and spatial intelligence.",
    },
    {
      label: "Our Mission",
      text: "To translate ideas into built realities through discipline, detail, and design integrity. Rippotai Architecture is committed to delivering architecture that balances aesthetics with function. Our mission is to approach every project with structured thinking, collaborative dialogue, and uncompromising execution.",
    },
  ];

  return (
    <div ref={containerRef} style={{ height: "250vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0px",
            transform: `translateX(${-progress * 50}%)`,
            transition: "transform 0.1s linear",
            width: "200vw",
            height: "100%",
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              style={{
                width: "100vw",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 10vw",
                flexShrink: 0,
              }}
            >
              <div style={{ maxWidth: "700px" }}>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                    color: "#d9af61",
                    marginBottom: "32px",
                  }}
                >
                  {slide.label}
                </div>
                <h2
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 300,
                    color: "#1a3c34",
                    letterSpacing: "1px",
                    lineHeight: 1.2,
                    margin: 0,
                    marginBottom: "40px",
                  }}
                >
                  {slide.label}
                </h2>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "17px",
                    fontWeight: 300,
                    color: "#555555",
                    lineHeight: 2,
                    margin: 0,
                  }}
                >
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: progress >= (idx + 0.3) / slides.length ? "32px" : "8px",
                height: "2px",
                backgroundColor:
                  progress >= (idx + 0.3) / slides.length
                    ? "#d9af61"
                    : "rgba(26, 60, 52, 0.15)",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const values = [
  {
    title: "Precision",
    text: "Every detail is deliberate. From material selection to spatial proportions, we approach design with an architect's exactness.",
  },
  {
    title: "Integrity",
    text: "Transparency and honesty define our process. We build trust through clear communication and unwavering commitment to quality.",
  },
  {
    title: "Innovation",
    text: "We blend timeless design principles with forward-thinking techniques, ensuring our work stays relevant and inspiring.",
  },
  {
    title: "Collaboration",
    text: "Great spaces emerge from great partnerships. We listen, understand, and co-create with our clients every step of the way.",
  },
];

const ValuesSlider = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalSlides = values.length;

  return (
    <div
      ref={containerRef}
      style={{ height: `${(totalSlides + 1) * 100}vh`, position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#f5f1eb",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Section header */}
        <div
          style={{
            position: "absolute",
            top: "48px",
            left: "10vw",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#d9af61",
              marginBottom: "12px",
            }}
          >
            OUR VALUES
          </div>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(28px, 3vw, 40px)",
              fontWeight: 300,
              color: "#1a3c34",
              margin: 0,
            }}
          >
            What drives us forward
          </h2>
        </div>

        {/* Sliding cards */}
        <div
          style={{
            display: "flex",
            gap: "0px",
            transform: `translateX(${-progress * (totalSlides - 1) * (100 / totalSlides)}%)`,
            transition: "transform 0.1s linear",
            width: `${totalSlides * 100}vw`,
            height: "60%",
            alignItems: "center",
          }}
        >
          {values.map((val, idx) => (
            <div
              key={idx}
              style={{
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 10vw",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  maxWidth: "600px",
                  borderLeft: "2px solid #d9af61",
                  padding: "32px 40px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "3px",
                    color: "#1a3c34",
                    marginBottom: "16px",
                  }}
                >
                  {val.title}
                </div>
                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(28px, 3vw, 42px)",
                    fontWeight: 300,
                    color: "#1a3c34",
                    margin: 0,
                    marginBottom: "24px",
                    letterSpacing: "1px",
                  }}
                >
                  {val.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "17px",
                    fontWeight: 300,
                    color: "#555555",
                    lineHeight: 2,
                    margin: 0,
                  }}
                >
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "12px",
          }}
        >
          {values.map((_, idx) => {
            const active =
              progress >= idx / totalSlides &&
              progress < (idx + 1) / totalSlides;
            const passed = progress >= (idx + 1) / totalSlides;

            return (
              <div
                key={idx}
                style={{
                  width: active || passed ? "32px" : "8px",
                  height: "2px",
                  backgroundColor:
                    active || passed ? "#d9af61" : "rgba(26, 60, 52, 0.15)",
                  transition: "all 0.4s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return (
    <>
      {/* You can move Header & Footer here or use a layout.tsx */}
      {/* <Header /> */}

      {/* Banner */}
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
          src={teamImage}
          alt="Rippotai Team"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.35)",
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
            WHO WE ARE
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
            About Us
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

      <HorizontalSlider />

      {/* About Us Text */}
      <section style={{ padding: "120px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={40} duration={1}>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#d9af61",
                marginBottom: "32px",
              }}
            >
              ABOUT US
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15} distance={50} duration={1.2}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 300,
                color: "#1a3c34",
                lineHeight: 1.6,
                margin: 0,
                marginBottom: "40px",
              }}
            >
              We design spaces that inspire innovation, foster warmth, and shape
              the future — creating environments where life and architecture
              become one.
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.3} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#444444",
                lineHeight: 2,
                margin: 0,
                marginBottom: "24px",
              }}
            >
              “Rippotai,” is inspired by the Japanese term for “cube,”
              symbolizing the fundamental form of objects and the essence of
              design. In geometry, the cube stands as a primary shape, a
              building block from which complex forms and structures arise. Its
              uniformity and symmetry provide a sense of order and coherence,
              making it a powerful symbol in the world of design.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.4} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#444444",
                lineHeight: 2,
                margin: 0,
              }}
            >
              The functionality of a cube, with its capacity to be stacked,
              rotated, and transformed, mirrors our approach to versatile and
              adaptive design. We are committed to creating iconic, functional,
              and user-centric designs that push boundaries while remaining
              rooted in timeless principles.
            </p>
          </AnimateIn>
        </div>
      </section>

      <ValuesSlider />

      {/* Our Story */}
      <section style={{ padding: "120px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={40} duration={1}>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#d9af61",
                marginBottom: "32px",
              }}
            >
              OUR STORY
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15} distance={50} duration={1.2}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 300,
                color: "#1a3c34",
                lineHeight: 1.6,
                margin: 0,
                marginBottom: "48px",
              }}
            >
              Rippotai Architecture was founded on the belief that architecture
              is more than construction — it is responsibility.
            </h2>
          </AnimateIn>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "48px" }}
          >
            {[
              {
                year: "The Beginning",
                text: "What began as a pursuit of disciplined design evolved into a studio defined by structure, minimalism, and material honesty. From early conceptual explorations to fully realized architectural works, our journey has been shaped by one consistent principle: restraint creates strength.",
              },
              {
                year: "The Idea",
                text: "We started with a clear idea — that architecture should speak quietly, yet stand confidently. Over time, Rippotai has grown into a practice grounded in research, collaboration, and execution. Each project has contributed to refining our philosophy — one that values precision over excess and clarity over complication.",
              },
              {
                year: "Today & Beyond",
                text: "Today, Rippotai Architecture continues to design spaces that are intentional, functional, and enduring. Our journey is far from over — every new project is a new chapter in the Rippotai story.",
              },
            ].map((item, idx) => (
              <AnimateIn
                key={idx}
                delay={0.15 * idx}
                distance={40}
                duration={1}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: "48px",
                    alignItems: "start",
                  }}
                  className="story-grid"
                >
                  <div
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "2px",
                      color: "#d9af61",
                      paddingTop: "4px",
                    }}
                  >
                    {item.year}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "16px",
                      fontWeight: 300,
                      color: "#444444",
                      lineHeight: 2,
                      margin: 0,
                      paddingBottom: "48px",
                      borderBottom:
                        idx < 2 ? "1px solid rgba(26, 60, 52, 0.08)" : "none",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* <FloatingCTA /> */}
      {/* <Footer /> */}
    </>
  );
}
