"use client";

import { createElement, useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Props {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  delay?: number;
  /** "load" plays on mount (hero headlines), "scroll" waits for the viewport. */
  trigger?: "load" | "scroll";
  stagger?: number;
}

/** Oversized heading reveal: masked lines slide up. Falls back to a fade under reduced motion. */
export default function SplitReveal({
  children,
  as = "h2",
  className,
  delay = 0,
  trigger = "scroll",
  stagger = 0.09,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const scrollTrigger =
        trigger === "scroll"
          ? { trigger: el, start: "top 85%", once: true as const }
          : undefined;

      if (reduced) {
        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5, delay, scrollTrigger }
        );
        return;
      }

      // autoSplit re-splits when webfonts finish loading, so line breaks stay correct.
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          // The mask wrappers clip at the (tight) line box, which cuts off
          // descenders like the italic "g" in "building." Give each wrapper
          // extra room below and pull it back with a matching negative margin,
          // so descenders show while the leading and layout stay identical.
          const masks = self.lines.map((line) => line.parentNode as HTMLElement);
          gsap.set(masks, {
            boxSizing: "content-box",
            paddingBottom: "0.2em",
            marginBottom: "-0.2em",
          });

          return gsap.from(self.lines, {
            // Start lower than the (now taller) mask so no glyph peeks early.
            yPercent: 130,
            duration: 1.05,
            stagger,
            ease: "power4.out",
            delay,
            scrollTrigger,
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] }
  );

  return createElement(as, { ref, className }, children);
}
