import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/projects/Behavior";
import Banner from "@/components/sections/projects/Banner";
import PjHero from "@/components/sections/projects/PjHero";
import PjBar from "@/components/sections/projects/PjBar";
import WorksWrap from "@/components/sections/projects/WorksWrap";
import Pjpeek from "@/components/sections/projects/Pjpeek";

export const metadata: Metadata = {
  title: "Projects | Rippotai Architecture",
  description: "A curated selection of Rippotai's work across architecture, interiors and furniture design.",
  alternates: { canonical: "/projects" },
};

export default function Page() {
  return (
    <>
      <Banner />
      <PjHero />
      <PjBar />
      <WorksWrap />
      <Pjpeek />
      <EndZone
        id="contact"
        image="/images/fb4.webp"
        imageAlt="Banga's Residence facade"
        title={
          <>
            Let's build your <em>perspective.</em>
          </>
        }
        href="mailto:sagar@rippotai.in"
        label="Start a project"
      />
      <Behavior />
    </>
  );
}
