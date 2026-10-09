"use client";

import { useEffect, useRef } from "react";
import { useMounted } from "@/hooks/useMounted";

export default function SmoothFollower() {
  const mounted = useMounted();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const mouse = { x: -100, y: -100, moved: false };
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let rafId = null;
    let isRunning = false;
    let isHovering = false;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePosition = () => {
      // Lerp dot (faster) and ring (smoother trailing)
      dot.x = lerp(dot.x, mouse.x, 0.35);
      dot.y = lerp(dot.y, mouse.y, 0.35);
      ring.x = lerp(ring.x, mouse.x, 0.15);
      ring.y = lerp(ring.y, mouse.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      const diffDot = Math.abs(mouse.x - dot.x) + Math.abs(mouse.y - dot.y);
      const diffRing = Math.abs(mouse.x - ring.x) + Math.abs(mouse.y - ring.y);

      // Sleep loop if converged to save 100% idle CPU
      if (diffDot < 0.1 && diffRing < 0.1) {
        isRunning = false;
        rafId = null;
        return;
      }

      rafId = requestAnimationFrame(updatePosition);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.moved) {
        mouse.moved = true;
        dot.x = e.clientX;
        dot.y = e.clientY;
        ring.x = e.clientX;
        ring.y = e.clientY;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
      startLoop();
    };

    // Event delegation for hover states — zero DOM queries
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest("a, button, input, textarea, select, [role='button']") ||
          target.tagName === "A" ||
          target.tagName === "BUTTON")
      ) {
        if (!isHovering) {
          isHovering = true;
          if (ringRef.current) {
            ringRef.current.style.width = "46px";
            ringRef.current.style.height = "46px";
            ringRef.current.style.borderColor = "rgba(124, 58, 237, 0.7)";
          }
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target &&
        (target.closest("a, button, input, textarea, select, [role='button']") ||
          target.tagName === "A" ||
          target.tagName === "BUTTON")
      ) {
        if (isHovering) {
          isHovering = false;
          if (ringRef.current) {
            ringRef.current.style.width = "28px";
            ringRef.current.style.height = "28px";
            ringRef.current.style.borderColor = "rgba(15, 23, 42, 0.4)";
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-slate-900 opacity-0 pointer-events-none will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-7 h-7 rounded-full border border-slate-900/40 opacity-0 pointer-events-none transition-[width,height,border-color] duration-200 ease-out will-change-transform"
      />
    </div>
  );
}

export { SmoothFollower };
