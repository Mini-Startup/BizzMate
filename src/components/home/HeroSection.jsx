"use client";

import React from "react";
import { ArrowRight, Sparkles, Layers } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#ede9fe] via-[#e0f2fe] to-white opacity-80 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Grid Pattern Overlay for light mode */}
      <div className="absolute inset-0 bg-grid-light pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-8 font-sans">
          We Build Software & AI That <br className="hidden sm:inline" />
          <span className="text-brand-gradient">Multiplies Your Velocity.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed mb-10">
          From ultra-fast websites and domain AI chatbots to mission-critical web applications and autonomous WhatsApp workflows. No bloated agency hierarchies — you work directly with technical founders.
        </p>

        {/* Primary & Secondary Action CTAs with Magnetic Animation */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <MagneticButton
            href="#cta"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-semibold text-white bg-brand-gradient shadow-xl shadow-[#a84bff]/25 hover:shadow-[#a84bff]/40"
          >
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span>Book Your Demo Today</span>
            <ArrowRight className="w-4 h-4 text-white ml-2" />
          </MagneticButton>

          <MagneticButton
            href="/projects"
            className="w-full sm:w-auto px-7 py-4 rounded-full text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 shadow-xs"
          >
            <Layers className="w-4 h-4 text-[#266ac1] mr-2" />
            <span>Explore Case Studies</span>
          </MagneticButton>
        </div>

        {/* Live Metrics Trust Banner */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex flex-col items-center justify-center p-3">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">100%</span>
            <span className="text-xs text-slate-500 mt-1 font-medium">Founder Engineered</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-100">
            <span className="text-2xl md:text-3xl font-extrabold text-brand-gradient tracking-tight">7-14 Days</span>
            <span className="text-xs text-slate-500 mt-1 font-medium">Flagship Delivery</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-100">
            <span className="text-2xl md:text-3xl font-extrabold text-[#266ac1] tracking-tight">Zero</span>
            <span className="text-xs text-slate-500 mt-1 font-medium">Junior Outsourcing</span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 border-l border-slate-100">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">99.9%</span>
            <span className="text-xs text-slate-500 mt-1 font-medium">Production Reliability</span>
          </div>
        </div>
      </div>
    </section>
  );
}
