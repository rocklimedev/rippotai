'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useReveal } from '@/lib/useReveal';

export default function Hero({ data, onConsult }) {
  const { ref, inView } = useReveal();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      ref={ref}
      className={`relative w-full min-h-screen overflow-hidden reveal ${
        inView ? 'in-view' : ''
      }`}
    >
      {/* Background */}
      <Image
        src={data?.image}
        alt={data?.headline || 'Hero'}
        fill
        priority
        className="object-cover scale-105"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div
          className={`max-w-3xl text-center transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl leading-tight font-light text-white tracking-tight">
            {data?.headline}
          </h1>

          {/* Body */}
          <ul className="mt-8 space-y-4">
            {data?.body?.map((item, i) => (
              <li
                key={i}
                className="text-white/80 text-base md:text-lg leading-relaxed"
              >
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button
            onClick={onConsult}
            className="group mt-12 inline-flex items-center gap-3 border border-white/30 px-7 py-4 hover:bg-white hover:text-black transition-all duration-500 text-white"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            <span>Contact Us</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
