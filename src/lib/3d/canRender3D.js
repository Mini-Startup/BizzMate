/**
 * Capability gate for 3D WebGL rendering.
 * Validates desktop viewport, fine pointer precision, adequate hardware concurrency & memory,
 * reduced motion preferences, and WebGL support before loading any 3D WebGL context.
 *
 * @returns {boolean} Whether the device meets 3D rendering performance standards.
 */
export function canRender3D() {
  if (typeof window === "undefined") return false;

  // 1. Desktop only (min-width 1024px, fine pointer, hover capable)
  const isDesktop = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
  if (!isDesktop) return false;

  // 2. Respect accessibility & user preferences
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return false;

  // 3. Network Save-Data mode
  const nav = navigator;
  if (nav.connection?.saveData) return false;

  // 4. Hardware capability gates (minimum 4 CPU threads and 4GB device memory if supported)
  const concurrency = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  if (concurrency < 4 || memory < 4) return false;

  // 5. Hardware WebGL2 availability check
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return !!gl;
  } catch {
    return false;
  }
}
