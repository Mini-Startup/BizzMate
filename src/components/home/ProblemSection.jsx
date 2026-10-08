"use client";

import React from "react";
import { XCircle, CheckCircle2, Sparkles } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      bad: "Account managers playing a telephone game while junior contractors guess your specs.",
      good: "Direct engineering with technical founders who architect and execute every line of code.",
    },
    {
      bad: "Generic bloated templates that score 40/100 on mobile PageSpeed and leak conversions.",
      good: "Bespoke Next.js and Tailwind builds tuned for 100/100 Core Web Vitals and sub-second loads.",
    },
    {
      bad: "Superficial 'AI' gimmicks that hallucinate data, fail silently, and frustrate real clients.",
      good: "Robust RAG and multi-agent pipelines with schema enforcement and enterprise guardrails.",
    },
    {
      bad: "Vague monthly retainers with months of delays, hidden invoices, and zero IP clarity.",
      good: "Transparent delivery in 7 to 28 days with 100% full intellectual property transfer to you.",
    },
  ];

  return (
    <section id="problem" className="py-24 px-6 relative overflow-hidden bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Software Development Shouldn&apos;t Feel Like A{" "}
            <span className="text-brand-gradient">Black Box.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Most businesses waste months and tens of thousands of dollars on agencies that overpromise and hand off tickets to junior subcontractors. We built BizzMate to eliminate that friction.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Agency Card */}
          <div className="p-8 md:p-10 rounded-2xl bg-white border border-red-200/80 shadow-sm relative">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-red-500 font-bold">
                  The Old Way
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Traditional Agencies
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                <XCircle className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-5">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-600">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{item.bad}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* BizzMate Standard Card */}
          <div className="p-8 md:p-10 rounded-2xl bg-white border-2 border-[#a84bff]/30 shadow-lg shadow-[#a84bff]/5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-[#a84bff] font-bold">
                  The BizzMate Standard
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <span>Founder-Engineered Execution</span>
                  <Sparkles className="w-4 h-4 text-[#a84bff]" />
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-[#a84bff]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <ul className="space-y-5">
              {problems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#a84bff] shrink-0 mt-0.5" />
                  <span className="font-medium">{item.good}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
