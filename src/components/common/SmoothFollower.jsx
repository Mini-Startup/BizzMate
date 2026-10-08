"use client";

import { useState, useEffect, useRef } from "react";

export function SmoothFollower() {
  const mousePosition = useRef({ x: -100, y: -100 });
  const dotPosition = useRef({ x: -100, y: -100 });
  const borderDotPosition = useRef({ x: -100, y: -100 });

  const [renderPos, setRenderPos] = useState({
    dot: { x: -100, y: -100 },
    border: { x: -100, y: -100 },
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const DOT_SMOOTHNESS = 0.22;
  const BORDER_DOT_SMOOTHNESS = 0.12;

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse/trackpad)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    // Use event delegation for universal hover detection across all current & dynamic elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest &&
        target.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor-hover], label, summary"
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);

    let animationFrameId;

    const animate = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;

      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Center Precision Dot */}
      <div
        className="absolute rounded-full transition-transform duration-100 ease-out"
        style={{
          width: isHovering ? "6px" : "8px",
          height: isHovering ? "6px" : "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
          backgroundColor: isHovering ? "#a84bff" : "#0f172a",
        }}
      />

      {/* Trailing Outer Ring */}
      <div
        className="absolute rounded-full transition-all duration-300 ease-out"
        style={{
          width: isHovering ? "48px" : "30px",
          height: isHovering ? "48px" : "30px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          borderWidth: isHovering ? "1.5px" : "1px",
          borderColor: isHovering ? "#a84bff" : "rgba(15, 23, 42, 0.35)",
          backgroundColor: isHovering ? "rgba(168, 75, 255, 0.08)" : "transparent",
        }}
      />
    </div>
  );
}

export default SmoothFollower;
