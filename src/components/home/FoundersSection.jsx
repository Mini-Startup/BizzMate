"use client";

import React from "react";
import { founders } from "@/data/founders";

export function FoundersSection() {
  return (
    <section id="founders" className="py-24 px-6 relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Engineered By Founders. <br />
            <span className="text-brand-gradient">Not Subcontractors.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            There are only two of us. We are both technical founders who design, architect, and code your products directly. You have a direct line to the people actually building your software.
          </p>
        </div>

        {/* 2 Founders Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <div
              key={idx}
              className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 hover:border-[#a84bff]/30 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center gap-5 mb-6">
                  {/* Founder Avatar with Initials & Brand Gradient */}
                  <div className="w-16 h-16 rounded-2xl bg-brand-gradient p-0.5 flex items-center justify-center shrink-0 shadow-md">
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-extrabold text-xl text-[#0f172a]">
                      {founder.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#a84bff] transition-colors">
                      {founder.name}
                    </h3>
                    <p className="text-sm font-semibold text-[#266ac1]">
                      {founder.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {founder.bio}
                </p>

                {/* Founder Quote */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs italic text-slate-700 mb-6">
                  <span className="text-sm text-[#a84bff] font-serif mr-1">“</span>
                  {founder.quote}
                  <span className="text-sm text-[#a84bff] font-serif ml-1">”</span>
                </div>
              </div>

              {/* Technical Proficiencies */}
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5 font-bold">
                  Core Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {founder.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
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
