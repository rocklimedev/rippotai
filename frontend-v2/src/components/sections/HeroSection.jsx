'use client';
import { useState, useEffect, useCallback } from 'react';
import { heroImages } from '@/lib/config';

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Preload images
  useEffect(() => {
    heroImages.forEach((src, idx) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, idx]));
      };
      img.src = src;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '75vh',
        marginTop: '64px',
        minHeight: '420px',
        maxHeight: '900px',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Slideshow images */}
      {heroImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // 🔥 important fix
            opacity: idx === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Centered Tagline */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
          padding: '0 16px',
        }}
      >
        <p
          style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 'clamp(20px, 5vw, 40px)', // better mobile scaling
            fontWeight: 300,
            color: '#fff',
            letterSpacing: '0.5px',
            margin: 0,
            fontStyle: 'italic',
            lineHeight: 1.3,
          }}
        >
          Its all about the perspective
        </p>
      </div>

      {/* Mobile height adjustment */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            height: 60vh;
            min-height: 380px;
          }
        }

        @media (max-width: 480px) {
          section {
            height: 55vh;
          }
        }
      `}</style>
    </section>
  );
};
