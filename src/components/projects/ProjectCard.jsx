"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ProjectCard({ project, priority = false }) {
  if (!project) return null;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 hover:border-[#a84bff]/40 shadow-xs hover:shadow-xl hover:shadow-[#a84bff]/10 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden">
      {/* Top Image Preview with Responsive Aspect Ratio */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Ambient Overlay for Tag Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent pointer-events-none" />

        {/* Bottom Image Overlay Tag: Client Name & Year */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white/90 text-xs font-mono pointer-events-none">
          <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-md border border-white/10 text-[11px] font-semibold">
            {project.client}
          </span>
          <span className="text-[11px] text-white/80 font-sans font-medium">
            {project.year}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Typographic Metadata Row - NO pill badges */}
          <div className="flex items-center justify-between text-xs font-mono font-semibold mb-2.5">
            <span className="text-[#266ac1] uppercase tracking-wider">{project.category}</span>
            {project.statBadge && (
              <span className="text-[#a84bff] font-bold">{project.statBadge}</span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mb-2.5 group-hover:text-[#a84bff] transition-colors leading-snug">
            <Link
              href={`/projects/${project.slug}`}
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a84bff] rounded-md"
            >
              {project.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-2 sm:line-clamp-3 font-normal">
            {project.summary}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-mono text-slate-600 border border-slate-200/60 group-hover:border-purple-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-slate-50 text-[11px] font-mono text-slate-400">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">
            Case Study & Architecture
          </span>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 group-hover:bg-brand-gradient text-slate-700 group-hover:text-white text-xs font-bold transition-all duration-300 shadow-2xs group-hover:shadow-md group-hover:shadow-[#a84bff]/25"
            aria-label={`Read case study for ${project.title}`}
          >
            <span>Read Details</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
