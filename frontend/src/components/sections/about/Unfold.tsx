export default function Unfold() {
  return (
    <section className="unfold" id="unfold">
      <div className="uf-stage">
        <div className="uf-head">
          <div className="wrap">
            <h2>
              Six faces, <em>one form.</em>
            </h2>
            <span id="ufs">Scroll to unfold</span>
          </div>
        </div>
        <div className="uf-cube-wrap">
          <div className="cube" id="ucube">
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
        <div className="uf-grid" id="ufg">
          <article className="val" style={{ "--i": "0" }}>
            <span className="n">01</span>
            <h3>The name</h3>
            <p>
              “Rippotai” is inspired by the Japanese term for “cube” — the fundamental form of objects and the essence
              of design.
            </p>
          </article>
          <article className="val" style={{ "--i": "1" }}>
            <span className="n">02</span>
            <h3>Precision</h3>
            <p>
              Every detail is deliberate. From material selection to spatial proportions, we approach design with an
              architect's exactness.
            </p>
          </article>
          <article className="val" style={{ "--i": "2" }}>
            <span className="n">03</span>
            <h3>Integrity</h3>
            <p>
              Transparency and honesty define our process. We build trust through clear communication and unwavering
              commitment to quality.
            </p>
          </article>
          <article className="val" style={{ "--i": "3" }}>
            <span className="n">04</span>
            <h3>Innovation</h3>
            <p>
              We blend timeless design principles with forward-thinking techniques, ensuring our work stays relevant and
              inspiring.
            </p>
          </article>
          <article className="val" style={{ "--i": "4" }}>
            <span className="n">05</span>
            <h3>Collaboration</h3>
            <p>
              Great spaces emerge from great partnerships. We listen, understand, and co-create with our clients every
              step of the way.
            </p>
          </article>
          <article className="val" style={{ "--i": "5" }}>
            <span className="n">06</span>
            <h3>The approach</h3>
            <p>
              The functionality of a cube mirrors our approach to adaptive design. We are committed to functional,
              iconic, user-centric work.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
