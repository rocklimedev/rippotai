import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/about/Behavior";
import Banner from "@/components/sections/about/Banner";
import AbHero from "@/components/sections/about/AbHero";
import Stmt from "@/components/sections/about/Stmt";
import Unfold from "@/components/sections/about/Unfold";
import Founder from "@/components/sections/about/Founder";
import Atwork from "@/components/sections/about/Atwork";
import Team from "@/components/sections/about/Team";
import Recog from "@/components/sections/about/Recog";

export const metadata: Metadata = {
  title: "About | Rippotai Architecture",
  description: "Rippotai — named after the Japanese word for cube. Meet the studio, our values and the team.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return (
    <>
      <Banner />
      <AbHero />
      <Stmt />
      <Unfold />
      <Founder />
      <Atwork />
      <Team />
      <Recog />
      <EndZone
        id="endz"
        image="https://rippotaiarchitecture.com/assets/banners/team.jpg"
        imageAlt="The Rippotai team"
        title={
          <>
            Want to build with <em>us?</em>
          </>
        }
        href="/career"
        label="Join the team"
      />
      <Behavior />
    </>
  );
}
