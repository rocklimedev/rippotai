'use client';

import { projectsImage } from '@/lib/config';
import { WorksSection } from '@/components/sections/WorksSection';
import FadeInSection from '@/components/sections/FadeInSection';
export default function ProjectsContent() {
  return (
    <>
      {/* Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
        }}
      >
        <img
          src={projectsImage}
          alt="Our Projects"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '48px',
            zIndex: 2,
            maxWidth: '700px',
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#fff',
              marginBottom: '16px',
            }}
          >
            Our Projects
          </h1>

          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '16px',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.8,
              maxWidth: '520px',
            }}
          >
            A curated selection of our work across architecture, interiors, and
            furniture design.
          </p>
        </div>
      </section>

      {/* Works Grid */}
      <section
        style={{
          backgroundColor: '#fff',
          padding: '15px',
        }}
      >
        <FadeInSection aboveGrid>
          <WorksSection mode="home" limit={100} />
        </FadeInSection>
      </section>
    </>
  );
}
