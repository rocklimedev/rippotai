import SplitHeading from "@/components/site/SplitHeading";

export default function Hero() {
  return (
    <section className="hero" id="top-anchor">
      <div className="hero-slides" id="slides">
        <figure className="on">
          <img src="/images/hero1.webp" alt="Moksh Dham" />
        </figure>
        <figure>
          <img src="/images/hero2.webp" alt="Vinay Khanna Law Chambers" />
        </figure>
        <figure>
          <img src="/images/hero3.webp" alt="Tropical Home" />
        </figure>
        <figure>
          <img src="/images/hero4.webp" alt="The Inner House" />
        </figure>
      </div>
      <div className="hero-in">
        <div className="wrap">
          <SplitHeading id="h1" text={"It's all about the perspective"} step={0.07} />
          <p className="sub">
            An architecture and interiors practice from New Delhi, building iconic, functional and user-centric spaces
            from the simplest of forms — the cube.
          </p>
        </div>
      </div>
      <div className="hero-meta">
        <div className="wrap">
          <div className="scrollcue">
            <i />
            <span>Scroll</span>
          </div>
          <div className="hero-cap" id="hcap">
            <b>Moksh Dham</b>Institutional · Ongoing since 2025
          </div>
          <div className="dots" id="dots" />
        </div>
      </div>
    </section>
  );
}
