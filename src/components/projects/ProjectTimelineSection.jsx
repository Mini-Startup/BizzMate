"use client";

import React from "react";
import Timeline from "@/components/ui/timeline";

export function ProjectTimelineSection({
  title = "Product Storyline",
  periodLabel = "Sprint Delivery Roadmap",
  timeline = [],
  imageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
}) {
  const topItems = timeline && timeline.length >= 4
    ? timeline.filter((_, idx) => idx % 2 === 0)
    : undefined;

  const bottomItems = timeline && timeline.length >= 3
    ? timeline.filter((_, idx) => idx % 2 !== 0)
    : undefined;

  return (
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
  );
}

export default ProjectTimelineSection;
