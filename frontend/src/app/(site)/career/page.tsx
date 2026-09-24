import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/career/Behavior";
import Banner from "@/components/sections/career/Banner";
import CrIntro from "@/components/sections/career/CrIntro";
import Vals from "@/components/sections/career/Vals";
import Depts from "@/components/sections/career/Depts";
import Apply from "@/components/sections/career/Apply";

export const metadata: Metadata = {
  title: "Career | Rippotai Architecture",
  description:
    "Join Rippotai Architecture — open roles across architecture, interiors, furniture, project management and visualisation.",
  alternates: { canonical: "/career" },
};

export default function Page() {
  return (
    <>
      <Banner />
      <CrIntro />
      <Vals />
      <Depts />
      <Apply />
      <EndZone
        id="endz"
        image="/images/sagar.webp"
        imageAlt="Sagar Chhabra on site"
        title={
          <>
            Prefer to talk <em>first?</em>
          </>
        }
        href="/contact"
        label="Get in touch"
      />
      <Behavior />
    </>
  );
}
