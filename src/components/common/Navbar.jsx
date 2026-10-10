"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  FolderGit2,
  Bot,
  MessageSquare,
  LineChart,
} from "lucide-react";

const featuredProjects = [
  {
    slug: "nexus-agentic-ops",
    title: "Nexus Core",
    subtitle: "Enterprise AI Automations",
    icon: Bot,
    tag: "AI Agents",
  },
  {
    slug: "omni-whatsapp-concierge",
    title: "Aura Dental",
    subtitle: "Autonomous WhatsApp Booking",
    icon: MessageSquare,
    tag: "WhatsApp API",
  },
  {
    slug: "strata-cloud-platform",
    title: "Strata Intelligence",
    subtitle: "Real-Time Financial Analytics",
    icon: LineChart,
    tag: "Web Apps",
  },
];

const CUBIC_EASE = [0.16, 1, 0.3, 1];

const SECTION_IDS = ["hero", "services", "why-us", "projects", "faqs"];

const NAV_ITEMS = [
  { id: "hero", label: "Home", href: "/" },
  { id: "services", label: "Services", href: "/#services" },
  { id: "why-us", label: "Why Us", href: "/#why-us" },
  {
    id: "projects",
    label: "Projects",
    href: "/#projects",
    hasDropdown: true,
  },
  // { id: "founders", label: "Founders", href: "/#founders" },
  { id: "faqs", label: "FAQs", href: "/#faqs" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [localActiveSection, setLocalActiveSection] = useState("hero");

  const isProjectsRoute = pathname.startsWith("/projects");
  const activeSection = isProjectsRoute ? "projects" : localActiveSection;

  const activeSectionRef = useRef(activeSection);
  const scrolledRef = useRef(false);
  const isClickScrollingRef = useRef(false);
  const clickTargetRef = useRef(null);
  const scrollMonitorRafRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const hashDwellTimeoutRef = useRef(null);
  const clickUnlockTimerRef = useRef(null);

  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const [offsets, setOffsets] = useState({ navX: 0, ctaX: 0 });
  const [dockWidth, setDockWidth] = useState(800);
  const [indicatorStyle, setIndicatorStyle] = useState({
    x: 6,
    width: 70,
    top: 6,
    height: 36,
    ready: true,
  });

  const navRef = useRef(null);
  const linksRef = useRef(null);
  const ctaRef = useRef(null);
  const miniLogoRef = useRef(null);
  const pillContainerRef = useRef(null);

  const updateIndicatorPosition = useCallback((targetId) => {
    const id = targetId || activeSectionRef.current;
    const btn = document.getElementById(`nav-item-${id}`);
    if (btn && btn.parentElement) {
      const parent = btn.parentElement;
      setIndicatorStyle({
        x: parent.offsetLeft,
        width: parent.offsetWidth,
        top: parent.offsetTop,
        height: parent.offsetHeight,
        ready: true,
      });
    }
  }, []);

  const updateOffsets = useCallback(() => {
    if (typeof window === "undefined") return;
    const innerW = window.innerWidth;
    if (innerW < 840) {
      setOffsets({ navX: 0, ctaX: 0 });
      return;
    }

    const navEl = navRef.current;
    const navRect = navEl ? navEl.getBoundingClientRect() : null;

    let initialNavLeft = 48;
    let initialCtaLeft = innerW - 48 - 134;

    if (navRect && navRect.left > 0) {
      initialNavLeft = navRect.left;
      initialCtaLeft = navRect.right - (ctaRef.current?.offsetWidth || 134);
    }

    const miniLogoW = miniLogoRef.current?.offsetWidth || 124;
    const navW = linksRef.current?.offsetWidth || 530;
    const ctaW = ctaRef.current?.offsetWidth || 134;

    const dockEdgePad = 16;
    const gapLogoToNav = 12;
    const gapNavToCta = 12;

    const calculatedDockWidth = Math.round(
      dockEdgePad + miniLogoW + gapLogoToNav + navW + gapNavToCta + ctaW + dockEdgePad
    );
    setDockWidth(calculatedDockWidth);

    const dockLeft = (innerW - calculatedDockWidth) / 2;
    const targetNavLeft = dockLeft + dockEdgePad + miniLogoW + gapLogoToNav;
    const navX = targetNavLeft - initialNavLeft;
    const targetCtaLeft = targetNavLeft + navW + gapNavToCta;
    const ctaX = targetCtaLeft - initialCtaLeft;

    setOffsets({ navX, ctaX });
    updateIndicatorPosition(activeSectionRef.current);
  }, [updateIndicatorPosition]);

  // Keep activeSectionRef synced
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  // Master unified listener: Scroll spy, dock hysteresis, and layout sync with 0 duplicate renders
  useEffect(() => {
    let rafId = null;

    const handleInitial = () => {
      updateOffsets();

      if (isProjectsRoute) {
        if (typeof window !== "undefined" && window.location.hash) {
          if (window.location.hash === "#hero") {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
          }
        }
        activeSectionRef.current = "projects";
        setLocalActiveSection("projects");
        updateIndicatorPosition("projects");
      } else {
        if (window.location.hash) {
          const h = window.location.hash.replace("#", "");
          if (SECTION_IDS.includes(h)) {
            activeSectionRef.current = h;
            setLocalActiveSection(h);
            updateIndicatorPosition(h);
          } else {
            updateIndicatorPosition("hero");
          }
        } else {
          updateIndicatorPosition("hero");
        }
      }

      if (window.scrollY > 35) {
        scrolledRef.current = true;
        setScrolled(true);
      }
    };

    const mountRaf = requestAnimationFrame(handleInitial);

    const updateScrollState = () => {
      const y = window.scrollY;

      // 1. If currently programmatic scrolling from nav click, lock out spy updates completely
      if (isClickScrollingRef.current) {
        return;
      }

      // 2. Dock hysteresis (applies across all pages)
      if (y > 35) {
        if (!scrolledRef.current) {
          scrolledRef.current = true;
          setScrolled(true);
        }
      } else if (y < 20) {
        if (scrolledRef.current) {
          scrolledRef.current = false;
          setScrolled(false);
        }
      }

      // If not on homepage, do not run home section spy
      if (pathname !== "/") return;

      // 3. Section spy: reading line
      let current = "hero";
      const isAtBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        current = "faqs";
      } else {
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          const id = SECTION_IDS[i];
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top <= 140) {
              current = id;
              break;
            }
          }
        }
      }

      if (current !== activeSectionRef.current) {
        activeSectionRef.current = current;
        setLocalActiveSection(current);
        updateIndicatorPosition(current);

        // Debounced / Dwell-based URL update (300ms):
        // Only updates the URL when the user dwells on a section.
        // Single continuous waves from bottom to top or top to bottom bypass intermediate hashes!
        if (hashDwellTimeoutRef.current) {
          clearTimeout(hashDwellTimeoutRef.current);
        }

        hashDwellTimeoutRef.current = setTimeout(() => {
          if (pathname === "/" && !isClickScrollingRef.current) {
            const destHash = current === "hero" ? "" : `#${current}`;
            const curHash = window.location.hash;
            if (curHash !== destHash) {
              window.history.replaceState(
                null,
                "",
                destHash ? destHash : window.location.pathname
              );
            }
          }
        }, 300);
      }
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScrollState();
      });
    };

    const handleScrollEnd = () => {
      isClickScrollingRef.current = false;
      clickTargetRef.current = null;
      const atTop = window.scrollY <= 25;
      if (scrolledRef.current !== !atTop) {
        scrolledRef.current = !atTop;
        setScrolled(!atTop);
      }
    };

    const handleHashChange = () => {
      if (pathname === "/") {
        const h = window.location.hash.replace("#", "");
        if (h && SECTION_IDS.includes(h)) {
          activeSectionRef.current = h;
          setLocalActiveSection(h);
          updateIndicatorPosition(h);
        }
      }
    };

    const handleResize = () => {
      updateOffsets();
      updateIndicatorPosition(activeSectionRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        updateOffsets();
        updateIndicatorPosition(activeSectionRef.current);
      });
    }

    const capturedScrollMonitorRef = scrollMonitorRafRef;
    const capturedHashDwellTimeoutRef = hashDwellTimeoutRef;
    const capturedClickUnlockTimerRef = clickUnlockTimerRef;

    return () => {
      cancelAnimationFrame(mountRaf);
      if (rafId) cancelAnimationFrame(rafId);
      if (capturedScrollMonitorRef.current) cancelAnimationFrame(capturedScrollMonitorRef.current);
      if (capturedHashDwellTimeoutRef.current) clearTimeout(capturedHashDwellTimeoutRef.current);
      if (capturedClickUnlockTimerRef.current) clearTimeout(capturedClickUnlockTimerRef.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scrollend", handleScrollEnd);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname, isProjectsRoute, updateIndicatorPosition, updateOffsets]);

  // Clean up any timeouts on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const handleMouseEnterProjects = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProjectsDropdownOpen(true);
  };

  const handleMouseLeaveProjects = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 180);
  };

  const handleNavClick = (e, item) => {
    setProjectsDropdownOpen(false);

    if (pathname === "/") {
      e.preventDefault();

      const targetId = item.id;
      activeSectionRef.current = targetId;
      setLocalActiveSection(targetId);
      updateIndicatorPosition(targetId);

      // Cancel any pending debounced scroll hash updates
      if (hashDwellTimeoutRef.current) {
        clearTimeout(hashDwellTimeoutRef.current);
      }

      // Immediately set the target URL directly without intermediate steps
      const newHash = targetId === "hero" ? "" : `#${targetId}`;
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", newHash ? newHash : window.location.pathname);
      }

      isClickScrollingRef.current = true;
      clickTargetRef.current = targetId;

      if (scrollMonitorRafRef.current) {
        cancelAnimationFrame(scrollMonitorRafRef.current);
      }
      if (clickUnlockTimerRef.current) {
        clearTimeout(clickUnlockTimerRef.current);
      }

      let targetY = 0;
      if (targetId === "hero") {
        targetY = 0;
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80);
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }

      // Unlock click scrolling when arrival is detected
      const unlockClickScrolling = () => {
        isClickScrollingRef.current = false;
        clickTargetRef.current = null;
        if (clickUnlockTimerRef.current) {
          clearTimeout(clickUnlockTimerRef.current);
          clickUnlockTimerRef.current = null;
        }
        window.removeEventListener("scrollend", unlockClickScrolling);
        const atTop = window.scrollY <= 25;
        scrolledRef.current = !atTop;
        setScrolled(!atTop);
      };

      window.addEventListener("scrollend", unlockClickScrolling, { once: true });
      // Fallback timer: 900ms ensures full smooth scroll completion even if scrollend not supported
      clickUnlockTimerRef.current = setTimeout(unlockClickScrolling, 900);
    } else {
      if (item.id === "projects") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        activeSectionRef.current = item.id;
        setLocalActiveSection(item.id);
      }
    }
  };

  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      handleNavClick(e, { id: "hero" });
    } else {
      activeSectionRef.current = "hero";
      setLocalActiveSection("hero");
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center pt-2.5 sm:pt-3.5 px-4 sm:px-8 md:px-10 lg:px-12 transition-all"
    >
      <nav
        ref={navRef}
        aria-label="Main Navigation"
        className="w-full flex items-center justify-between relative pointer-events-auto h-[56px]"
      >
        {/* CENTERED DOCK CAPSULE BACKGROUND: Fades in/out smoothly with cubic curve */}
        <motion.div
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0.96,
            boxShadow: scrolled
              ? "0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.08)"
              : "0 0 0 rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.55, ease: CUBIC_EASE }}
          style={{ width: `${dockWidth}px` }}
          className="absolute left-1/2 -translate-x-1/2 h-[56px] rounded-full bg-white/95 backdrop-blur-2xl border border-neutral-200 shadow-xl pointer-events-none z-0 hidden lg:block"
        />

        {/* DOCK LEADING MINI LOGO: Fades in smoothly at start of dock when scrolled (exactly 16px from left edge) */}
        <motion.div
          ref={miniLogoRef}
          initial={false}
          animate={{
            opacity: scrolled ? 1 : 0,
            scale: scrolled ? 1 : 0.85,
            pointerEvents: scrolled ? "auto" : "none",
          }}
          transition={{ duration: 0.45, ease: CUBIC_EASE }}
          style={{ left: `calc(50% - ${dockWidth / 2}px + 16px)` }}
          className="absolute z-20 hidden lg:flex items-center"
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="relative w-7 h-7 rounded-lg flex items-center justify-center shrink-0">
              <Image
                src="/Only Logo.png"
                alt="BizzMate Logo"
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-extrabold text-lg text-neutral-900 group-hover:text-brand-violet transition-colors font-sans">
              BizzMate
            </span>
          </Link>
        </motion.div>

        {/* LEFT COLUMN: Nav Links (Full transform from 0 to center dock with cubic easing in both directions) */}
        <motion.div
          ref={linksRef}
          initial={false}
          animate={{
            x: scrolled ? offsets.navX : 0,
          }}
          transition={{
            duration: 0.6,
            ease: CUBIC_EASE,
          }}
          className="flex items-center justify-start shrink-0 z-10 will-change-transform"
        >
          {/* Nav Items Pill: EXACT same height and buttons padding in both states */}
          <div
            ref={pillContainerRef}
            className="flex items-center gap-1 relative rounded-full p-1 sm:p-1.5 border border-neutral-200/90 bg-[#f5f5f5]/95 shadow-xs"
          >
            {/* Single continuous hardware-accelerated gliding indicator */}
            <motion.div
              className="absolute left-0 top-0 rounded-full bg-brand-violet shadow-sm pointer-events-none z-0"
              initial={false}
              animate={{
                x: indicatorStyle.x,
                width: indicatorStyle.width,
                opacity: indicatorStyle.ready ? 1 : 0,
              }}
              transition={{
                duration: 0.24,
                ease: CUBIC_EASE,
              }}
              style={{
                top: indicatorStyle.top,
                height: indicatorStyle.height,
              }}
            />

            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <div
                  key={item.id}
                  className="relative z-10"
                  onMouseEnter={item.hasDropdown ? handleMouseEnterProjects : undefined}
                  onMouseLeave={item.hasDropdown ? handleMouseLeaveProjects : undefined}
                >
                  <Link
                    href={item.href}
                    id={`nav-item-${item.id}`}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative z-10 rounded-full font-semibold flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm select-none transition-colors duration-100 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          projectsDropdownOpen ? "rotate-180" : "opacity-70"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Projects Hover Dropdown: 3 Featured Projects + View All Projects */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {projectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.16, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 w-80 p-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200 shadow-2xl z-50 text-left overflow-hidden"
                        >
                          <div className="px-3 py-1.5 mb-1 flex items-center justify-between border-b border-neutral-100">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                              Featured Deployments
                            </span>
                            <span className="text-[10px] font-mono text-brand-violet font-semibold">
                              Live Studies
                            </span>
                          </div>

                          {/* 3 Featured Projects */}
                          <div className="space-y-1">
                            {featuredProjects.map((proj) => {
                              const Icon = proj.icon;
                              return (
                                <Link
                                  key={proj.slug}
                                  href={`/projects/${proj.slug}`}
                                  onClick={() => {
                                    setLocalActiveSection("projects");
                                    setProjectsDropdownOpen(false);
                                  }}
                                  className="flex items-center justify-between p-2 rounded-xl text-neutral-800 hover:text-brand-violet hover:bg-brand-lavender/60 transition-all group"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-7 h-7 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-brand-violet/10 transition-colors">
                                      <Icon className="w-3.5 h-3.5 text-brand-violet" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-bold text-neutral-900 group-hover:text-brand-violet transition-colors truncate">
                                        {proj.title}
                                      </p>
                                      <p className="text-[11px] text-neutral-500 truncate">
                                        {proj.subtitle}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono text-neutral-400 shrink-0 ml-2">
                                    {proj.tag}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>

                          {/* 4th Item: View All Projects Directory */}
                          <div className="mt-2 pt-1.5 border-t border-neutral-100">
                            <Link
                              href="/projects"
                              onClick={() => {
                                setActiveSection("projects");
                                setProjectsDropdownOpen(false);
                              }}
                              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-900 bg-neutral-50 hover:bg-brand-violet hover:text-white transition-all group shadow-xs"
                            >
                              <div className="flex items-center gap-2">
                                <FolderGit2 className="w-4 h-4 text-brand-violet group-hover:text-white transition-colors" />
                                <span>View All Projects</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CENTER: Top BizzMate Brand Logo (Absolute dead center, smoothly fades out on scroll, NO flying animation) */}
        <motion.div
          initial={false}
          animate={{
            opacity: scrolled ? 0 : 1,
            scale: scrolled ? 0.9 : 1,
            pointerEvents: scrolled ? "none" : "auto",
          }}
          transition={{ duration: 0.45, ease: CUBIC_EASE }}
          className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center shrink-0 z-10"
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center">
              <Image
                src="/Only Logo.png"
                alt="BizzMate Logo"
                fill
                sizes="(max-width: 640px) 32px, 36px"
                className="object-contain"
                priority
              />
            </div>
            <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-neutral-900 group-hover:text-brand-violet transition-colors font-sans">
              BizzMate
            </span>
          </Link>
        </motion.div>

        {/* RIGHT COLUMN: Book Demo CTA (Full transform from 0 to center dock with cubic easing in both directions) */}
        <motion.div
          ref={ctaRef}
          initial={false}
          animate={{
            x: scrolled ? offsets.ctaX : 0,
          }}
          transition={{
            duration: 0.6,
            ease: CUBIC_EASE,
          }}
          className="flex items-center justify-end shrink-0 z-10 will-change-transform"
        >
          <Link
            href="#cta"
            className="inline-flex items-center gap-1.5 px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-brand-violet/20 hover:shadow-lg hover:shadow-brand-violet/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Book Demo</span>
          </Link>
        </motion.div>
      </nav>
    </header>
  );
}

export default Navbar;
