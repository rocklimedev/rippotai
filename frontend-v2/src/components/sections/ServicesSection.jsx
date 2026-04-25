'use client';

import Link from 'next/link'; // ✅ add this
import { AnimateIn } from '../layouts/AnimateIn';
import { services } from '@/lib/config';

export const ServicesSection = () => {
  return (
    <section
      id="services"
      style={{
        backgroundColor: '#fafafa',
        padding: '120px 48px',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Section title */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#1a3c34',
              margin: 0,
            }}
          >
            WHAT WE OFFER
          </h2>
          <div
            style={{
              width: '30px',
              height: '1px',
              backgroundColor: '#d9af61',
              margin: '16px auto 0',
            }}
          />
        </div>

        {/* Services path */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connecting line */}
          <div
            style={{
              position: 'absolute',
              left: '50px',
              top: '40px',
              bottom: '40px',
              width: '1px',
              backgroundColor: 'rgba(26, 60, 52, 0.15)',
            }}
            className="services-line"
          />

          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <AnimateIn
                key={idx}
                delay={0.2 * idx}
                distance={60}
                duration={1.3}
              >
                {/* ✅ Wrap whole item */}
                <Link
                  href={`/services/${service.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="service-item-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr',
                      gap: '48px',
                      alignItems: 'start',
                      marginBottom: idx < services.length - 1 ? '80px' : '0',
                      position: 'relative',
                      cursor: 'pointer', // 👈 important UX
                    }}
                  >
                    {/* Icon circle */}
                    <div
                      style={{
                        width: '100px',
                        height: '100px',
                        border: '1px solid #1a3c34',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <Icon size={36} strokeWidth={1} color="#1a3c34" />
                    </div>

                    {/* Content */}
                    <div style={{ paddingTop: '12px' }}>
                      <h3
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '20px',
                          fontWeight: 700,
                          letterSpacing: '2px',
                          textTransform: 'uppercase',
                          color: '#1a3c34',
                          margin: 0,
                          marginBottom: '16px',
                        }}
                      >
                        {service.title}
                      </h3>

                      <div
                        style={{
                          width: '30px',
                          height: '1px',
                          backgroundColor: '#d9af61',
                          marginBottom: '16px',
                        }}
                      />

                      <p
                        style={{
                          fontFamily: "'Lato', sans-serif",
                          fontSize: '15px',
                          fontWeight: 300,
                          color: '#555555',
                          lineHeight: 1.9,
                          margin: 0,
                          maxWidth: '500px',
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
      </div>
    </section>
  );
};
