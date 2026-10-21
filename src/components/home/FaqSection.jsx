import React from "react";
import { faqs } from "@/data/faqs";
import { FaqAccordion } from "./FaqAccordion";

export function FaqSection() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="py-20 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT COLUMN: Sticky Title & Description (Static Server Content) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <h2
              id="faqs-heading"
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-neutral-900 tracking-tight font-sans leading-[1.08] mt-0 lg:mt-[1.85rem]"
            >
              Frequently asked <br />
              <span className="text-brand-violet">questions</span>
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mt-6 max-w-sm sm:max-w-md font-sans">
              Straightforward answers regarding our engineering sprints, architecture standards, code ownership, and direct technical founder collaboration. Zero corporate bureaucracy or middle-layer bottlenecks.
            </p>
          </div>

          {/* RIGHT COLUMN: Interactive Accordion Cards (Client Leaf) */}
          <div className="lg:col-span-7">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
