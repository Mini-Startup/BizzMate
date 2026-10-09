"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const CANVAS = 250;
const ORB_R = 74;
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

// 3D sphere points distribution matching loading_orb.md
const RINGS = 16;
const DOT_LIST = (() => {
  const rand = mulberry32(7);
  const out = [];
  for (let k = 0; k < RINGS; k++) {
    const y = 1 - ((k + 0.5) / RINGS) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const m = Math.max(4, Math.round(30 * r));
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
  // Phases: "thinking" -> "violet_sweep" -> "violet_badge" -> "shrink" -> "done"
  const [phase, setPhase] = useState("thinking");
  const [pillTarget, setPillTarget] = useState({
    top: 14,
    left: 48,
    width: 78,
    height: 36,
  });

  const canvasRef = useRef(null);
  const phaseRef = useRef("thinking");

  // Function to precisely measure the Home link position in the Navbar
  const measureHomePill = () => {
    if (typeof window === "undefined") return;

    // Direct lookup using unique ID on the Home nav item
    const homeEl = document.getElementById("nav-item-hero");

    if (homeEl) {
      const rect = homeEl.getBoundingClientRect();
      if (rect.width > 20 && rect.height > 20 && rect.left < 200) {
        setPillTarget({
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
        return;
      }
    }

    // Fallback based on responsive navbar layout
    const isLg = window.innerWidth >= 1024;
    const isMd = window.innerWidth >= 768;
    const isSm = window.innerWidth >= 640;
    const fallbackLeft = isLg ? 48 : isMd ? 40 : isSm ? 32 : 16;
    setPillTarget({
      top: 14,
      left: fallbackLeft,
      width: 76,
      height: 36,
    });
  };

  useEffect(() => {
    const handleResize = () => measureHomePill();
    const rafId = requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3D Dotted Orb Canvas Engine: Delicate micro-dots with Brand Violet thinking waves
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
    const SIsSweep = new Uint8Array(N);

    let time = 0;
    let rot = 0;
    let raf = 0;
    let isCancelled = false;

    // 4 wave programs from loading_orb.md
    let prog = 0;
    const pw = [1, 0, 0, 0];
    const lit = new Float32Array(N);

    let sweepProgress = 0;
    let condenseProgress = 0;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const C0 = CANVAS / 2;

    let lastProgTime = performance.now();

    const render = () => {
      if (isCancelled) return;
      ctx.clearRect(0, 0, CANVAS, CANVAS);

      const dt = 0.016;
      time += dt;
      rot += 0.014;

      // Cycle wave programs every 1.15 seconds
      const now = performance.now();
      if (now - lastProgTime > 1150) {
        prog = (prog + 1) % 4;
        lastProgTime = now;
      }

      // Step towards target program weights
      const stepW = dt / 0.35;
      for (let q = 0; q < 4; q++) {
        const d = (q === prog ? 1 : 0) - pw[q];
        pw[q] += Math.abs(d) <= stepW ? d : d > 0 ? stepW : -stepW;
      }

      // Wave math
      const decay = Math.exp(-dt / 0.45);
      const h0 = (time * 260) % N;
      const h3 = (time * 420) % N;
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

      // Advance sweep when in violet_sweep phase
      if (
        phaseRef.current === "violet_sweep" ||
        phaseRef.current === "violet_badge"
      ) {
        sweepProgress = Math.min(1, sweepProgress + dt * 2.5);
      }
      if (phaseRef.current === "violet_badge") {
        condenseProgress = Math.min(1, condenseProgress + dt * 3.2);
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

        // Scale radius down when badge pops
        const currentR = ORB_R * (1 - condenseProgress * 0.4);
        const ox = x1 * currentR * f;
        const oy = -y2 * currentR * f;

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;

        // Completion sweep across dots
        const isSwept = sweepProgress > 0 && u <= sweepProgress * 1.25;
        SIsSweep[n] = isSwept ? 1 : 0;

        // Wave active dot
        const isWave = l > 0.16;
        SIsWave[n] = isWave ? 1 : 0;

        // Zero out all dots cleanly when condensing into badge so zero particles leak
        const badgeFade = Math.max(0, 1 - condenseProgress * 1.4);
        if (isSwept) {
          SR[n] = (1.2 * (0.45 + 0.65 * depth) * f + 0.8) * badgeFade;
          SAlpha[n] = Math.min(1, 0.7 + 0.3 * depth) * badgeFade;
        } else if (isWave) {
          // Sharp active wave dot
          SR[n] = (1.22 * (0.45 + 0.65 * depth) * f + 0.75 * l) * badgeFade;
          SAlpha[n] = Math.min(1, 0.82 + 0.18 * depth) * badgeFade;
        } else {
          // Static soft lavender-purple cage dot
          SR[n] = 1.12 * (0.4 + 0.6 * depth) * f * badgeFade;
          SAlpha[n] = (0.28 + 0.38 * depth * depth) * badgeFade;
        }
      }

      // Two-pass sorting: back half then front half
      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          if (SAlpha[n] <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);

          if (SIsSweep[n] === 1) {
            // Full Brand Violet sweep (#a84bff / #7c3aed)
            ctx.fillStyle = `rgba(168, 75, 255, ${SAlpha[n].toFixed(2)})`;
          } else if (SIsWave[n] === 1) {
            // Active Deep Brand Purple wave (#7c3aed)
            ctx.fillStyle = `rgba(124, 58, 237, ${SAlpha[n].toFixed(2)})`;
          } else {
            // Static Light Lavender-Purple cage dots (#c4b5fd / #a78bfa)
            ctx.fillStyle = `rgba(167, 139, 250, ${SAlpha[n].toFixed(2)})`;
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
    // 2. Violet sweep wave: 2000ms to 2600ms
    // 3. Brand Violet circle + Check badge: 2600ms to 3300ms
    // 4. Shrink entire screen into Navbar Home Pill: 3300ms to 4200ms
    // 5. Done: 4200ms
    const t1 = setTimeout(() => {
      phaseRef.current = "violet_sweep";
      setPhase("violet_sweep");
    }, 2000);

    const t2 = setTimeout(() => {
      phaseRef.current = "violet_badge";
      setPhase("violet_badge");
    }, 2600);

    const t3 = setTimeout(() => {
      // Re-measure Home pill right before initiating the shrink animation
      measureHomePill();
      phaseRef.current = "shrink";
      setPhase("shrink");
    }, 3400);

    const t4 = setTimeout(() => {
      phaseRef.current = "done";
      setPhase("done");
      if (onComplete) onComplete();
    }, 4250);

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
          backgroundColor: "#fdfcff",
        }}
        animate={
          isShrinking
            ? {
                top: pillTarget.top,
                left: pillTarget.left,
                width: pillTarget.width,
                height: pillTarget.height,
                borderRadius: "9999px",
                backgroundColor: "#a84bff",
                opacity: [1, 1, 0],
              }
            : {
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                borderRadius: "0px",
                backgroundColor: "#fdfcff",
                opacity: 1,
              }
        }
        transition={
          isShrinking
            ? {
                duration: 0.82,
                ease: [0.16, 1, 0.3, 1],
                opacity: { delay: 0.68, duration: 0.14 },
              }
            : { duration: 0.25 }
        }
        className="fixed z-[100] overflow-hidden flex items-center justify-center select-none shadow-none"
      >
        {/* Soft, mild light-mode background gradient that dissolves cleanly when shrinking */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
            isShrinking ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, #ede9fe 0%, #f5f3ff 30%, #f0f7ff 65%, #ffffff 100%)",
          }}
        />

        {/* Center Stage: Delicate Dotted Orb Canvas & Solid Brand Badge Pop */}
        <div
          className={`relative flex flex-col items-center justify-center z-10 transition-opacity duration-200 ${
            isShrinking ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="relative w-[250px] h-[250px] flex items-center justify-center">
            {/* 3D Dotted Canvas: completely fades to 0 when badge is active so zero particles leak */}
            <canvas
              ref={canvasRef}
              style={{ width: CANVAS, height: CANVAS }}
              className={`relative z-10 transition-all duration-300 ${
                phase === "violet_badge" || phase === "shrink"
                  ? "opacity-0 scale-75 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            />

            {/* Subtle soft lavender glow behind canvas */}
            <div className="absolute w-32 h-32 rounded-full bg-[#a84bff]/10 blur-xl pointer-events-none" />

            {/* Phase 2B: Solid Brand Violet Badge with Animated SVG Check Icon */}
            <AnimatePresence>
              {phase === "violet_badge" && (
                <motion.div
                  key="violet-solid-badge"
                  initial={{ scale: 0.25, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 24,
                    mass: 0.75,
                  }}
                  className="absolute z-20 w-24 h-24 rounded-full bg-brand-violet flex items-center justify-center shadow-2xl shadow-brand-violet/40 ring-4 ring-brand-violet/25"
                >
                  <svg
                    className="w-11 h-11 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Understated Light-Mode Tech Status Typography */}
          <div className="mt-6 flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  phase === "violet_badge" || phase === "violet_sweep"
                    ? "bg-brand-violet shadow-sm shadow-brand-violet"
                    : "bg-brand-blue animate-pulse"
                }`}
              />
              <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-900 font-bold">
                {phase === "violet_badge"
                  ? "BIZZMATE // READY"
                  : "BIZZMATE // LOADING"}
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 tracking-wide">
              {phase === "violet_badge"
                ? "Launching software environment..."
                : "Synchronizing agency engine..."}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
