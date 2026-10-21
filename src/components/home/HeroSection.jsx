import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Lock,
  Users2,
  CheckCircle2,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Hero3DWrapper } from "@/components/hero/Hero3DWrapper";

export function HeroSection() {

  return (
    <section id="hero" className="relative w-full bg-white pt-8">
      {/* Ambient Top Glow using Tailwind v4 native scales */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-300 h-90 bg-linear-to-b from-brand-lavender/80 via-brand-ice/40 to-transparent blur-3xl pointer-events-none -z-10" />
      {/* Main Full-Width Hero Stage (Edge to Edge, No outer margins, no rounded corners on screen edge) */}
      <div className="w-full relative px-4 sm:px-8 md:px-10 lg:px-12 flex flex-col min-h-220 lg:min-h-235">
        {/* 1. SPLIT DISPLAY HEADLINE (Bespoke SOFTWARE / Autonomous AI AGENT) */}
        <div className="relative z-10 w-full my-12 px-0">
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4 md:gap-0">
            {/* Left Headline with BizzMate Gradient */}
            <div className="flex flex-col text-left max-w-full md:max-w-[42%]">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold italic text-neutral-800 tracking-tight mb-1">
                Bespoke
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs">
                SOFTWARE
              </h1>
            </div>

            {/* Right Headline with BizzMate Gradient */}
            <div className="flex flex-col text-left md:text-right md:items-end max-w-full md:max-w-[50%]">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold italic text-neutral-800 tracking-tight mb-1">
                Autonomous
              </span>
              <div className="inline-flex items-center gap-2">
                <span className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem] font-black select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs">
                  AI AGENT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. FULL-WIDTH 3D INTERACTIVE ROBOT CANVAS (z-20: fully clickable for heart eyes) */}
        <div className="absolute inset-x-0 -top-25 h-[660px] sm:h-[740px] md:h-[820px] z-20 flex items-center justify-center">
          <div className="w-full h-full">
            <Hero3DWrapper color="#ffffff" pantallaColor="#a84bff" scale={1.2} />
          </div>
        </div>

        {/* 3. BRAND GRADIENT STAGE */}
        <div className="w-full relative">
          {/* PURPLE CARD BACKGROUND (z-0: Renders safely BEHIND the 3D robot at z-20) */}
          <div className="absolute inset-0 rounded-[32px] sm:rounded-[44px] md:rounded-[50px] bg-linear-to-br from-brand-violet via-brand-blue to-indigo-800 shadow-2xl overflow-hidden z-0 pointer-events-none">
            {/* Ambient Inner Glowing Rings */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-brand-sky/30 blur-3xl pointer-events-none" />
          </div>

          {/* CARD CONTENT & BUTTONS (z-30: Renders safely IN FRONT OF the 3D canvas at z-20) */}
          <div className="relative z-30 p-6 sm:p-8 md:p-12 lg:p-14 text-white min-h-120 lg:min-h-130 flex flex-col justify-end pointer-events-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 relative z-30 items-end pointer-events-none">
              {/* LEFT STAGE CONTENT */}
              <div className="flex flex-col items-start gap-4 max-w-lg pointer-events-none">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-[1.12] tracking-tight pointer-events-none select-none">
                  Where Scalability Meets Intelligence
                </h2>

                <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-md pointer-events-none">
                  High-velocity custom software, autonomous AI agent pipelines, and domain workflows engineered directly by technical founders.
                </p>

                {/* Explore Solutions with White Magnetic Button (no transition-all, buttery smooth GSAP tracking) */}
                <div className="pt-2 flex flex-wrap items-center gap-4 pointer-events-none">
                  <MagneticButton
                    href="#cta"
                    className="pointer-events-auto px-8 md:px-10 py-4 md:py-5 rounded-full text-slate-800 font-bold text-sm md:text-base flex items-center gap-3 bg-white/90 border border-slate-200 hover:border-slate-400 shadow-md hover:bg-white cursor-pointer group"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="w-5 h-5 text-[#266ac1] transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>

              {/* RIGHT STAGE CONTENT */}
              <div className="flex flex-col items-start md:items-end gap-6 w-full md:pl-16 lg:pl-24 pointer-events-none">
                {/* 3 Meaningful Capability Badges */}
                <div className="flex items-center justify-start md:justify-end gap-2.5 sm:gap-3 w-full flex-wrap pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs pointer-events-none select-none">
                    <Zap className="w-4 h-4 text-brand-sky" />
                    <span>7–14 Day Delivery Sprints</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs pointer-events-none select-none">
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>100% Code & IP Transfer</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs pointer-events-none select-none">
                    <Users2 className="w-4 h-4 text-amber-300" />
                    <span>Founder-Led Engineering</span>
                  </div>
                </div>

                {/* Light Mode Production Showcase Card */}
                <div className="w-full sm:w-[320px] md:w-[350px] flex flex-col gap-2 pointer-events-none">
                  <span className="text-xs font-bold text-white/90 tracking-wider uppercase pointer-events-none select-none">
                    Delivery Capabilities
                  </span>

                  <div className="bg-white rounded-3xl p-5 shadow-2xl border border-white/60 text-neutral-900 flex flex-col gap-4 pointer-events-auto">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <div>
                        <span className="font-extrabold text-sm text-neutral-900 block">
                          Core Deliverables
                        </span>
                        <span className="text-[11px] text-neutral-500 font-medium">
                          Production Ready & Tested
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Guaranteed</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-violet shrink-0 mt-0.5" />
                        <span>High-Speed Web & Mobile Apps</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                        <span>Autonomous Multi-Agent AI Workflows</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-sky shrink-0 mt-0.5" />
                        <span>Domain AI Chatbots & Cloud Integrations</span>
                      </div>
                    </div>

                    <Link
                      href="/projects"
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-gradient text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-brand-violet/25 hover:shadow-lg transition-all"
                    >
                      <span>Explore Case Studies</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
