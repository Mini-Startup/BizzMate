"use client";

import React from "react";
import Timeline from "@/components/ui/timeline";

export function ProjectTimelineSection({
  title = "Development Journey",
  periodLabel = "Sprint Delivery Roadmap",
  timeline = [],
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
}) {
  if (!timeline || timeline.length === 0) return null;

  const topItems = timeline.filter((_, idx) => idx % 2 === 0);
  const bottomItems = timeline.filter((_, idx) => idx % 2 !== 0);

  return (
    <div className="w-full my-6 rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs">
      <Timeline
        title={title}
        periodLabel={periodLabel}
        topItems={topItems}
        bottomItems={bottomItems}
        textColor="#0f172a"
        mutedTextColor="#64748b"
        activeColor="#a84bff"
        backgroundColor="#ffffff"
        imageUrl={imageUrl}
        imageAlt={title}
      />
    </div>
  );
}

export default ProjectTimelineSection;
