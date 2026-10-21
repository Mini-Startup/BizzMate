"use client";

import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="space-y-4">
      {items.map((faq, idx) => {
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

              {/* Circular Chevron Button */}
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
  );
}

export default FaqAccordion;
