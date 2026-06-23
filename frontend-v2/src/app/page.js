// app/page.jsx
export const dynamic = 'force-dynamic';

import { ProcessSection } from '@/components/sections/ProcessSection';
import { WorksSection } from '@/components/sections/WorksSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhereItBegan } from '@/components/sections/WhereItBegan';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { FounderMessage } from '@/components/layouts/FounderMessage';
import FadeInSection from '@/components/sections/FadeInSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <FadeInSection>
        <WhereItBegan />
      </FadeInSection>

      {/* Only first 9 projects in beautiful layout */}
      <FadeInSection aboveGrid>
        <WorksSection mode="home" limit={9} />
      </FadeInSection>

      <FadeInSection>
        <ProcessSection />
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
