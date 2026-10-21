import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export function OwnershipAndProcessCard() {
  return (
    <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
      {/* "Why Us?" Title */}
      <div className="pt-2 lg:pt-3">
        <h2
          id="why-us-title"
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight font-sans leading-none"
        >
          Why Us?
        </h2>
        <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-3 tracking-wide">
          Designed for Trust. Built for Growth.
        </p>
      </div>

      {/* Middle Row: Card C (100% Code & IP) + Rotating Process Badge */}
      <div className="flex items-center gap-3.5 lg:gap-4">
        {/* Card C: 100% Code & IP Ownership */}
        <div className="flex-1 rounded-3xl relative overflow-hidden p-5 lg:p-6 border border-brand-violet/25 shadow-xs group h-[120px] flex flex-col justify-center">
          {/* Brand gradient fluid silk background */}
          <Image
            src="/why-us/brand-wave.jpg"
            alt="BizzMate IP Ownership"
            fill
            sizes="(max-width: 1024px) 100vw, 35vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {/* Frosted translucent tint */}
          <div className="absolute inset-0 bg-brand-violet/20 backdrop-blur-[1px] pointer-events-none" />

          <div className="relative z-10">
            <span className="text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-sm font-sans">
              100%
            </span>
            <p className="text-xs lg:text-sm font-bold text-white/95 tracking-tight leading-tight mt-0.5">
              Code &amp; IP Ownership
            </p>
          </div>
        </div>

        {/* Rotating "Explore Our Process" Badge */}
        <Link
          href="/#services"
          aria-label="Explore our process"
          className="w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full bg-white border border-neutral-200/90 shadow-xs hover:shadow-md flex items-center justify-center relative hover:border-brand-violet/50 transition-all group shrink-0"
        >
          {/* Rotating circular text */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full absolute inset-0 animate-[spin_12s_linear_infinite] group-hover:[animation-duration:6s] transition-all"
          >
            <defs>
              <path
                id="circlePath"
                d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
              />
            </defs>
            <text
              fontSize="9.5"
              fontWeight="700"
              fill="#475569"
              letterSpacing="0.18em"
              className="uppercase font-mono group-hover:fill-brand-violet transition-colors"
            >
              <textPath href="#circlePath" startOffset="0%">
                • EXPLORE OUR PROCESS • BIZZMATE
              </textPath>
            </text>
          </svg>

          {/* Center Play Button */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 group-hover:bg-brand-violet group-hover:text-white flex items-center justify-center text-neutral-800 transition-colors shadow-2xs z-10">
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
