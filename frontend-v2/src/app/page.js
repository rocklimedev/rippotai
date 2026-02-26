// app/page.jsx
export const dynamic = "force-dynamic";
import { ProcessSection } from "@/components/ProcessSection";
import { WorksSection } from "@/components/WorksSection";
import { HeroSection } from "@/components/HeroSection";
import { QuoteSection } from "@/components/QuoteSection";
import { WhereItBegan } from "@/components/WhereItBegan";
import { ServicesSection } from "@/components/ServicesSection";
import { FounderMessage } from "@/components/FounderMessage";
import FadeInSection from "@/components/FadeInSection"; // ← new client component

// ──────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FadeInSection>
        <QuoteSection />
      </FadeInSection>

      <FadeInSection aboveGrid>
        <WorksSection />
      </FadeInSection>

      <FadeInSection>
        <ProcessSection />
      </FadeInSection>

      <FadeInSection>
        <WhereItBegan />
      </FadeInSection>

      <FadeInSection>
        <ServicesSection />
      </FadeInSection>

      <FadeInSection>
        <FounderMessage />
      </FadeInSection>
    </>
  );
}
