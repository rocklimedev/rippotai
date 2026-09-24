export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div>
            <p className="eyebrow" data-n="1.0" data-rev="">
              Where it began
            </p>
            <h2 data-rev="mask">About Us</h2>
            <p data-rev="">
              “Rippotai,” is inspired by the Japanese term for “cube,” symbolizing the fundamental form of objects and
              the essence of design.
            </p>
            <p data-rev="">
              In geometry, the cube stands as a primary shape, a building block from which complex forms and structures
              arise. Its uniformity and symmetry provide a sense of order and coherence.
            </p>
            <p data-rev="">
              The functionality of a cube — stacked, rotated, transformed — mirrors our approach to versatile and
              adaptive design. In architecture, the cube's simplicity serves as a canvas for creativity.
            </p>
            <p data-rev="">
              It encourages us to think beyond conventional forms and experiment with space, light, and material. We are
              committed to creating iconic, functional, and user-centric designs.
            </p>
          </div>
          <div className="figure" data-rev="img">
            <img src="/images/about.webp" alt="Rippotai project" />
            <span className="tag">The Practice</span>
          </div>
        </div>
        <div className="stats">
          <div data-rev="">
            <b className="num" data-to="120">
              0
            </b>
            <span>Projects delivered</span>
          </div>
          <div data-rev="">
            <b className="num" data-to="12">
              0
            </b>
            <span>Years of practice</span>
          </div>
          <div data-rev="">
            <b className="num" data-to="4">
              0
            </b>
            <span>Service verticals</span>
          </div>
          <div data-rev="">
            <b className="num" data-to="98" data-suf="%">
              0
            </b>
            <span>On-time handover</span>
          </div>
        </div>
      </div>
    </section>
  );
}
