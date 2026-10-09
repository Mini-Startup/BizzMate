"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

// 3D sphere points distribution — identical to Option 1
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

export default function LoadingOption2({ onComplete }) {
  // Phases: "thinking" -> "warp_in" -> "reveal" -> "done"
  const [phase, setPhase] = useState("thinking");
  const canvasRef = useRef(null);
  const phaseRef = useRef("thinking");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

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

    // 4 wave programs from loading_orb.md
    let prog = 0;
    const pw = [1, 0, 0, 0];
    const lit = new Float32Array(N);

    // Camera fly-through coordinates
    let cameraZ = 2.8;
    let warpTime = 0;

    const CP = Math.cos(0.35);
    const SP = Math.sin(0.35);

    let lastProgTime = performance.now();

    const render = () => {
      if (isCancelled || phaseRef.current === "done") return;

      ctx.clearRect(0, 0, width, height);

      const dt = 0.016;
      time += dt;
      rot += 0.014;

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

      // Camera acceleration directly inside the orb
      if (phaseRef.current === "warp_in" || phaseRef.current === "reveal") {
        warpTime += dt;
        const t = Math.min(1, warpTime / 0.75);
        const easeInQuad = t * t;
        cameraZ = 2.8 - easeInQuad * 3.4;
      }

      const cyw = Math.cos(rot);
      const syw = Math.sin(rot);

      const C0X = width / 2;
      const C0Y = height / 2;

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

        const distFromCamera = cameraZ - z2;
        if (distFromCamera <= 0.05) {
          SAlpha[n] = 0;
          continue;
        }

        const f = 2.8 / distFromCamera;
        const depth = (z2 + 1) / 2;

        const ox = x1 * ORB_R * f;
        const oy = -y2 * ORB_R * f;

        SX[n] = C0X + ox;
        SY[n] = C0Y + oy;
        SD[n] = depth;

        const isWave = l > 0.16;
        SIsWave[n] = isWave ? 1 : 0;

        // In 3D warp, particles expand noticeably (up to 12.5px) to portray true depth
        const isWarpingState = phaseRef.current === "warp_in" || phaseRef.current === "reveal";
        const warpBoost = isWarpingState ? Math.max(1, f * 0.72) : 1;
        const maxRadius = isWarpingState ? 12.5 : 2.6;

        if (isWave) {
          const rawR = (1.22 * (0.45 + 0.65 * depth) * f + 0.75 * l) * warpBoost;
          SR[n] = Math.min(maxRadius, rawR);
          SAlpha[n] = Math.min(1, 0.85 + 0.15 * depth);
        } else {
          const rawR = 1.12 * (0.4 + 0.6 * depth) * f * warpBoost;
          SR[n] = Math.min(maxRadius, rawR);
          SAlpha[n] = Math.min(0.9, 0.28 + 0.38 * depth * depth);
        }
      }

      for (let pass = 0; pass < 2; pass++) {
        for (let n = 0; n < N; n++) {
          if ((SD[n] >= 0.5) !== (pass === 1)) continue;
          if (SAlpha[n] <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(SX[n], SY[n], SR[n], 0, TAU);

          if (SIsWave[n] === 1) {
            // Active Deep Brand Purple wave (#7c3aed)
            ctx.fillStyle = `rgba(124, 58, 237, ${SAlpha[n].toFixed(2)})`;
          } else {
            // Static Light Lavender-Purple cage dots (#c4b5fd / #a78bfa)
            ctx.fillStyle = `rgba(167, 139, 250, ${SAlpha[n].toFixed(2)})`;
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
    // 0ms - 2000ms: Normal thinking state (identical size & look to Option 1)
    // 2000ms: Camera rushes inside orb, particles grow larger and scatter outward in true 3D
    // 2200ms - 2750ms: BOTH particles and loading background fade out in unison to reveal hero section
    // 2750ms: Done, unmounts cleanly
    const t1 = setTimeout(() => {
      phaseRef.current = "warp_in";
      setPhase("warp_in");
    }, 2000);

    const t2 = setTimeout(() => {
      phaseRef.current = "reveal";
      setPhase("reveal");
    }, 2200);

    const t3 = setTimeout(() => {
      phaseRef.current = "done";
      setPhase("done");
      if (onComplete) onComplete();
    }, 2750);

    return () => {
      isCancelled = true;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isRevealing = phase === "reveal";

  return (
    <AnimatePresence>
      <motion.div
        key="loading-screen-option-2"
        initial={{ opacity: 1 }}
        animate={{
          opacity: isRevealing ? 0 : 1,
        }}
        transition={{
          duration: 0.52,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="fixed inset-0 z-[100] overflow-hidden flex items-center justify-center select-none bg-white pointer-events-none"
      >
        {/* Mild light-mode gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 10%, #ede9fe 0%, #f5f3ff 30%, #f0f7ff 65%, #ffffff 100%)",
          }}
        />

        {/* Soft atmospheric ambient light */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#a84bff]/10 blur-[120px] pointer-events-none" />

        {/* Fullscreen Warp Canvas: Fades out in exact synchronization with the background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Subtle center purple halo (visible during thinking phase only) */}
        {phase === "thinking" && (
          <div className="absolute w-36 h-36 rounded-full bg-[#a84bff]/10 blur-xl pointer-events-none z-0" />
        )}

        {/* Status text: smoothly fades out when warp begins */}
        <div className="absolute bottom-[28%] flex flex-col items-center gap-1.5 z-20 pointer-events-none">
          <motion.div
            animate={{ opacity: phase === "thinking" ? 1 : 0, y: phase === "thinking" ? 0 : -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
              <span className="text-[11px] uppercase font-mono tracking-[0.25em] text-neutral-900 font-bold">
                BIZZMATE // LOADING
              </span>
            </div>
            <p className="text-[11px] font-mono text-neutral-500 tracking-wide">
              Initializing software environment...
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
