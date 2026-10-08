"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowRight, Sparkles, Filter, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
  "All",
  "AI Automations",
  "WhatsApp Automations",
  "Web Applications",
  "AI Chatbots",
  "Landing Pages",
  "Websites",
];

export function ProjectsDirectory({ initialFilter = "All" }) {
  const [activeCategory, setActiveCategory] = useState(initialFilter);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-gradient text-white shadow-lg shadow-[#a84bff]/25"
                  : "bg-[#0b1329]/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.slug}
            className="group p-8 rounded-3xl bg-[#0b1329]/70 border border-white/10 hover:border-[#a84bff]/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#57c0e5]">
                  {proj.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-md shadow-[#a84bff]/20">
                  {proj.statBadge}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gradient transition-colors">
                {proj.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {proj.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                Client: <span className="text-slate-200 font-semibold">{proj.client}</span>
              </span>

              <Link
                href={`/projects/${proj.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#57c0e5] transition-colors"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
