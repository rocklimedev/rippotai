// app/team/page.jsx
"use client";
import Image from "next/image";
import { AnimateIn } from "../../components/AnimateIn"; // adjust path

// import { Header } from "../../components/Header";
// import { Footer } from "../../components/Footer";
// import { FloatingCTA } from "../../components/FloatingCTA";

const teamImage =
  "https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/ty0yqr54_05b1c7b1-3dfc-4182-ae7b-5b43a03124eb.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Sagar Chhabra",
    designation: "Founder & Principal Architect",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/9o2cyroa_6.png",
  },
  {
    id: 2,
    name: "Jayant",
    designation: "Architect",
    image: "/assets/jayant.jpg", // ← make sure this file exists in /public/assets/
  },
  {
    id: 3,
    name: "Sarthi",
    designation: "Architect",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/o3hg2i6b_9.png",
  },
  {
    id: 4,
    name: "Priyanka",
    designation: "Admin",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/2w7pi55a_8.png",
  },
  {
    id: 5,
    name: "Megha Chhabra",
    designation: "Interior Decor and Styling Head",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/0ttq1u6w_1.png",
  },
  {
    id: 6,
    name: "Bhav Lamba",
    designation: "Content Strategy & Creative Lead",
    image: "/assets/bhav.jpg", // ← make sure this file exists in /public/assets/
  },
  {
    id: 7,
    name: "Shivani",
    designation: "Project Manager",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/1q89sc6f_3.png",
    tag: "Alumni",
  },
  {
    id: 8,
    name: "Aniket",
    designation: "Architect",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/fxkot4hb_4.png",
    tag: "Alumni",
  },
  {
    id: 9,
    name: "Shivam",
    designation: "Architect",
    image:
      "https://customer-assets.emergentagent.com/job_482196a1-b994-40a0-ac44-c060e3262933/artifacts/r6o8yojn_2.png",
    tag: "Alumni",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* <Header /> */}

      {/* Hero Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "auto",
          minHeight: "400px",
          maxHeight: "75vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <Image
          src={teamImage}
          alt="Rippotai Team"
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
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
            Our Team
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

      {/* Team Introduction + Grid */}
      <section style={{ padding: "100px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={40} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666666",
                lineHeight: 1.8,
                maxWidth: "600px",
                marginBottom: "60px",
              }}
            >
              The people behind every space we create. A team of architects,
              designers, and visionaries committed to crafting spaces that
              endure.
            </p>
          </AnimateIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px",
            }}
            className="team-grid"
          >
            {teamMembers.map((member, idx) => (
              <AnimateIn
                key={member.id}
                delay={0.08 * idx}
                distance={50}
                duration={1.2}
              >
                <div>
                  {/* Photo Container */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "3 / 4",
                      backgroundColor: "#f0eeea",
                      overflow: "hidden",
                      position: "relative",
                      marginBottom: "16px",
                    }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 220px"
                        quality={85}
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Lato', sans-serif",
                          fontSize: "40px",
                          fontWeight: 300,
                          color: "rgba(26, 60, 52, 0.15)",
                        }}
                      >
                        {String(member.id).padStart(2, "0")}
                      </div>
                    )}

                    {member.tag && (
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          fontFamily: "'Lato', sans-serif",
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "rgba(217, 175, 97, 0.85)",
                          backgroundColor: "rgba(26, 60, 52, 0.55)",
                          padding: "5px 10px",
                          lineHeight: 1,
                        }}
                      >
                        {member.tag}
                      </span>
                    )}
                  </div>

                  {/* Name & Designation */}
                  <h3
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#1a3c34",
                      letterSpacing: "0.5px",
                      margin: 0,
                      marginBottom: "4px",
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#888888",
                      margin: 0,
                    }}
                  >
                    {member.designation}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
      {/* <FloatingCTA /> */}
    </>
  );
}
