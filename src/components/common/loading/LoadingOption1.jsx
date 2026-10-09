"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const CANVAS = 260;
const ORB_R = 72;
const TAU = Math.PI * 2;

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 3D sphere points distribution
const RINGS = 18;
const DOT_LIST = (() => {
  const rand = mulberry32(7);
  const out = [];
  for (let k = 0; k < RINGS; k++) {
    const y = 1 - ((k + 0.5) / RINGS) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const m = Math.max(4, Math.round(32 * r));
    for (let j = 0; j < m; j++) {
      const a = (j / m) * TAU + k * 0.35;
      out.push({
        x: Math.cos(a) * r,
        y,
        z: Math.sin(a) * r,
        u: (1 - y) / 2,
        seed: rand() * 6.283,
      });
    }
  }
  return out;
})();

const N = DOT_LIST.length;
const DX = Float32Array.from(DOT_LIST, (d) => d.x);
const DY = Float32Array.from(DOT_LIST, (d) => d.y);
const DZ = Float32Array.from(DOT_LIST, (d) => d.z);
const DU = Float32Array.from(DOT_LIST, (d) => d.u);
const DS = Float32Array.from(DOT_LIST, (d) => d.seed);

export default function LoadingOption1({ onComplete }) {
  // Phases: "thinking" -> "green_dots" -> "green_circle" -> "shrink" -> "done"
  const [phase, setPhase] = useState("thinking");
  const [pillTarget, setPillTarget] = useState({
    top: 14,
    left: 48,
    width: 82,
    height: 38,
  });

  const canvasRef = useRef(null);
  const phaseRef = useRef("thinking");

  // Measure Navbar Home active pill position for the final shrink animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const measurePill = () => {
      // Find the Home link or active indicator in Navbar
      const homeLink =
        document.querySelector('header nav a[href="/#hero"]') ||
        document.querySelector('header nav a');

      if (homeLink) {
        const rect = homeLink.getBoundingClientRect();
        if (rect.width > 20 && rect.height > 20) {
          setPillTarget({
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
          return;
        }
      }

      // Fallback based on viewport
      const isLg = window.innerWidth >= 1024;
      const isSm = window.innerWidth >= 640;
      setPillTarget({
        top: 14,
        left: isLg ? 48 : isSm ? 32 : 16,
        width: 82,
        height: 38,
      });
    };

    measurePill();
    window.addEventListener("resize", measurePill);
    return () => window.removeEventListener("resize", measurePill);
  }, []);

  // 3D Dotted Orb Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = CANVAS * dpr;
    canvas.height = CANVAS * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const SX = new Float32Array(N);
    const SY = new Float32Array(N);
    const SD = new Float32Array(N);
    const SR = new Float32Array(N);
    const SAlpha = new Float32Array(N);
    const SIsWave = new Uint8Array(N);
    const SIsGreen = new Uint8Array(N);

    let time = 0;
    let rot = 0;
    let raf = 0;
    let isCancelled = false;

    // 4 Lighting wave programs
    let prog = 0;
    const pw = [1, 0, 0, 0];
    const lit = new Float32Array(N);

    let greenSweep = 0;
    let collapseProgress = 0;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const C0 = CANVAS / 2;

    let lastProgTime = performance.now();

    const render = () => {
      if (isCancelled) return;
      ctx.clearRect(0, 0, CANVAS, CANVAS);

      const dt = 0.016;
      time += dt;
      rot += 0.012;

      // Cycle wave programs every 1.15 seconds
      const now = performance.now();
      if (now - lastProgTime > 1150) {
        prog = (prog + 1) % 4;
        lastProgTime = now;
      }

      // Smooth step towards target program weights
      const stepW = dt / 0.35;
      for (let q = 0; q < 4; q++) {
        const d = (q === prog ? 1 : 0) - pw[q];
        pw[q] += Math.abs(d) <= stepW ? d : d > 0 ? stepW : -stepW;
      }

      // Wave math
      const decay = Math.exp(-dt / 0.45);
      const h0 = (time * 280) % N;
      const h3 = (time * 440) % N;
      const a1 = time * 0.8;
      const b1 = Math.sin(time * 0.5) * 0.9;
      const f1x = Math.cos(b1) * Math.cos(a1);
      const f1y = Math.sin(b1);
      const f1z = Math.cos(b1) * Math.sin(a1);

      const a2 = time * 0.55 + 2.1;
      const b2 = Math.cos(time * 0.42) * 0.9;
      const f2x = Math.cos(b2) * Math.cos(a2);
      const f2y = Math.sin(b2);
      const f2z = Math.cos(b2) * Math.sin(a2);
      const lat = Math.sin(time * 2.2);

      // Advance green sweep when in green_dots phase
      if (phaseRef.current === "green_dots" || phaseRef.current === "green_circle") {
        greenSweep = Math.min(1, greenSweep + dt * 2.2);
      }
      if (phaseRef.current === "green_circle") {
        collapseProgress = Math.min(1, collapseProgress + dt * 3.0);
      }

      const cyw = Math.cos(rot);
      const syw = Math.sin(rot);

      for (let n = 0; n < N; n++) {
        const dx = DX[n];
        const dy = DY[n];
        const dz = DZ[n];
        const u = DU[n];

        // Light wave pulses
        let pulse = 0;
        if (pw[0] > 0.001) {
          let dd = Math.abs(n - h0);
          if (dd > N - dd) dd = N - dd;
          const v = Math.max(0, 1 - dd / 16);
          pulse = Math.max(pulse, v * v * pw[0]);
        }
        if (pw[1] > 0.001) {
          const v1 = Math.max(0, (dx * f1x + dy * f1y + dz * f1z - 0.72) / 0.28);
          const v2 = Math.max(0, (dx * f2x + dy * f2y + dz * f2z - 0.72) / 0.28);
          const v = Math.max(v1, v2);
          pulse = Math.max(pulse, v * v * pw[1]);
        }
        if (pw[2] > 0.001) {
          const e = dy - lat;
          const v = Math.max(0, 1 - (e * e) / 0.02);
          pulse = Math.max(pulse, v * v * pw[2]);
        }
        if (pw[3] > 0.001) {
          let dd = Math.abs(n - h3);
          if (dd > N - dd) dd = N - dd;
          const v = Math.max(0, 1 - dd / 22);
          pulse = Math.max(pulse, v * v * pw[3]);
        }

        const l = Math.max(lit[n] * decay, pulse * 1.3);
        lit[n] = l;

        // 3D rotation projection
        const x1 = dx * cyw + dz * syw;
        const z1 = -dx * syw + dz * cyw;
        const y2 = dy * CP - z1 * SP;
        const z2 = dy * SP + z1 * CP;
        const f = 2.8 / (2.8 - z2);
        const depth = (z2 + 1) / 2;

        // Collapse inwards when solid green circle appears
        const currentR = ORB_R * (1 - collapseProgress * 0.45);
        const ox = x1 * currentR * f;
        const oy = -y2 * currentR * f;

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;

        // Is this dot currently converted to green?
        const isGreen = greenSweep > 0 && u <= greenSweep * 1.3;
        SIsGreen[n] = isGreen ? 1 : 0;

        // Is this dot actively energized by white thinking wave?
        const isWave = l > 0.18;
        SIsWave[n] = isWave ? 1 : 0;

        if (isGreen) {
          SR[n] = (1.4 + 1.2 * depth + (isWave ? 0.8 : 0)) * f;
          SAlpha[n] = Math.min(1, 0.55 + 0.45 * depth);
        } else if (isWave) {
          // Pure white energized thinking wave dot
          SR[n] = (1.7 + 1.3 * depth + l * 0.8) * f;
          SAlpha[n] = Math.min(1, 0.85 + 0.15 * depth);
        } else {
          // Static muted lavender-grey cage dot
          SR[n] = (1.1 + 0.8 * depth) * f;
          SAlpha[n] = (0.28 + 0.35 * depth * depth) * (1 - collapseProgress);
        }
      }

      // Two-pass 3D volumetric sorting: back half then front half
      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          if (SAlpha[n] <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);

          if (SIsGreen[n] === 1) {
            // Electric Emerald Green
            ctx.fillStyle = `rgba(52, 211, 153, ${SAlpha[n].toFixed(2)})`;
          } else if (SIsWave[n] === 1) {
            // Pure Brilliant White
            ctx.fillStyle = `rgba(255, 255, 255, ${SAlpha[n].toFixed(2)})`;
          } else {
            // Static Muted Lavender-Grey
            ctx.fillStyle = `rgba(180, 168, 206, ${SAlpha[n].toFixed(2)})`;
          }
          ctx.fill();
        }
      }

      if (phaseRef.current !== "shrink" && phaseRef.current !== "done") {
        raf = requestAnimationFrame(render);
      }
    };

    render();

    // Timeline orchestrator:
    // 1. Thinking phase: 0 to 2000ms
    // 2. Green dots wave: 2000ms to 2700ms
    // 3. Solid Green circle + Tick mark: 2700ms to 3500ms
    // 4. Shrink entire screen into Navbar Home Pill: 3500ms to 4400ms
    // 5. Done: 4400ms
    const t1 = setTimeout(() => {
      phaseRef.current = "green_dots";
      setPhase("green_dots");
    }, 2000);

    const t2 = setTimeout(() => {
      phaseRef.current = "green_circle";
      setPhase("green_circle");
    }, 2700);

    const t3 = setTimeout(() => {
      phaseRef.current = "shrink";
      setPhase("shrink");
    }, 3600);

    const t4 = setTimeout(() => {
      phaseRef.current = "done";
      setPhase("done");
      if (onComplete) onComplete();
    }, 4450);

    return () => {
      isCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isShrinking = phase === "shrink";

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen-option-1"
        initial={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          backgroundColor: "#0d0716",
        }}
        animate={
          isShrinking
            ? {
                top: pillTarget.top,
                left: pillTarget.left,
                width: pillTarget.width,
                height: pillTarget.height,
                borderRadius: "9999px",
                backgroundColor: "#7c3aed",
                opacity: [1, 1, 0],
              }
            : {
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                opacity: 1,
              }
        }
        transition={
          isShrinking
            ? {
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                opacity: { delay: 0.7, duration: 0.15 },
              }
            : { duration: 0.3 }
        }
        style={{
          background: isShrinking
            ? undefined
            : "radial-gradient(circle at 18% 18%, #281042 0%, #150927 45%, #0a0414 100%)",
        }}
        className="fixed z-[100] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Soft atmospheric ambient light in top-left */}
        {!isShrinking && (
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/15 blur-[120px] pointer-events-none" />
        )}

        {/* Center Stage: Dotted Orb Canvas & Solid Green Badge Pop */}
        <div
          className={`relative flex flex-col items-center justify-center z-10 transition-opacity duration-300 ${
            isShrinking ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative w-[260px] h-[260px] flex items-center justify-center">
            {/* 3D Dotted Canvas */}
            <canvas
              ref={canvasRef}
              style={{ width: CANVAS, height: CANVAS }}
              className={`relative z-10 transition-opacity duration-300 ${
                phase === "green_circle" ? "opacity-30 scale-95" : "opacity-100"
              }`}
            />

            {/* Subtle soft purple halo behind canvas */}
            <div className="absolute w-36 h-36 rounded-full bg-[#a84bff]/15 blur-2xl pointer-events-none" />

            {/* Phase 2B: Solid Green Circle Pop with White Check Icon */}
            <AnimatePresence>
              {phase === "green_circle" && (
                <motion.div
                  key="green-solid-badge"
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 24,
                    mass: 0.8,
                  }}
                  className="absolute z-20 w-24 h-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-2xl shadow-emerald-500/50 border border-emerald-300/40"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 500,
                      damping: 22,
                    }}
                  >
                    <Check className="w-10 h-10 text-white stroke-[3.5]" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Understated Tech Status Typography */}
          <div className="mt-7 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  phase === "green_circle" || phase === "green_dots"
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                    : "bg-[#a84bff] animate-pulse"
                }`}
              />
              <span className="text-[11px] uppercase font-mono tracking-[0.28em] text-white/90 font-bold">
                {phase === "green_circle"
                  ? "SYSTEM // READY"
                  : "BIZZMATE // LOADING"}
              </span>
            </div>
            <p className="text-[11px] font-mono text-purple-200/50 tracking-wide">
              {phase === "green_circle"
                ? "Launching software interface..."
                : "Synchronizing high-performance engine..."}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
