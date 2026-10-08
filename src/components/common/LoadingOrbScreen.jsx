"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CANVAS = 240;
const ORB_R = 74;
const TAU = Math.PI * 2;

// 3D sphere points
const DOT_LIST = (() => {
  const out = [];
  const rings = 22;
  for (let i = 0; i < rings; i++) {
    const y = 1 - (i / (rings - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const m = Math.max(1, Math.round(r * 36));
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

// Precompute BizzMate Brand Gradient colors for light background:
// #a84bff (168, 75, 255) -> #266ac1 (38, 106, 193) -> #57c0e5 (87, 192, 229)
const G_STEPS = 24;
const A_STEPS = 40;
const COLORS = (() => {
  const out = [];
  for (let gi = 0; gi <= G_STEPS; gi++) {
    const g = gi / G_STEPS;
    let r, gg, b;
    if (g < 0.5) {
      const t = g * 2;
      r = Math.round(168 + (38 - 168) * t);
      gg = Math.round(75 + (106 - 75) * t);
      b = Math.round(255 + (193 - 255) * t);
    } else {
      const t = (g - 0.5) * 2;
      r = Math.round(38 + (87 - 38) * t);
      gg = Math.round(106 + (192 - 106) * t);
      b = Math.round(193 + (229 - 193) * t);
    }
    for (let ai = 0; ai <= A_STEPS; ai++) {
      // Stronger opacity for crisp contrast on light background
      const alphaVal = ((ai / A_STEPS) * 0.95 + 0.05).toFixed(3);
      out.push(`rgba(${r},${gg},${b},${alphaVal})`);
    }
  }
  return out;
})();

export function LoadingOrbScreen({ onComplete }) {
  const [phase, setPhase] = useState("orb"); // "orb" -> "card" -> "reveal" -> "done"
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
    let raf = 0;
    let isCancelled = false;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const C0 = CANVAS / 2;

    const render = () => {
      if (isCancelled) return;
      ctx.clearRect(0, 0, CANVAS, CANVAS);
      time += 0.02;
      rot += 0.018;

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

        const ox = x1 * ORB_R * f;
        const oy = -y2 * ORB_R * f;

        const g = u;
        let a = 0.35 + 0.35 * depth + 0.3 * Math.sin(DS[n] + time * 2);
        a = Math.min(1, Math.max(0, a));

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;
        SR[n] = (1.5 + 1.3 * depth) * f;

        const ai = Math.round(a * A_STEPS);
        const gi = Math.round(g * G_STEPS);
        SC[n] = ai <= 0 ? -1 : gi * (A_STEPS + 1) + ai;
      }

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

    // Sequence timing
    const t1 = setTimeout(() => setPhase("card"), 2000);
    const t2 = setTimeout(() => setPhase("reveal"), 2900);
    const t3 = setTimeout(() => {
      setPhase("done");
      if (onComplete) onComplete();
    }, 3600);

    return () => {
      isCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "reveal" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden"
      >
        {/* Subtle light ambient glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ede9fe] via-[#e0f2fe] to-white opacity-80 blur-3xl pointer-events-none" />

        {/* Phase 1: 3D Particle Orb */}
        {phase === "orb" && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center z-10"
          >
            <div className="relative w-[240px] h-[240px] flex items-center justify-center">
              <canvas
                ref={canvasRef}
                style={{ width: CANVAS, height: CANVAS }}
                className="relative z-10"
              />
              <div className="absolute w-32 h-32 rounded-full bg-brand-gradient opacity-20 blur-xl pointer-events-none" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 flex flex-col items-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#a84bff] animate-ping" />
                <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#0f172a] font-bold">
                  BIZZMATE // LOADING
                </span>
              </div>
              <p className="text-xs text-[#64748b] font-medium">
                Initializing high-performance software engine...
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 2: Morph into Card -> Reveal Wipe */}
        {(phase === "card" || phase === "reveal") && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0, y: 10 }}
            animate={
              phase === "card"
                ? { scale: 1, opacity: 1, y: 0 }
                : { scale: 1.25, opacity: 0, filter: "blur(8px)" }
            }
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="z-20 flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xl shadow-[#a84bff]/15"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ede9fe] to-[#e0f2fe] border border-[#a84bff]/20 flex items-center justify-center p-2 shadow-sm">
              <Image
                src="/Only Logo.png"
                alt="BizzMate Logo"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-base font-extrabold text-[#0f172a] tracking-tight">
                BIZZMATE
              </div>
              <div className="text-xs font-semibold text-[#a84bff]">
                Software Agency Ready
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
