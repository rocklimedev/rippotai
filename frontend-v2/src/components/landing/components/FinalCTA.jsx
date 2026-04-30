"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function FinalCTA({ data, onConsult }) {
  const { ref, inView } = useReveal();

  if (!data) return null;

  return (
    <section
      ref={ref}
      className={`bg-white py-24 md:py-40 reveal ${inView ? "in-view" : ""}`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-4 mb-10">
          <span className="w-10 h-px bg-[#D9AF61]" />
          <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
            {data?.eyebrow}
          </span>
          <span className="w-10 h-px bg-[#D9AF61]" />
        </div>

        <h2 className="text-4xl md:text-6xl font-light text-[#1A3C34] whitespace-pre-line">
          {data?.headline}
        </h2>

        <button
          onClick={onConsult}
          className="mt-12 inline-flex items-center gap-3 px-8 py-5 bg-[#1A3C34] text-white hover:bg-[#D9AF61] hover:text-[#1A3C34] transition"
        >
          {data?.cta}
          <ArrowRight size={18} />
        </button>

        <p className="mt-8 text-[#4A6B63] max-w-md mx-auto">{data?.sub}</p>
      </div>
    </section>
  );
}
