/* eslint-disable react-hooks/exhaustive-deps */
// Built using Hyperiux Vault: https://vault.hyperiux.com
"use client";

import {
  useRef,
  useSyncExternalStore,
  useLayoutEffect,
  useEffect,
} from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Inline stand-in for @gsap/react's useGSAP */
function useGSAP(callback, options) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef(null);
  const cleanupRef = useRef(undefined);

  useIsomorphicLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : scope;
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
  }, deps);
}

const monthOrder = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback) {
  if (typeof window === "undefined") return () => {};

  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);

  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;

  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot,
  );
}

const defaultTopJourneyData = [
  {
    id: "2020-march",
    year: "2020",
    month: "March",
    content: "Signal research turns scattered notes into a clear product thesis",
  },
  {
    id: "2021-july",
    year: "2021",
    month: "July",
    content: "Founding release ships with the first live customer journeys",
  },
  {
    id: "2023-april",
    year: "2023",
    month: "April",
    content: "Automation layer connects insight, publishing, and sales motion",
  },
  {
    id: "2026-may",
    year: "2026",
    month: "May",
    content: "New markets open with localized launches and faster onboarding",
  },
];

const defaultBottomJourneyData = [
  {
    id: "2020-november",
    year: "2020",
    month: "November",
    content: "Prototype sprint validates the experience with real operators",
  },
  {
    id: "2022-october",
    year: "2022",
    month: "October",
    content: "Community feedback reshapes the roadmap into sharper releases",
  },
  {
    id: "2025-september",
    year: "2025",
    month: "September",
    content: "Companion mobile workflows make the timeline travel-ready",
  },
];

