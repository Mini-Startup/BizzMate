"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe hook detecting user preference for reduced motion.
 * @returns {boolean} Whether prefers-reduced-motion is active.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export default useReducedMotion;
