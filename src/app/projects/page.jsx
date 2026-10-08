import { Navbar } from "@/components/common/Navbar";
import { MotionFooter } from "@/components/common/MotionFooter";
import { ProjectsDirectory } from "@/components/projects/ProjectsDirectory";

export const metadata = {
  title: "Projects & Deployments — BizzMate Software Agency",
  description: "Browse our complete catalog of custom websites, autonomous AI workflows, chatbots, WhatsApp integrations, and web applications.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-10 w-full min-h-screen pt-36 pb-24 px-6 bg-white rounded-b-[40px] shadow-2xl overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#ede9fe] via-[#e0f2fe] to-white opacity-80 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Production Software & <br />
              <span className="text-brand-gradient">Engineered Case Studies.</span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg">
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
