"use client";

import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function About({ data, onConsult }) {
  const { ref, inView } = useReveal();

  if (!data) return null;

  return (
    <section
      ref={ref}
      className={`bg-[#1A3C34] py-24 md:py-32 reveal ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">
        {/* Left */}
        <div className="lg:col-span-4">
          <div className="flex gap-4 mb-8">
            <span className="w-10 h-px bg-[#D9AF61]" />
            <span className="text-xs tracking-[0.3em] uppercase text-[#D9AF61]">
              {data?.eyebrow}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl text-white font-light">
            {data?.headline}
          </h2>
        </div>

        {/* Right */}
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-white/85 text-lg leading-relaxed">{data?.body}</p>

          {/* Static blocks (you can move this to config later if needed) */}
          <div className="mt-12 grid grid-cols-3 gap-px bg-white/10 border">
            {[
              { k: "Focus", v: "Residential" },
              { k: "Region", v: "Delhi / NCR" },
              { k: "Approach", v: "Considered" },
            ].map((s) => (
              <div key={s.k} className="bg-[#1A3C34] p-6">
                <span className="text-xs tracking-[0.3em] text-[#D9AF61]">
                  {s.k}
                </span>
                <span className="block mt-2 text-white text-lg">{s.v}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onConsult}
            className="mt-12 inline-flex items-center gap-3 px-6 py-4 bg-[#D9AF61] text-[#1A3C34] hover:bg-white transition"
          >
            Speak with Sagar
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
