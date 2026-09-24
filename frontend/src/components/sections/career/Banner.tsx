import SplitHeading from "@/components/site/SplitHeading";

export default function Banner() {
  return (
    <section className="pg-banner" id="top-anchor">
      <div className="bimg">
        <img src="/images/L2.webp" alt="The Rippotai studio at work" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">Careers</span>
            <SplitHeading id="h1" text={"Build with us."} step={0.1} />
          </div>
          <div className="bmeta">
            <b>Open applications</b>New Delhi studio
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
