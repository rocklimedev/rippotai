'use client';

import { useReveal } from '@/lib/useReveal';

export default function Problem({ data }) {
  const { ref, inView } = useReveal();

  return (
    <section
      ref={ref}
      className={`bg-[#FAFAFA] py-20 md:py-40 reveal ${
        inView ? 'in-view' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-light text-[#1A3C34] whitespace-pre-line">
          {data?.headline}
        </h2>

        <ul className="mt-12 grid sm:grid-cols-2 gap-px bg-gray-200 border max-w-3xl mx-auto">
          {data?.points?.map((p, i) => (
            <li key={i} className="bg-white p-6 text-left text-[#4A6B63]">
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
