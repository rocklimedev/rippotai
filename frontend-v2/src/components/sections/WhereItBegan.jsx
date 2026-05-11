import { aboutImage } from '@/lib/config';

export const WhereItBegan = () => {
  return (
    <section
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 48px',
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
          <div>
            <h2
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 'clamp(34px, 4.2vw, 52px)',
                fontWeight: 300,
                color: '#1a3c34',
                letterSpacing: '1px',
                lineHeight: 1.2,
                margin: 0,
                marginBottom: '12px',
              }}
            >
              About Us
            </h2>
          </div>

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
            adaptive design. In architecture, the cube's simplicity serves as a
            canvas for creativity.
          </p>

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
        </div>

        {/* Right - Image */}
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
      </div>
    </section>
  );
};
