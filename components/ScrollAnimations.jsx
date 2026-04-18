'use client';

import { useEffect, useRef, useState } from 'react';

export function ScrollSection({ children, className = '', animation = 'slide-up-jerk' }) {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${className} ${
        isInView ? `animate-${animation}` : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export function ScrollCard({ children, className = '', delay = 0 }) {
  const cardRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${className} transition-all duration-700 ${
        isInView ? 'animate-scale-pop-in opacity-100' : 'opacity-0'
      }`}
      style={{
        animationDelay: isInView ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}
