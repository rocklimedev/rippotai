"use client";

import { useReveal } from "@/lib/useReveal";

export default function Problem({ data }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-[#FAFAFA] py-20 md:py-40 reveal ${
        inView ? "in-view" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
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

        <ul className="mt-12 grid sm:grid-cols-2 gap-px bg-gray-200 border max-w-3xl mx-auto">
          {data?.points?.map((p, i) => (
            <li key={i} className="bg-white p-6 text-left text-[#4A6B63]">
              <span className="text-[#D9AF61] text-xs tracking-[0.25em] block mb-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xl text-[#1A3C34] font-light">
          {data?.closing}
        </p>
      </div>
    </section>
  );
}
