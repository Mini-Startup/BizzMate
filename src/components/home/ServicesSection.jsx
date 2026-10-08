"use client";

import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import {
  Globe,
  Cpu,
  Bot,
  MessageSquare,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP = {
  Globe: Globe,
  Cpu: Cpu,
  Bot: Bot,
  MessageSquare: MessageSquare,
  Layers: Layers,
  Sparkles: Sparkles,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 relative bg-[#020617] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-gradient opacity-10 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#a84bff]/30 bg-[#a84bff]/10 text-xs font-semibold text-[#57c0e5] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#a84bff]" />
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Engineered For Impact. <br />
            <span className="text-brand-gradient">Zero Generic Fluff.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            We focus exclusively on high-leverage software solutions and automated intelligence. Every deliverable is custom-crafted to accelerate your business.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => {
            const IconComponent = ICON_MAP[svc.icon] || Globe;
            return (
              <div
                key={svc.id}
                className="group p-8 rounded-3xl bg-[#0b1329]/70 border border-white/10 hover:border-[#a84bff]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#a84bff]/10"
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-gradient p-0.5 flex items-center justify-center shadow-md">
                      <div className="w-full h-full bg-[#0b1329] rounded-[14px] flex items-center justify-center group-hover:bg-transparent transition-colors">
                        <IconComponent className="w-5 h-5 text-[#57c0e5] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                      {svc.id.replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gradient transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {svc.shortDescription}
                  </p>

                  {/* Bullet Deliverables */}
                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
                    {svc.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#57c0e5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tech Tags & Impact */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {svc.techStack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects?filter=${svc.id}`}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                    aria-label={`View ${svc.title} work`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
