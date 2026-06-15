"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Scroll-triggered fade/rise wrapper. GSAP replacement for the old AnimatedSection. */
export default function Reveal({ children, className, delay = 0, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: reduced ? 0 : y },
        {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? 0.4 : 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
