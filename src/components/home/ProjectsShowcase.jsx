"use client";

import React from "react";
import { OrbitCardStack } from "@/components/ui/orbit-card-stack";

const projectCards = [
  {
    name: "Nexus Core",
    role: "AI Automations",
    description: "Replaced 45 hours of weekly manual invoice verification with autonomous multi-agent pipelines and real-time audit trails.",
    accent: "#a84bff",
    stat: "88% Speedup",
    tag: "Enterprise AI",
    image: "/projects/nexus-agentic-ops.jpg",
    href: "/projects/nexus-agentic-ops",
  },
  {
    name: "Aura Dental",
    role: "WhatsApp Automations",
    description: "Autonomous WhatsApp booking concierge handling 2,400 monthly patient appointments with atomic calendar locks.",
    accent: "#266ac1",
    stat: "3.2x Booking Rate",
    tag: "WhatsApp Cloud API",
    image: "/projects/omni-whatsapp-concierge.jpg",
    href: "/projects/omni-whatsapp-concierge",
  },
  {
    name: "Strata Intelligence",
    role: "Web Applications",
    description: "High-frequency financial analytics suite streaming tick-level orderbook feeds and custom charts at sub-50ms latency.",
    accent: "#57c0e5",
    stat: "Sub-50ms Latency",
    tag: "Financial Terminal",
    image: "/projects/strata-cloud-platform.jpg",
    href: "/projects/strata-cloud-platform",
  },
  {
    name: "Hyperion AI",
    role: "Developer Platform",
    description: "Cinematic model launch experience generating 38,000 waitlist signups in 72 hours with sub-second API latency.",
    accent: "#a84bff",
    stat: "38K Signups in 72h",
    tag: "Model Platform",
    image: "/projects/hyperion-launch-platform.jpg",
    href: "/projects/hyperion-launch-platform",
  },
  {
    name: "Explore All Projects",
    role: "Complete Portfolio",
    description: "Browse our complete index of client case studies, custom web flagships, and autonomous domain AI automations.",
    accent: "#a84bff",
    stat: "6+ Live Flagships",
    tag: "View Directory →",
    isFolder: true,
    href: "/projects",
  },
];

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 relative bg-slate-50 overflow-visible">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-brand-lavender/35 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Featured Case Studies & <br />
            <span className="text-brand-gradient">Engineered Breakthroughs.</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            From multi-agent pipelines to real-time analytics platforms, we engineer high-leverage software systems built for scalability and velocity.
          </p>
        </div>

        {/* Orbit Card Stack Stage with generous breathing room */}
        <div className="w-full flex items-center justify-center min-h-[580px] sm:min-h-[640px] overflow-visible">
          <OrbitCardStack
            items={projectCards}
            defaultActiveIndex={2}
            spread={158}
            lift={38}
          />
        </div>
      </div>
    </section>
  );
}

export default ProjectsShowcase;
