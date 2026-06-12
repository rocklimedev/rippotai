'use client';

import { useState, useEffect } from 'react';

const SKELETON_STYLES = `
  @keyframes sk-pulse {
    0%,100% { opacity:1; }
    50% { opacity:.45; }
  }

  .sk {
    background:#e8e4df;
    animation:sk-pulse 1.6s ease-in-out infinite;
    border-radius:0;
  }
`;

const Box = ({ width, height, style = {} }) => (
  <div
    className="sk"
    style={{
      width,
      height,
      ...style,
    }}
  />
);

const ImageBox = ({ height }) => (
  <div
    className="sk"
    style={{
      width: '100%',
      height,
      minHeight: height,
      borderRadius: 0,
    }}
  />
);

const TextBlock = () => (
  <div style={{ padding: '12px 0' }}>
    <Box width={90} height={8} style={{ marginBottom: 8 }} />
    <Box width="100%" height={8} style={{ marginBottom: 6 }} />
    <Box width="80%" height={8} />
  </div>
);

export default function WorksSectionSkeleton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);

    check();

    window.addEventListener('resize', check);

    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <style>{SKELETON_STYLES}</style>

      <section
        style={{
          background: '#f5f2ee',
          padding: isMobile ? '40px 8px' : '80px 12px',
          width: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 'none',
            margin: 0,
          }}
        >
          {/* Header */}

          <div
            style={{
              textAlign: 'center',
              marginBottom: 60,
            }}
          >
            <Box width={100} height={10} style={{ margin: '0 auto 16px' }} />

            <Box width={260} height={40} style={{ margin: '0 auto 28px' }} />

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 24,
              }}
            >
              <Box width={40} height={10} />
              <Box width={80} height={10} />
              <Box width={60} height={10} />
            </div>
          </div>

          {/* Editorial Layout */}

          <div
            style={{
              display: 'grid',
              gap: 8,
            }}
          >
            {/* TOP SECTION */}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: 8,
              }}
            >
              {/* Left Stack */}

              <div
                style={{
                  display: 'grid',
                  gap: 8,
                }}
              >
                <ImageBox height={isMobile ? 240 : 420} />

                <ImageBox height={isMobile ? 240 : 420} />
              </div>

              {/* Tall Image */}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <ImageBox height={isMobile ? 320 : 848} />

                {!isMobile && <TextBlock />}
              </div>
            </div>

            {/* MIDDLE SECTION */}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
                gap: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <ImageBox height={isMobile ? 240 : 420} />

                <TextBlock />
              </div>

              <div
                style={{
                  display: 'grid',
                  gap: 8,
                }}
              >
                <ImageBox height={isMobile ? 240 : 420} />

                <ImageBox height={isMobile ? 240 : 420} />
              </div>
            </div>

            {/* BOTTOM STRIP */}

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                gap: 8,
              }}
            >
              <ImageBox height={isMobile ? 220 : 320} />

              <ImageBox height={isMobile ? 220 : 320} />
            </div>
          </div>

          {/* CTA */}

          <div
            style={{
              textAlign: 'center',
              marginTop: 60,
            }}
          >
            <Box width={150} height={14} style={{ margin: '0 auto' }} />
          </div>
        </div>
      </section>
    </>
  );
}
