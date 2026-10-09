"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { FolderComponent } from "@/components/ui/folder-component";

const defaultItems = [
  {
    name: "Nexus Core",
    role: "AI Automations",
    description: "Autonomous multi-agent pipeline replacing 45 hours of manual document checks.",
    accent: "#a84bff",
    initials: "NX",
    stat: "88% Speedup",
    tag: "Enterprise AI",
    image: "/projects/nexus-agentic-ops.jpg",
    href: "/projects/nexus-agentic-ops",
  },
  {
    name: "Aura Dental",
    role: "WhatsApp Automations",
    description: "Autonomous WhatsApp booking concierge handling 2,400 monthly appointments.",
    accent: "#266ac1",
    initials: "AD",
    stat: "3.2x Booking Rate",
    tag: "WhatsApp Cloud API",
    image: "/projects/omni-whatsapp-concierge.jpg",
    href: "/projects/omni-whatsapp-concierge",
  },
  {
    name: "Strata Intelligence",
    role: "Web Applications",
    description: "High-frequency financial analytics suite with sub-50ms live tick data feeds.",
    accent: "#57c0e5",
    initials: "SI",
    stat: "Sub-50ms Latency",
    tag: "Financial Terminal",
    image: "/projects/strata-cloud-platform.jpg",
    href: "/projects/strata-cloud-platform",
  },
  {
    name: "Hyperion AI",
    role: "Developer Platform",
    description: "Cinematic model launch experience generating 38,000 waitlist signups in 72 hours.",
    accent: "#a84bff",
    initials: "HY",
    stat: "38K Signups",
    tag: "Model Platform",
    image: "/projects/hyperion-launch-platform.jpg",
    href: "/projects/hyperion-launch-platform",
  },
  {
    name: "Explore Portfolio",
    role: "All Deployments",
    description: "Browse our complete index of client case studies, custom web apps, and AI workflows.",
    accent: "#a84bff",
    initials: "ALL",
    stat: "6+ Live Studies",
    tag: "Browse Directory →",
    isFolder: true,
    href: "/projects",
  },
];

function inRange(index, length) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function Portrait({ item, isHovered }) {
  const shared =
    "relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-slate-200/80 bg-slate-100/60";

  if (item.isFolder) {
    return (
      <div className="relative flex aspect-[1.36] w-full items-center justify-center rounded-[1.45rem] border border-purple-200/60 bg-linear-to-b from-purple-50/50 via-slate-50 to-slate-100 overflow-visible">
        <div className="w-full h-full flex items-center justify-center p-2 pt-6 transform scale-95 transition-transform duration-300">
          <FolderComponent color="violet" size="sm" isHovered={isHovered} />
        </div>
      </div>
    );
  }

  if (item.image) {
    return (
      <div className={shared}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={shared}
      style={{
        "--portrait-accent": item.accent ?? "#f3e8ff",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--portrait-accent),transparent_35%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.7),transparent_40%)] opacity-60" />
    </div>
  );
}

