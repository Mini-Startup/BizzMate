"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { FolderComponent } from "@/components/ui/folder-component";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowRight, Sparkles } from "lucide-react";

export function ProjectsShowcase() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 relative bg-slate-50 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Featured Case Studies & <br />
              <span className="text-brand-gradient">Engineered Breakthroughs.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Explore how we&apos;ve helped fast-moving businesses automate complex operations, deploy hardened AI systems, and launch digital flagships.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#a84bff] hover:text-[#266ac1] group transition-colors"
          >
            <span>Browse Full Directory</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Featured Cards */}
          {featured.map((proj) => (
            <div
              key={proj.slug}
              className="p-8 md:p-10 rounded-2xl bg-white border border-slate-200 hover:border-[#a84bff]/30 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-[#266ac1]">
                    {proj.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-xs">
                    {proj.statBadge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#a84bff] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {proj.tagline}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
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
                  <span>Deep-Dive Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}

          {/* 4th Card: The Interactive Folder Card linking to all projects */}
          <Link
            href="/projects"
            className="p-8 md:p-10 rounded-2xl bg-white border-2 border-purple-200 hover:border-[#a84bff] relative overflow-hidden flex flex-col items-center justify-between text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#a84bff] transition-colors">
                Explore The Complete Portfolio
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Discover our full repository of client case studies, AI automations, and custom web applications.
              </p>
            </div>

            {/* Folder Component in Center with Hover Tooltip */}
            <div className="my-8 w-full flex flex-col items-center justify-center relative min-h-[220px]">
              {/* Tooltip Pill */}
              <div className="absolute -top-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20">
                <span className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-lg flex items-center gap-1.5">
                  <span>Click to view all projects</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#57c0e5]" />
                </span>
              </div>

              <div className="transform group-hover:scale-105 transition-transform duration-300">
                <FolderComponent color="blue" size="sm" />
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400 group-hover:text-[#a84bff] flex items-center gap-1 font-semibold transition-colors">
              <span>View 6+ Production Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
