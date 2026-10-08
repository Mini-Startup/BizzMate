"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUp, Calendar, FolderGit2, ShieldCheck, Zap, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-footer-wrapper {
  -webkit-font-smoothing: antialiased;
  
  --pill-bg-1: rgba(15, 23, 42, 0.7);
  --pill-bg-2: rgba(30, 41, 59, 0.5);
  --pill-shadow: rgba(0, 0, 0, 0.5);
  --pill-highlight: rgba(255, 255, 255, 0.1);
  --pill-inset-shadow: rgba(0, 0, 0, 0.6);
  --pill-border: rgba(255, 255, 255, 0.08);
  
  --pill-bg-1-hover: rgba(168, 75, 255, 0.15);
  --pill-bg-2-hover: rgba(87, 192, 229, 0.15);
  --pill-border-hover: rgba(168, 75, 255, 0.4);
  --pill-shadow-hover: rgba(168, 75, 255, 0.25);
  --pill-highlight-hover: rgba(255, 255, 255, 0.25);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(168, 75, 255, 0.25) 0%, 
    rgba(87, 192, 229, 0.2) 35%, 
    rgba(38, 106, 193, 0.1) 60%,
    transparent 80%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
}

.footer-giant-bg-text {
  font-size: 21vw;
  line-height: 0.75;
  font-weight: 950;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(203, 213, 225, 0.8) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(168, 75, 255, 0.3));
}
`;

const MagneticButton = React.forwardRef(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.1,
          });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>High-Performance Websites</span> <span className="text-[#a84bff]">✦</span>
    <span>Autonomous AI Automations</span> <span className="text-[#57c0e5]">✦</span>
    <span>Domain-Trained Chatbots</span> <span className="text-[#266ac1]">✦</span>
    <span>WhatsApp Cloud API Workflows</span> <span className="text-[#a84bff]">✦</span>
    <span>Mission-Critical Web Applications</span> <span className="text-[#57c0e5]">✦</span>
  </div>
);

export function MotionFooter() {
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const headingRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 50%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={wrapperRef}
        className="relative min-h-[90vh] md:h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="relative md:fixed bottom-0 left-0 flex min-h-[90vh] md:h-screen w-full flex-col justify-between overflow-hidden bg-[#020617] text-slate-100 cinematic-footer-wrapper border-t border-white/5">
          {/* Ambient Aurora Glow and Grid */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background brand name */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none tracking-wider"
          >
            BIZZMATE
          </div>

          {/* Top Marquee */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-white/10 bg-slate-950/70 backdrop-blur-md py-3.5 z-10 -rotate-1 scale-105 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-semibold tracking-[0.25em] text-slate-400 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-28 md:mt-24 w-full max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a84bff]/30 bg-[#a84bff]/10 text-xs font-semibold text-[#57c0e5] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#a84bff]" />
              <span>Transform Your Workflow Today</span>
            </div>

            <h2
              ref={headingRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black footer-text-glow tracking-tighter mb-8 leading-[1.05]"
            >
              Ready to build your next breakthrough?
            </h2>

            <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 mb-10">
              Partner directly with technical founders. No account managers, no junior handoffs — just rapid, high-impact software execution.
            </p>

            {/* Interactive Magnetic CTA Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton
                  as="a"
                  href="#cta"
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 bg-brand-gradient shadow-lg shadow-[#a84bff]/25 hover:shadow-[#a84bff]/50"
                >
                  <Calendar className="w-5 h-5 text-white" />
                  <span>Book Your Demo Today</span>
                </MagneticButton>

                <MagneticButton
                  as={Link}
                  href="/projects"
                  className="footer-glass-pill px-8 md:px-10 py-4 md:py-5 rounded-full text-slate-200 font-bold text-sm md:text-base flex items-center gap-3 hover:text-white"
                >
                  <FolderGit2 className="w-5 h-5 text-[#57c0e5]" />
                  <span>Explore All Projects</span>
                </MagneticButton>
              </div>

              {/* Navigation Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-5 w-full mt-3">
                <Link href="/#services" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  Services
                </Link>
                <Link href="/#problem" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  The Problem
                </Link>
                <Link href="/#why-us" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  Why Choose Us
                </Link>
                <Link href="/#founders" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  Founders
                </Link>
                <Link href="/#faqs" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  FAQs
                </Link>
                <Link href="/projects" className="footer-glass-pill px-5 py-2.5 rounded-full text-slate-400 font-medium text-xs md:text-sm hover:text-white transition-colors">
                  Case Studies
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-20 w-full pb-8 pt-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 bg-[#020617]/40 backdrop-blur-sm">
            <div className="text-slate-500 text-[11px] md:text-xs font-semibold tracking-wider uppercase order-2 md:order-1">
              © {new Date().getFullYear()} BizzMate Software Agency. All rights reserved.
            </div>

            <div className="footer-glass-pill px-5 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-white/10 text-slate-400 text-xs">
              <span>Engineered with precision by</span>
              <span className="text-brand-gradient font-bold">BizzMate</span>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full footer-glass-pill flex items-center justify-center text-slate-400 hover:text-white group order-3"
            >
              <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}
