"use client";

import React, { useState, useEffect } from "react";
import LoadingOption1 from "./loading/LoadingOption1";
import LoadingOption2 from "./loading/LoadingOption2";

// ============================================================================
// BIZZMATE GLOBAL LOADING SCREEN SELECTOR
//
// Change ACTIVE_LOADING_OPTION:
//   1 = Option 1: 3D Dotted Orb (Pure White waves over static Lavender-Grey dots)
//                 -> Wave sweeps all dots into Emerald Green
//                 -> Solid Emerald Circle pops with White Checkmark Badge
//                 -> Entire Screen shrinks & morphs into the Navbar "Home" active pill!
//
//   2 = Option 2: 3D Dotted Orb
//                 -> Camera accelerates & rushes directly inside the Orb
//                 -> Volumetric particles expand and fly outward off-screen, revealing page!
// ============================================================================
const ACTIVE_LOADING_OPTION = 2;

export function LoadingOrbScreen({ onComplete }) {
  const [selectedOption, setSelectedOption] = useState(ACTIVE_LOADING_OPTION);

  // Allow previewing via query param (?loading=1 or ?loading=2)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("loading");
      if (param === "2") setSelectedOption(2);
      else if (param === "1") setSelectedOption(1);
    }
  }, []);

  if (selectedOption === 2) {
    return <LoadingOption2 onComplete={onComplete} />;
  }

  return <LoadingOption1 onComplete={onComplete} />;
}

export default LoadingOrbScreen;
