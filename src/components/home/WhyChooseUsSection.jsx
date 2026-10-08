"use client";

import React from "react";
import { Zap, ShieldCheck, Code2, Users, Rocket, Sparkles } from "lucide-react";

export function WhyChooseUsSection() {
  const pillars = [
    {
      icon: Users,
      title: "Direct Founder Engineering",
      description: "You partner directly with technical founders who write, review, and ship your software. No account managers or middle-layer bottlenecks.",
      badge: "Accountability",
    },
    {
      icon: Zap,
      title: "Unmatched Turnaround Velocity",
      description: "Our battle-tested internal scaffolding and streamlined sprints enable us to deploy production flagships in 7 to 14 days.",
      badge: "Fast Sprints",
    },
    {
      icon: Code2,
      title: "State-of-the-Art Modern Stack",
      description: "Built on Next.js 16, React 19, Tailwind CSS v4, GSAP, and dedicated Python vector engines. No legacy PHP or brittle page builders.",
      badge: "Zero Tech Debt",
    },
    {
      icon: ShieldCheck,
      title: "Complete Code & IP Ownership",
      description: "You retain 100% intellectual property, source repositories, database schemas, and AI configurations. Zero platform lock-in.",
      badge: "Full Ownership",
    },
    {
      icon: Rocket,
      title: "Production AI That Actually Works",
      description: "We don't build toys. Our RAG pipelines and multi-agent automations feature strict mathematical guardrails to eliminate hallucinations.",
      badge: "Hardened AI",
    },
    {
      icon: Sparkles,
      title: "Continuous Telemetry & SLA Support",
      description: "We monitor production latency, webhook health, and model performance long after launch, ensuring 99.9% uptime as you scale.",
      badge: "99.9% Uptime",
    },
  ];

  return (
    <section id="why-us" className="py-24 px-6 relative bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Why Forward-Thinking Teams <br />
            <span className="text-brand-gradient">Choose BizzMate.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            We operate like your dedicated in-house elite software and automation squad — without the 6-month recruitment cycle or overhead.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#a84bff]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#266ac1] group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent transition-all shadow-xs">
                    <Icon className="w-5 h-5 text-[#266ac1] group-hover:text-white transition-colors" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2.5 group-hover:text-[#a84bff] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
