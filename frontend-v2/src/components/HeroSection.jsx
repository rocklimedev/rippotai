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
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Slideshow images */}
      {heroImages.map((src, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
          }}
        />
      ))}

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      {/* Content removed - clean banner */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
        }}
      />

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          gap: '12px',
        }}
      >
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: idx === currentIndex ? '32px' : '8px',
              height: '2px',
              backgroundColor:
                idx === currentIndex ? '#d9af61' : 'rgba(255, 255, 255, 0.4)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.4s ease',
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
