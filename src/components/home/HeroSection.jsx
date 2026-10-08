"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  Lock,
  Users2,
  CheckCircle2,
} from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Dynamically load 3D RobotCanvas on client side only (SSR false)
const RobotCanvas = dynamic(() => import("@/components/hero/RobotCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-28 h-28 rounded-full bg-[#ede9fe] animate-pulse border border-[#a84bff]/30 flex items-center justify-center shadow-lg shadow-[#a84bff]/10">
        <Bot className="w-12 h-12 text-[#a84bff] animate-bounce" />
      </div>
      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
        Loading 3D Engine...
      </span>
    </div>
  ),
});

export function HeroSection() {
  const [activeNav, setActiveNav] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Projects", href: "/projects" },
    { label: "Founders", href: "#founders" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* 1. DYNAMIC ISLAND / NOTCH STICKY NAVBAR ON SCROLL */}
      <div
        className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out pointer-events-none ${
          scrolled
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-6 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 sm:gap-5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10">
          {/* Notch Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
              <Image
                src="/Only Logo.png"
                alt="BizzMate"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 group-hover:text-[#a84bff] transition-colors hidden sm:inline">
              BizzMate
            </span>
          </Link>

          {/* Quick Links */}
          <nav className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-slate-600">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setActiveNav(idx)}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  activeNav === idx
                    ? "bg-[#a84bff] text-white"
                    : "hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mini CTA */}
          <Link
            href="#cta"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-brand-gradient shadow-xs hover:shadow-md transition-all"
          >
            <Sparkles className="w-3 h-3 text-white" />
            <span className="hidden sm:inline">Book Demo</span>
          </Link>
        </div>
      </div>

      {/* Main Full-Width Hero Container (Edge to Edge, No outer margins, no rounded corners on screen edge) */}
      <div className="w-full relative px-3 sm:px-6 md:px-8 lg:px-10 pt-1 sm:pt-2 flex flex-col min-h-[880px] lg:min-h-[940px]">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[360px] bg-gradient-to-b from-[#ede9fe]/80 via-[#e0f2fe]/40 to-transparent blur-[140px] pointer-events-none -z-10" />

        {/* 2. TOP HERO HEADER (Minimal padding from screen edge) */}
        <header className="relative z-30 w-full flex items-center justify-between gap-4 pt-1 pb-3 sm:pb-4">
          {/* Left: Rare UI GooeyNav */}
          <div className="hidden lg:flex items-center">
            <GooeyNav
              items={navItems}
              value={activeNav}
              onChange={setActiveNav}
              size="sm"
              activeColor="#a84bff"
              activeLabelColor="#ffffff"
              className="bg-slate-200/70 p-1 rounded-full border border-slate-200/90 shadow-xs"
            />
          </div>

          {/* Center Brand Name */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform hover:scale-105"
            >
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center">
                <Image
                  src="/Only Logo.png"
                  alt="BizzMate Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-slate-900 group-hover:text-[#a84bff] transition-colors font-sans">
                BIZZMATE
              </span>
            </Link>
          </div>

          {/* Right: Book Demo CTA Button */}
          <div className="flex items-center">
            <Link
              href="#cta"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-[#a84bff]/25 hover:shadow-lg hover:shadow-[#a84bff]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Book a Demo</span>
            </Link>
          </div>
        </header>

        {/* 3. SPLIT DISPLAY HEADLINE (Bespoke SOFTWARE / Autonomous AI AGENTS ✦) */}
        <div className="relative z-10 w-full pt-1 sm:pt-2 md:pt-3 px-1 sm:px-3">
          <div className="flex flex-col md:flex-row items-start justify-between w-full gap-4 md:gap-0">
            {/* Left Headline with BizzMate Gradient */}
            <div className="flex flex-col text-left max-w-full md:max-w-[42%]">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold italic text-slate-800 tracking-tight mb-0.5">
                Bespoke
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tighter leading-[0.88] select-none font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#a84bff] via-[#266ac1] to-[#57c0e5] drop-shadow-xs">
                SOFTWARE
              </h1>
            </div>

            {/* Right Headline with BizzMate Gradient & Sparkle */}
            <div className="flex flex-col text-left md:text-right md:items-end max-w-full md:max-w-[42%]">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold italic text-slate-800 tracking-tight mb-0.5">
                Autonomous
              </span>
              <div className="inline-flex items-center gap-2">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] font-black tracking-tighter leading-[0.88] select-none font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#a84bff] via-[#266ac1] to-[#57c0e5] drop-shadow-xs">
                  AI AGENTS
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#57c0e5] to-[#a84bff] font-black leading-none animate-pulse">
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FULL-WIDTH 3D INTERACTIVE ROBOT CANVAS */}
        {/* Canvas spans entire width so the robot has zero cropping on any screen */}
        <div className="absolute inset-x-0 top-[-10px] sm:top-[-5px] md:top-[0px] h-[660px] sm:h-[740px] md:h-[820px] z-20 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full pointer-events-auto">
            <RobotCanvas color="#ffffff" pantallaColor="#a84bff" scale={1.45} />
          </div>
        </div>

        {/* 5. BRAND GRADIENT STAGE (10% increased height, content slightly lower) */}
        {/* Reaches the bottom of HeroSection so direct next section appears beneath it */}
        <div className="w-full mt-auto pt-24 sm:pt-28 md:pt-32">
          <div className="w-full rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[50px] rounded-b-none bg-gradient-to-br from-[#9c42f5] via-[#2467be] to-[#1e40af] p-6 sm:p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden text-white z-10 min-h-[480px] lg:min-h-[520px]">
            {/* Ambient Inner Glowing Rings */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#57c0e5]/30 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 relative z-10 items-end pt-12 sm:pt-16 md:pt-20">
              {/* LEFT STAGE CONTENT */}
              <div className="flex flex-col items-start gap-4 max-w-lg">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-white leading-[1.12] tracking-tight">
                  Where Scalability Meets Intelligence
                </h2>

                <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed max-w-md">
                  High-velocity custom software, autonomous AI agent pipelines, and domain workflows engineered directly by technical founders.
                </p>

                {/* Explore Solutions with Magnetic Button Effect */}
                <div className="pt-2">
                  <MagneticButton
                    href="#cta"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border border-white/80 shadow-xl shadow-purple-950/20 hover:shadow-2xl transition-all group"
                  >
                    <span>Explore Solutions</span>
                    <div className="w-6 h-6 rounded-full bg-[#ede9fe] flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5 text-[#a84bff]" />
                    </div>
                  </MagneticButton>
                </div>
              </div>

              {/* RIGHT STAGE CONTENT */}
              <div className="flex flex-col items-start md:items-end gap-6 w-full md:pl-16 lg:pl-24">
                {/* 3 Meaningful Capability Badges */}
                <div className="flex items-center justify-start md:justify-end gap-2.5 sm:gap-3 w-full flex-wrap">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
                    <Zap className="w-4 h-4 text-[#57c0e5]" />
                    <span>7–14 Day Delivery Sprints</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>100% Code & IP Transfer</span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-xs">
                    <Users2 className="w-4 h-4 text-amber-300" />
                    <span>Founder-Led Engineering</span>
                  </div>
                </div>

                {/* Light Mode Production Showcase Card */}
                <div className="w-full sm:w-[320px] md:w-[350px] flex flex-col gap-2">
                  <span className="text-xs font-bold text-white/90 tracking-wider uppercase">
                    Delivery Capabilities
                  </span>

                  <div className="bg-white rounded-3xl p-5 shadow-2xl border border-white/60 text-slate-900 flex flex-col gap-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div>
                        <span className="font-extrabold text-sm text-slate-900 block">
                          Core Deliverables
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">
                          Production Ready & Tested
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Guaranteed</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#a84bff] shrink-0 mt-0.5" />
                        <span>High-Speed Web & Mobile Apps</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#266ac1] shrink-0 mt-0.5" />
                        <span>Autonomous Multi-Agent AI Workflows</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#57c0e5] shrink-0 mt-0.5" />
                        <span>Domain AI Chatbots & Cloud Integrations</span>
                      </div>
                    </div>

                    <Link
                      href="/projects"
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-gradient text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#a84bff]/25 hover:shadow-lg transition-all"
                    >
                      <span>Explore Case Studies</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
