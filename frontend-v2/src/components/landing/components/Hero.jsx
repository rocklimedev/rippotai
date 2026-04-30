"use client";

import { useEffect, useState } from "react";
import { ArrowRight, MoveDown } from "lucide-react";

export default function Hero({ data, slides = [], onConsult, onStartProject }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!slides.length) return;

    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5500);

    return () => clearInterval(id);
  }, [slides]);

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-[#0d1f1c]">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.url}
            className={`hero-slide ${i === active ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.url})` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f1c]/70 via-[#0d1f1c]/40 to-[#0d1f1c]/85" />
        <div className="absolute inset-0 bg-[#1A3C34]/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 pt-24">
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
              {data?.eyebrow}
            </span>
          </div>

          <h1 className="text-white text-6xl font-light whitespace-pre-line">
            {data?.headline}
          </h1>

          <p className="mt-6 text-white/80 max-w-xl">{data?.sub}</p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={onConsult}
              className="px-6 py-4 bg-[#D9AF61] text-[#1A3C34]"
            >
              {data?.primaryCta}
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onStartProject}
              className="px-6 py-4 border border-white text-white"
            >
              {data?.secondaryCta}
            </button>
          </div>
        </div>

        {/* Indicators */}
        <div className="mt-10 flex gap-2 ml-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-px ${
                i === active ? "w-10 bg-[#D9AF61]" : "w-5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
