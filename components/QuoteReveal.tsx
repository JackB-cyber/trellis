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

      // Word-level split + scrub is the heaviest reveal on the page (30+ nodes
      // recalculated every scroll frame) — mobile gets one cheap fade instead.
      const mobile = window.matchMedia("(max-width: 767px)").matches;
      if (mobile) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
        return;
      }

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
