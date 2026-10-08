"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faqs";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faqs" className="py-24 px-6 relative bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Straight Answers. <br />
            <span className="text-brand-gradient">Zero Ambiguity.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our sprints, engineering standards, and direct founder collaboration.
          </p>
        </div>

        {/* Modern Sleek FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const numberFormatted = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-300 border ${
                  isOpen
                    ? "bg-slate-50/80 border-purple-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full py-5 px-6 sm:px-8 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                    <span
                      className={`text-xs font-mono font-bold transition-colors pt-0.5 sm:pt-0 ${
                        isOpen
                          ? "text-[#a84bff]"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {numberFormatted}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen
                          ? "text-slate-900"
                          : "text-slate-700 group-hover:text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#a84bff] text-white rotate-45 shadow-sm shadow-[#a84bff]/30"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-1 sm:pl-20 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
