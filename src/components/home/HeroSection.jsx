"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Code2, Bot, Layers } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-brand-gradient opacity-15 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-[#a84bff]/20 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-[#57c0e5]/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-slate pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-[#0b1329]/80 backdrop-blur-md mb-8 shadow-inner shadow-white/5">
          <div className="w-2 h-2 rounded-full bg-[#57c0e5] animate-pulse" />
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
            Founder-Led Software Agency
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-xs font-medium text-[#a84bff]">
            Accepting Selected Projects
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] mb-8">
          We Build Software & AI That <br className="hidden sm:inline" />
          <span className="text-brand-gradient">Multiplies Your Velocity.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          From ultra-fast websites and domain AI chatbots to mission-critical web applications and autonomous WhatsApp workflows. No bloated agency hierarchies — you work directly with technical founders.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="#cta"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm md:text-base font-bold text-white bg-brand-gradient shadow-xl shadow-[#a84bff]/30 hover:shadow-[#a84bff]/60 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Book Your Demo Today</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>

          <Link
            href="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm md:text-base font-semibold text-slate-200 bg-[#0b1329]/70 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 transition-all"
          >
            <Layers className="w-4 h-4 text-[#57c0e5]" />
            <span>Explore Case Studies</span>
          </Link>
        </div>

        {/* Live Metrics Trust Banner */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0b1329]/60 backdrop-blur-xl border border-white/10">
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">100%</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Founder Engineered</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-white/5">
            <span className="text-2xl md:text-3xl font-extrabold text-brand-gradient tracking-tight">7-14 Days</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Flagship Delivery</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-white/5">
            <span className="text-2xl md:text-3xl font-extrabold text-[#57c0e5] tracking-tight">Zero</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Junior Outsourcing</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-white/5">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">99.9%</span>
            <span className="text-xs text-slate-400 mt-1 font-medium">Production Reliability</span>
          </div>
        </div>
      </div>
    </section>
  );
}
