"use client";

import { useEffect, useRef, useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import { values, aboutImage } from "@/lib/config";

/************************************
 * SMOOTH SCROLL PROGRESS HOOK
 ************************************/
const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const scrollable = el.offsetHeight - window.innerHeight;
          const scrolled = -rect.top;
          const p = Math.max(0, Math.min(1, scrolled / scrollable));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref]);

  return progress;
};

/************************************
 * HORIZONTAL SLIDER (Vision & Mission)
 ************************************/
const HorizontalSlider = () => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

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
          minHeight: "100vh",
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
            width: `${slides.length * 100}vw`,
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: `translateX(${-progress * (slides.length - 1) * 100}vw)`,
            transition: "none",
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
                padding: "0 5vw", // Better mobile padding
              }}
            >
              <div style={{ maxWidth: "720px", width: "100%" }}>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#d9af61",
                    marginBottom: "24px",
                  }}
                >
                  {slide.label}
                </div>

                <h2
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(28px, 6vw, 48px)",
                    fontWeight: 300,
                    color: "#1a3c34",
                    marginBottom: "32px",
                    lineHeight: 1.2,
                  }}
                >
                  {slide.label}
                </h2>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    fontWeight: 300,
                    color: "#555555",
                    lineHeight: 1.9,
                  }}
                >
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: progress >= idx / slides.length ? "32px" : "8px",
                height: "2px",
                backgroundColor:
                  progress >= idx / slides.length
                    ? "#d9af61"
                    : "rgba(26, 60, 52, 0.15)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/************************************
 * VALUES SLIDER
 ************************************/
const ValuesSlider = () => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
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
          minHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#f5f1eb",
          display: "flex",
          alignItems: "center",
          padding: "0 5vw",
        }}
      >
        {/* Header */}
        <div style={{ position: "absolute", top: "40px", left: "5vw" }}>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "3px",
              color: "#d9af61",
              marginBottom: "12px",
            }}
          >
            OUR VALUES
          </div>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(26px, 5.5vw, 40px)",
              fontWeight: 300,
              color: "#1a3c34",
              lineHeight: 1.2,
            }}
          >
            What drives us forward
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            width: `${totalSlides * 100}vw`,
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: `translateX(${-progress * (totalSlides - 1) * 100}vw)`,
            transition: "none",
          }}
        >
          {values.map((val, idx) => (
            <div
              key={idx}
              style={{
                width: "100vw",
                padding: "0 5vw",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  maxWidth: "620px",
                  borderLeft: "3px solid #d9af61",
                  paddingLeft: "28px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "3px",
                    color: "#1a3c34",
                    marginBottom: "12px",
                  }}
                >
                  {val.title}
                </div>

                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(26px, 5vw, 42px)",
                    fontWeight: 300,
                    color: "#1a3c34",
                    marginBottom: "24px",
                    lineHeight: 1.2,
                  }}
                >
                  {val.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "clamp(15px, 4vw, 17px)",
                    fontWeight: 300,
                    color: "#555",
                    lineHeight: 1.9,
                  }}
                >
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
          }}
        >
          {values.map((_, idx) => {
            const sectionStart = idx / totalSlides;
            const sectionEnd = (idx + 1) / totalSlides;
            const active = progress >= sectionStart && progress < sectionEnd;
            const passed = progress >= sectionEnd;

            return (
              <div
                key={idx}
                style={{
                  width: active || passed ? "32px" : "8px",
                  height: "2px",
                  backgroundColor:
                    active || passed ? "#d9af61" : "rgba(26, 60, 52, 0.15)",
                  transition: "all 0.3s ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

/************************************
 * MAIN ABOUT PAGE
 ************************************/
export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <img
          src={aboutImage}
          alt="Rippotai Team"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />

        {/* Heading */}
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "5vw",
            right: "5vw",
          }}
        >
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "11px",
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
              fontSize: "clamp(36px, 7vw, 56px)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            About Us
          </h1>

          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "#d9af61",
              marginTop: "24px",
            }}
          />
        </div>
      </section>

      <HorizontalSlider />

      {/* About Text Section */}
      <section style={{ padding: "100px 5vw 120px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AnimateIn>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#d9af61",
                marginBottom: "32px",
              }}
            >
              ABOUT US
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(24px, 5.5vw, 36px)",
                fontWeight: 300,
                color: "#1a3c34",
                lineHeight: 1.5,
                marginBottom: "40px",
              }}
            >
              We design spaces that inspire innovation, foster warmth, and shape
              the future — creating environments where life and architecture
              become one.
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(15px, 4vw, 17px)",
                color: "#444",
                lineHeight: 2,
                marginBottom: "28px",
              }}
            >
              “Rippotai,” is inspired by the Japanese term for “cube,”
              symbolizing the fundamental form of objects and the essence of
              design.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.4}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(15px, 4vw, 17px)",
                color: "#444",
                lineHeight: 2,
              }}
            >
              The functionality of a cube mirrors our approach to adaptive
              design. We are committed to creating functional, iconic,
              user-centric work.
            </p>
          </AnimateIn>
        </div>
      </section>

      <ValuesSlider />

      {/* Our Story Section */}
      <section style={{ padding: "100px 5vw" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <AnimateIn>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "11px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#d9af61",
                marginBottom: "32px",
              }}
            >
              OUR STORY
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "clamp(24px, 5.5vw, 36px)",
                fontWeight: 300,
                color: "#1a3c34",
                lineHeight: 1.5,
                marginBottom: "48px",
              }}
            >
              Rippotai Architecture was founded on the belief that architecture
              is more than construction — it is responsibility.
            </h2>
          </AnimateIn>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "60px" }}
          >
            {[
              {
                year: "The Beginning",
                text: "What began as a pursuit of disciplined design evolved into a studio defined by material honesty and structural clarity.",
              },
              {
                year: "The Idea",
                text: "We believe architecture should speak quietly, yet stand confidently—refined through precision and restraint.",
              },
              {
                year: "Today & Beyond",
                text: "We continue creating purposeful, enduring spaces. Every new project is a new chapter in our story.",
              },
            ].map((item, idx) => (
              <AnimateIn key={idx} delay={0.1 * idx}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "20px",
                    "@media (min-width: 768px)": {
                      gridTemplateColumns: "180px 1fr",
                      gap: "48px",
                    },
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "15px",
                      letterSpacing: "2px",
                      color: "#d9af61",
                      fontWeight: 500,
                    }}
                  >
                    {item.year}
                  </div>

                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "clamp(15px, 4vw, 17px)",
                      color: "#444",
                      lineHeight: 2,
                      paddingBottom: idx < 2 ? "40px" : "0",
                      borderBottom:
                        idx < 2 ? "1px solid rgba(26,60,52,0.1)" : "none",
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
    </>
  );
}
