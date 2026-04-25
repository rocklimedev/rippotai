import { aboutImage } from '@/lib/config';
import { AnimateIn } from '../layouts/AnimateIn';

export const WhereItBegan = () => {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '120px 48px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="where-it-began-grid"
      >
        {/* Left - Text */}
        <div>
          <AnimateIn delay={0} distance={50} duration={1.2}>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 300,
                color: '#1a3c34',
                letterSpacing: '1px',
                lineHeight: 1.2,
                margin: 0,
                marginBottom: '40px',
              }}
            >
              About Us
            </h2>
          </AnimateIn>

          <AnimateIn delay={0.15} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#444444',
                lineHeight: 1.9,
                margin: 0,
                marginBottom: '20px',
              }}
            >
              {'\u201CRippotai,\u201D'} is inspired by the Japanese term for{' '}
              {'\u201Ccube,\u201D'} symbolizing the fundamental form of objects
              and the essence of design.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.3} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#444444',
                lineHeight: 1.9,
                margin: 0,
                marginBottom: '20px',
              }}
            >
              In geometry, the cube stands as a primary shape, a building block
              from which complex forms and structures arise. Its uniformity and
              symmetry provide a sense of order and coherence, making it a
              powerful symbol in the world of design.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.45} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#444444',
                lineHeight: 1.9,
                margin: 0,
                marginBottom: '20px',
              }}
            >
              The functionality of a cube, with its capacity to be stacked,
              rotated, and transformed, mirrors our approach to versatile and
              adaptive design. In architecture, the cube's simplicity serves as
              a canvas for creativity.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.6} distance={50} duration={1.2}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                fontWeight: 300,
                color: '#444444',
                lineHeight: 1.9,
                margin: 0,
              }}
            >
              It encourages us to think beyond conventional forms and experiment
              with space, light, and material. We are committed to creating
              iconic, functional, and user-centric designs.
            </p>
          </AnimateIn>
        </div>

        {/* Right - Image */}
        <AnimateIn delay={0.2} distance={60} duration={1.4}>
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={aboutImage}
              alt="Rippotai team"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};
