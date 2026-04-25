// app/page.jsx
export const dynamic = 'force-dynamic';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { WhereItBegan } from '@/components/WhereItBegan';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FounderMessage } from '@/components/FounderMessage';
import FadeInSection from '@/components/sections/FadeInSection'; // ← new client component

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
