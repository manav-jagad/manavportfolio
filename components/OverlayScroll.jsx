'use client';

import { useEffect, useRef, useState } from 'react';

export function OverlaySection({ children, index = 0 }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - rect.top / windowHeight;
        const clampedProgress = Math.max(0, Math.min(1, progress));
        setScrollProgress(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate the overlay effect
  const yOffset = Math.max(0, (1 - scrollProgress) * 80); // Up to 80px offset
  const scale = 0.95 + scrollProgress * 0.05; // Slight scale effect
  const opacity = 0.9 + scrollProgress * 0.1; // Opacity effect

  return (
    <div
      ref={sectionRef}
      className="relative scroll-snap-section"
      style={{
        zIndex: index,
        transform: `translateY(${yOffset}px) scale(${scale})`,
        opacity: opacity,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        transformOrigin: 'top center',
      }}
    >
      {children}
    </div>
  );
}

export function OverlayContainer({ children }) {
  return (
    <div className="relative bg-gray-950" style={{ perspective: '1000px' }}>
      {children}
    </div>
  );
}
