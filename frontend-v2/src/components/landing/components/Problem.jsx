'use client';

import { useReveal } from '@/lib/useReveal';
import { CheckCircle, AlertCircle, Clock, XCircle } from 'lucide-react';

export default function Problem({ data }) {
  const { ref, inView } = useReveal();

  // Rotate icons if more points
  const icons = [AlertCircle, Clock, XCircle, CheckCircle];

  return (
    <section
      ref={ref}
      className={`bg-[#FAFAFA] py-24 md:py-32 lg:py-36 reveal ${
        inView ? 'in-view' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-light text-[#1A3C34] whitespace-pre-line">
          {data?.headline}
        </h2>

        <ul className="mt-12 grid sm:grid-cols-2 gap-px bg-gray-200 border max-w-3xl mx-auto">
          {data?.points?.map((p, i) => {
            const Icon = icons[i % icons.length];

            return (
              <li
                key={i}
                className="bg-white p-6 flex items-start gap-4 text-[#4A6B63]"
              >
                {/* Icon */}
                <div className="mt-1 text-[#1A3C34]">
                  <Icon size={20} strokeWidth={1.5} />
                </div>

                {/* Text */}
                <span>{p}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
