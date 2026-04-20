import { AnimateIn } from "./AnimateIn";

export const FounderMessage = () => {
  return (
    <section
      style={{
        position: "relative",
        padding: "140px 48px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <AnimateIn delay={0.2} distance={50} duration={1.3}>
          <blockquote
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(20px, 2.5vw, 28px)",
              fontWeight: 300,
              color: "#1a3c34",
              lineHeight: 1.7,
              letterSpacing: "0.5px",
              margin: 0,
              padding: "40px 0",
              fontStyle: "italic",
            }}
          >
            Less is more,
            <br /> but clients want “one more.”
          </blockquote>
        </AnimateIn>

        <AnimateIn delay={0.4} distance={30} duration={1}>
          <div style={{ marginTop: "32px" }}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: "#1a3c34",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Sagar Chhabra
            </p>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "#888888",
                letterSpacing: "1px",
                marginTop: "6px",
              }}
            >
              Founder & Principal Architect
            </p>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
