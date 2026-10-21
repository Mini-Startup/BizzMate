"use client";

import React, { useState, useMemo, useDeferredValue } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Sparkles, Layers, Search, Filter } from "lucide-react";

const CATEGORIES = [
  "All",
  "AI Automations",
  "WhatsApp Automations",
  "Web Applications",
  "Landing Pages",
  "AI Chatbots",
  "Websites",
];

export function ProjectsDirectory({ initialFilter = "All" }) {
  const [activeCategory, setActiveCategory] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = projects.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // Filter projects by category and deferred search query for non-blocking UI
  const filteredProjects = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, deferredQuery]);

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="mb-10 sm:mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center justify-start gap-2 w-full md:w-auto"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = categoryCounts[cat] || 0;

            if (cat !== "All" && count === 0) return null;

            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a84bff] ${
                  isActive
                    ? "bg-brand-gradient text-white shadow-md shadow-[#a84bff]/25"
                    : "bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stack or client..."
            aria-label="Search projects by keyword, technology, or client"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#a84bff] focus:ring-2 focus:ring-[#a84bff]/20 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={idx < 3}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl bg-slate-50 border border-slate-200/80 p-8">
          <Filter className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            No projects found
          </h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
            We couldn’t find any deployments matching &ldquo;{searchQuery || activeCategory}&rdquo;. Try clearing filters to see all case studies.
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-md shadow-[#a84bff]/20 cursor-pointer hover:opacity-95"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsDirectory;
