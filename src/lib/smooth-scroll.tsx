"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

let instance: Lenis | null = null;

/** Scroll to a document offset, through Lenis when it is running. */
export function scrollToY(y: number) {
  if (instance) instance.scrollTo(y, { duration: 1.6 });
  else window.scrollTo({ top: y, behavior: "auto" });
}

export function SmoothScroll() {
  useEffect(() => {
    // Respect reduced motion: native scroll only.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    instance = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, []);
  return null;
}
