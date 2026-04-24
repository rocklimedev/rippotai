// components/FadeInSection.jsx     ← this is now a CLIENT component
'use client';

import { useInView } from 'react-intersection-observer';

export default function FadeInSection({
  children,
  delay = 0,
  aboveGrid = false,
}) {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '0px 0px -10% 0px',
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? aboveGrid
            ? 'none'
            : 'translateY(0)'
          : 'translateY(80px)',
        transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        ...(aboveGrid ? { position: 'relative', zIndex: 10 } : {}),
      }}
    >
      {children}
    </div>
  );
}
