'use client';

import { useReveal } from '@/lib/useReveal';

export default function VisualProof({ data }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-[#f8f7f4] py-24 md:py-32 reveal ${
        inView ? 'in-view' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl leading-tight font-light text-[#1A3C34] whitespace-pre-line">
              {data?.headline}
            </h2>
          </div>
        </div>

        {/* Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {data?.images?.map((img, i) => (
            <figure
              key={i}
              className="relative overflow-hidden rounded-[2rem] group break-inside-avoid"
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-auto object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-60 group-hover:opacity-90 transition duration-500" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
