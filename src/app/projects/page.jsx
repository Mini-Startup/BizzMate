import { Navbar } from "@/components/common/Navbar";
import { MotionFooter } from "@/components/common/MotionFooter";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Projects & Deployments — BizzMate Software Agency",
  description: "Browse our complete catalog of custom websites, autonomous AI workflows, chatbots, WhatsApp integrations, and web applications.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full min-h-screen pt-36 pb-24 px-6 bg-[#020617] relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-gradient opacity-15 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#57c0e5]/30 bg-[#57c0e5]/10 text-xs font-semibold text-[#57c0e5] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#57c0e5]" />
              <span>Full Portfolio Archive</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6">
              Production Software & <br />
              <span className="text-brand-gradient">Engineered Case Studies.</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg">
              Explore how BizzMate designs, codes, and deploys high-impact software solutions across AI automation, WhatsApp, and the modern web.
            </p>
          </div>

          <ProjectsDirectory />
        </div>
      </main>
      <MotionFooter />
    </>
  );
}
