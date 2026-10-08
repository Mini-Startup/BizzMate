"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ChevronDown, FolderGit2, Compass } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);

  // Scroll listener for sticky compact notch mode
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy to smoothly update activeSection as user scrolls through sections
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["hero", "services", "why-us", "projects", "founders", "faqs"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
      if (window.scrollY < 180) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [pathname]);

  const navItems = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "services", label: "Services", href: "/#services" },
    { id: "why-us", label: "Why Us", href: "/#why-us" },
    {
      id: "projects",
      label: "Projects",
      href: "/#projects",
      hasDropdown: true,
    },
    { id: "founders", label: "Founders", href: "/#founders" },
    { id: "faqs", label: "FAQs", href: "/#faqs" },
  ];

  const handleMouseEnterProjects = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setProjectsDropdownOpen(true);
  };

  const handleMouseLeaveProjects = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300">
      {/* 1. COMPACT DYNAMIC ISLAND / NOTCH MODE (When scrolled) */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="fixed top-3 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <nav
              aria-label="Sticky Dynamic Island Navigation"
              className="flex items-center gap-3 sm:gap-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-2xl border border-neutral-200 shadow-xl shadow-neutral-900/10"
            >
              {/* Mini Brand Mark */}
              <Link
                href="/#hero"
                className="flex items-center gap-1.5 pl-1 pr-2 group transition-transform hover:scale-105"
              >
                <div className="relative w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
                  <Image
                    src="/Only Logo.png"
                    alt="BizzMate Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-extrabold text-xs tracking-tight text-neutral-900 group-hover:text-brand-violet transition-colors hidden sm:inline font-sans">
                  BizzMate
                </span>
              </Link>

              {/* Dynamic Sliding Pill Navigation Items */}
              <div className="flex items-center gap-1 relative bg-neutral-100/90 p-1 rounded-full">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;

                  return (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={item.hasDropdown ? handleMouseEnterProjects : undefined}
                      onMouseLeave={item.hasDropdown ? handleMouseLeaveProjects : undefined}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setActiveSection(item.id)}
                        className={`relative z-10 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 flex items-center gap-1 ${
                          isActive
                            ? "text-white"
                            : "text-neutral-700 hover:text-neutral-950"
                        }`}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown className="w-3 h-3 opacity-70" />
                        )}
                      </Link>

                      {/* Smooth Gliding Purple Circular / Pill Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill-sticky"
                          className="absolute inset-0 rounded-full bg-brand-violet shadow-sm"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}

                      {/* Projects Hover Dropdown Menu */}
                      {item.hasDropdown && projectsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200 p-2 shadow-2xl z-50 text-left"
                        >
                          <Link
                            href="/#projects"
                            onClick={() => {
                              setActiveSection("projects");
                              setProjectsDropdownOpen(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-brand-violet hover:bg-brand-lavender/60 transition-colors"
                          >
                            <Compass className="w-3.5 h-3.5 text-brand-blue" />
                            <span>Featured Showcase</span>
                          </Link>
                          <Link
                            href="/projects"
                            onClick={() => setProjectsDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-neutral-900 hover:text-brand-violet hover:bg-brand-lavender/60 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <FolderGit2 className="w-3.5 h-3.5 text-brand-violet" />
                              <span>View All Projects</span>
                            </div>
                            <ArrowRight className="w-3 h-3 text-brand-violet" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Compact CTA Button */}
              <Link
                href="#cta"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-brand-gradient shadow-xs hover:shadow-md transition-all"
              >
                <Sparkles className="w-3 h-3 text-white" />
                <span className="hidden sm:inline">Book Demo</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TOP HERO HEADER STATE (When at top of the page, scrolled <= 45) */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="w-full pointer-events-auto px-4 sm:px-8 lg:px-12 pt-2.5 sm:pt-3.5"
          >
            <nav
              aria-label="Top Hero Header Navigation"
              className="w-full flex items-center justify-between gap-4"
            >
              {/* Left: Circular Pill Nav with Smooth Gliding Indicator */}
              <div className="flex items-center">
                <div className="flex items-center gap-1 relative bg-neutral-100/90 p-1 rounded-full border border-neutral-200/90 shadow-xs">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;

                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={item.hasDropdown ? handleMouseEnterProjects : undefined}
                        onMouseLeave={item.hasDropdown ? handleMouseLeaveProjects : undefined}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setActiveSection(item.id)}
                          className={`relative z-10 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${
                            isActive
                              ? "text-white"
                              : "text-neutral-700 hover:text-neutral-950"
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.hasDropdown && (
                            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                          )}
                        </Link>

                        {/* Smooth Gliding Purple Circular / Pill Active Indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="active-pill-top"
                            className="absolute inset-0 rounded-full bg-brand-violet shadow-sm"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}

                        {/* Projects Dropdown Menu */}
                        {item.hasDropdown && projectsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl bg-white/95 backdrop-blur-2xl border border-neutral-200 p-2 shadow-2xl z-50 text-left"
                          >
                            <Link
                              href="/#projects"
                              onClick={() => {
                                setActiveSection("projects");
                                setProjectsDropdownOpen(false);
                              }}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-neutral-700 hover:text-brand-violet hover:bg-brand-lavender/60 transition-colors"
                            >
                              <Compass className="w-4 h-4 text-brand-blue" />
                              <span>Featured Showcase</span>
                            </Link>
                            <Link
                              href="/projects"
                              onClick={() => setProjectsDropdownOpen(false)}
                              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-neutral-900 hover:text-brand-violet hover:bg-brand-lavender/60 transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <FolderGit2 className="w-4 h-4 text-brand-violet" />
                                <span>View All Projects</span>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-brand-violet" />
                            </Link>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Center Brand Logo */}
              <div className="flex items-center gap-2">
                <Link
                  href="/#hero"
                  className="flex items-center gap-2 group transition-transform hover:scale-105"
                >
                  <div className="relative w-8 h-8 rounded-lg flex items-center justify-center">
                    <Image
                      src="/Only Logo.png"
                      alt="BizzMate Logo"
                      width={64}
                      height={64}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tighter text-neutral-900 group-hover:text-brand-violet transition-colors font-sans">
                    BizzMate
                  </span>
                </Link>
              </div>

              {/* Right: Book Demo CTA */}
              <div className="flex items-center">
                <Link
                  href="#cta"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-brand-violet/25 hover:shadow-lg hover:shadow-brand-violet/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Book a Demo</span>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
