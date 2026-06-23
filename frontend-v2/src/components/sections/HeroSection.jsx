'use client';

import { useState, useEffect, useCallback } from 'react';
import { heroImages } from '@/lib/config';

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // was 7000
    return () => clearInterval(interval);
  }, [nextSlide]);
  return (
    <section className="hero-section">
      {heroImages.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt=""
          className="hero-image"
          style={{
            opacity: idx === currentIndex ? 1 : 0,
          }}
        />
      ))}

      <div className="overlay" />

      <div className="content">
        <p className="tagline">It's all about the perspective</p>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          width: 100%;
          height: calc(100dvh - 64px);
          margin-top: 64px;
          overflow: hidden;
          background: #0a0a0a;
        }

        .hero-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.5s ease-in-out;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 1;
        }

        .content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          text-align: center;
        }

        .tagline {
          margin: 0;
          color: #fff;
          font-family: 'Lato', sans-serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.5rem, 4vw, 3rem);
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .hero-section {
            height: calc(100dvh - 64px);
          }

          .tagline {
            font-size: clamp(1.25rem, 6vw, 2rem);
            padding: 0 12px;
          }
        }

        @media (max-width: 480px) {
          .tagline {
            font-size: clamp(1.1rem, 7vw, 1.75rem);
          }
        }
      `}</style>
    </section>
  );
};
