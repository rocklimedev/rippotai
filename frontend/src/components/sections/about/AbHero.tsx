export default function AbHero() {
  return (
    <section className="ab-hero" style={{ minHeight: "auto", padding: "clamp(70px,9vw,120px) 0 40px" }}>
      <div className="wrap">
        <div>
          <p className="lead-in" data-rev="" style={{ marginBottom: "22px" }}>
            We design spaces that inspire innovation, foster warmth, and shape the future.
          </p>
          <p data-rev="">
            An architecture and interiors studio in New Delhi. Every project starts where geometry starts — with the
            simplest, most honest form.
          </p>
        </div>
        <div data-rev="">
          <div className="cube-wrap" id="cw">
            <div className="cube" id="cube">
              <div className="face f-front">
                <span className="n">01</span>
                <b>The name</b>
              </div>
              <div className="face f-right">
                <span className="n">02</span>
                <b>Precision</b>
              </div>
              <div className="face f-back">
                <span className="n">03</span>
                <b>Integrity</b>
              </div>
              <div className="face f-left">
                <span className="n">04</span>
                <b>Innovation</b>
              </div>
              <div className="face f-top">
                <span className="n">05</span>
                <b>Collaboration</b>
              </div>
              <div className="face f-bottom">
                <span className="n">06</span>
                <b>The approach</b>
              </div>
            </div>
          </div>
          <div className="cube-hint">Drag to turn the cube</div>
        </div>
      </div>
    </section>
  );
}