export function OrbitCardStack({
  items = defaultItems,
  className,
  cardClassName,
  defaultActiveIndex = 2,
  spread = 158,
  lift = 38,
  onActiveChange,
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const cards = items.length ? items : defaultItems;
  const restingIndex = inRange(defaultActiveIndex, cards.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [open, setOpen] = useState(true);
  const stageRef = useRef(null);
  const isHoveringStageRef = useRef(false);
  const hasClosedOnEntryRef = useRef(false);
  const closeTimeoutRef = useRef(null);
  const midpoint = (cards.length - 1) / 2;

  useEffect(() => {
    const node = stageRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When user scrolls and lands on the section, cards are already open by default,
        // so we smoothly trigger the closing animation after a brief moment to show them collapsing into the stack
        if (entry && entry.isIntersecting && !hasClosedOnEntryRef.current) {
          hasClosedOnEntryRef.current = true;

          closeTimeoutRef.current = setTimeout(() => {
            // Smoothly fold into resting stack unless user is already hovering over cards
            if (!isHoveringStageRef.current) {
              setOpen(false);
              setActiveIndex(restingIndex);
            }
          }, 800);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [restingIndex]);

  const layouts = useMemo(
    () =>
      cards.map((_, index) => {
        const orbit = index - midpoint;
        const stack = index - restingIndex;
        return {
          open: {
            x: orbit * spread,
            y: Math.abs(orbit) * 26 + Math.max(0, Math.abs(orbit) - 1) * 8,
            rotation: orbit * 6.5,
          },
          closed: {
            x: stack * 12,
            y: Math.abs(stack) * 5,
            rotation: stack * 2.5,
          },
        };
      }),
    [cards, midpoint, restingIndex, spread],
  );

  const activate = (index) => {
    const next = inRange(index, cards.length);
    setOpen(true);
    setActiveIndex(next);
    onActiveChange?.(cards[next], next);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
    setHoveredCardIndex(null);
  };

  const handleStageMouseEnter = () => {
    isHoveringStageRef.current = true;
    setOpen(true);
  };

  const handleStageMouseLeave = () => {
    isHoveringStageRef.current = false;
    setHoveredCardIndex(null);
    close();
  };

  const leaveFocus = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      isHoveringStageRef.current = false;
      setHoveredCardIndex(null);
      close();
    }
  };

  return (
    <div
      className={cn(
        "relative flex min-h-full w-full items-center justify-center overflow-visible py-8 px-2 sm:px-6",
        className,
      )}
    >
      <div
        ref={stageRef}
        className="relative h-[540px] w-full max-w-[1200px] overflow-visible"
        onMouseEnter={handleStageMouseEnter}
        onMouseLeave={handleStageMouseLeave}
        onBlur={leaveFocus}
        role="list"
        aria-label="Projects card stack"
      >
        {cards.map((item, index) => {
          const position = open ? layouts[index].open : layouts[index].closed;
          const active = index === activeIndex;
          const isCardHovered = hoveredCardIndex === index;
          const style = {
            zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
            transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${
              position.y - (open && active && hoveredCardIndex !== null ? lift : 0)
            }px)) rotate(${position.rotation}deg) scale(${open ? 0.99 : 0.97})`,
            transitionDuration: reduceMotion ? "0ms" : "420ms",
          };

          return (
            <Link
              key={`${item.name}-${index}`}
              href={item.href || "/projects"}
              role="listitem"
              aria-current={active ? "true" : undefined}
              aria-label={`View ${item.name} project`}
              className={cn(
                "group absolute left-1/2 top-1/2 block w-[min(84vw,21rem)] origin-bottom cursor-pointer rounded-[2rem] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-4 sm:p-5 text-slate-900 shadow-xl shadow-slate-900/5 outline-none hover:border-brand-violet/40 hover:shadow-2xl hover:shadow-brand-violet/10 transition-all",
                "transition-[transform] ease-[cubic-bezier(.2,.8,.2,1)] focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                cardClassName,
              )}
              style={style}
              onMouseEnter={() => {
                isHoveringStageRef.current = true;
                setHoveredCardIndex(index);
                activate(index);
              }}
              onMouseLeave={() => {
                setHoveredCardIndex(null);
              }}
              onFocus={() => {
                isHoveringStageRef.current = true;
                setHoveredCardIndex(index);
                activate(index);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                  event.preventDefault();
                  const next = (index + 1) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                  event.preventDefault();
                  const next = (index - 1 + cards.length) % cards.length;
                  activate(next);
                  stageRef.current
                    ?.querySelectorAll("[role=listitem]")
                    [next]?.focus();
                }
                if (event.key === "Escape") {
                  event.currentTarget.blur();
                  close();
                }
              }}
            >
              <div className="relative">
                <Portrait item={item} isHovered={isCardHovered} />
                <div
                  aria-hidden="true"
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-slate-900 group-hover:bg-brand-violet text-white shadow-md transition-colors z-10"
                >
                  <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
              <div className="px-1 pb-1 pt-4 sm:pt-5">
                <p className="text-[0.72rem] font-mono font-bold uppercase tracking-[0.16em] text-brand-violet">
                  {item.role}
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight tracking-tight text-slate-900 group-hover:text-brand-violet transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-xs sm:text-[0.85rem] font-normal leading-relaxed text-slate-600 line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-4 border-t border-slate-100 pt-3 flex items-center justify-between text-[0.7rem] font-mono font-bold uppercase tracking-wider text-slate-500">
                  <span>{item.stat ?? "Case Study"}</span>
                  <span className="text-brand-violet font-semibold">
                    {item.tag || "Explore →"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default OrbitCardStack;
