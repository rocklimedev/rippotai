"use client";

import { Trophy, Calendar } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { aboutImage } from "@/lib/config";
import Image from "next/image";
const achievements = [
  {
    title: "GROHE Bath & Design Awards 2025",
    org: "AD",
    year: "2025",
    image1: "/assets/awards_1.png",
    image2: "/assets/awards_2.png",
  },
];


const AchievementRow = ({ item }) => {
  return (
    <div className="flex flex-col items-center gap-16">

      {/* TOP: TWO IMAGES */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">

        <div className="flex justify-center">
          <Image
            src={item.image1}
            alt={item.title}
            width={800}
            height={800}
            className="w-full max-h-[500px] h-auto object-contain rounded-xl"
          />
        </div>

        <div className="flex justify-center">
          <Image
            src={item.image2}
            alt={item.title}
            width={800}
            height={800}
            className="w-full max-h-[500px] h-auto object-contain rounded-xl"
          />
        </div>

      </div>

      {/* BOTTOM: TEXT */}
      <div className="text-center max-w-3xl">
        <p className="text-sm text-gray-500 tracking-wide mb-4">
          {item.org} • {item.year}
        </p>

        <h3 className="text-3xl md:text-4xl font-light text-[#1a3c34] mb-6">
          {item.title}
        </h3>

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
        <div className="flex flex-col gap-20">
          {achievements.map((item, idx) => (
            <AnimateIn key={idx} delay={0.1 * idx}>
              <AchievementRow item={item} />
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  );
}
