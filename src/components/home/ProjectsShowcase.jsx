"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { FolderComponent } from "@/components/ui/folder-component";
import { ArrowRight, Sparkles, ExternalLink, Zap } from "lucide-react";

export function ProjectsShowcase() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24 px-6 relative bg-[#020617] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-brand-gradient opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#57c0e5]/30 bg-[#57c0e5]/10 text-xs font-semibold text-[#57c0e5] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#57c0e5]" />
              <span>Proven Production Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Featured Case Studies & <br />
              <span className="text-brand-gradient">Engineered Breakthroughs.</span>
            </h2>
            <p className="text-slate-400 text-base md:text-lg">
              Explore how we&apos;ve helped fast-moving businesses automate complex operations, deploy hardened AI systems, and launch digital flagships.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#57c0e5] group transition-colors"
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
              className="group p-8 rounded-3xl bg-[#0b1329]/80 border border-white/10 hover:border-[#a84bff]/40 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/30"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#57c0e5]">
                    {proj.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-md shadow-[#a84bff]/20">
                    {proj.statBadge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-gradient transition-colors">
                  {proj.title}
                </h3>

                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {proj.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
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
                <span className="text-xs font-semibold text-slate-400">
                  Client: <span className="text-slate-200">{proj.client}</span>
                </span>

                <Link
                  href={`/projects/${proj.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#57c0e5] transition-colors"
                >
                  <span>Deep-Dive Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}

          {/* 4th Card: The Interactive Folder Component "View All Projects" */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-[#a84bff]/30 relative overflow-hidden flex flex-col items-center justify-between text-center shadow-2xl shadow-[#a84bff]/10 group">
            <div className="w-full">
              <span className="inline-block px-3 py-1 rounded-full bg-[#a84bff]/20 text-[#a84bff] text-xs font-mono font-bold uppercase tracking-wider mb-3">
                Interactive Archive
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Explore The Complete Portfolio
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Interact with the folder below to preview our full repository of websites, AI automations, and web apps.
              </p>
            </div>

            {/* Folder Component in Center */}
            <div className="my-6 w-full flex items-center justify-center min-h-[220px]">
              <Link href="/projects" className="block transform hover:scale-105 transition-transform">
                <FolderComponent color="blue" size="sm" />
              </Link>
            </div>

            {/* Action CTA Button */}
            <Link
              href="/projects"
              className="w-full py-3.5 rounded-full bg-brand-gradient text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#a84bff]/25 hover:shadow-[#a84bff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Open All Projects Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
