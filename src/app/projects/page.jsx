import { MotionFooter } from "@/components/common/MotionFooter";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata = {
  title: "Projects & Deployments — BizzMate Software Agency",
  description: "Browse our complete catalog of custom websites, autonomous AI workflows, chatbots, WhatsApp integrations, and web applications.",
};

export default function ProjectsPage() {
  return (
    <>
      <main className="relative z-10 w-full min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-8 md:px-10 lg:px-12 bg-white rounded-b-[40px] shadow-2xl">
        {/* Ambient Brand Gradient Glow in Background */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#ede9fe]/70 via-[#e0f2fe]/60 to-white opacity-80 blur-[140px] pointer-events-none rounded-full" />

        <div className="w-full relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mb-12 sm:mb-16">
            {/* Clean Typographic Eyebrow - NO pill badges */}
            <p className="text-xs font-mono uppercase tracking-widest text-[#a84bff] font-bold mb-3">
              Production Portfolio & Case Studies
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08] mb-6">
              Production Software & <br />
              <span className="text-brand-gradient">Engineered Case Studies.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl">
              Explore how BizzMate designs, codes, and deploys high-impact software solutions across autonomous AI agents, enterprise WhatsApp automations, and modern web platforms.
            </p>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block tracking-tight">
                  6+
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Live Flagships
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#a84bff] block tracking-tight">
                  88%
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Average Workflow Speedup
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#266ac1] block tracking-tight">
                  &lt; 50ms
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Edge Stream Latency
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#57c0e5] block tracking-tight">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Client Retention
                </span>
              </div>
            </div>
          </div>

          {/* Directory Filter & Cards Grid */}
          <ProjectsDirectory />
        </div>
      </main>
      <MotionFooter />
    </>
  );
}
