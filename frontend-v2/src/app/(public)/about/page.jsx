'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimateIn } from '@/components/layouts/AnimateIn';
import { values, aboutImage } from '@/lib/config';
import { teamImage, teamMembers } from '@/lib/config';
import Image from 'next/image';
import { achievements } from '@/lib/config';
import { services, servicesImage } from '@/lib/config';
import Link from 'next/link';
/************************************
 * SMOOTH SCROLL PROGRESS HOOK
 ************************************/
const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = ref.current;
          if (!el) return;

          const rect = el.getBoundingClientRect();
          const scrollable = el.offsetHeight - window.innerHeight;
          const scrolled = -rect.top;
          const p = Math.max(0, Math.min(1, scrolled / scrollable));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
};

/************************************
 * HORIZONTAL SLIDER (Vision & Mission)
 ************************************/
const HorizontalSlider = () => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  const slides = [
    {
      label: 'Our Vision',
      text: 'To shape environments that endure beyond time and trend. At Rippotai Architecture, we envision spaces that are thoughtful, restrained, and deeply contextual. Our vision is to redefine contemporary architecture through clarity of form, purposeful materiality, and spatial intelligence.',
    },
    {
      label: 'Our Mission',
      text: 'To translate ideas into built realities through discipline, detail, and design integrity. Rippotai Architecture is committed to delivering architecture that balances aesthetics with function. Our mission is to approach every project with structured thinking, collaborative dialogue, and uncompromising execution.',
    },
  ];

  return (
    <div ref={containerRef} style={{ height: '80vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          minHeight: '60vh',
          height: '60vh',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${slides.length * 100}vw`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: `translateX(${-progress * (slides.length - 1) * 100}vw)`,
            transition: 'none',
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={idx}
              style={{
                width: '100vw',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3vw',
              }}
            >
              <div style={{ maxWidth: '720px', width: '100%' }}>
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    color: '#d9af61',
                    marginBottom: '24px',
                  }}
                >
                  {slide.label}
                </div>

                <h2
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 'clamp(28px, 6vw, 48px)',
                    fontWeight: 300,
                    color: '#1a3c34',
                    marginBottom: '32px',
                    lineHeight: 1.2,
                  }}
                >
                  {slide.label}
                </h2>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 'clamp(15px, 4vw, 17px)',
                    fontWeight: 300,
                    color: '#555555',
                    lineHeight: 1.9,
                  }}
                >
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
          }}
        >
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: progress >= idx / slides.length ? '32px' : '8px',
                height: '2px',
                backgroundColor:
                  progress >= idx / slides.length
                    ? '#d9af61'
                    : 'rgba(26, 60, 52, 0.15)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/************************************
 * VALUES SLIDER
 ************************************/
const ValuesSlider = () => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);
  const totalSlides = values.length;

  return (
    <div
      ref={containerRef}
      style={{ height: `${(totalSlides + 1) * 100}vh`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          minHeight: '100vh',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#f5f1eb',
          display: 'flex',
          alignItems: 'center',
          padding: '0 5vw',
        }}
      >
        {/* Header */}
        <div style={{ position: 'absolute', top: '40px', left: '5vw' }}>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '3px',
              color: '#d9af61',
              marginBottom: '12px',
            }}
          >
            OUR VALUES
          </div>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(26px, 5.5vw, 40px)',
              fontWeight: 300,
              color: '#1a3c34',
              lineHeight: 1.2,
            }}
          >
            What drives us forward
          </h2>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'flex',
            width: `${totalSlides * 100}vw`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: `translateX(${-progress * (totalSlides - 1) * 100}vw)`,
            transition: 'none',
          }}
        >
          {values.map((val, idx) => (
            <div
              key={idx}
              style={{
                width: '100vw',
                padding: '0 5vw',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  maxWidth: '620px',
                  borderLeft: '3px solid #d9af61',
                  paddingLeft: '28px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '3px',
                    color: '#1a3c34',
                    marginBottom: '12px',
                  }}
                >
                  {val.title}
                </div>

                <h3
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 'clamp(26px, 5vw, 42px)',
                    fontWeight: 300,
                    color: '#1a3c34',
                    marginBottom: '24px',
                    lineHeight: 1.2,
                  }}
                >
                  {val.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 'clamp(15px, 4vw, 17px)',
                    fontWeight: 300,
                    color: '#555',
                    lineHeight: 1.9,
                  }}
                >
                  {val.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicators */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
          }}
        >
          {values.map((_, idx) => {
            const sectionStart = idx / totalSlides;
            const sectionEnd = (idx + 1) / totalSlides;
            const active = progress >= sectionStart && progress < sectionEnd;
            const passed = progress >= sectionEnd;

            return (
              <div
                key={idx}
                style={{
                  width: active || passed ? '32px' : '8px',
                  height: '2px',
                  backgroundColor:
                    active || passed ? '#d9af61' : 'rgba(26, 60, 52, 0.15)',
                  transition: 'all 0.3s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
const AchievementRow = ({ item }) => {
  return (
    <div className="flex flex-col items-center gap-16">
      {/* TOP: TWO IMAGES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={item.image1}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="relative w-full aspect-square sm:aspect-[4/5] rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={item.image2}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* BOTTOM: TEXT */}
      <div className="text-center max-w-3xl">
        <p className="text-sm text-gray-500 tracking-wide mb-4">
          {item.org} • {item.year}
        </p>

        <h3 className="text-3xl md:text-4xl font-light text-[#1a3c34] mb-6">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
  no-underline
  hover:underline
  decoration-[#c6a15b]
  decoration-[1px]
  underline-offset-4
  hover:decoration-[#b08a46]
  transition-colors
"
          >
            {item.title}
          </a>
        </h3>
      </div>
    </div>
  );
};
/************************************
 * MAIN ABOUT PAGE
 ************************************/
export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '75vh',
          marginTop: '64px', // header height
          minHeight: '600px',
          overflow: 'hidden',
        }}
      >
        <img
          src={aboutImage}
          alt="Rippotai Team"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}
        />

        {/* Heading */}
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '5vw',
            right: '5vw',
          }}
        >
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '11px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d9af61',
              marginBottom: '16px',
            }}
          >
            WHO WE ARE
          </div>

          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(36px, 7vw, 56px)',
              fontWeight: 300,
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            About Us
          </h1>
        </div>
      </section>

      {/* About Text Section */}
      <section
        style={{
          padding: '100px 0 120px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            padding: '0 clamp(24px, 6vw, 120px)',
            boxSizing: 'border-box',
          }}
        >
          <AnimateIn>
            <div
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#d9af61',
                marginBottom: '32px',
              }}
            >
              ABOUT US
            </div>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(24px, 5.5vw, 36px)',
                fontWeight: 300,
                color: '#1a3c34',
                lineHeight: 1.5,
                marginBottom: '40px',
              }}
            >
              We design spaces that inspire innovation, foster warmth, and shape
              the future — creating environments where life and architecture
              become one.
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(15px, 4vw, 17px)',
                color: '#444',
                lineHeight: 2,
                marginBottom: '28px',
              }}
            >
              “Rippotai,” is inspired by the Japanese term for “cube,”
              symbolizing the fundamental form of objects and the essence of
              design.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.4}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(15px, 4vw, 17px)',
                color: '#444',
                lineHeight: 2,
              }}
            >
              The functionality of a cube mirrors our approach to adaptive
              design. We are committed to creating functional, iconic,
              user-centric work.
            </p>
          </AnimateIn>
        </div>
      </section>

      <ValuesSlider />

      {/* Team Introduction + Grid */}
      <section
        style={{
          padding: '100px 0',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            width: '100%',
            padding: '60px 48px',
            boxSizing: 'border-box',
          }}
        >
          {/* Section Title */}
          <AnimateIn delay={0} distance={30} duration={1}>
            <div style={{ marginBottom: '40px' }}>
              <h2
                style={{
                  fontSize: '56px',
                  fontWeight: 300,
                  color: '#1a3c34',
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: '-1px',
                }}
              >
                Our Team
              </h2>

              <div
                style={{
                  width: '80px',
                  height: '2px',
                  backgroundColor: '#d9af61',
                  marginTop: '18px',
                }}
              />
            </div>
          </AnimateIn>

          {/* Intro Text */}
          <AnimateIn delay={0} distance={40} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#666666',
                lineHeight: 1.8,
                maxWidth: '600px',
                marginBottom: '60px',
              }}
            >
              The people behind every space we create. A team of architects,
              designers, and visionaries committed to crafting spaces that
              endure.
            </p>
          </AnimateIn>

          {/* Team Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '32px',
            }}
            className="team-grid"
          >
            {teamMembers.map((member, idx) => (
              <AnimateIn
                key={member.id}
                delay={0.08 * idx}
                distance={50}
                duration={1.2}
              >
                <div>
                  {/* Photo Container */}
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '3 / 4',
                      backgroundColor: '#f0eeea',
                      overflow: 'hidden',
                      position: 'relative',
                      marginBottom: '16px',
                    }}
                  >
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 45vw, 220px"
                        quality={85}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '40px',
                          fontWeight: 300,
                          color: 'rgba(26, 60, 52, 0.15)',
                        }}
                      >
                        {String(member.id).padStart(2, '0')}
                      </div>
                    )}

                    {member.tag && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '10px',
                          fontWeight: 500,
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          color: 'rgba(217, 175, 97, 0.85)',
                          backgroundColor: 'rgba(26, 60, 52, 0.55)',
                          padding: '5px 10px',
                          lineHeight: 1,
                        }}
                      >
                        {member.tag}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '15px',
                      fontWeight: 500,
                      color: '#1a3c34',
                      letterSpacing: '0.5px',
                      margin: 0,
                      marginBottom: '4px',
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* Designation */}
                  <p
                    style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: '13px',
                      fontWeight: 300,
                      color: '#888888',
                      margin: 0,
                    }}
                  >
                    {member.designation}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(20px, 5vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <AnimateIn
                key={idx}
                delay={0.15 * idx}
                distance={60}
                duration={1.2}
              >
                <Link
                  href={`/services/${service.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="service-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(70px, 120px) 1fr',
                      gap: 'clamp(20px, 4vw, 48px)',
                      padding: 'clamp(36px, 6vw, 60px) 0',
                      borderBottom:
                        idx < services.length - 1
                          ? '1px solid rgba(26, 60, 52, 0.1)'
                          : 'none',
                      alignItems: 'start',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: 'clamp(50px, 8vw, 80px)',
                        height: 'clamp(50px, 8vw, 80px)',
                        border: '1px solid #1a3c34',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} strokeWidth={1} color="#1a3c34" />
                    </div>

                    {/* Text */}
                    <div>
                      <h2
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          fontSize: 'clamp(18px, 3vw, 24px)',
                          fontWeight: 400,
                          color: '#1a3c34',
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          marginBottom: '14px',
                        }}
                      >
                        {service.title}
                      </h2>

                      <p
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          fontSize: 'clamp(14px, 2.4vw, 16px)',
                          color: '#555',
                          lineHeight: 1.8,
                          maxWidth: '650px',
                          margin: 0,
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      {/* ================= Achievements ================= */}
      <section className="pb-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          {/* Achievement List */}
          <div className="flex flex-col gap-20">
            {achievements.map((item, idx) => (
              <AnimateIn key={idx} delay={0.1 * idx}>
                <AchievementRow item={item} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
