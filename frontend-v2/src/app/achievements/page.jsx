"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      image: "/images/achievements/award1.jpg",
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
    <div className="group overflow-hidden rounded-xl border bg-background hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.org}</p>
          </div>
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>

        <p className="text-sm text-muted-foreground">{item.description}</p>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-md">
            <Calendar className="w-3 h-3" />
            {item.year}
          </span>
        </div>
      </div>
    </div>
  );
};
export default function AchievementsPage() {
  return (
    <>
      {/* 🔥 Banner (same as Projects) */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img
          src={aboutImage}
          alt="Achievements"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "48px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Achievements
          </h1>

          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#d9af61",
              marginTop: "20px",
            }}
          />
        </div>
      </section>

      {/* 🔥 Intro Section (same spacing as Projects) */}
      <section style={{ padding: "80px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={30} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666666",
                lineHeight: 1.8,
                maxWidth: "600px",
                margin: 0,
              }}
            >
              A record of our milestones — awards, research, and exhibitions
              that reflect our commitment to architectural excellence and
              innovation.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* 🔥 Content Section */}
      <section style={{ padding: "0 48px 120px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Tabs defaultValue="awards" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="papers">Research Papers</TabsTrigger>
              <TabsTrigger value="exhibitions">Exhibitions</TabsTrigger>
            </TabsList>

            {/* Awards */}
            <TabsContent value="awards">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.awards.map((item, idx) => (
                  <AnimateIn key={idx} delay={0.1 * idx}>
                    <AchievementCard item={item} icon={Trophy} />
                  </AnimateIn>
                ))}
              </div>
            </TabsContent>

            {/* Papers */}
            <TabsContent value="papers">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.papers.map((item, idx) => (
                  <AnimateIn key={idx} delay={0.1 * idx}>
                    <AchievementCard item={item} icon={FileText} />
                  </AnimateIn>
                ))}
              </div>
            </TabsContent>

            {/* Exhibitions */}
            <TabsContent value="exhibitions">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
