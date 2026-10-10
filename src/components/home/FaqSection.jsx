"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faqs";
import { ChevronUp, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="py-20 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Sticky Title & Description (No Pill Badge)        */}
          {/* ============================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            {/* Main Section Heading - aligned with top text of first question card */}
            <h2
              id="faqs-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-neutral-900 tracking-tight font-sans leading-[1.08] mt-0 lg:mt-[1.85rem]"
            >
              Frequently asked <br />
              <span className="text-brand-violet">questions</span>
            </h2>

            {/* Supporting description */}
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mt-6 max-w-sm sm:max-w-md font-sans">
              Straightforward answers regarding our engineering sprints, architecture standards, code ownership, and direct technical founder collaboration. Zero corporate bureaucracy or middle-layer bottlenecks.
            </p>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Interactive Accordion Cards                      */}
          {/* ============================================================== */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
                    isOpen
                      ? "bg-[#f8fafc] border-neutral-300/80 shadow-xs"
                      : "bg-[#f8fafc]/70 border-neutral-200/80 hover:border-neutral-300 hover:bg-[#f8fafc]"
                  }`}
                >
                  {/* Card Trigger Button */}
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    className="w-full py-5 sm:py-6 px-6 sm:px-8 text-left flex items-center justify-between gap-4 cursor-pointer select-none group"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold font-sans transition-colors ${
                        isOpen
                          ? "text-neutral-900"
                          : "text-neutral-800 group-hover:text-neutral-950"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Circular Chevron Button (Violet with white arrow when open, lavender when closed) */}
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                        isOpen
                          ? "bg-brand-violet text-white shadow-xs"
                          : "bg-brand-lavender text-brand-violet group-hover:bg-brand-violet group-hover:text-white"
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content with Smooth Height Transition */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-7 pt-0 text-neutral-600 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
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
      </div>
    </section>
  );
}

export default FaqSection;
