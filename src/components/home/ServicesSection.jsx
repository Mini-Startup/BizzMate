"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Globe,
  Cpu,
  Bot,
  MessageSquare,
  Layers,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Bookmark,
  Heart,
} from "lucide-react";

const ICON_MAP = {
  Globe: Globe,
  Cpu: Cpu,
  Bot: Bot,
  MessageSquare: MessageSquare,
  Layers: Layers,
  Sparkles: Sparkles,
};

// Fluid card textures and accents
const SERVICE_THEMES = [
  {
    bg: "bg-[#f1f5f9]/70",
    border: "border-neutral-200",
    texture: "/why-us/brand-wave.jpg",
    accentBadge: "bg-brand-lavender text-brand-violet",
  },
  {
    bg: "bg-[#faf5ff]/80",
    border: "border-purple-200/80",
    texture: "/why-us/lavender-wave.jpg",
    accentBadge: "bg-purple-100 text-purple-700",
  },
  {
    bg: "bg-[#f0f9ff]/80",
    border: "border-sky-200/80",
    texture: "/why-us/ice-wave.jpg",
    accentBadge: "bg-sky-100 text-sky-700",
  },
  {
    bg: "bg-[#ecfdf5]/80",
    border: "border-emerald-200/80",
    texture: "/why-us/ice-wave.jpg",
    accentBadge: "bg-emerald-100 text-emerald-800",
  },
  {
    bg: "bg-[#fdf4ff]/80",
    border: "border-fuchsia-200/80",
    texture: "/why-us/brand-wave.jpg",
    accentBadge: "bg-fuchsia-100 text-fuchsia-800",
  },
  {
    bg: "bg-[#f8fafc]/90",
    border: "border-neutral-200",
    texture: "/why-us/lavender-wave.jpg",
    accentBadge: "bg-brand-ice text-brand-blue",
  },
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const autoplayTimerRef = useRef(null);

  const total = services.length;
  const current = services[activeIndex];
  const CurrentIcon = ICON_MAP[current.icon] || Globe;
  const currentTheme = SERVICE_THEMES[activeIndex % SERVICE_THEMES.length];

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleSelect = (idx) => {
    if (idx === activeIndex) return;
    setActiveIndex(idx);
  };

  // Autoplay (6.5s interval, pauses on hover or prefers-reduced-motion)
  useEffect(() => {
    if (shouldReduceMotion || isPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [handleNext, isPaused, shouldReduceMotion]);

  // Three upcoming services for the upper-right row
  const smallCards = [
    services[(activeIndex + 1) % total],
    services[(activeIndex + 2) % total],
    services[(activeIndex + 3) % total],
  ];

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ================================================================ */}
        {/* TOP ROW: Heading positioned on the Right (matching reference image) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 sm:mb-8 items-end">
          <div className="hidden lg:block lg:col-span-5" />
          <div className="lg:col-span-7">
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans leading-tight"
            >
              Explore Our Services
            </h2>
          </div>
        </div>

        {/* ================================================================ */}
        {/* MAIN ASYMMETRICAL SHOWCASE (Left 5 cols / Right 7 cols)          */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* -------------------------------------------------------------- */}
          {/* LEFT COLUMN: Featured Card + Bottom Controls                   */}
          {/* -------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Featured Card */}
            <div
              className={`rounded-3xl ${currentTheme.bg} border ${currentTheme.border} p-6 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col justify-between min-h-[440px] sm:min-h-[470px]`}
            >
              {/* Top row: Title and Left Arrow button */}
              <div className="flex items-start justify-between gap-4 z-10">
                <div className="max-w-[75%]">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug font-sans">
                    {current.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-medium leading-relaxed mt-2.5">
                    {current.shortDescription}
                  </p>
                </div>

                {/* Prev Arrow Button (Top Right) */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous service"
                  className="w-10 h-10 rounded-full bg-white hover:bg-neutral-50 border border-neutral-200/90 shadow-2xs flex items-center justify-center text-neutral-700 hover:text-brand-violet hover:border-brand-violet/40 transition-all cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Middle/Center: Lifestyle / Tech visual */}
              <div className="my-auto py-4 z-10 flex justify-end">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-white/80 shadow-sm shrink-0">
                  <Image
                    src="/why-us/convenient-app.jpg"
                    alt={current.title}
                    fill
                    sizes="(max-width: 640px) 144px, 176px"
                    className="object-cover object-top"
                  />
                </div>
              </div>

              {/* Bottom: Metrics & Engagement Pill */}
              <div className="z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200/90 shadow-2xs text-xs font-bold text-neutral-800">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-brand-violet" />
                    <span>{current.metrics || "Enterprise Ready"}</span>
                  </span>
                  <span className="w-px h-3.5 bg-neutral-200" />
                  <button
                    type="button"
                    aria-label="Bookmark service"
                    className="text-neutral-400 hover:text-brand-violet transition-colors cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Favorite service"
                    className="text-neutral-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Navigation & Progress Track (Directly below left card, matching image 1) */}
            <div className="mt-6 sm:mt-8 flex items-center justify-start gap-4">
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous service"
                className="w-10 h-10 rounded-full bg-white border border-neutral-200/90 shadow-2xs hover:bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-brand-violet transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next service"
                className="w-10 h-10 rounded-full bg-white border border-neutral-200/90 shadow-2xs hover:bg-neutral-50 flex items-center justify-center text-neutral-700 hover:text-brand-violet transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Horizontal Slider Line */}
              <div className="w-32 sm:w-48 h-1.5 bg-neutral-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-neutral-900 rounded-full transition-[width] duration-300 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / total) * 100}%`,
                  }}
                />
              </div>

              {/* Counter Index */}
              <span className="text-xs font-mono font-bold text-neutral-400">
                0{activeIndex + 1} / 0{total}
              </span>
            </div>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT COLUMN: 3 Small Cards + Clean Description Area           */}
          {/* -------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Upper: Horizontal row of 3 small service cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 lg:gap-4">
              {smallCards.map((svc) => {
                const SvcIcon = ICON_MAP[svc.icon] || Globe;
                const realIndex = services.findIndex((s) => s.id === svc.id);
                const cardTheme = SERVICE_THEMES[realIndex % SERVICE_THEMES.length];

                return (
                  <div
                    key={svc.id}
                    onClick={() => handleSelect(realIndex)}
                    className="p-5 rounded-3xl bg-[#f8fafc] border border-neutral-200/90 hover:border-brand-violet/40 hover:bg-white transition-all duration-200 flex flex-col justify-between min-h-[170px] sm:min-h-[190px] cursor-pointer group shadow-xs hover:shadow-md relative overflow-hidden"
                  >
                    {/* Background subtle fluid texture */}
                    <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none">
                      <Image
                        src={cardTheme.texture}
                        alt=""
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>

                    {/* Top: Service title */}
                    <div className="relative z-10">
                      <h4 className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-brand-violet transition-colors leading-tight font-sans">
                        {svc.title}
                      </h4>
                    </div>

                    {/* Middle: Centered Icon Visual */}
                    <div className="my-2 flex justify-center relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-700 group-hover:text-brand-violet group-hover:scale-105 transition-all shadow-2xs">
                        <SvcIcon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Bottom: Next Arrow button (bottom-left or bottom-right aligned with reference) */}
                    <div className="flex items-center justify-end relative z-10">
                      <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:bg-brand-violet group-hover:text-white group-hover:border-transparent transition-all shadow-2xs">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lower: Clean open narrative description (matching reference image 1) */}
            <div className="mt-8 sm:mt-10 pt-4">
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-xl">
                {current.fullDescription}
              </p>

              <div className="mt-5">
                <Link
                  href={`/projects?filter=${current.id}`}
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-neutral-900 hover:text-brand-violet transition-colors group"
                >
                  <span className="underline underline-offset-4 decoration-neutral-300 group-hover:decoration-brand-violet">
                    Explore In Details
                  </span>
                  <ArrowRight className="w-4 h-4 text-brand-violet group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
