import React from "react";
import Image from "next/image";

export function UptimeSlaCard() {
  return (
    <div className="md:col-span-4 lg:col-span-2 rounded-3xl border border-neutral-200/90 relative overflow-hidden p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 min-h-[290px]">
      {/* Ice teal fluid texture background */}
      <Image
        src="/why-us/ice-wave.jpg"
        alt="Production SLA"
        fill
        sizes="(max-width: 1024px) 50vw, 20vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xs pointer-events-none" />

      <div className="relative z-10">
        <span className="text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight font-sans">
          99.9%
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-xs lg:text-sm font-bold text-neutral-800 leading-snug">
          Production Uptime SLA
        </p>
        <p className="text-[11px] font-medium text-neutral-600 mt-0.5">
          Zero tech debt
        </p>
      </div>
    </div>
  );
}
