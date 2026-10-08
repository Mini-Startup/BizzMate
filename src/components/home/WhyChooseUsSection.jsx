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
    <section id="why-us" className="py-24 px-6 relative bg-[#020617] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#57c0e5]/30 bg-[#57c0e5]/10 text-xs font-semibold text-[#57c0e5] mb-4">
            <Zap className="w-3.5 h-3.5 text-[#57c0e5]" />
            <span>The BizzMate Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Why Forward-Thinking Teams <br />
            <span className="text-brand-gradient">Choose BizzMate.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            We operate like your dedicated in-house elite software and automation squad — without the 6-month recruitment cycle or overhead.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0b1329]/60 border border-white/10 hover:border-[#a84bff]/30 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#57c0e5] group-hover:text-white group-hover:bg-brand-gradient transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border border-white/5">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-[#57c0e5] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
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
