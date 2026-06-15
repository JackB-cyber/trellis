"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/** Word-by-word scrub reveal for oversized quotes — words brighten as they cross the scroll band. */
export default function QuoteReveal({ children, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;

      const split = SplitText.create(el, {
        type: "words",
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.13 },
            {
              opacity: 1,
              stagger: 0.03,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                end: "top 32%",
                scrub: true,
              },
            }
          );
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
