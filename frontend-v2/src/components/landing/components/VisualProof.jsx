"use client";

import { useReveal } from "@/lib/useReveal";

export default function VisualProof({ data }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-white py-24 md:py-32 reveal ${inView ? "in-view" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex gap-4 mb-6">
              <span className="w-10 h-px bg-[#D9AF61]" />
              <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
                {data?.eyebrow}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-[#1A3C34]">
              {data?.headline}
            </h2>
          </div>

          <p className="text-[#4A6B63] max-w-xs md:text-right">
            {data?.caption}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {data?.images?.map((img, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden group ${
                i === 0
                  ? "md:col-span-2 md:row-span-2 min-h-[500px]"
                  : "aspect-[4/5]"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#1A3C34]/0 group-hover:bg-[#1A3C34]/30 transition" />

              <figcaption className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition">
                <span className="text-xs tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, "0")} — Project
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
