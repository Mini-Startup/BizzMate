import React from "react";
import Image from "next/image";
import { Smartphone } from "lucide-react";

export function ConvenientAppCard() {
  return (
    <div className="md:col-span-6 lg:col-span-3 rounded-3xl border border-neutral-200/90 relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 min-h-[280px]">
      {/* Real founder lifestyle image with mobile phone */}
      <Image
        src="/why-us/convenient-app.jpg"
        alt="BizzMate mobile app experience"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 30vw"
        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
      />

      {/* Subtle gradient scrim at bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/15 to-transparent pointer-events-none" />

      {/* Top-right platform pills */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5">
        <span className="px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[11px] font-bold text-neutral-800 shadow-2xs flex items-center gap-1">
          <Smartphone className="w-3 h-3 text-brand-violet" />
          <span>iOS / Web</span>
        </span>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-5 left-5 z-10">
        <p className="text-white font-bold text-sm lg:text-base tracking-tight drop-shadow-sm flex items-center gap-1.5">
          Convenient App
        </p>
        <p className="text-white/80 text-[11px] font-medium tracking-tight">
          Autonomous systems in your pocket
        </p>
      </div>
    </div>
  );
}
