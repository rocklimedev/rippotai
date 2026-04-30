"use client";

import { useReveal } from "@/lib/useReveal";

export default function Process({ data }) {
  const { ref, inView } = useReveal();

  if (!data) return null;

  return (
    <section
      ref={ref}
      className={`bg-[#FAFAFA] py-24 md:py-32 reveal ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
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

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border-y">
          {data?.steps?.map((s, i) => (
            <div key={s.n} className="bg-[#FAFAFA] p-8 relative">
              <div className="flex items-baseline gap-3">
                <span className="text-[#D9AF61] text-3xl font-light">
                  {s.n}
                </span>
                <span className="w-8 h-px bg-[#1A3C34]/20" />
              </div>

              <h3 className="mt-6 text-xl text-[#1A3C34]">{s.title}</h3>

              <p className="mt-3 text-[#4A6B63]">{s.body}</p>

              {/* connector line */}
              {i < (data?.steps?.length || 0) - 1 && (
                <span className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-[#D9AF61]/60" />
              )}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p className="mt-12 text-center text-xl text-[#1A3C34] max-w-3xl mx-auto">
          {data?.tagline}
        </p>
      </div>
    </section>
  );
}
