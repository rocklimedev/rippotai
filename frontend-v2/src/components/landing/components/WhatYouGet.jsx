'use client';

import { useReveal } from '@/lib/useReveal';

export default function WhatYouGet({ data }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-[#FAFAFA] py-24 md:py-32 reveal ${
        inView ? 'in-view' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-[#1A3C34]">
            {data?.headline}
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-gray-200 border">
          {data?.items?.map((it) => (
            <article
              key={it.n}
              className="group bg-white p-10 hover:bg-[#1A3C34] transition"
            >
              <h3 className="mt-6 text-2xl text-[#1A3C34] group-hover:text-white transition">
                {it.title}
              </h3>

              <p className="mt-4 text-[#4A6B63] group-hover:text-white/80 transition">
                {it.body}
              </p>

              <span className="mt-6 inline-block w-10 h-px bg-[#D9AF61] group-hover:w-20 transition-all" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
