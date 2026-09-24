import SplitHeading from "@/components/site/SplitHeading";

export default function Banner() {
  return (
    <section className="pg-banner" id="top-anchor">
      <div className="bimg">
        <img src="/images/L5.webp" alt="Chhabra Marble showroom" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">What we do</span>
            <SplitHeading id="h1" text={"Drawn, then built"} step={0.1} />
          </div>
          <div className="bmeta">
            <b>8 services</b>One studio
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
