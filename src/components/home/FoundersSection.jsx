"use client";

import React from "react";
import Image from "next/image";
import { founders } from "@/data/founders";
import { Users, Code, Terminal, Sparkles, CheckCircle2 } from "lucide-react";

export function FoundersSection() {
  return (
    <section id="founders" className="py-24 px-6 relative bg-[#020617] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-brand-gradient opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#a84bff]/30 bg-[#a84bff]/10 text-xs font-semibold text-[#57c0e5] mb-4">
            <Users className="w-3.5 h-3.5 text-[#a84bff]" />
            <span>Meet The Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Engineered By Founders. <br />
            <span className="text-brand-gradient">Not Subcontractors.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            There are only two of us. We are both technical founders who design, architect, and code your products directly. You have a direct line to the people actually building your software.
          </p>
        </div>

        {/* 2 Founders Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 rounded-3xl bg-[#0b1329]/80 border border-white/10 hover:border-[#a84bff]/40 transition-all duration-300 relative group flex flex-col justify-between shadow-2xl shadow-black/40"
            >
              <div>
                <div className="flex items-center gap-5 mb-6">
                  {/* Founder Avatar Placeholder with Brand Initials / Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-gradient p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-[#a84bff]/20">
                    <div className="w-full h-full bg-[#0b1329] rounded-[14px] flex items-center justify-center font-black text-xl text-white">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-gradient transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#57c0e5]">
                      {founder.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {founder.bio}
                </p>

                {/* Founder Quote */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs italic text-slate-400 mb-6 relative">
                  <span className="text-lg text-[#a84bff] font-serif mr-1">“</span>
                  {founder.quote}
                  <span className="text-lg text-[#a84bff] font-serif ml-1">”</span>
                </div>
              </div>

              {/* Technical Proficiencies */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2 font-semibold">
                  Core Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs font-medium text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
