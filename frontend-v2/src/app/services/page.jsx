// app/services/page.jsx
"use client";
import Image from "next/image";
import { AnimateIn } from "../../components/AnimateIn";
import { Building2, Palette, Armchair, KeyRound } from "lucide-react";

// Optional: move to data/services.js later
const services = [
  {
    icon: KeyRound,
    title: "Turnkey Projects",
    description:
      "End-to-end project delivery from concept to completion. We manage every detail — design, procurement, construction, and finishing — so you can move into a fully finished space without a worry.",
  },
  {
    icon: Building2,
    title: "Architecture",
    description:
      "We create visually striking, functional spaces inspired by the simplicity and versatility of the cube. Our architectural practice is rooted in a deep understanding of form, context, and the human experience of space.",
  },
  {
    icon: Palette,
    title: "Interiors",
    description:
      "Our interior designs blend style and practicality, tailored to reflect your personality and needs. We craft environments that are as beautiful as they are livable, with every detail considered.",
  },
  {
    icon: Armchair,
    title: "Furniture",
    description:
      "Our niche furniture pieces are uniquely designed to reflect our brand's philosophy, adding distinct character and functionality to your space. Each piece is a statement of craft and intention.",
  },
];

const bannerImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/p8r3ckuw_Scene%2025%281%29.png";

export default function ServicesPage() {
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
        <Image
          src={bannerImage}
          alt="Rippotai Services"
          fill
          priority
          quality={82}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
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
            WHAT WE DO
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
            Our Services
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

      {/* Services List */}
      <section
        style={{ padding: "100px 48px 120px", backgroundColor: "#ffffff" }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <AnimateIn
                key={idx}
                delay={0.15 * idx}
                distance={60}
                duration={1.3}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px 1fr",
                    gap: "48px",
                    alignItems: "start",
                    padding: "60px 0",
                    borderBottom:
                      idx < services.length - 1
                        ? "1px solid rgba(26, 60, 52, 0.1)"
                        : "none",
                  }}
                  className="service-page-grid"
                >
                  {/* Icon Box */}
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      border: "1px solid #1a3c34",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={40} strokeWidth={1} color="#1a3c34" />
                  </div>

                  {/* Content */}
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "24px",
                        fontWeight: 400,
                        color: "#1a3c34",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        margin: 0,
                        marginBottom: "16px",
                      }}
                    >
                      {service.title}
                    </h2>

                    <div
                      style={{
                        width: "30px",
                        height: "1px",
                        backgroundColor: "#d9af61",
                        marginBottom: "20px",
                      }}
                    />

                    <p
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: "16px",
                        fontWeight: 300,
                        color: "#555555",
                        lineHeight: 1.9,
                        margin: 0,
                        maxWidth: "600px",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* <Footer /> */}
      {/* <FloatingCTA /> */}
    </>
  );
}
