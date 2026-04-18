"use client";

import { useEffect, useRef } from "react";

export default function PageProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="page-progress-shell" aria-hidden="true">
      <div ref={barRef} className="page-progress-bar" />
    </div>
  );
}
