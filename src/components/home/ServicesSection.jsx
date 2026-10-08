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
    <section id="services" className="py-24 px-6 relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Engineered For Impact. <br />
            <span className="text-brand-gradient">Zero Generic Fluff.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            We focus exclusively on high-leverage software solutions and automated intelligence. Every deliverable is custom-crafted to accelerate your business.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const IconComponent = ICON_MAP[svc.icon] || Globe;
            return (
              <div
                key={svc.id}
                className="group p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#a84bff]/40 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#a84bff] group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent transition-all shadow-xs">
                      <IconComponent className="w-5 h-5 text-[#a84bff] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {svc.id.replace("-", " ")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#a84bff] transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {svc.shortDescription}
                  </p>

                  {/* Bullet Deliverables */}
                  <ul className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                    {svc.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#266ac1] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Tech Tags & Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {svc.techStack.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects?filter=${svc.id}`}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#a84bff] flex items-center justify-center text-slate-600 hover:text-white transition-colors"
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
