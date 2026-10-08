"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "The Problem", href: "/#problem" },
    { label: "Why Us", href: "/#why-us" },
    { label: "Projects", href: "/#projects" },
    { label: "Founders", href: "/#founders" },
    { label: "FAQs", href: "/#faqs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-6 pointer-events-none"
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-full px-5 py-2.5 flex items-center justify-between border bg-white/90 backdrop-blur-xl border-slate-200 shadow-lg shadow-slate-900/5"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/Only Logo.png"
              alt="BizzMate Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-[#a84bff] transition-colors">
            BizzMate
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-600 hover:text-[#a84bff] hover:bg-slate-100/70 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-[#266ac1] hover:text-[#a84bff] hover:bg-slate-100/70 transition-colors"
          >
            All Work
          </Link>
        </div>

        {/* Right CTA Button with Magnetic effect */}
        <div className="hidden sm:flex items-center gap-3">
          <MagneticButton
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-semibold text-white bg-brand-gradient shadow-md shadow-[#a84bff]/25 hover:shadow-[#a84bff]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#266ac1] hover:bg-slate-50 transition-colors"
          >
            View All Projects
          </Link>
          <div className="pt-2 border-t border-slate-100">
            <Link
              href="#cta"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold text-white bg-brand-gradient shadow-lg shadow-[#a84bff]/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Your Demo Today</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
