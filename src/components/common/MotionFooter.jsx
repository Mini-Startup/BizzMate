"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Calendar, FolderGit2, Heart } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 shrink-0">
    <span className="text-slate-600 font-bold">High-Performance Websites</span>
    <span className="text-[#a84bff]">✦</span>
    <span className="text-slate-600 font-bold">Autonomous AI Automations</span>
    <span className="text-[#57c0e5]">✦</span>
    <span className="text-slate-600 font-bold">Domain-Trained Chatbots</span>
    <span className="text-[#266ac1]">✦</span>
    <span className="text-slate-600 font-bold">WhatsApp Cloud API Workflows</span>
    <span className="text-[#a84bff]">✦</span>
    <span className="text-slate-600 font-bold">Mission-Critical Web Applications</span>
    <span className="text-[#57c0e5]">✦</span>
  </div>
);

const FOOTER_NAV_ITEMS = [
  { id: "hero", label: "Home", href: "/#hero" },
  { id: "services", label: "Services", href: "/#services" },
  { id: "why-us", label: "Why Us", href: "/#why-us" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "faqs", label: "FAQs", href: "/#faqs" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export function MotionFooter() {
  const { activeSection, navigateToSection } = useNavigation();
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Giant typography parallax and scaling as footer is revealed
      if (giantTextRef.current) {
        gsap.fromTo(
          giantTextRef.current,
          { transform: "translate(-50%, 40px) scale(0.96)", opacity: 0.4 },
          {
            transform: "translate(-50%, 0px) scale(1.04)",
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }

      // 2. Staggered Content Reveal
      if (headingRef.current && linksRef.current) {
        gsap.fromTo(
          [headingRef.current, linksRef.current],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 45%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="footer"
      className="relative h-screen w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      {/* Fixed footer underneath that reveals as curtain peels back */}
      <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-[#a84bff]/20">
        {/* Subtle Ambient Light Glows */}
        <div className="absolute left-1/2 top-1/2 h-[55vh] w-[75vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-gradient-to-tr from-[#ede9fe] via-[#e0f2fe] to-transparent opacity-80 blur-[100px] pointer-events-none z-0" />

        {/* Light Mode Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

        {/* Giant Solid Watermark Typography (Zero double-outline artifacts) */}
        <div
          ref={giantTextRef}
          className="absolute -bottom-[4vh] left-1/2  whitespace-nowrap z-0 pointer-events-none select-none font-black uppercase text-[20vw] mx-auto leading-[0.94] text-transparent bg-gradient-to-b from-slate-900/10 via-slate-900/3 to-transparent bg-clip-text"
          style={{ fontFamily: "var(--font-jakarta), var(--font-outfit), sans-serif" }}
        >
          BIZZMATE
        </div>

        {/* 1. Diagonal Sleek Marquee (Positioned comfortably below floating navbar) */}
        <div className="absolute top-24 left-0 w-full overflow-hidden border-y border-slate-200/90 bg-white/80 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-sm">
          <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* 2. Main Center Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-24 w-full mx-auto text-center">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-8 leading-[1.05]"
            style={{ fontFamily: "var(--font-jakarta), var(--font-outfit), sans-serif" }}
          >
            Lets Build 
            <span className="text-brand-gradient"> Together</span>
          </h2>

          {/* Interactive Magnetic Buttons */}
          <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-wrap justify-center gap-4 w-full">
              <MagneticButton
                href="#contact"
                onClick={(e) => navigateToSection("contact", e)}
                className="px-8 md:px-10 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 bg-brand-gradient shadow-xl shadow-[#a84bff]/30 hover:shadow-[#a84bff]/50 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-white" />
                <span>Book Your Demo Today</span>
              </MagneticButton>

              <MagneticButton
                href="/projects"
                className="px-8 md:px-10 py-4 md:py-5 rounded-full text-slate-800 font-bold text-sm md:text-base flex items-center gap-3 bg-white/90 border border-slate-200 hover:border-slate-400 shadow-md hover:bg-white"
              >
                <FolderGit2 className="w-5 h-5 text-brand-blue" />
                <span>Explore All Projects</span>
              </MagneticButton>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap justify-center gap-2.5 md:gap-4 w-full mt-2">
              {FOOTER_NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <MagneticButton
                    key={item.id}
                    href={item.href}
                    onClick={(e) => navigateToSection(item.id, e)}
                    className={`px-5 py-2.5 rounded-full border text-xs md:text-sm font-semibold shadow-xs cursor-pointer bg-white/70 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-brand-violet/40 hover:bg-white`}
                  >
                    {item.label}
                  </MagneticButton>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar / Credits */}
        <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-200/80 bg-slate-50/50">
          {/* Copyright */}
          <div className="text-slate-500 text-[10px] md:text-xs font-semibold tracking-wider uppercase order-2 md:order-1">
            © 2026 BizzMate Software Agency. All rights reserved.
          </div>

          {/* "Made with Love" Badge */}
          <div className="px-5 py-2.5 rounded-full bg-white border border-slate-200 flex items-center gap-2 order-1 md:order-2 shadow-xs">
            <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Crafted with
            </span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
              by
            </span>
            <span className="text-slate-900 font-extrabold text-xs md:text-sm ml-0.5">
              BizzMate
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MotionFooter;
