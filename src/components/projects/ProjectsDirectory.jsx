"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ArrowRight, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
                  ? "bg-brand-gradient text-white shadow-md shadow-[#a84bff]/20"
                  : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-xs"
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
            className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 hover:border-[#a84bff]/30 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 group"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-[#266ac1]">
                  {proj.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-xs">
                  {proj.statBadge}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#a84bff] transition-colors">
                {proj.title}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {proj.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-mono text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">
                Client: <span className="text-slate-800 font-semibold">{proj.client}</span>
              </span>

              <Link
                href={`/projects/${proj.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#a84bff] hover:text-[#266ac1] transition-colors"
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
