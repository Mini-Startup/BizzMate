import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

export function RadarSpecialistsCard() {
  return (
    <div className="md:col-span-6 lg:col-span-4 rounded-3xl bg-white border border-neutral-200/90 p-6 lg:p-7 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px]">
      {/* Top info */}
      <div className="relative z-10">
        <span className="text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight font-sans">
          40+
        </span>
        <p className="text-xs lg:text-sm font-semibold text-neutral-600 mt-1 max-w-[130px] leading-snug">
          Qualified experts &amp; strategic capabilities
        </p>
      </div>

      {/* Concentric Radar Graphic with Avatar / Node Bubbles */}
      <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-[270px] h-[270px] pointer-events-none">
        <svg
          viewBox="0 0 270 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="135"
            cy="135"
            r="50"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.65"
          />
          <circle
            cx="135"
            cy="135"
            r="92"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.65"
          />
          <circle
            cx="135"
            cy="135"
            r="130"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.65"
          />
        </svg>

        {/* Avatar 1: Founder / Technical Architect */}
        <div
          title="Technical Architecture"
          className="absolute top-[32px] left-[155px] w-9 h-9 rounded-full border-2 border-white shadow-md overflow-hidden pointer-events-auto hover:scale-115 transition-transform"
        >
          <Image
            src="/why-us/avatar-founder.jpg"
            alt="Khushil — Founder & Architecture"
            width={36}
            height={36}
            className="object-cover"
          />
        </div>

        {/* Avatar 2: Product & Automations Specialist */}
        <div
          title="Agentic Automation"
          className="absolute top-[125px] left-[42px] w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden pointer-events-auto hover:scale-115 transition-transform"
        >
          <Image
            src="/why-us/avatar-specialist-1.jpg"
            alt="AI Specialist"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        {/* Avatar 3: Cloud & SLA Specialist */}
        <div
          title="Cloud & Distributed Systems"
          className="absolute top-[175px] left-[175px] w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden pointer-events-auto hover:scale-115 transition-transform"
        >
          <Image
            src="/why-us/avatar-specialist-2.jpg"
            alt="Cloud Engineer"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>

        {/* Avatar 4: WhatsApp Concierge Engineer */}
        <div
          title="WhatsApp Cloud API"
          className="absolute top-[68px] left-[65px] w-7 h-7 rounded-full border-2 border-white shadow-md overflow-hidden pointer-events-auto hover:scale-115 transition-transform"
        >
          <Image
            src="/why-us/avatar-specialist-3.jpg"
            alt="WhatsApp Automation"
            width={28}
            height={28}
            className="object-cover"
          />
        </div>
      </div>

      {/* Bottom-left interactive plus button indicator */}
      <div className="relative z-10">
        <div className="w-8 h-8 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-400 group-hover:text-brand-violet group-hover:border-brand-violet/40 transition-colors shadow-2xs">
          <Plus className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
