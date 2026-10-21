import React from "react";
import Image from "next/image";
import { Sparkles, Lightbulb, ShieldCheck, Zap } from "lucide-react";

export function ConsultationCard() {
  return (
    <div className="md:col-span-8 lg:col-span-3 rounded-3xl border border-neutral-200/90 relative overflow-hidden p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 min-h-[290px]">
      {/* Lavender fluid silk texture background */}
      <Image
        src="/why-us/lavender-wave.jpg"
        alt="Consultation and architecture"
        fill
        sizes="(max-width: 1024px) 100vw, 25vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/20 pointer-events-none" />

      {/* Top hashtag badge */}
      <div className="relative z-10 flex justify-center">
        <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[11px] font-bold text-neutral-800 shadow-2xs flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-violet" />
          <span>#advantages</span>
        </span>
      </div>

      {/* 3 Circular Icon Pills (Strategy, Architecture, Automation) */}
      <div className="relative z-10 my-auto py-2">
        <div className="flex items-center justify-center gap-3">
          <div
            title="Strategy"
            className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-violet hover:scale-110 transition-transform"
          >
            <Lightbulb className="w-5 h-5" />
          </div>
          <div
            title="Architecture"
            className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-blue hover:scale-110 transition-transform"
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div
            title="Automation"
            className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-sky hover:scale-110 transition-transform"
          >
            <Zap className="w-5 h-5" />
          </div>
        </div>

        <p className="text-base lg:text-lg font-bold text-neutral-900 text-center tracking-tight leading-snug mt-4">
          Comprehensive Consultation
        </p>
      </div>

      {/* Bottom 3 Dots Indicator */}
      <div className="relative z-10 flex justify-center items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-brand-violet" />
        <span className="w-2 h-2 rounded-full bg-neutral-300" />
        <span className="w-2 h-2 rounded-full bg-neutral-300" />
      </div>
    </div>
  );
}
