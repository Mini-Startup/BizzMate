import React from "react";
import { RadarSpecialistsCard } from "./why-us/RadarSpecialistsCard";
import { ConvenientAppCard } from "./why-us/ConvenientAppCard";
import { OwnershipAndProcessCard } from "./why-us/OwnershipAndProcessCard";
import { UptimeSlaCard } from "./why-us/UptimeSlaCard";
import { ConsultationCard } from "./why-us/ConsultationCard";
import { FeatureShowcaseCard } from "./why-us/FeatureShowcaseCard";

export function WhyChooseUsSection() {
  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 relative bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="space-y-6 lg:space-y-6">
          {/* TOP BENTO ROW (12 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            <RadarSpecialistsCard />
            <ConvenientAppCard />
            <OwnershipAndProcessCard />
          </div>

          {/* BOTTOM BENTO ROW (12 COLUMNS) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
            <UptimeSlaCard />
            <ConsultationCard />
            <FeatureShowcaseCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
