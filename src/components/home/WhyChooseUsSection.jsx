"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Lightbulb,
  ShieldCheck,
  Zap,
  Sliders,
  TrendingUp,
  Play,
  Plus,
  Sparkles,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

const CUBIC_EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: CUBIC_EASE,
    },
  },
};

export function WhyChooseUsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Motion wrapper props depending on prefers-reduced-motion
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, amount: 0.15 },
        variants: containerVariants,
      };

  const cardMotionProps = shouldReduceMotion ? {} : { variants: itemVariants };

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div {...motionProps} className="space-y-6 lg:space-y-6">
          {/* ============================================================== */}
          {/* TOP BENTO ROW (12 COLUMNS)                                     */}
          {/* Col 1-4: Card A (Radar Specialists)                            */}
          {/* Col 5-7: Card B (Convenient App Portrait)                      */}
          {/* Col 8-12: Title "Why Us?" + Card C (100% IP & Rotating Badge)  */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* ------------------------------------------------------------ */}
            {/* CARD A: 40+ Qualified Specialists & Capabilities (~4 cols)    */}
            {/* ------------------------------------------------------------ */}
            <motion.div
              {...cardMotionProps}
              className="md:col-span-6 lg:col-span-4 rounded-3xl bg-white border border-neutral-200/90 p-6 lg:p-7 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[280px]"
            >
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
            </motion.div>

            {/* ------------------------------------------------------------ */}
            {/* CARD B: Convenient App (Portrait with Founder & Phone, ~3 cols) */}
            {/* ------------------------------------------------------------ */}
            <motion.div
              {...cardMotionProps}
              className="md:col-span-6 lg:col-span-3 rounded-3xl border border-neutral-200/90 relative overflow-hidden group shadow-xs hover:shadow-md transition-all duration-300 min-h-[280px]"
            >
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
            </motion.div>

            {/* ------------------------------------------------------------ */}
            {/* RIGHT COLUMN: Title "Why Us?" + Card C + Process Badge (~5 cols) */}
            {/* ------------------------------------------------------------ */}
            <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
              {/* "Why Us?" Title */}
              <motion.div {...cardMotionProps} className="pt-2 lg:pt-3">
                <h2
                  id="why-us-title"
                  className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 tracking-tight font-sans leading-none"
                >
                  Why Us?
                </h2>
                <p className="text-neutral-500 text-xs sm:text-sm font-medium mt-3 tracking-wide">
                  Designed for Trust. Built for Growth.
                </p>
              </motion.div>

              {/* Middle Row: Card C (100% Code & IP) + Rotating Process Badge */}
              <motion.div {...cardMotionProps} className="flex items-center gap-3.5 lg:gap-4">
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
              </motion.div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* BOTTOM BENTO ROW (12 COLUMNS)                                  */}
          {/* Col 1-2: Card D (99.9% Production Uptime)                      */}
          {/* Col 3-5: Card E (Comprehensive Consultation with 3 pills)      */}
          {/* Col 6-12: Card F (Features Lead the Way + iPhone Mockup)       */}
          {/* ============================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            {/* ------------------------------------------------------------ */}
            {/* CARD D: 99.9% Production Uptime SLA (~2 cols on desktop)       */}
            {/* ------------------------------------------------------------ */}
            <motion.div
              {...cardMotionProps}
              className="md:col-span-4 lg:col-span-2 rounded-3xl border border-neutral-200/90 relative overflow-hidden p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 min-h-[290px]"
            >
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
            </motion.div>

            {/* ------------------------------------------------------------ */}
            {/* CARD E: Comprehensive Consultation (~3 cols on desktop)       */}
            {/* ------------------------------------------------------------ */}
            <motion.div
              {...cardMotionProps}
              className="md:col-span-8 lg:col-span-3 rounded-3xl border border-neutral-200/90 relative overflow-hidden p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 min-h-[290px]"
            >
              {/* Lavender fluid silk texture background */}
              <Image
                src="/why-us/lavender-wave.jpg"
                alt="Consultation and architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-white/20 pointer-events-none" />

              {/* Top hashtag badge */}
              <div className="relative z-10 flex justify-center">
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md text-[11px] font-bold text-neutral-800 shadow-2xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-violet" />
                  <span>#advantages</span>
                </span>
              </div>

              {/* 3 Circular Icon Pills (Strategy, Architecture, Automation) */}
              <div className="relative z-10 my-auto py-2">
                <div className="flex items-center justify-center gap-3">
                  <div
                    title="Strategy"
                    className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-violet hover:scale-110 transition-transform"
                  >
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div
                    title="Architecture"
                    className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-blue hover:scale-110 transition-transform"
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div
                    title="Automation"
                    className="w-11 h-11 rounded-full bg-white shadow-xs border border-neutral-100 flex items-center justify-center text-brand-sky hover:scale-110 transition-transform"
                  >
                    <Zap className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-base lg:text-lg font-bold text-neutral-900 text-center tracking-tight leading-snug mt-4">
                  Comprehensive Consultation
                </p>
              </div>

              {/* Bottom 3 Dots Indicator */}
              <div className="relative z-10 flex justify-center items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-violet" />
                <span className="w-2 h-2 rounded-full bg-neutral-300" />
                <span className="w-2 h-2 rounded-full bg-neutral-300" />
              </div>
            </motion.div>

            {/* ------------------------------------------------------------ */}
            {/* CARD F: Our Platform's Features Lead the Way (~7 cols)        */}
            {/* ------------------------------------------------------------ */}
            <motion.div
              {...cardMotionProps}
              className="md:col-span-12 lg:col-span-7 rounded-3xl bg-[#f8fafc] border border-neutral-200/90 p-6 sm:p-8 relative overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 min-h-[290px]"
            >
              {/* Left Side: Icon controls & Headline */}
              <div className="flex-1 flex flex-col justify-between h-full z-10">
                {/* 2 circular control buttons */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-brand-violet transition-colors">
                    <Sliders className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-2xs flex items-center justify-center text-neutral-600 hover:text-brand-violet transition-colors">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Eyebrow & Headline */}
                <div className="mt-4 sm:mt-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block mb-1.5">
                    Driving Innovation Forward
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-neutral-900 tracking-tight leading-snug max-w-sm font-sans">
                    Our Platform&apos;s Features Lead the Way
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-2 max-w-xs leading-relaxed">
                    Custom web software, autonomous AI agent pipelines, and real-time telemetry built for growth.
                  </p>
                </div>

                {/* Feature pill list */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    7–14 Day Sprints
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Zero Lock-In
                  </span>
                </div>
              </div>

              {/* Right Side: Sleek Modern iPhone Mockup */}
              <div className="w-[230px] sm:w-[250px] h-[280px] sm:h-[300px] shrink-0 relative flex justify-center items-end self-center sm:self-end">
                {/* iPhone Titanium Device Frame */}
                <div className="w-[220px] sm:w-[236px] h-[330px] bg-white rounded-t-[38px] border-[5px] border-b-0 border-neutral-800 shadow-2xl relative pt-2 px-2.5 overflow-hidden flex flex-col">
                  {/* Dynamic Island Notch */}
                  <div className="w-18 h-3.5 bg-neutral-900 rounded-full mx-auto mb-2 flex items-center justify-end px-1.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                  </div>

                  {/* iPhone Screen Content */}
                  <div className="flex-1 flex flex-col justify-start">
                    {/* Header with Greeting & Avatar */}
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <div>
                        <p className="text-xs font-bold text-neutral-900">Hi, Alex</p>
                        <p className="text-[9px] text-neutral-400">Deployments Dashboard</p>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-brand-lavender border border-brand-violet/30 flex items-center justify-center text-[10px] font-bold text-brand-violet">
                        B
                      </div>
                    </div>

                    {/* Tag Row */}
                    <div className="flex items-center gap-1.5 my-2">
                      <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[9px] font-mono text-neutral-600 font-semibold">
                        Next.js 16
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-brand-ice text-[9px] font-mono text-brand-blue font-semibold">
                        AI Agents
                      </span>
                    </div>

                    {/* In-Progress Project Showcase Card */}
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-brand-lavender/90 to-brand-ice/70 border border-brand-violet/20 shadow-2xs mt-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-brand-violet text-white text-[8px] font-bold uppercase tracking-wider">
                          In Progress
                        </span>
                        <span className="text-[9px] font-mono text-neutral-500 font-bold">
                          v2.4
                        </span>
                      </div>
                      <p className="text-[11px] font-extrabold text-neutral-900 leading-tight">
                        Autonomous Multi-Agent Order Ingestion
                      </p>
                      <p className="text-[9px] text-neutral-600 mt-1 line-clamp-2">
                        88% faster invoice processing with zero hallucination guardrails.
                      </p>

                      {/* Mini Progress Bar */}
                      <div className="w-full bg-white/70 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-brand-gradient h-full w-[78%] rounded-full" />
                      </div>
                    </div>

                    {/* Secondary Metrics Card */}
                    <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-100 mt-2 flex items-center justify-between">
                      <span className="text-[9px] font-bold text-neutral-700">API Response</span>
                      <span className="text-[9px] font-mono font-extrabold text-emerald-600">84ms TTFT</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
