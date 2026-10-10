"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Phone, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      industry: "",
      message: "",
    });
  };

  return (
    <section
      id="cta"
      aria-labelledby="contact-heading"
      className="py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Eyebrow, Heading, Subtitle & Contact Info          */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-400 font-sans uppercase mb-3 sm:mb-4">
              WE&apos;RE HERE TO HELP YOU
            </p>

            {/* Display Headline */}
            <h2
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-neutral-900 tracking-tight font-sans leading-[1.08] mb-5 sm:mb-6"
            >
              Discuss Your <br />
              <span className="text-brand-violet">Software Solution</span> <br />
              Needs
            </h2>

            {/* Subtitle description */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-md font-sans mb-8 sm:mb-10">
              Are you looking for top-quality digital solutions tailored to your needs? Reach out to our technical founders directly.
            </p>

            {/* Contact Details List */}
            <div className="space-y-6">
              {/* Email item */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs text-neutral-400 font-medium font-sans">
                    E-mail
                  </span>
                  <a
                    href="mailto:hello@bizzmate.agency"
                    className="text-base sm:text-lg font-bold text-neutral-900 hover:text-brand-violet transition-colors font-sans"
                  >
                    hello@bizzmate.agency
                  </a>
                </div>
              </div>

              {/* Phone item */}
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs text-neutral-400 font-medium font-sans">
                    Phone number
                  </span>
                  <a
                    href="tel:+15553829401"
                    className="text-base sm:text-lg font-bold text-neutral-900 hover:text-brand-violet transition-colors font-sans"
                  >
                    +1 (555) 382-9401
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Contact Form Card                                */}
          {/* ============================================================== */}
          <div className="lg:col-span-6">
            <div className="p-7 sm:p-10 lg:p-12 rounded-[32px] sm:rounded-[40px] bg-white border border-neutral-200/90 shadow-2xl shadow-neutral-900/5 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-neutral-900 tracking-tight font-sans mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-sm mx-auto mb-6">
                      Thank you, <span className="font-bold text-neutral-900">{formData.name}</span>. Our technical founders have received your request and will follow up with you directly within 2 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form key="form" onSubmit={handleSubmit} className="space-y-5">
                    {/* Field 1: Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-2 font-sans"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Field 2: Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-2 font-sans"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="jane@framer.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans"
                      />
                    </div>

                    {/* Field 3: Industry */}
                    <div>
                      <label
                        htmlFor="contact-industry"
                        className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-2 font-sans"
                      >
                        Industry
                      </label>
                      <div className="relative">
                        <select
                          id="contact-industry"
                          name="industry"
                          value={formData.industry}
                          onChange={(e) =>
                            setFormData({ ...formData, industry: e.target.value })
                          }
                          className="w-full px-5 py-3.5 pr-12 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-700 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans appearance-none cursor-pointer"
                        >
                          <option value="">Select...</option>
                          <option value="saas-tech">SaaS & Technology</option>
                          <option value="ecommerce">E-Commerce & Retail</option>
                          <option value="healthcare">Healthcare & MedTech</option>
                          <option value="finance">Finance & FinTech</option>
                          <option value="consulting">Professional Services</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#2563eb] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Field 4: Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs sm:text-sm font-semibold text-neutral-800 mb-2 font-sans"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="Type your message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button: Pill with inner white arrow circle */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3.5 pl-2 pr-7 py-2 rounded-full bg-[#0070f3] hover:bg-[#0060df] text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white text-[#0070f3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                          <ArrowRight className="w-4 h-4 text-[#0070f3] group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <span className="font-sans">Get a Solution</span>
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;
