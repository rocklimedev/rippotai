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
        height: '80vh', // reduced from 100vh to 70vh
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
    </section>
  );
};
