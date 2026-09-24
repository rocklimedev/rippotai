export default function CtHero() {
  return (
    <section className="ct-hero" style={{ paddingTop: "clamp(60px,8vw,110px)" }}>
      <div className="wrap">
        <p className="lead-in" data-rev="">
          Start a project, book a consultation, or just say hello — pick one below and the form will follow.
        </p>
        <div className="clock" data-rev="">
          <span className="dot" />
          Studio time · New Delhi
          <b id="clk">
            --<i>:</i>--
          </b>
          <span id="clkd" />
        </div>
      </div>
    </section>
  );
}
