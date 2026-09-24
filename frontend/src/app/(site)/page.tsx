import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/home/Behavior";
import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Bleed from "@/components/sections/home/Bleed";
import Showcase from "@/components/sections/shared/Showcase";
import Bleed2 from "@/components/sections/home/Bleed2";
import Process from "@/components/sections/home/Process";
import Bleed3 from "@/components/sections/home/Bleed3";
import ServicesAccordion from "@/components/sections/shared/ServicesAccordion";
import Quote from "@/components/sections/home/Quote";

export const metadata: Metadata = {
  title: "Rippotai Architecture | Best Architecture Firm in New Delhi, India",
  description:
    "Rippotai Architecture — architectural design, interiors, façades, bespoke furniture and project execution from New Delhi.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Bleed />
      <Showcase />
      <Bleed2 />
      <Process />
      <Bleed3 />
      <ServicesAccordion />
      <Quote />
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
