"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, FileText, Building2, Calendar } from "lucide-react";
import { AnimateIn } from "@/components/AnimateIn";
import { aboutImage } from "@/lib/config";

const achievements = {
  awards: [
    {
      title: "Best Residential Design 2024",
      org: "Indian Architecture Awards",
      year: "2024",
      description: "Recognized for innovative sustainable housing design.",
      image: "/assets/awards.png",
    },
    {
      title: "Urban Excellence Award",
      org: "Delhi Planning Council",
      year: "2023",
      description: "Awarded for smart urban redevelopment project.",
      image: "/images/achievements/award2.jpg",
    },
  ],
  papers: [
    {
      title: "Sustainable Materials in Modern Architecture",
      org: "Journal of Architecture",
      year: "2024",
      description: "Research on eco-friendly construction materials.",
      image: "/images/achievements/paper1.jpg",
    },
  ],
  exhibitions: [
    {
      title: "Future Cities Expo",
      org: "Dubai Expo",
      year: "2024",
      description: "Showcased smart city master planning project.",
      image: "/images/achievements/expo1.jpg",
    },
  ],
};

const AchievementCard = ({ item, icon: Icon }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500">
      {/* Image Section - Full size, width controlled */}
      <div className="relative bg-gray-50 flex items-center justify-center p-8 md:p-10">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-w-full h-auto max-h-[420px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Year Badge */}
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-sm">
          <Calendar className="w-4 h-4 text-[#1a3c34]" />
          {item.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-[#1a3c34]/5 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-[#d9af61]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 tracking-wide">{item.org}</p>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-light text-[#1a3c34] leading-tight mb-4">
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
      {/* Hero Banner */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <img
          src={aboutImage}
          alt="Achievements"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />

        <div className="absolute bottom-16 left-6 md:left-12 z-10">
          <div className="uppercase tracking-[4px] text-[#d9af61] text-sm font-medium mb-4">
            RECOGNITION
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-light tracking-tight">
            Achievements
          </h1>
          <div className="w-12 h-px bg-[#d9af61] mt-8" />
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              A record of our milestones — awards, research, and exhibitions
              that reflect our commitment to architectural excellence and
              innovation.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="awards" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gray-100 p-1 rounded-full">
                <TabsTrigger
                  value="awards"
                  className="px-8 py-3 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Awards
                </TabsTrigger>
                <TabsTrigger
                  value="papers"
                  className="px-8 py-3 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Research Papers
                </TabsTrigger>
                <TabsTrigger
                  value="exhibitions"
                  className="px-8 py-3 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  Exhibitions
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Awards */}
            <TabsContent value="awards" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {achievements.awards.map((item, idx) => (
                  <AnimateIn key={idx} delay={0.1 * idx}>
                    <AchievementCard item={item} icon={Trophy} />
                  </AnimateIn>
                ))}
              </div>
            </TabsContent>

            {/* Papers */}
            <TabsContent value="papers" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {achievements.papers.map((item, idx) => (
                  <AnimateIn key={idx} delay={0.1 * idx}>
                    <AchievementCard item={item} icon={FileText} />
                  </AnimateIn>
                ))}
              </div>
            </TabsContent>

            {/* Exhibitions */}
            <TabsContent value="exhibitions" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                {achievements.exhibitions.map((item, idx) => (
                  <AnimateIn key={idx} delay={0.1 * idx}>
                    <AchievementCard item={item} icon={Building2} />
                  </AnimateIn>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
