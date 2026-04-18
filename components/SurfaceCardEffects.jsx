"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function SurfaceCardEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    const cards = Array.from(
      document.querySelectorAll(".surface-card:not(.surface-card-static)")
    );

    const cleanups = cards.map((card) => {
      const handlePointerMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        const rotateY = ((x - 50) / 7).toFixed(2);
        const rotateX = ((50 - y) / 7).toFixed(2);

        card.style.setProperty("--spot-x", `${x}%`);
        card.style.setProperty("--spot-y", `${y}%`);
        card.style.setProperty("--rotate-x", `${rotateX}deg`);
        card.style.setProperty("--rotate-y", `${rotateY}deg`);
        card.classList.add("is-hovered");
      };

      const handlePointerLeave = () => {
        card.style.setProperty("--spot-x", "50%");
        card.style.setProperty("--spot-y", "50%");
        card.style.setProperty("--rotate-x", "0deg");
        card.style.setProperty("--rotate-y", "0deg");
        card.classList.remove("is-hovered");
      };

      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
