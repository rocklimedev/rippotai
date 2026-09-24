import SplitHeading from "@/components/site/SplitHeading";

export default function Banner() {
  return (
    <section className="pg-banner" id="top-anchor">
      <div className="bimg">
        <img src="/images/about.webp" alt="" />
        <img src="/assets/banners/team.jpg" alt="The Rippotai team" data-fallback="remove" />
      </div>
      <div className="bin">
        <div className="wrap">
          <div>
            <span className="k">Who we are</span>
            <SplitHeading id="h1" text={"We think in cubes"} step={0.1} />
          </div>
          <div className="bmeta">
            <b>The Rippotai team</b>New Delhi
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
