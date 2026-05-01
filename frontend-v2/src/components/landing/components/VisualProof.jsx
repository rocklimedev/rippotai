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
            <h2 className="text-4xl md:text-6xl leading-tight font-light text-[#1A3C34]">
              {data?.headline}
            </h2>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[260px] gap-4">
          {data?.images?.map((img, i) => {
            const layouts = [
              'md:col-span-7 md:row-span-2',
              'md:col-span-5 md:row-span-1',
              'md:col-span-5 md:row-span-1',
              'md:col-span-4 md:row-span-1',
              'md:col-span-4 md:row-span-1',
              'md:col-span-4 md:row-span-1',
              'md:col-span-12 md:row-span-2',
            ];

            return (
              <figure
                key={i}
                className={`relative overflow-hidden rounded-[2rem] group ${
                  layouts[i] || 'md:col-span-4'
                }`}
              >
                {/* Image */}
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-100 transition duration-500" />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