export default function Timeline({
  title = "Product Storyline",
  periodLabel = "2020-2026",
  textColor = "#0f172a",
  mutedTextColor = "#64748b",
  activeColor = "#a84bff",
  backgroundColor = "#ffffff",
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  imageAlt = "Modern agency workspace",
  duration,
  scrollDuration = 1.2,
  topItems,
  bottomItems,
}) {
  const sectionRef = useRef(null);
  const wholeSliderRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const activeTopData = topItems && topItems.length > 0 ? topItems : defaultTopJourneyData;
  const activeBottomData = bottomItems && bottomItems.length > 0 ? bottomItems : defaultBottomJourneyData;

  const sectionStyle = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle = {
    color: mutedTextColor,
  };

  const allJourneyItems = [
    ...activeTopData,
    ...activeBottomData,
  ].sort((a, b) => {
    const yearDiff = Number(a.year) - Number(b.year);
    if (yearDiff !== 0) return yearDiff;
    return (monthOrder[a.month] ?? 0) - (monthOrder[b.month] ?? 0);
  });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const isMobile = window.innerWidth < 600;
    // Slide ends with the final milestone sitting cleanly at the screen center (matching reference)
    const slidePercent = isMobile ? -58 : -62;
    const lineWidth = isMobile ? "70%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    const slideEnd = isMobile ? "84% 50%" : "92% bottom";
    const lineEnd = isMobile ? "82% 50%" : "90% bottom";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: slideEnd,
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });

    tl.fromTo(
      wholeSliderRef.current,
      { xPercent: 0 },
      { xPercent: slidePercent },
    );

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }

    gsap.to(".journey-line", {
      width: lineWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: lineStart,
        end: lineEnd,
        scrub: true,
      },
    });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;

    if (!section) return;

    const items = allJourneyItems;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, {
          opacity: 1,
          clearProps: "transform",
        });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, {
        scaleY: 0,
        transformOrigin: "bottom bottom",
      });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits = {};
    const descriptionSplits = {};

    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });

      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, {
        type: "chars, words, lines",
        mask: "lines",
      });
    });

    const createItemTimeline = (
      item,
      startPos,
      endPos,
    ) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];

      const isTop = activeTopData.some((topItem) => topItem.id === item.id);

      if (!isTop) {
        gsap.set(lineSelector, { transformOrigin: "top top" });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: `${startPos}% 30%`,
          end: `${endPos}% 50%`,
          scrub: true,
        },
      });

      timeline
        .to(lineSelector, {
          scaleY: 1,
          duration: normalizedDuration * 0.4,
        })
        .to(
          dotSelector,
          {
            scale: 1,
            duration: normalizedDuration * 0.4,
          },
          "<",
        )
        .fromTo(
          titleLines,
          { y: 100 },
          {
            y: 0,
            delay: -0.8 * normalizedDuration,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
        )
        .fromTo(
          descriptionLines,
          { y: 100 },
          {
            y: 0,
            duration: normalizedDuration,
            stagger: 0.02,
            ease: "power2.out",
          },
          "<",
        );

      return timeline;
    };

    // Calibrated trigger positions: each milestone reveals as it reaches the screen center
    const positions =
      window.innerWidth < 600
        ? [
            [16, 26],
            [26, 36],
            [36, 46],
            [46, 56],
            [56, 66],
            [66, 76],
            [76, 86],
          ]
        : [
            [4, 18],
            [16, 30],
            [28, 42],
            [40, 54],
            [52, 66],
            [64, 78],
            [76, 90],
          ];

    items.forEach((item, index) => {
      const [startPos, endPos] = positions[index] || [
        Math.round(4 + (index / Math.max(1, items.length - 1)) * 72),
        Math.round(18 + (index / Math.max(1, items.length - 1)) * 72),
      ];
      createItemTimeline(item, startPos, endPos);
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Object.values(titleSplits).forEach((split) => split?.revert?.());
      Object.values(descriptionSplits).forEach((split) => split?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="h-[200vw] max-[600px]:h-[400vh] w-full relative"
      style={sectionStyle}
    >
      <div className="h-screen w-screen sticky top-[0%] pt-[10%] overflow-hidden max-[600px]:top-[5%]">
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[30vw] w-[225vw] items-center gap-[4vw] px-[4vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[6vw]"
        >
          {/* Leading preview image */}
          <div className="relative h-full w-[28vw] overflow-hidden rounded-[1vw] max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw] shadow-sm border border-slate-200 shrink-0">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              unoptimized
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative h-full w-full">
            {/* Main horizontal central axis line: 2.5px thickness, centered at 50% */}
            <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center h-[2.5px] pointer-events-none z-10">
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shrink-0"
                style={activeStyle}
              ></div>
              <div
                className="h-[2.5px] w-[0%] rounded-full journey-line"
                style={activeStyle}
              ></div>
              <div
                className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full shrink-0"
                style={activeStyle}
              ></div>
            </div>

            {/* Top row: Section title & top milestones */}
            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[22vw] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw] shrink-0">
                <h2 className="w-[80%] text-[3vw] leading-[0.95] max-[600px]:text-[8.5vw] font-bold">
                  {title}
                </h2>
              </div>

              {/* Top row items: 18vw gap between 26vw cards, pitch = 44vw */}
              <div className="w-full flex h-full gap-x-[18vw] max-[600px]:gap-x-[40vw]">
                {activeTopData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] px-[2.5vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[6vw] shrink-0"
                  >
                    {/* Stem & dot: Dot centered directly on the 2.5px vertical line */}
                    <div className="absolute left-0 bottom-0 top-0 w-[2.5px] -translate-x-1/2 pointer-events-none flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`size-[1vw] min-w-[12px] min-h-[12px] max-[600px]:size-[2.5vw] rounded-full aspect-square shrink-0 jd-${item.id}`}
                          style={activeStyle}
                        ></div>
                      </div>
                      <div
                        className={`w-full origin-bottom rounded-full flex-1 jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                    </div>

                    <div className="mt-[-1vw] space-y-[1vw] max-[600px]:mt-[-2vw]">
                      <h4
                        className={`title-${item.id} text-[2.5vw] leading-none max-[600px]:text-[6.4vw] font-bold`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[90%] text-[1.5vw] leading-[1.15] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row: Period label & bottom milestones */}
            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[22vw] pt-[2vw] max-[600px]:pt-[5vw] h-full shrink-0">
                <p
                  className="text-[1.65vw] leading-none max-[600px]:text-[4.2vw] font-medium"
                  style={mutedTextStyle}
                >
                  {periodLabel}
                </p>
              </div>

              {/* Bottom row items: offset by ml-[22vw] so first bottom item is at 44vw, exactly midway between Top 0 (22vw) and Top 1 (66vw) */}
              <div className="w-full flex h-full gap-x-[18vw] ml-[22vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[22vw]">
                {activeBottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[26vw] px-[2.5vw] max-[600px]:w-[70vw] max-[600px]:px-[6vw] shrink-0"
                  >
                    {/* Stem & dot: Dot centered directly on the 2.5px vertical line */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2.5px] -translate-x-1/2 pointer-events-none flex flex-col items-center">
                      <div
                        className={`w-full origin-top rounded-full flex-1 jl-${item.id}`}
                        style={activeStyle}
                      ></div>
                      <div className="relative flex items-center justify-center">
                        <div
                          className={`size-[1vw] min-w-[12px] min-h-[12px] max-[600px]:size-[2.5vw] rounded-full aspect-square shrink-0 jd-${item.id}`}
                          style={activeStyle}
                        ></div>
                      </div>
                    </div>

                    <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">
                      <h4
                        className={`title-${item.id} text-[2.5vw] leading-none max-[600px]:text-[6.4vw] font-bold`}
                      >
                        {item.year} {item.month}
                      </h4>
                      <p
                        className={`description-${item.id} w-[90%] text-[1.5vw] leading-[1.15] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`}
                        style={mutedTextStyle}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Timeline };
