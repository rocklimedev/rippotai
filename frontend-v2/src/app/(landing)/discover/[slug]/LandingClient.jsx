'use client';

import { useState } from 'react';
import Image from 'next/image';
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
        <section className="w-full flex justify-center px-6 py-20 bg-white">
          <div className="w-full max-w-5xl">
            <Image
              src="/assets/landings/discover-rippotai/2.jpeg"
              alt="Discover Rippotai"
              width={1600}
              height={1000}
              className="w-full h-auto object-cover border border-[#1a3c34]/10"
              priority
            />
          </div>
        </section>
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
