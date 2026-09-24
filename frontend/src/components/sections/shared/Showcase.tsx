import Link from "next/link";
import { getShowcase } from "@/lib/content";
import ShowcaseBehavior from "./ShowcaseBehavior";

/**
 * Motion-poster showcase (autoplay loop, zig-zag slivers, tight gaps).
 * Data-driven so the admin console / landing pages can reuse it with any slide list.
 * One instance per page (the behaviour binds to fixed ids).
 */
export default function Showcase({ slides = getShowcase() }: { slides?: ReturnType<typeof getShowcase> }) {
  const firstSlide = slides[0];
  return (
    <section className="works" id="works">
      <div className="ms-top">
        <div className="wrap">
          <Link href="/projects" data-m="" style={{ color: "var(--green)" }}>
            All projects →
          </Link>
          <span className="c" id="mstype">
            {firstSlide.type}
          </span>
          <span className="r">
            <b id="msn">01</b> / <span id="mst">{String(slides.length).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
      <div className="ms-stage" id="msstage">
        {slides.map((s, i) => (
          <figure key={i} className="ms-card" data-name={s.name} data-type={s.type}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.image} alt={s.name} />
          </figure>
        ))}
      </div>
      <div className="ms-cap" id="mscap">
        <span className="nm" id="msname">
          {firstSlide.name}
        </span>
        <span className="ty" id="msty">
          {firstSlide.type}
        </span>
      </div>
      <div className="ms-timer">
        <i id="mstimer" />
      </div>
      <ShowcaseBehavior />
    </section>
  );
}
