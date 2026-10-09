"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function LoadingOption2({ onComplete }) {
  // Phases: "thinking" -> "warp_in" -> "done"
  const [phase, setPhase] = useState("thinking");
  const canvasRef = useRef(null);
  const phaseRef = useRef("thinking");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    // Canvas covers full container or expanded size for warp flight
    const displaySize = 480;
    canvas.width = displaySize * dpr;
    canvas.height = displaySize * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const SX = new Float32Array(N);
    const SY = new Float32Array(N);
    const SD = new Float32Array(N);
    const SR = new Float32Array(N);
    const SAlpha = new Float32Array(N);
    const SIsWave = new Uint8Array(N);

    let time = 0;
    let rot = 0;
    let raf = 0;
    let isCancelled = false;

    // 4 Lighting wave programs
    let prog = 0;
    const pw = [1, 0, 0, 0];
    const lit = new Float32Array(N);

    // Camera fly-through coordinates
    let cameraZ = 2.8;
    let warpTime = 0;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);
    const C0 = displaySize / 2;

    let lastProgTime = performance.now();

    const render = () => {
      if (isCancelled) return;
      ctx.clearRect(0, 0, displaySize, displaySize);

      const dt = 0.016;
      time += dt;
      rot += 0.012;

      // Cycle wave programs
      const now = performance.now();
      if (now - lastProgTime > 1150) {
        prog = (prog + 1) % 4;
        lastProgTime = now;
      }

      const stepW = dt / 0.35;
      for (let q = 0; q < 4; q++) {
        const d = (q === prog ? 1 : 0) - pw[q];
        pw[q] += Math.abs(d) <= stepW ? d : d > 0 ? stepW : -stepW;
      }

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

      // Camera acceleration inside orb
      if (phaseRef.current === "warp_in") {
        warpTime += dt;
        // Exponential camera rush inwards
        const t = Math.min(1, warpTime / 1.1);
        const easeInExpo = t === 0 ? 0 : Math.pow(2, 10 * t - 10);
        cameraZ = Math.max(-0.6, 2.8 - easeInExpo * 3.4);
      }

      const cyw = Math.cos(rot);
      const syw = Math.sin(rot);

      for (let n = 0; n < N; n++) {
        const dx = DX[n];
        const dy = DY[n];
        const dz = DZ[n];

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

        const x1 = dx * cyw + dz * syw;
        const z1 = -dx * syw + dz * cyw;
        const y2 = dy * CP - z1 * SP;
        const z2 = dy * SP + z1 * CP;

        // Dynamic perspective projection as camera flies inside
        const distFromCamera = cameraZ - z2;
        if (distFromCamera <= 0.05) {
          // Particle has passed behind the camera
          SAlpha[n] = 0;
          continue;
        }

        const f = 2.8 / distFromCamera;
        const depth = (z2 + 1) / 2;

        const ox = x1 * ORB_R * f;
        const oy = -y2 * ORB_R * f;

        SX[n] = C0 + ox;
        SY[n] = C0 + oy;
        SD[n] = depth;

        const isWave = l > 0.18;
        SIsWave[n] = isWave ? 1 : 0;

        // When warping, particles grow huge as they get close to the camera lens
        const warpSizeBoost = Math.max(1, f * 0.85);
        if (isWave) {
          SR[n] = (1.7 + 1.3 * depth + l * 0.8) * warpSizeBoost;
          SAlpha[n] = Math.min(1, 0.85 + 0.15 * depth);
        } else {
          SR[n] = (1.1 + 0.8 * depth) * warpSizeBoost;
          SAlpha[n] = Math.min(0.9, 0.28 + 0.35 * depth * depth);
        }

        // Fade out as they get past screen edges
        if (phaseRef.current === "warp_in") {
          const distFromCenter = Math.sqrt(ox * ox + oy * oy);
          if (distFromCenter > displaySize * 0.7) {
            SAlpha[n] *= Math.max(0, 1 - (distFromCenter - displaySize * 0.7) / (displaySize * 0.3));
          }
        }
      }

      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          if (SAlpha[n] <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);

          if (SIsWave[n] === 1) {
            ctx.fillStyle = `rgba(255, 255, 255, ${SAlpha[n].toFixed(2)})`;
          } else {
            ctx.fillStyle = `rgba(180, 168, 206, ${SAlpha[n].toFixed(2)})`;
          }
          ctx.fill();
        }
      }

      if (phaseRef.current !== "done") {
        raf = requestAnimationFrame(render);
      }
    };

    render();

    // Sequence:
    // 0ms - 2200ms: Orb thinking with white light waves
    // 2200ms - 3400ms: Camera rushes inside orb, particles explode past screen edges
    // 3400ms: Done, reveal website
    const t1 = setTimeout(() => {
      phaseRef.current = "warp_in";
      setPhase("warp_in");
    }, 2200);

    const t2 = setTimeout(() => {
      phaseRef.current = "done";
      setPhase("done");
      if (onComplete) onComplete();
    }, 3400);

    return () => {
      isCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isWarping = phase === "warp_in";

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen-option-2"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isWarping ? 0 : 1,
        }}
        transition={{
          duration: 0.95,
          delay: isWarping ? 0.35 : 0,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          background:
            "radial-gradient(circle at 18% 18%, #281042 0%, #150927 45%, #0a0414 100%)",
        }}
        className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center select-none"
      >
        {/* Soft atmospheric ambient light */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/15 blur-[120px] pointer-events-none" />

        {/* Warp core portal bloom that expands when camera enters orb */}
        <AnimatePresence>
          {isWarping && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 3.5, opacity: [0, 0.85, 0] }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#a84bff] via-[#6366f1] to-white blur-3xl pointer-events-none z-0"
            />
          )}
        </AnimatePresence>

        {/* Center Fly-Through Canvas */}
        <div className="relative flex flex-col items-center justify-center z-10">
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            <canvas
              ref={canvasRef}
              style={{ width: 340, height: 340 }}
              className="relative z-10"
            />
            {/* Subtle soft purple halo behind canvas */}
            <div className="absolute w-36 h-36 rounded-full bg-[#a84bff]/15 blur-2xl pointer-events-none" />
          </div>

          {/* Status text: fades out when camera enters orb */}
          <motion.div
            animate={{ opacity: isWarping ? 0 : 1, y: isWarping ? -10 : 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#a84bff] animate-pulse" />
              <span className="text-[11px] uppercase font-mono tracking-[0.28em] text-white/90 font-bold">
                BIZZMATE // LOADING
              </span>
            </div>
            <p className="text-[11px] font-mono text-purple-200/50 tracking-wide">
              Initializing software environment...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
