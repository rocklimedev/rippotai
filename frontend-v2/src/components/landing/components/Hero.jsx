'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0d1f1c]">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.url}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${s.url}')`,
              backgroundColor: '#111827',
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-end">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24 pt-28 sm:pt-32">
          <div className="max-w-4xl">
            <h1 className="text-white font-light whitespace-pre-line leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {data?.headline}
            </h1>

            <p className="mt-5 sm:mt-6 text-white/80 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
              {data?.sub}
            </p>

            {/* Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                onClick={onConsult}
                className="group inline-flex items-center gap-3 w-fit border border-white/30 px-7 py-4 hover:bg-white hover:text-black transition-all duration-500"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                <span>{data?.primaryCta}</span>

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              {data?.secondaryCta && (
                <button
                  onClick={onStartProject}
                  className="group inline-flex items-center gap-3 w-fit text-white/70 hover:text-white transition"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{data?.secondaryCta}</span>

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              )}
            </div>

            {/* Slide indicators */}
            {slides.length > 1 && (
              <div className="mt-10 sm:mt-14 flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-[2px] rounded-full transition-all duration-300 ${
                      i === active
                        ? 'w-10 bg-white'
                        : 'w-5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
