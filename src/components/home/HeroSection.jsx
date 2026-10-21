import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Hero3DWrapper } from "@/components/hero/Hero3DWrapper";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full bg-white pt-8 sm:pt-10">
      {/* Ambient Top Glow using Tailwind v4 native scales */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-300 h-90 bg-linear-to-b from-brand-lavender/80 via-brand-ice/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Full-Width Hero Stage */}
      <div className="w-full relative px-4 sm:px-8 md:px-10 lg:px-12 flex flex-col min-h-220 lg:min-h-235">
        {/* 1. SPLIT DISPLAY HEADLINE (Reference Match: Designed for TRUST top-aligned; Built for GROWTH starts at bottom line of TRUST) */}
        <div className="relative z-10 w-full mt-10 sm:mt-12 mb-6 sm:mb-8 px-0">
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4 md:gap-0">
            {/* Left Headline: Designed for & TRUST share same top alignment line */}
            <h1 className="flex items-start gap-2.5 sm:gap-3.5 flex-wrap text-left">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-black italic text-neutral-800 tracking-tight leading-none pt-1 sm:pt-1.5 md:pt-2">
                Designed for
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.5rem] font-black uppercase tracking-tight leading-none select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs">
                TRUST
              </span>
            </h1>

            {/* Right Headline: Built for & GROWTH share same top line, with top starting at bottom line of TRUST */}
            <div className="flex items-start justify-start md:justify-end gap-2.5 sm:gap-3.5 flex-wrap text-left md:text-right">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-black italic text-neutral-800 tracking-tight leading-none pt-1 sm:pt-1.5 md:pt-2">
                Built for
              </span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.5rem] font-black uppercase tracking-tight leading-none select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs">
                GROWTH
              </span>
            </div>
          </div>
        </div>

        {/* 2. FULL-WIDTH 3D INTERACTIVE ROBOT CANVAS */}
        <div className="absolute inset-x-0 -top-25 h-[660px] sm:h-[740px] md:h-[820px] z-20 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full">
            <Hero3DWrapper color="#ffffff" pantallaColor="#a84bff" scale={1.2} />
          </div>
        </div>

        {/* 3. BRAND GRADIENT STAGE */}
        <div className="w-full relative">
          {/* PURPLE CARD BACKGROUND */}
          <div className="absolute inset-0 rounded-[32px] sm:rounded-[44px] md:rounded-[50px] bg-linear-to-br from-brand-violet via-brand-blue to-indigo-800 shadow-2xl overflow-hidden z-0 pointer-events-none">
            {/* Ambient Inner Glowing Rings */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-sky/30 blur-3xl pointer-events-none" />
          </div>

          {/* CARD CONTENT & BUTTONS: Reduced top spacing & balanced vertical alignment */}
          <div className="relative z-30 pt-8 sm:pt-10 md:pt-12 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-8 md:px-12 lg:px-14 text-white flex flex-col justify-center pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-14 relative z-30 items-center pointer-events-none">
              {/* LEFT STAGE CONTENT: Services Focus */}
              <div className="flex flex-col items-start gap-4 max-w-lg pointer-events-none">

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-[1.14] tracking-tight pointer-events-none select-none">
                  Digital Solutions That Move Businesses Forward
                </h2>

                <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-md pointer-events-none">
                  Websites, applications, and AI automation built around your business goals.
                </p>

                {/* Explore Our Services with White Magnetic Button */}
                <div className="pt-2 flex flex-wrap items-center gap-4 pointer-events-none">
                  <MagneticButton
                    href="#services"
                    className="pointer-events-auto px-8 md:px-10 py-4 md:py-5 rounded-full text-slate-800 font-bold text-sm md:text-base flex items-center gap-3 bg-white/90 border border-slate-200 hover:border-slate-400 shadow-md hover:bg-white cursor-pointer group"
                  >
                    <span>Explore Our Services</span>
                    <ArrowRight className="w-5 h-5 text-[#266ac1] transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>

              {/* RIGHT STAGE CONTENT: Previous Work & Verified Impact */}
              <div className="flex flex-col items-start md:items-end w-full md:pl-8 lg:pl-16 pointer-events-none">
                <div className="w-full sm:w-[350px] md:w-[380px] bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/60 text-neutral-900 flex flex-col gap-4 pointer-events-auto">
                  {/* Card Header with Live Status */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100">
                    <div>
                      <span className="text-[11px] font-bold text-brand-violet tracking-wider uppercase block">
                        Proven Track Record
                      </span>
                      <h3 className="font-extrabold text-sm sm:text-base text-neutral-900">
                        Featured Work & Results
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>15+ Shipped</span>
                    </div>
                  </div>

                  {/* Dual Metric Strip */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        88%
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Workflow Speedup
                      </span>
                    </div>
                    <div className="bg-slate-50/90 rounded-2xl p-2.5 sm:p-3 border border-slate-100">
                      <span className="text-xl sm:text-2xl font-black text-slate-900 block leading-tight">
                        &lt;50ms
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Sub-Second Latency
                      </span>
                    </div>
                  </div>

                  {/* Previous Work Spotlight Snippets */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-violet shrink-0" />
                        <span className="font-bold text-slate-800">Nexus Core</span>
                        <span className="text-slate-400 text-[11px] hidden sm:inline">· AI Automations</span>
                      </div>
                      <span className="text-[10px] font-semibold text-brand-violet bg-brand-violet/10 px-2 py-0.5 rounded-md">
                        Enterprise
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
                        <span className="font-bold text-slate-800">Strata Intel</span>
                        <span className="text-slate-400 text-[11px] hidden sm:inline">· Web Analytics</span>
                      </div>
                      <span className="text-[10px] font-semibold text-brand-blue bg-brand-blue/10 px-2 py-0.5 rounded-md">
                        Fintech
                      </span>
                    </div>
                  </div>

                  {/* CTA: View Previous Work */}
                  <Link
                    href="/projects"
                    className="w-full py-3 px-4 rounded-xl bg-brand-gradient hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-brand-violet/25 hover:shadow-lg transition-all group"
                  >
                    <span>View Previous Work</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
