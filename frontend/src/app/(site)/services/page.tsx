import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/services/Behavior";
import Banner from "@/components/sections/services/Banner";
import SvHero from "@/components/sections/services/SvHero";
import SvScroll from "@/components/sections/services/SvScroll";
import Builder from "@/components/sections/services/Builder";

export const metadata: Metadata = {
  title: "Services | Rippotai Architecture",
  description:
    "Architectural design, concept development, façades, interiors, interior architecture, consultation, execution and bespoke furniture.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <>
      <Banner />
      <SvHero />
      <SvScroll />
      <Builder />
      <EndZone
        id="endz"
        image="/images/fb2.webp"
        imageAlt="Chhabra Marble showroom"
        title={
          <>
            Know what you need? <em>Let’s talk.</em>
          </>
        }
        href="/contact"
        label="Start a project"
      />
      <Behavior />
    </>
  );
}
