import SplitHeading from "@/components/site/SplitHeading";

export default function Banner() {
  return (
    <section className="pg-banner" id="top-anchor">
      <div className="bimg">
        <img src="/images/hero3.webp" alt="" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">Selected work</span>
            <SplitHeading id="h1" text={"Our Projects"} step={0.1} />
          </div>
          <div className="bmeta">
            <b>16 projects</b>
            {"New Delhi & NCR"}
            <br />
            <span className="cue">
              <i />
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
