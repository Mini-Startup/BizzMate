"use client";

import React, { useState, useTransition } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactInquiryAction } from "@/actions/contact";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await submitContactInquiryAction(null, formData);
      setResult(res);
    });
  };

  const handleReset = () => {
    setResult(null);
    setFormData({
      name: "",
      email: "",
      industry: "",
      message: "",
    });
  };

  const isSuccess = result?.ok;
  const fieldErrors = result?.fieldErrors || {};

  return (
    <div className="p-7 sm:p-10 lg:p-12 rounded-[32px] sm:rounded-[40px] bg-white border border-neutral-200/90 shadow-2xl shadow-neutral-900/5 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSuccess ? (
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
            {result?.error && !result?.fieldErrors && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{result.error}</span>
              </div>
            )}

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
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans ${
                  fieldErrors.name
                    ? "border-red-400 bg-red-50/20"
                    : "border-neutral-200/80"
                }`}
              />
              {fieldErrors.name && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {fieldErrors.name[0]}
                </p>
              )}
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
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans ${
                  fieldErrors.email
                    ? "border-red-400 bg-red-50/20"
                    : "border-neutral-200/80"
                }`}
              />
              {fieldErrors.email && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {fieldErrors.email[0]}
                </p>
              )}
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
                    setFormData((prev) => ({
                      ...prev,
                      industry: e.target.value,
                    }))
                  }
                  className="w-full px-5 py-3.5 pr-12 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-700 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans appearance-none cursor-pointer"
                >
                  <option value="">Select...</option>
                  <option value="saas-tech">SaaS &amp; Technology</option>
                  <option value="ecommerce">E-Commerce &amp; Retail</option>
                  <option value="healthcare">Healthcare &amp; MedTech</option>
                  <option value="finance">Finance &amp; FinTech</option>
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
                placeholder="Describe your project, timeline, or requirements"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                className="w-full px-5 py-3.5 rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-neutral-200/80 text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-white transition-all font-sans resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-3.5 pl-2 pr-7 py-2 rounded-full bg-[#0070f3] hover:bg-[#0060df] disabled:opacity-70 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-full bg-white text-[#0070f3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                  {isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[#0070f3]" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-[#0070f3] group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
                <span className="font-sans">
                  {isPending ? "Submitting..." : "Get a Solution"}
                </span>
              </button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ContactForm;
