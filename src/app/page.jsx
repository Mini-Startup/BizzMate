import { LoadingOrbScreen } from "@/components/common/LoadingOrbScreen";
import { Navbar } from "@/components/common/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { FoundersSection } from "@/components/home/FoundersSection";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";
import { MotionFooter } from "@/components/common/MotionFooter";

export const metadata = {
  title: "BizzMate — High-Performance Software Solutions & AI Automations",
  description: "BizzMate is a software agency building bespoke websites, AI workflows, domain chatbots, WhatsApp automations, and enterprise web applications.",
};

export default function HomePage() {
  return (
    <>
      <LoadingOrbScreen />
      <main className="relative z-10 w-full flex flex-col bg-white rounded-b-[40px] shadow-2xl">
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <FoundersSection />
        <ProjectsShowcase />
        <FaqSection />
        <CtaSection />
      </main>
      <MotionFooter />
    </>
  );
}
