"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, User, Building, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

const SERVICES_OPTIONS = [
  { id: "ai-automations", label: "AI Workflows" },
  { id: "ai-chatbots", label: "Domain AI Chatbot" },
  { id: "whatsapp", label: "WhatsApp API Automation" },
  { id: "website", label: "Bespoke Website" },
  { id: "web-apps", label: "Enterprise Web App" },
  { id: "landing-page", label: "High-Converting Page" },
];

const TIMELINE_OPTIONS = [
  "Immediate (Next 7-14 Days)",
  "This Month",
  "Planning Next Quarter",
];

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("ai-automations");
  const [selectedTimeline, setSelectedTimeline] = useState("Immediate (Next 7-14 Days)");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6 relative bg-slate-50 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-[32px] bg-white border border-slate-200/80 shadow-2xl shadow-slate-900/5 relative overflow-hidden">
          {/* Subtle Ambient Background Light */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ede9fe] to-[#e0f2fe] opacity-50 blur-[90px] pointer-events-none rounded-full" />

          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Book Your 1-on-1 <br />
              <span className="text-brand-gradient">Architecture Demo.</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No sales reps or qualification calls. You&apos;ll spend 20 minutes directly with our technical founders reviewing your bottlenecks, timeline, and exact technical implementation.
            </p>
          </div>

          {submitted ? (
            <div className="p-10 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Demo Request Confirmed!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-semibold text-slate-900">{formData.name || "friend"}</span>. Our founders will review your project brief and email your direct calendar invite to <span className="font-semibold text-slate-900">{formData.email}</span> within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* 1. Interactive Service Selection Chips */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  1. Select Primary Objective
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES_OPTIONS.map((svc) => {
                    const isSelected = selectedService === svc.id;
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => setSelectedService(svc.id)}
                        className={`px-4 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer select-none ${
                          isSelected
                            ? "bg-brand-gradient text-white shadow-md shadow-[#a84bff]/25 scale-[1.02]"
                            : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60"
                        }`}
                      >
                        {svc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Timeline Selector */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  2. Target Delivery Timeline
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {TIMELINE_OPTIONS.map((t) => {
                    const isSelected = selectedTimeline === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${
                          isSelected
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Sleek Floating Inputs */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  3. Contact Information
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="cta-input-name"
                      name="name"
                      autoComplete="name"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#a84bff] focus:ring-2 focus:ring-[#a84bff]/15 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      id="cta-input-email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#a84bff] focus:ring-2 focus:ring-[#a84bff]/15 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="cta-input-company"
                      name="company"
                      autoComplete="organization"
                      placeholder="Company Name (Optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#a84bff] focus:ring-2 focus:ring-[#a84bff]/15 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 font-medium text-center sm:text-left">
                  Direct founder response within 2 hours • Zero sales qualification calls
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 rounded-full text-white font-bold text-sm bg-brand-gradient shadow-xl shadow-[#a84bff]/25 hover:shadow-[#a84bff]/45 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Reserve Architecture Slot</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </MagneticButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
