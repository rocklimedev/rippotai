'use client';

import { useState } from 'react';

import Hero from '@/components/landing/components/Hero';
import Problem from '@/components/landing/components/Problem';
import Shift from '@/components/landing/components/Shift';
import VisualProof from '@/components/landing/components/VisualProof';
import FinalCTA from '@/components/landing/components/FinalCTA';
import StickyConsultBar from '@/components/landing/components/StickyConsultBar';
import ConsultationDialog from '@/components/landing/components/ConsultationDialog';
import Header from '@/components/landing/components/Header';
import { Footer } from '@/components/layouts/Footer';
export default function LandingClient({ slug, config }) {
  const [open, setOpen] = useState(false);

  const onConsult = () => setOpen(true);

  return (
    <>
      <Header />
      <main>
        <Hero
          data={config.hero}
          slides={config.heroSlides}
          onConsult={onConsult}
        />

        <Problem data={config.problem} />

        <Shift data={config.shift} onConsult={onConsult} />
        <VisualProof data={config.visualProof} />

        <FinalCTA data={config.finalCta} onConsult={onConsult} />
      </main>

      <Footer />
      <StickyConsultBar onConsult={onConsult} />

      <ConsultationDialog
        open={open}
        onOpenChange={setOpen}
        slug="discover-rippotai"
      />
    </>
  );
}
