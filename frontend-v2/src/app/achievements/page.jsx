"use client";

import { Trophy, Calendar } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { aboutImage } from "@/lib/config";

const achievements = [
  {
    title: "Best Residential Design 2024",
    org: "Indian Architecture Awards",
    year: "2024",
    description: "Recognized for innovative sustainable housing design.",
    image: "/assets/awards.png",
  },
];

const AchievementCard = ({ item }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
      <div className="relative bg-gray-50 flex items-center justify-center p-8 md:p-10">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-w-full h-auto max-h-[420px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />

        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm">
          <Calendar className="w-4 h-4 text-[#1a3c34]" />
          {item.year}
        </div>
      </div>

      <div className="p-8 md:p-10">
        <p className="text-sm text-gray-500 tracking-wide mb-3">{item.org}</p>

        <h3 className="text-2xl md:text-3xl font-light text-[#1a3c34] mb-4">
          {item.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-[15.5px]">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default function AchievementsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <img
          src={aboutImage}
          alt="Achievements"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        <div className="absolute bottom-16 left-6 md:left-12 z-10">
          <div className="uppercase tracking-[4px] text-[#d9af61] text-sm mb-4">
            RECOGNITION
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-light">
            Achievements
          </h1>
          <div className="w-12 h-px bg-[#d9af61] mt-8" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <AnimateIn>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              A record of our milestones — awards, research, and exhibitions
              that reflect our commitment to architectural excellence.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Unified Grid (No Categories) */}
      <section className="pb-24 bg-white px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {achievements.map((item, idx) => (
            <AnimateIn key={idx} delay={0.1 * idx}>
              <AchievementCard item={item} />
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}
