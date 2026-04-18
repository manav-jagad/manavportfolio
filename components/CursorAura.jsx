"use client";

import { useEffect, useRef } from "react";

export default function CursorAura() {
  const primaryRef = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    let animationFrame = 0;
    let pointerActive = false;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const setOpacity = (value) => {
      if (primaryRef.current) {
        primaryRef.current.style.opacity = value;
      }

      if (secondaryRef.current) {
        secondaryRef.current.style.opacity = value;
      }
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (primaryRef.current) {
        primaryRef.current.style.transform = `translate3d(${currentX - 180}px, ${
          currentY - 180
        }px, 0)`;
      }

      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate3d(${currentX - 110}px, ${
          currentY - 110
        }px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!pointerActive) {
        pointerActive = true;
        setOpacity("1");
      }
    };

    const handlePointerLeave = () => {
      pointerActive = false;
      setOpacity("0");
    };

    animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <>
      <div ref={primaryRef} className="cursor-aura cursor-aura-primary" />
      <div ref={secondaryRef} className="cursor-aura cursor-aura-secondary" />
    </>
  );
}
