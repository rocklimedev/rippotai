import { useState, useEffect } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  return (
    <>
      {/* Main cursor - logo */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: `translate(${position.x - 18}px, ${position.y - 18}px)`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s ease',
          mixBlendMode: 'screen',
        }}
      >
        <img
          src="https://customer-assets.emergentagent.com/job_rippotai-arch/artifacts/m8qgu5v4_white%20logo%20X2.png"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            filter: 'brightness(1.2)',
          }}
        />
      </div>

      {/* Trail glow effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '60px',
          height: '60px',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: `translate(${position.x - 30}px, ${position.y - 30}px)`,
          opacity: visible ? 0.3 : 0,
          transition: 'transform 0.15s ease-out, opacity 0.2s ease',
          background:
            'radial-gradient(circle, rgba(217, 175, 97, 0.4) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
    </>
  );
};
