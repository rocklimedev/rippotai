'use client';

import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/lib/useReveal';

export default function Shift({ data, onConsult }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-white py-24 md:py-32 reveal ${inView ? 'in-view' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A3C34]">
            {data?.headline}
          </h2>

          <ul className="mt-8 space-y-4">
            {data?.body?.map((b, i) => (
              <li key={i} className="flex gap-3 text-[#4A6B63]">
                <span className="text-[#D9AF61]">—</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={onConsult}
            className="group mt-10 inline-flex items-center gap-3 transition-all duration-300"
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1A3C34',
            }}
          >
            <span>Book a Consultation Call</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Right */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <img
            src={data?.image}
            alt="Architectural detail"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
