import type { Metadata } from "next";
import EndZone from "@/components/site/EndZone";
import Behavior from "@/components/sections/contact/Behavior";
import Banner from "@/components/sections/contact/Banner";
import CtHero from "@/components/sections/contact/CtHero";
import Talk from "@/components/sections/contact/Talk";

export const metadata: Metadata = {
  title: "Contact | Rippotai Architecture",
  description: "Start a project, book a design consultation or just say hello to Rippotai Architecture, New Delhi.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return (
    <>
      <Banner />
      <CtHero />
      <Talk />
      <EndZone
        id="endz"
        image="/images/fb3.webp"
        imageAlt="Moksh Dham colonnade"
        title={
          <>
            Seen enough? <em>See the work.</em>
          </>
        }
        href="/projects"
        label="View projects"
      />
      <Behavior />
    </>
  );
}
