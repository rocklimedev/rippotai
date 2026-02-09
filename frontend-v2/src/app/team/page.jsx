// app/team/page.jsx

import TeamSection from "./TeamSection";
import "./team.module.css"; // Make sure this imports the new team.module.css

export default function TeamPage() {
  return (
    <div className="team-page">
      {/* Hero Banner Section */}
      <section className="team-hero">
        <h1>Our Team</h1>
        <p>
          A passionate collective of architects, designers, and thinkers shaping
          sustainable, contextual spaces across Delhi NCR and beyond.
        </p>
      </section>

      {/* Main Content Wrapper */}
      <section className="our-team-wrapper">
        {/* Header / Introduction */}
        <div className="heading">
          <h2>Meet the Minds Behind the Architecture</h2>
          <p>
            Our multidisciplinary team brings together creativity, technical
            precision, and a deep commitment to sustainable and
            context-responsive design.
          </p>
        </div>

        {/* The team grid + filters (from TeamSection) */}
        <TeamSection />
      </section>

      {/* Optional: You can add these later */}
      {/* <section className="team-testimonial">...</section> */}
      {/* <section className="team-cta">...</section> */}
    </div>
  );
}

// Dynamic metadata (SSG/SSR friendly)
export async function generateMetadata() {
  return {
    title: "Our Team – Delhi Architectural Firm | Sustainable Design",
    description:
      "Meet our architects from SPA Delhi & beyond – crafting contextual modernism, net-zero projects in Delhi NCR.",
  };
}
