"use client";

import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export default function CountUpNumber({
  value,
  duration = 1400,
  prefix = "",
  suffix = "",
}: CountUpNumberProps) {
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setDisplayValue(value);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    let frameId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [duration, hasStarted, value]);

  return (
    <span ref={elementRef}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
