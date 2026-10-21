"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { canRender3D } from "@/lib/3d/canRender3D";

// Dynamically import RobotCanvas on client side only (ssr: false)
const RobotCanvas = dynamic(() => import("./RobotCanvas"), {
  ssr: false,
});

export function Hero3DWrapper({
  color = "#ffffff",
  pantallaColor = "#a84bff",
  scale = 1.2,
}) {
  const [canRender, setCanRender] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. Evaluate device capability gate
    if (!canRender3D()) return;

    // 2. Load WebGL scene during browser idle time so first paint and LCP remain unblocked
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setCanRender(true), {
        timeout: 1200,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setCanRender(true), 50);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      {/* Fallback ambient glowing presence while canvas initializes */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-brand-violet/10 blur-2xl pointer-events-none transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Interactive 3D Canvas fades in smoothly once ready with zero layout shift */}
      {canRender && (
        <div
          className={`w-full h-full transition-opacity duration-500 ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <RobotCanvas
            color={color}
            pantallaColor={pantallaColor}
            scale={scale}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}

export default Hero3DWrapper;
