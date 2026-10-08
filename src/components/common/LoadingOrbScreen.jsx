"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CANVAS = 240;
const ORB_R = 72;
const TAU = Math.PI * 2;

// Generate 3D sphere points
const DOT_LIST = (() => {
  const out = [];
  const rings = 20;
  for (let i = 0; i < rings; i++) {
    const y = 1 - (i / (rings - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const m = Math.max(1, Math.round(r * 32));
    for (let j = 0; j < m; j++) {
      const a = (j / m) * TAU + i * 0.35;
      out.push({
        x: Math.cos(a) * r,
        y,
        z: Math.sin(a) * r,
        u: (1 - y) / 2,
        seed: Math.random() * 6.28,
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

// Precompute BizzMate Brand Gradient colors (#a84bff -> #57c0e5 -> #266ac1)
const G_STEPS = 24;
const A_STEPS = 40;
const COLORS = (() => {
  const out = [];
  for (let gi = 0; gi <= G_STEPS; gi++) {
    const g = gi / G_STEPS;
    let r, gg, b;
    if (g < 0.5) {
      const t = g * 2;
      // #a84bff (168, 75, 255) to #57c0e5 (87, 192, 229)
      r = Math.round(168 + (87 - 168) * t);
      gg = Math.round(75 + (192 - 75) * t);
      b = Math.round(255 + (229 - 255) * t);
    } else {
      const t = (g - 0.5) * 2;
      // #57c0e5 (87, 192, 229) to #266ac1 (38, 106, 193)
      r = Math.round(87 + (38 - 87) * t);
      gg = Math.round(192 + (106 - 192) * t);
      b = Math.round(229 + (193 - 229) * t);
    }
    for (let ai = 0; ai <= A_STEPS; ai++) {
      out.push(`rgba(${r},${gg},${b},${(ai / A_STEPS).toFixed(3)})`);
    }
  }
  return out;
})();

export function LoadingOrbScreen({ onComplete }) {
  const [phase, setPhase] = useState("orb"); // "orb" -> "rectangle" -> "reveal" -> "done"
  const canvasRef = useRef(null);

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
    const SC = new Int16Array(N);

    let time = 0;
    let rot = 0;
    let alpha = 1;
    let pop = 1;
    let raf = 0;
    let isCancelled = false;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const C0 = CANVAS / 2;

    const render = () => {
      if (isCancelled) return;
      ctx.clearRect(0, 0, CANVAS, CANVAS);
      time += 0.02;
      rot += 0.015;

      const cyw = Math.cos(rot);
      const syw = Math.sin(rot);

      for (let n = 0; n < N; n++) {
        const dx = DX[n];
        const dy = DY[n];
        const dz = DZ[n];
        const u = DU[n];

        const x1 = dx * cyw + dz * syw;
        const z1 = -dx * syw + dz * cyw;
        const y2 = dy * CP - z1 * SP;
        const z2 = dy * SP + z1 * CP;
        const f = 2.8 / (2.8 - z2);
        const depth = (z2 + 1) / 2;

        const ox = x1 * ORB_R * pop * f;
        const oy = -y2 * ORB_R * pop * f;

        const g = u;
        let a = 0.2 + 0.3 * depth + 0.45 * Math.sin(DS[n] + time * 2);
        a = Math.min(1, Math.max(0, a)) * alpha;

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;
        SR[n] = (1.4 + 1.2 * depth) * f;

        const ai = Math.round(a * A_STEPS);
        const gi = Math.round(g * G_STEPS);
        SC[n] = ai <= 0 ? -1 : gi * (A_STEPS + 1) + ai;
      }

      // 2-pass drawing
      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          const c = SC[n];
          if (c < 0) continue;
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          ctx.fillStyle = COLORS[c];
          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    render();

    // Sequence timing:
    // 1. Orb runs for 2.2s
    // 2. Rectangular morph runs for 0.9s
    // 3. Reveal screen wipe
    const timer1 = setTimeout(() => {
      setPhase("rectangle");
    }, 2200);

    const timer2 = setTimeout(() => {
      setPhase("reveal");
    }, 3200);

    const timer3 = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      isCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loading-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "reveal" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617] overflow-hidden pointer-events-auto"
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-radial from-[#a84bff]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

        {/* Phase 1: Center 3D Orb */}
        {phase === "orb" && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center"
          >
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                style={{ width: CANVAS, height: CANVAS }}
                className="relative z-10"
              />
              <div className="absolute w-36 h-36 rounded-full bg-brand-gradient opacity-30 blur-2xl animate-pulse pointer-events-none" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#57c0e5] animate-ping" />
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-slate-300 font-semibold">
                  BIZZMATE // SYSTEM LOADING
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Architecting modern software solutions...
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 2: Morphing Rectangle into Full Screen */}
        {(phase === "rectangle" || phase === "reveal") && (
          <motion.div
            layoutId="morph-window"
            initial={{
              width: 140,
              height: 140,
              borderRadius: "50%",
              opacity: 0.8,
              scale: 0.9,
            }}
            animate={
              phase === "rectangle"
                ? {
                    width: 380,
                    height: 110,
                    borderRadius: 24,
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    width: "120vw",
                    height: "120vh",
                    borderRadius: 0,
                    opacity: 0,
                    scale: 1.15,
                  }
            }
            transition={{
              duration: phase === "rectangle" ? 0.7 : 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex items-center justify-center bg-slate-900/90 border border-[#a84bff]/40 shadow-2xl shadow-[#a84bff]/30 backdrop-blur-2xl p-6 overflow-hidden"
          >
            {phase === "rectangle" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center p-1.5 shadow-md">
                  <Image
                    src="/Only Logo.png"
                    alt="BizzMate Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white tracking-wide">
                    BIZZMATE
                  </div>
                  <div className="text-xs text-[#57c0e5] font-mono">
                    Software Agency Ready ✦
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
