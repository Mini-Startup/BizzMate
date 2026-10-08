"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Mail, User, Building, Send } from "lucide-react";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: "ai-automations",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="cta" className="py-24 px-6 relative bg-[#020617] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-gradient opacity-15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="p-8 sm:p-12 md:p-16 rounded-[32px] bg-gradient-to-b from-[#0b1329]/90 to-slate-950/90 border border-[#a84bff]/30 backdrop-blur-2xl shadow-2xl shadow-[#a84bff]/10 relative overflow-hidden">
          {/* Subtle top badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#57c0e5]" />
              <span>Direct Discovery Call With Founders</span>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Book Your 1-on-1 <br />
              <span className="text-brand-gradient">Architecture Demo Today.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              No salespeople. You&apos;ll spend 20 minutes directly with our technical founders discussing your bottlenecks, product architecture, and automation roadmap.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-[#57c0e5]/10 border border-[#57c0e5]/30 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#57c0e5]/20 flex items-center justify-center text-[#57c0e5] mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Demo Request Received!
              </h3>
              <p className="text-sm text-slate-300">
                Thank you! We will review your details and send an instant calendar invitation to <span className="font-semibold text-white">{formData.email}</span> within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#a84bff] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#a84bff] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Nexus Tech"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#a84bff] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">
                    Primary Interest
                  </label>
                  <select
                    value={formData.serviceInterest}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceInterest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#0b1329] border border-white/10 text-white text-sm focus:outline-none focus:border-[#a84bff] transition-colors"
                  >
                    <option value="ai-automations">AI Workflow Automations</option>
                    <option value="ai-chatbots">Domain AI Chatbots</option>
                    <option value="whatsapp-automations">WhatsApp Cloud API Automations</option>
                    <option value="websites">High-Speed Bespoke Website</option>
                    <option value="web-applications">Enterprise Web Application</option>
                    <option value="landing-pages">High-Converting Landing Page</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-brand-gradient text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#a84bff]/30 hover:shadow-[#a84bff]/60 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Confirm & Reserve My 20-Min Demo</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#57c0e5]" />
                  Direct Founder Call
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#57c0e5]" />
                  Zero Hard Sales Pitch
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#57c0e5]" />
                  Tailored Technical Roadmap
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
