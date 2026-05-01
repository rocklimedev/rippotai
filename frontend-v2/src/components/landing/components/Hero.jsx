'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, MoveDown } from 'lucide-react';

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
            className={`hero-slide ${i === active ? 'active' : ''}`}
            style={{ backgroundImage: `url(${s.url})` }}
          />
        ))}

        {/* Dark overlay only */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 pt-24">
        <div className="max-w-4xl">
          <h1 className="text-white text-6xl font-light whitespace-pre-line">
            {data?.headline}
          </h1>

          <p className="mt-6 text-white/80 max-w-xl">{data?.sub}</p>

          <div className="mt-10">
            <button
              onClick={onConsult}
              className="group inline-flex items-center gap-3"
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#ffffff',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{data?.primaryCta}</span>

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
