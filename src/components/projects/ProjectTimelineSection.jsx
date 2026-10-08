"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Calendar, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectTimelineSection({ timeline = [], title = "Execution & Delivery Journey" }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;

      const totalScrollWidth = track.scrollWidth - container.clientWidth;

      if (totalScrollWidth > 0) {
        gsap.to(track, {
          x: -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 20%",
            end: () => `+=${totalScrollWidth + 300}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });
      }

      // Animate cards appearance
      gsap.from(".timeline-card", {
        opacity: 0.4,
        scale: 0.95,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 60%",
          end: "top 20%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [timeline]);

  if (!timeline || timeline.length === 0) return null;

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="py-20 relative w-full overflow-hidden bg-[#020617]"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#a84bff]/30 bg-[#a84bff]/10 text-xs font-semibold text-[#57c0e5] mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#a84bff]" />
          <span>Sprint Roadmap & Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
          Scroll down to scrub through the phased engineering milestones, from initial discovery and architecture to deployment and scale.
        </p>
      </div>

      {/* Horizontal Scrolling Track Container */}
      <div className="w-full overflow-hidden px-6">
        <div
          ref={trackRef}
          className="flex gap-6 w-max pb-8 pt-4 items-stretch"
        >
          {timeline.map((item, idx) => (
            <div
              key={item.id || idx}
              className="timeline-card w-[320px] sm:w-[380px] p-7 rounded-3xl bg-[#0b1329]/80 border border-white/10 hover:border-[#a84bff]/40 transition-all duration-300 flex flex-col justify-between shrink-0 shadow-xl shadow-black/40 relative group"
            >
              {/* Card top banner with stage & date */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-[#57c0e5]">
                    Phase 0{idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span>{item.month}</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-gradient transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.content}
                </p>
              </div>

              {/* Progress Indicator Node */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-[#57c0e5]" />
                  <span>Milestone Verified</span>
                </div>
                <div className="w-3 h-3 rounded-full bg-brand-gradient shadow-md shadow-[#a84bff]/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
