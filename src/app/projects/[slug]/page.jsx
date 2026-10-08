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
  Quote,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

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
    { id: "solution", label: "Architecture" },
    { id: "journey", label: "Sprint Timeline" },
    { id: "metrics", label: "Measurable Impact" },
    { id: "testimonial", label: "Client Review" },
  ];

  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full min-h-screen pt-32 pb-24 bg-white rounded-b-[40px] shadow-2xl">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#ede9fe] via-[#e0f2fe] to-white opacity-80 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Back Navigation Button */}
          <div className="mb-8 pt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#a84bff] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* Main 2-Column Layout: Left Sticky Rail TOC | Right Case Study Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Column: Rail TOC */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 pt-2">
              <div
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
                style={{ "--rail": "#a84bff" }}
              >
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#a84bff]" />
                  <span>On This Page</span>
                </div>
                <RailToc items={tocItems} offset={120} title="" />
              </div>
            </aside>

            {/* Right Main Column: Case Study Sections */}
            <article className="lg:col-span-9 space-y-20 pb-16">
              {/* 1. Overview Section */}
              <section id="overview" className="scroll-mt-36">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-semibold text-[#266ac1]">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-xs">
                    {project.statBadge}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                  {project.title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 font-normal">
                  {project.tagline}
                </p>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                      Client
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.client}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                      Delivery Year
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1">
                      Core Technology
                    </span>
                    <span className="text-sm font-bold text-[#266ac1]">
                      {project.tags.slice(0, 2).join(", ")}
                    </span>
                  </div>
                </div>

                <p className="text-base text-slate-700 leading-relaxed">
                  {project.overview}
                </p>
              </section>

              {/* 2. Challenge Section */}
              <section id="challenge" className="scroll-mt-36 p-8 md:p-10 rounded-2xl bg-white border border-red-200 shadow-xs">
                <span className="text-xs uppercase font-mono tracking-wider text-red-500 font-bold block mb-2">
                  The Bottleneck
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  The Operational Challenge
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              {/* 3. Solution Section */}
              <section id="solution" className="scroll-mt-36 p-8 md:p-10 rounded-2xl bg-white border-2 border-purple-200 shadow-sm relative overflow-hidden">
                <span className="text-xs uppercase font-mono tracking-wider text-[#a84bff] font-bold block mb-2">
                  Technical Architecture
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  BizzMate Engineering Solution
                </h2>
                <p className="text-slate-700 text-base leading-relaxed mb-6">
                  {project.solution}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* 4. Project Development Timeline (Pinned horizontal scrub) */}
              <section id="journey" className="scroll-mt-36">
                <ProjectTimelineSection
                  timeline={project.timeline}
                  title="Project Development Phases"
                />
              </section>

              {/* 5. Metrics Section */}
              <section id="metrics" className="scroll-mt-36">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                  Measurable Impact & Production Results
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-8 rounded-2xl bg-white border border-slate-200 text-center flex flex-col justify-center items-center shadow-xs"
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
              </section>

              {/* 6. Testimonial Section */}
              <section id="testimonial" className="scroll-mt-36 p-8 md:p-10 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <Quote className="w-8 h-8 text-[#a84bff]/30 mb-4" />
                <p className="text-base sm:text-lg italic text-slate-800 mb-6 leading-relaxed font-medium">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {project.testimonial.author}
                  </div>
                  <div className="text-xs font-semibold text-[#266ac1]">
                    {project.testimonial.role}
                  </div>
                </div>
              </section>

              {/* Next Project Footer Bar */}
              <div className="pt-10 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block mb-1 uppercase font-mono font-semibold">
                    Next Case Study
                  </span>
                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="text-base sm:text-lg font-bold text-slate-900 hover:text-[#a84bff] transition-colors"
                  >
                    {nextProject.title}
                  </Link>
                </div>

                <MagneticButton
                  href={`/projects/${nextProject.slug}`}
                  className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-md shadow-[#a84bff]/25 hover:scale-105 transition-transform"
                  aria-label="Next case study"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </MagneticButton>
              </div>
            </article>
          </div>
        </div>
      </main>
      <MotionFooter />
    </>
  );
}
