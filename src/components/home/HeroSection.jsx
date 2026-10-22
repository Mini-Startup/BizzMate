import React from "react";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Hero3DWrapper } from "@/components/hero/Hero3DWrapper";
import { HeroCtaCard } from "./HeroCtaCard";

export function HeroSection() {
  return (
    <section id="hero" className="relative w-full bg-white pt-8 sm:pt-10">
      {/* Ambient Top Glow using Tailwind v4 native scales */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-300 h-90 bg-linear-to-b from-brand-lavender/80 via-brand-ice/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Full-Width Hero Stage */}
      <div className="w-full relative px-4 sm:px-8 md:px-10 lg:px-12 flex flex-col min-h-220 lg:min-h-235">
        {/* 1. SPLIT DISPLAY HEADLINE (Designed for TRUST / Built for ✦ GROWTH: Aligned horizontally, left-aligned) */}
        <div className="relative z-10 w-full mt-10 sm:mt-12 mb-6 sm:mb-8 px-0">
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-6 md:gap-0">
            {/* Left Headline: Designed for (top) / TRUST (below with +95px indent) */}
            <div className="flex flex-col items-start text-left max-w-full md:max-w-[46%]">
              <span className="text-[29px] sm:text-[35px] md:text-[47px] lg:text-[59px] xl:text-[3.6875rem] font-black italic text-neutral-900 tracking-tight leading-none mb-1 sm:mb-2">
                Designed for
              </span>
              <h1 className="text-[59px] sm:text-[71px] md:text-[95px] lg:text-[127px] xl:text-[7.4375rem] 2xl:text-[8.4375rem] font-black uppercase tracking-tight leading-[0.92] select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs ml-[95px]">
                TRUST
              </h1>
            </div>

            {/* Right Headline: Built for (top with -95px offset) / GROWTH (below) */}
            <div className="flex flex-col items-start text-left max-w-full md:max-w-[46%]">
              <div className="mb-1 sm:mb-2 -ml-[95px]">
                <span className="text-[29px] sm:text-[35px] md:text-[47px] lg:text-[59px] xl:text-[3.6875rem] font-black italic text-neutral-900 tracking-tight leading-none">
                  Built for
                </span>
              </div>
              <div className="text-[59px] sm:text-[71px] md:text-[95px] lg:text-[127px] xl:text-[7.4375rem] 2xl:text-[8.4375rem] font-black uppercase tracking-tight leading-[0.92] select-none font-sans text-transparent bg-clip-text bg-linear-to-r from-brand-violet via-brand-blue to-brand-sky drop-shadow-xs">
                GROWTH
              </div>
            </div>
          </div>
        </div>

        {/* 2. FULL-WIDTH 3D INTERACTIVE ROBOT CANVAS (Shifted 30px left for visual center balance) */}
        <div className="absolute inset-x-0 -top-25 h-[660px] sm:h-[740px] md:h-[820px] z-20 flex items-center justify-center pointer-events-none -translate-x-[30px]">
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
                  Your Business Vision,
                  <span className="block">Our Digital Solution</span>
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

              {/* RIGHT STAGE CONTENT: Quick Technical Diagnostic & Let's Talk CTA */}
              <div className="flex flex-col items-start md:items-end w-full md:pl-8 lg:pl-16 pointer-events-none">
                <HeroCtaCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

