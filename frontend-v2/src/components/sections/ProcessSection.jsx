import { processSteps } from '@/lib/config';
import { Separator } from '../ui/separator';
import { AnimateIn } from '../layouts/AnimateIn';
export const ProcessSection = () => {
  return (
    <section
      id="process"
      style={{
        backgroundColor: '#fafafa',
        padding: '60px 48px 30px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Section title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#1a3c34',
              margin: 0,
            }}
          >
            OUR PROCESS
          </h2>
        </div>

        {/* Process steps */}
        <div>
          {processSteps.map((step, idx) => (
            <AnimateIn
              key={step.id}
              delay={0.15 * idx}
              distance={50}
              duration={1.2}
            >
              <div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '32px',
                    alignItems: 'center',
                    padding: '40px 0',
                  }}
                  className="process-step-grid"
                >
                  {/* Step icon */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src={step.icon}
                      alt={step.title}
                      style={{
                        width: 'auto',
                        height: '80px',
                        objectFit: 'contain',
                        display: 'block',
                      }}
                    />
                  </div>

                  {/* Step content */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        color: '#1a3c34',
                        margin: 0,
                        marginBottom: '12px',
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Lato', sans-serif",
                        fontSize: '15px',
                        fontWeight: 300,
                        color: '#555555',
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {idx < processSteps.length - 1 && (
                  <Separator
                    style={{
                      backgroundColor: 'rgba(26, 60, 52, 0.1)',
                      height: '1px',
                    }}
                  />
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};
