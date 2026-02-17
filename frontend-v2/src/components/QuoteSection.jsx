import { AnimateIn } from "./AnimateIn";

export const QuoteSection = () => {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "#ffffff",
        padding: "120px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Large quotation marks */}
        <AnimateIn delay={0} distance={30} duration={1}>
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "120px",
              color: "rgba(217, 175, 97, 0.2)",
              display: "block",
              lineHeight: 0.6,
              userSelect: "none",
            }}
          >
            {"\u201C"}
          </span>
        </AnimateIn>

        <AnimateIn delay={0.2} distance={50} duration={1.3}>
          <blockquote
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 700,
              color: "#1a3c34",
              lineHeight: 1.3,
              letterSpacing: "1px",
              margin: 0,
              padding: "40px 0",
            }}
          >
            Its all about the perspective
          </blockquote>
        </AnimateIn>
      </div>
    </section>
  );
};
