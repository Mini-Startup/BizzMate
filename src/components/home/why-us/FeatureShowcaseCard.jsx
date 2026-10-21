import React from "react";
import { Sliders, TrendingUp, CheckCircle2 } from "lucide-react";

export function FeatureShowcaseCard() {
  return (
    <div className="md:col-span-12 lg:col-span-7 rounded-3xl bg-[#f8fafc] border border-neutral-200/90 p-6 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[290px]">
      {/* Left Side: Icon controls & Headline */}
      <div className="flex-1 flex flex-col justify-between h-full z-10">
        {/* 2 circular control buttons */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-brand-violet transition-colors">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-brand-violet transition-colors">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Eyebrow & Headline */}
        <div className="mt-4 sm:mt-6">
          <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block mb-1.5">
            Driving Innovation Forward
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug max-w-sm font-sans">
            Our Platform&apos;s Features Lead the Way
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-2 max-w-xs leading-relaxed">
            Custom web software, autonomous AI agent pipelines, and real-time telemetry built for growth.
          </p>
        </div>

        {/* Feature pill list */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            7–14 Day Sprints
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Zero Lock-In
          </span>
        </div>
      </div>

      {/* Right Side: Sleek Modern iPhone Mockup */}
      <div className="w-[230px] sm:w-[250px] h-[280px] sm:h-[300px] shrink-0 relative flex justify-center items-end self-center sm:self-end">
        {/* iPhone Titanium Device Frame */}
        <div className="w-[220px] sm:w-[236px] h-[330px] bg-white rounded-t-[38px] border-[5px] border-b-0 border-neutral-800 shadow-2xl relative pt-2 px-2.5 overflow-hidden flex flex-col">
          {/* Dynamic Island Notch */}
          <div className="w-18 h-3.5 bg-neutral-900 rounded-full mx-auto mb-2 flex items-center justify-end px-1.5 shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
          </div>

          {/* iPhone Screen Content */}
          <div className="flex-1 flex flex-col justify-start">
            {/* Header with Greeting & Avatar */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div>
                <p className="text-xs font-bold text-neutral-900">Hi, Alex</p>
                <p className="text-[9px] text-neutral-400">Deployments Dashboard</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-brand-lavender border border-brand-violet/30 flex items-center justify-center text-[10px] font-bold text-brand-violet">
                B
              </div>
            </div>

            {/* Tag Row */}
            <div className="flex items-center gap-1.5 my-2">
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-600 font-semibold">
                Next.js 16
              </span>
              <span className="px-2 py-0.5 rounded-full bg-brand-ice text-[9px] font-mono text-brand-blue font-semibold">
                AI Agents
              </span>
            </div>

            {/* In-Progress Project Showcase Card */}
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-lavender/90 to-brand-ice/70 border border-brand-violet/20 shadow-2xs mt-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="px-2 py-0.5 rounded-full bg-brand-violet text-white text-[8px] font-bold uppercase tracking-wider">
                  In Progress
                </span>
                <span className="text-[9px] font-mono text-neutral-500 font-bold">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] font-extrabold text-neutral-900 leading-tight">
                Autonomous Multi-Agent Order Ingestion
              </p>
              <p className="text-[9px] text-neutral-600 mt-1 line-clamp-2">
                88% faster invoice processing with zero hallucination guardrails.
              </p>

              {/* Mini Progress Bar */}
              <div className="w-full bg-white/70 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-brand-gradient h-full w-[78%] rounded-full" />
              </div>
            </div>

            {/* Secondary Metrics Card */}
            <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 mt-2 flex items-center justify-between">
              <span className="text-[9px] font-bold text-neutral-700">API Response</span>
              <span className="text-[9px] font-mono font-extrabold text-emerald-600">84ms TTFT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
