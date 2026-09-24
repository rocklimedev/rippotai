import SplitHeading from "@/components/site/SplitHeading";

export default function Banner() {
  return (
    <section className="pg-banner" id="top-anchor">
      <div className="bimg">
        <img src="/images/L8.webp" alt="" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">Contact us</span>
            <SplitHeading id="h1" text={"Let's talk."} step={0.1} />
          </div>
          <div className="bmeta">
            <b>Rippotai Studio</b>Peeragarhi, New Delhi
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
