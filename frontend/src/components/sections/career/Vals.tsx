export default function Vals() {
  return (
    <section className="vals">
      <div className="wrap">
        <h2 data-rev="">
          What we <em>look for.</em>
        </h2>
        <div className="vrow" id="vrow">
          <article className="vp on" tabIndex={0}>
            <img src="/images/p_marble.webp" alt="" />
            <div className="vt">
              <span className="n">01</span>
              <h3>Precision</h3>
              <p>
                Every detail is deliberate. From material selection to spatial proportions, we approach design with an
                architect's exactness.
              </p>
            </div>
            <span className="vs">Precision</span>
          </article>
          <article className="vp" tabIndex={0}>
            <img src="/images/p_inner.webp" alt="" />
            <div className="vt">
              <span className="n">02</span>
              <h3>Integrity</h3>
              <p>
                Transparency and honesty define our process. We build trust through clear communication and unwavering
                commitment to quality.
              </p>
            </div>
            <span className="vs">Integrity</span>
          </article>
          <article className="vp" tabIndex={0}>
            <img src="/images/L1.webp" alt="" />
            <div className="vt">
              <span className="n">03</span>
              <h3>Innovation</h3>
              <p>
                We blend timeless design principles with forward-thinking techniques, ensuring our work stays relevant
                and inspiring.
              </p>
            </div>
            <span className="vs">Innovation</span>
          </article>
          <article className="vp" tabIndex={0}>
            <img src="/images/L9.webp" alt="" />
            <div className="vt">
              <span className="n">04</span>
              <h3>Collaboration</h3>
              <p>
                Great spaces emerge from great partnerships. We listen, understand, and co-create with our clients every
                step of the way.
              </p>
            </div>
            <span className="vs">Collaboration</span>
          </article>
        </div>
      </div>
    </section>
  );
}
