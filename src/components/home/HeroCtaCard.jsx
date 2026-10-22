"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

export function HeroCtaCard() {
  const cardRef = useRef(null);
  const { navigateToSection } = useNavigation();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Smooth 3D tilt tracking (range: -6 to +6 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = -((y - centerY) / centerY) * 6;
    const rY = ((x - centerX) / centerX) * 6;
    setRotateX(rX);
    setRotateY(rY);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setMousePos({ x: -1000, y: -1000 });
  }, []);

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full sm:w-[350px] md:w-[380px] pointer-events-auto relative"
    >
      <motion.div
        ref={cardRef}
        role="region"
        aria-label="Digital Growth Consultation"
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-3xl"
      >
        {/* 1. Luminous Outer Glow: Radiating light beam outside the card following cursor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2.5 rounded-3xl blur-xl transition-opacity duration-200"
          style={{
            opacity: isHovered ? 0.9 : 0,
            background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.9), rgba(59, 130, 246, 0.75), transparent 70%)`,
          }}
        />

        {/* 2. Main Card Container: Single unified surface, zero gaps, flush border */}
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl p-6 sm:p-7 text-neutral-900 flex flex-col gap-4 overflow-hidden border border-slate-200/80">

          {/* Cursor surface sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
            style={{
              opacity: isHovered ? 0.15 : 0,
              background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, #8b5cf6, transparent 70%)`,
            }}
          />

          {/* Header: Eyebrow */}
          <div className="flex items-center justify-between pb-1 relative z-10">
            <span className="text-[10px] font-bold text-brand-violet tracking-wider uppercase font-sans">
              YOUR DIGITAL GROWTH PARTNER
            </span>
          </div>

          {/* Main Heading */}
          <div className="relative z-10">
            <h3 className="text-xl sm:text-[1.35rem] font-black text-slate-900 tracking-tight leading-snug font-sans">
              Have a Vision? Let&apos;s Build It.
            </h3>
          </div>

          {/* Body Description */}
          <div className="relative z-10">
            <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-sans">
              From your first website to custom applications and AI-powered automation, we help turn business ideas into practical digital solutions.
            </p>
          </div>

          {/* Primary Let's Talk CTA Button */}
          <div className="flex flex-col gap-2 pt-1 relative z-10">
            <Link
              href="#contact"
              onClick={(e) => navigateToSection("contact", e)}
              className="w-full py-3.5 px-5 rounded-2xl bg-brand-gradient hover:opacity-95 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-violet/25 hover:shadow-lg hover:shadow-brand-violet/35 active:scale-[0.99] transition-all group/btn cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Let&apos;s Talk</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
            <p className="text-center text-[11px] text-slate-400 font-medium font-sans">
              Talk directly with Founders
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default HeroCtaCard;
