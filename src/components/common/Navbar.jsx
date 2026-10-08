"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full px-5 py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-[#0b1329]/80 backdrop-blur-xl border-white/15 shadow-2xl shadow-black/60"
            : "bg-[#0b1329]/50 backdrop-blur-md border-white/10"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center p-0.5 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/Only Logo.png"
              alt="BizzMate Logo"
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-extrabold text-base md:text-lg tracking-tight text-white group-hover:text-brand-gradient transition-colors">
            BizzMate
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            className="px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-semibold text-[#57c0e5] hover:text-white hover:bg-[#57c0e5]/10 transition-colors"
          >
            All Work
          </Link>
        </div>

        {/* Right CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="#cta"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-bold text-white bg-brand-gradient shadow-md shadow-[#a84bff]/25 hover:shadow-[#a84bff]/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 rounded-2xl bg-[#0b1329]/95 backdrop-blur-2xl border border-white/15 p-5 shadow-2xl flex flex-col gap-3 md:hidden z-50">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-[#57c0e5] hover:bg-[#57c0e5]/10 transition-colors"
          >
            View All Projects
          </Link>
          <div className="pt-2 border-t border-white/10">
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
