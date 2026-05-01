'use client';

import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

export default function FinalCTA({ data, onConsult }) {
  const { ref, inView } = useReveal();

  if (!data) return null;

  return (
    <section
      ref={ref}
      className={`bg-white py-24 md:py-40 reveal ${inView ? 'in-view' : ''}`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-light text-[#1A3C34] whitespace-pre-line">
          {data?.headline}
        </h2>

        <button
          onClick={onConsult}
          className="group mt-12 inline-flex items-center gap-3 transition-all duration-300"
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#1A3C34',
          }}
        >
          <span>{data?.cta}</span>

          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>
    </section>
  );
}
