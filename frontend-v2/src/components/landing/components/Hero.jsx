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
    <section
      className="relative w-full h-[78vh] min-h-[620px] md:min-h-[720px] overflow-hidden bg-[#0d1f1c]"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={s.url}
            className={`hero-slide ${i === active ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${s.url}')`,
              backgroundColor: '#111827',
            }}
          />
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/70" />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center pt-[130px] sm:pt-[150px] md:pt-[190px]">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            {/* Heading */}
            <h1
              className="
                text-white
                font-light
                leading-[1.05]
                tracking-[-1px]
                text-[24px]
                sm:text-[34px]
                md:text-[46px]
                lg:text-[58px]
                xl:text-[68px]
              "
              style={{
                fontFamily: "'Lato', sans-serif",
              }}
            >
              {data?.headline}
            </h1>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-2xl
                text-white/75
                leading-relaxed
                text-[13px]
                sm:text-[14px]
                md:text-[15px]
              "
              style={{
                fontFamily: "'Lato', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.2px',
              }}
            >
              We design refined living environments that combine timeless
              architecture, sophisticated interiors, and seamless turnkey
              execution. Every project is crafted with clarity, precision, and
              understated luxury to elevate everyday living.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-5 max-w-3xl border-t border-white/10 pt-5">
              {[
                ['150+', 'Projects Completed'],
                ['10+', 'Years Experience'],
                ['End-to-End', 'Turnkey Execution'],
                ['Premium', 'Design Experience'],
              ].map(([title, label]) => (
                <div key={title}>
                  <div
                    className="text-white text-[18px] sm:text-[22px] md:text-[26px] font-light"
                    style={{
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {title}
                  </div>

                  <div
                    className="mt-1.5 text-white/50 uppercase leading-snug"
                    style={{
                      fontSize: '10px',
                      letterSpacing: '1.5px',
                      fontFamily: "'Lato', sans-serif",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onConsult}
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  sm:w-fit
                  border
                  border-white/20
                  bg-white
                  text-black
                  px-6
                  sm:px-8
                  py-3.5
                  transition-all
                  duration-500
                  hover:bg-transparent
                  hover:text-white
                  hover:border-white/40
                "
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                }}
              >
                <span>{data?.primaryCta}</span>

                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
