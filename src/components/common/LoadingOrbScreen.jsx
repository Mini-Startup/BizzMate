"use client";

import React, { useState } from "react";
import LoadingOption1 from "./loading/LoadingOption1";
import LoadingOption2 from "./loading/LoadingOption2";

// ============================================================================
// BIZZMATE GLOBAL LOADING SCREEN SELECTOR
//
// Change ACTIVE_LOADING_OPTION:
//   1 = Option 1: 3D Dotted Orb (brand violet waves on light lavender dots)
//                 -> Wave sweeps dots into vibrant Brand Violet
//                 -> Solid Brand Violet circle pops with White Checkmark Badge
//                 -> Entire Screen shrinks from bottom-right into the Navbar "Home" pill!
//
//   2 = Option 2: 3D Dotted Orb
//                 -> Camera accelerates & rushes directly inside the Orb
//                 -> Volumetric particles expand and fly outward off-screen, revealing page!
// ============================================================================
const ACTIVE_LOADING_OPTION = 2;

export function LoadingOrbScreen({ onComplete }) {
  // Read initial option without calling setState inside an effect
  const [selectedOption] = useState(() => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("loading");
      if (param === "2") return 2;
      if (param === "1") return 1;
    }
    return ACTIVE_LOADING_OPTION;
  });

  if (selectedOption === 2) {
    return <LoadingOption2 onComplete={onComplete} />;
  }

  return <LoadingOption1 onComplete={onComplete} />;
}

export default LoadingOrbScreen;
