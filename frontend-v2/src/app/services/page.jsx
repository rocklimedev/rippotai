"use client";

import Image from "next/image";
import Link from "next/link"; // ✅ IMPORT THIS
import { AnimateIn } from "@/components/AnimateIn";
import { services, servicesImage } from "@/lib/config";

export default function ServicesPage() {
  return (
    <>
      {/* ================= Banner ================= */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Image
          src={servicesImage}
          alt="Our Services"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
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
            zIndex: 2,
            maxWidth: "800px",
          }}
        >
          <div
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "clamp(10px, 2vw, 12px)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#d9af61",
              marginBottom: "12px",
            }}
          >
            WHAT WE DO
          </div>

          <h1
            style={{
              fontFamily: "Lato, sans-serif",
              fontSize: "clamp(32px, 6vw, 56px)",
              fontWeight: 300,
              color: "#fff",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Our Services
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

      {/* ================= Services ================= */}
      <section
        style={{
          padding: "clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <AnimateIn
                key={idx}
                delay={0.15 * idx}
                distance={60}
                duration={1.2}
              >
                {/* ✅ WRAP WITH LINK */}
                <Link
                  href={`/services/${service.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    className="service-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(70px, 120px) 1fr",
                      gap: "clamp(20px, 4vw, 48px)",
                      padding: "clamp(36px, 6vw, 60px) 0",
                      borderBottom:
                        idx < services.length - 1
                          ? "1px solid rgba(26, 60, 52, 0.1)"
                          : "none",
                      alignItems: "start",
                      cursor: "pointer", // 👈 makes it feel clickable
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: "clamp(70px, 12vw, 120px)",
                        height: "clamp(70px, 12vw, 120px)",
                        border: "1px solid #1a3c34",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={28} strokeWidth={1} color="#1a3c34" />
                    </div>

                    {/* Text */}
                    <div>
                      <h2
                        style={{
                          fontFamily: "Lato, sans-serif",
                          fontSize: "clamp(18px, 3vw, 24px)",
                          fontWeight: 400,
                          color: "#1a3c34",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          marginBottom: "14px",
                        }}
                      >
                        {service.title}
                      </h2>

                      <div
                        style={{
                          width: "30px",
                          height: "1px",
                          background: "#d9af61",
                          marginBottom: "16px",
                        }}
                      />

                      <p
                        style={{
                          fontFamily: "Lato, sans-serif",
                          fontSize: "clamp(14px, 2.4vw, 16px)",
                          color: "#555",
                          lineHeight: 1.8,
                          maxWidth: "650px",
                          margin: 0,
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </section>
    </>
  );
}