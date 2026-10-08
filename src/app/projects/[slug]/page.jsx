import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Navbar } from "@/components/common/Navbar";
import { MotionFooter } from "@/components/common/MotionFooter";
import { ProjectTimelineSection } from "@/components/projects/ProjectTimelineSection";
import { RailToc } from "@/components/ui/rail-toc";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building2,
  Code2,
  TrendingUp,
  Quote,
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

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const tocItems = [
    { id: "overview", label: "Executive Overview" },
    { id: "challenge", label: "The Challenge" },
    { id: "solution", label: "Architecture & Solution" },
    { id: "timeline", label: "Sprint Timeline" },
    { id: "metrics", label: "Measurable Impact" },
    { id: "testimonial", label: "Client Endorsement" },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full min-h-screen pt-36 pb-24 px-6 bg-[#020617] relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-gradient opacity-15 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Back button */}
          <div className="mb-10">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Main Layout Grid: Left Sticky Rail TOC | Right Case Study Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Column: Rail TOC */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-32">
              <div className="p-6 rounded-2xl bg-[#0b1329]/80 border border-white/10 backdrop-blur-xl">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#57c0e5]" />
                  <span>On This Page</span>
                </div>
                <RailToc items={tocItems} offset={120} title="" />
              </div>
            </aside>

            {/* Right Main Column: Case Study Sections */}
            <article className="lg:col-span-9 space-y-16">
              {/* 1. Overview Section */}
              <section id="overview" className="scroll-mt-36">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#57c0e5]">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-md shadow-[#a84bff]/20">
                    {project.statBadge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                  {project.title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                  {project.tagline}
                </p>

                {/* Meta Attributes Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#0b1329]/60 border border-white/10 mb-8">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase block mb-1">
                      Client
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase block mb-1">
                      Delivery Year
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 uppercase block mb-1">
                      Core Technology
                    </span>
                    <span className="text-sm font-semibold text-[#57c0e5]">
                      {project.tags.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* 2. Challenge Section */}
              <section id="challenge" className="scroll-mt-36 p-8 rounded-3xl bg-[#0b1329]/50 border border-white/10">
                <span className="text-xs uppercase font-mono tracking-wider text-red-400 font-bold block mb-2">
                  The Bottleneck
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  The Operational Challenge
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              {/* 3. Solution Section */}
              <section id="solution" className="scroll-mt-36 p-8 rounded-3xl bg-slate-900/80 border border-[#a84bff]/30 relative overflow-hidden shadow-2xl shadow-[#a84bff]/10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gradient opacity-15 blur-3xl pointer-events-none" />
                <span className="text-xs uppercase font-mono tracking-wider text-[#57c0e5] font-bold block mb-2">
                  Technical Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  BizzMate Engineering Solution
                </h2>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6">
                  {project.solution}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* 4. Project Timeline Section (Scrubbing GSAP Timeline) */}
              <section id="timeline" className="scroll-mt-36">
                <ProjectTimelineSection
                  timeline={project.timeline}
                  title="Project Development Phases"
                />
              </section>

              {/* 5. Metrics Section */}
              <section id="metrics" className="scroll-mt-36">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Measurable Impact & Production Results
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#0b1329]/80 border border-white/10 text-center flex flex-col justify-center items-center"
                    >
                      <span className="text-3xl sm:text-4xl font-black text-brand-gradient mb-2 tracking-tight">
                        {m.value}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300 font-medium">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. Testimonial Section */}
              <section id="testimonial" className="scroll-mt-36 p-8 rounded-3xl bg-[#0b1329]/70 border border-white/10 relative">
                <Quote className="w-8 h-8 text-[#a84bff]/40 mb-4" />
                <p className="text-base sm:text-lg italic text-slate-200 mb-6 leading-relaxed">
                  “{project.testimonial.quote}”
                </p>
                <div>
                  <div className="font-bold text-white text-sm">
                    {project.testimonial.author}
                  </div>
                  <div className="text-xs text-[#57c0e5]">
                    {project.testimonial.role}
                  </div>
                </div>
              </section>

              {/* Next Project Footer Bar */}
              <div className="pt-10 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block mb-1 uppercase font-mono">
                    Next Case Study
                  </span>
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="text-base sm:text-lg font-bold text-white hover:text-brand-gradient transition-colors"
                  >
                    {nextProject.title}
                  </Link>
                </div>
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-[#a84bff]/30 hover:scale-105 transition-transform"
                  aria-label="Next case study"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>
      <MotionFooter />
    </>
  );
}
