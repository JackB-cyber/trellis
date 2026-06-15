"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Remounts on every navigation — gives each page a clean enter animation.
// Opacity only: a transform here would break ScrollTrigger's position:fixed pinning.
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      window.scrollTo(0, 0);
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.55, ease: "power2.out", clearProps: "all" }
      );
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}
