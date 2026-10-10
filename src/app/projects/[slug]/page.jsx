import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { MotionFooter } from "@/components/common/MotionFooter";
import { ProjectTimelineSection } from "@/components/projects/ProjectTimelineSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { RailToc } from "@/components/ui/rail-toc";
import {
  ArrowRight,
  Quote,
  CheckCircle2,
  AlertCircle,
  Cpu,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — BizzMate",
    };
  }

  return {
    title: `${project.title} — BizzMate Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find up to 3 similar projects (prioritizing same category, excluding current)
  const similarProjects = projects
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === project.category ? -1 : 1))
    .slice(0, 3);

  // Table of Contents items with nested subtopics (depth: 1)
  const tocItems = [
    { id: "overview", label: "Executive Overview" },
    { id: "objectives", label: "Scope & Objectives", depth: 1 },
    { id: "challenge", label: "Operational Challenge" },
    { id: "bottlenecks", label: "Critical Bottlenecks", depth: 1 },
    { id: "solution", label: "Technical Architecture" },
    { id: "workflow", label: "System Workflow", depth: 1 },
    { id: "metrics", label: "Measurable Impact" },
    { id: "benchmarks", label: "Production Results", depth: 1 },
    { id: "testimonial", label: "Client Review" },
  ];

  return (
    <>
      {/* Notice: No overflow-hidden on main! This enables position:sticky on aside and timeline to lock in place without diagonal scroll artifacts */}
      <main className="relative z-10 w-full min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-8 md:px-10 lg:px-12 bg-white rounded-b-[40px] shadow-2xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#ede9fe]/70 via-[#e0f2fe]/60 to-white opacity-80 blur-[140px] pointer-events-none rounded-full" />

        <div className="w-full relative z-10">
          {/* Breadcrumb Navigation - Aligned with Navbar */}
          <nav aria-label="Breadcrumb" className="mb-8 pt-2">
            <ol className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#a84bff] transition-colors text-slate-600 font-medium"
                >
                  Home
                </Link>
              </li>
              <li className="text-slate-300" aria-hidden="true">
                /
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-[#a84bff] transition-colors text-slate-600 font-medium"
                >
                  Projects
                </Link>
              </li>
              <li className="text-slate-300" aria-hidden="true">
                /
              </li>
              <li
                className="text-[#a84bff] truncate max-w-xs sm:max-w-md font-bold"
                aria-current="page"
              >
                {project.title}
              </li>
            </ol>
          </nav>

          {/* ============================================================ */}
          {/* 1. TWO-COLUMN GRID: Sticky TOC (Left) + Case Study Article (Right) */}
          {/* The sticky TOC stays locked in place while the user scrolls through the entire article. */}
          {/* Once the article ends, the grid container ends, and both sidebar and article scroll up together. */}
          {/* ============================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-24">
            {/* Left Sticky Column: Rail TOC */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 pt-2">
              <div
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs"
                style={{ "--rail": "#a84bff" }}
              >
                <RailToc items={tocItems} offset={120} title="On this page" />
              </div>
            </aside>

            {/* Right Main Column: Case Study Sections */}
            <article className="lg:col-span-9 space-y-16 sm:space-y-20">
              {/* Section 1: Executive Overview */}
              <section id="overview" className="scroll-mt-36">
                {/* Clean Editorial Metadata Line - NO pill badges */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-semibold mb-3">
                  <span className="text-[#266ac1] uppercase tracking-wider">{project.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#a84bff] font-bold">{project.statBadge}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
                  {project.title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 font-normal">
                  {project.tagline}
                </p>

                {/* Metadata Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-slate-50/90 border border-slate-200/80 mb-8">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Client
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Delivery Year
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Core Technology
                    </span>
                    <span className="text-sm font-bold text-[#266ac1]">
                      {project.tags.slice(0, 2).join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Domain
                    </span>
                    <span className="text-sm font-bold text-[#a84bff]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Hero Thumbnail Preview */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 border border-slate-200/80 shadow-md">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 75vw"
                    className="object-cover object-center"
                  />
                </div>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-normal">
                  {project.overview}
                </p>

                {/* Subtopic: Scope & Objectives */}
                <div
                  id="objectives"
                  className="scroll-mt-36 p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#a84bff]" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Scope & Strategic Objectives
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                    The core directive was to transition manual operational bottlenecks into autonomous, fault-tolerant infrastructure with zero downtime during rollout.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a84bff] mt-1.5 shrink-0" />
                      <span>Zero tolerance for data hallucinations or dropped transaction logs.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#266ac1] mt-1.5 shrink-0" />
                      <span>Sub-second deterministic latency under high concurrent production loads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#57c0e5] mt-1.5 shrink-0" />
                      <span>Seamless bidirectional integration with client ERP and reporting webhooks.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 2: Operational Challenge */}
              <section
                id="challenge"
                className="scroll-mt-36 p-6 sm:p-8 rounded-2xl bg-white border border-rose-200/80 shadow-2xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span className="text-xs uppercase font-mono tracking-wider text-rose-600 font-bold">
                    The Bottleneck
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  The Operational Challenge
                </h2>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                  {project.challenge}
                </p>

                {/* Subtopic: Critical Bottlenecks */}
                <div
                  id="bottlenecks"
                  className="scroll-mt-36 pt-6 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-xs font-mono font-bold text-rose-700 block mb-1">
                      Bottleneck #1: Fragmented Inputs
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Handling multi-modal, unstructured document formats without standardized schema structures or validation checkpoints.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-xs font-mono font-bold text-rose-700 block mb-1">
                      Bottleneck #2: High Latency Cascades
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Manual review queues caused 48+ hour turnarounds and blocked immediate client fulfillment pipelines.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Technical Architecture */}
              <section
                id="solution"
                className="scroll-mt-36 p-6 sm:p-8 rounded-2xl bg-white border-2 border-purple-200/80 shadow-xs relative overflow-hidden"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-[#a84bff]" />
                  <span className="text-xs uppercase font-mono tracking-wider text-[#a84bff] font-bold">
                    Engineering Architecture
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  BizzMate Solution & System Design
                </h2>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
                  {project.solution}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200/70 text-xs font-mono font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Subtopic: System Workflow */}
                <div
                  id="workflow"
                  className="scroll-mt-36 p-6 rounded-2xl bg-slate-900 text-white shadow-lg relative overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-4 h-4 text-[#57c0e5]" />
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-wide uppercase font-mono">
                      End-to-End System Workflow
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] font-mono text-[#a84bff] font-bold block mb-1">
                        01. Ingestion & Cleanse
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Deterministic schema validation and parallel parsing pipelines.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] font-mono text-[#266ac1] font-bold block mb-1">
                        02. Consensus Reasoning
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Multi-agent verification cross-referencing live databases and rules.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[11px] font-mono text-[#57c0e5] font-bold block mb-1">
                        03. Atomic ERP Sync
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Automated ledger updates with human-in-the-loop exception handling.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Measurable Impact */}
              <section id="metrics" className="scroll-mt-36">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#266ac1]" />
                  <span className="text-xs uppercase font-mono tracking-wider text-[#266ac1] font-bold">
                    Quantified ROI
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
                  Measurable Impact & Production Results
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 text-center flex flex-col justify-center items-center shadow-2xs hover:shadow-md transition-shadow"
                    >
                      <span className="text-3xl sm:text-4xl font-extrabold text-brand-gradient mb-2 tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-600 font-semibold">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtopic: Production Results */}
                <div
                  id="benchmarks"
                  className="scroll-mt-36 p-6 rounded-2xl bg-slate-50 border border-slate-200/80"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
                    Production Benchmarks & SLA Adherence
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Following global deployment, this system consistently operates at 99.98% uptime with zero unscheduled disruptions, reducing manual workload by over 45 team hours each calendar week.
                  </p>
                </div>
              </section>

              {/* Section 5: Client Testimonial */}
              <section
                id="testimonial"
                className="scroll-mt-36 p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/90 relative shadow-2xs"
              >
                <Quote className="w-9 h-9 text-[#a84bff]/30 mb-4" />
                <blockquote className="text-base sm:text-xl italic text-slate-800 mb-6 leading-relaxed font-medium">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {project.testimonial.author}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#266ac1]">
                    {project.testimonial.role}
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* ============================================================ */}
          {/* 2. FULL-WIDTH PROJECT TIMELINE SECTION (Outside the 2 columns) */}
          {/* Spans the ENTIRE AVAILABLE WIDTH of the screen. */}
          {/* Pinned firmly by GSAP at top-0 so vertical scroll is 100% frozen while milestones scrub horizontally */}
          {/* ============================================================ */}
          <div
            id="project-timeline"
            className="-mx-4 sm:-mx-8 md:-mx-10 lg:-mx-12 w-screen max-w-[100vw] my-10 sm:my-20"
          >
            <ProjectTimelineSection
              timeline={project.timeline}
              title="Sprint Roadmap"
              periodLabel="Milestone Journey"
              imageUrl={project.thumbnail}
            />
          </div>

          {/* ============================================================ */}
          {/* 3. SIMILAR PROJECTS SECTION (Same card design as /projects) */}
          {/* ============================================================ */}
          <section
            id="similar-projects"
            className="w-full my-16 sm:my-24 pt-12 border-t border-slate-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                {/* Clean Typography Header - NO pill badge */}
                <p className="text-xs font-mono uppercase tracking-widest text-[#266ac1] font-bold mb-2">
                  Related Deployments
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Similar <span className="text-brand-gradient">Engineered Projects</span>
                </h2>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#a84bff] hover:text-[#266ac1] transition-colors group"
              >
                <span>Browse Full Directory</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {similarProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer acts as the final CTA */}
      <MotionFooter />
    </>
  );
}
