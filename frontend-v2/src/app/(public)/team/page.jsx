// app/team/page.jsx
'use client';
import Image from 'next/image';
import { AnimateIn } from '@/components/layouts/AnimateIn';
import { teamImage, teamMembers } from '@/lib/config';

export default function TeamPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '80vh', // reduced from 100vh to 70vh
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
        }}
      >
        <img src={teamImage} alt="Rippotai Team" className="team-hero-img" />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '48px',
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '1px',
              margin: 0,
            }}
          >
            Our Team
          </h1>
        </div>
      </section>
    </>
  );
}
