"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Reveal from "./Reveal";

const steps = [
  {
    step: "01",
    title: "Tell Us About Your Business",
    desc: "Fill out our quick form or send us an email. We'll get back within one business day with questions and a clear outline of what's possible.",
  },
  {
    step: "02",
    title: "We Design & Build",
    desc: "Once you approve the quote, we get to work. You'll see progress at every stage and have real say throughout. Nothing gets built without your sign-off.",
  },
  {
    step: "03",
    title: "You Launch with Confidence",
    desc: "We handle the technical handoff: domain, hosting, analytics setup. You get a site that's fast, mobile-ready, and fully yours.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section, slide panels horizontally
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
        tl.to(track, { xPercent: (-100 * (steps.length - 1)) / steps.length, ease: "none" }, 0)
          .fromTo(
            ".process-line-h",
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left center", ease: "none" },
            0
          );
      });

      // Mobile: vertical progress line draws as you scroll
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".process-line-v",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ".process-steps-v",
              start: "top 75%",
              end: "bottom 70%",
              scrub: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  const verticalLayout = (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <Reveal className="mb-14">
        <p className="eyebrow mb-5">How It Works</p>
        <h2 className="display-lg text-bone">
          Simple from start to <span className="accent-word">launch.</span>
        </h2>
      </Reveal>

      <div className="process-steps-v relative pl-8">
        <span className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10" />
        <span className="process-line-v absolute left-[3px] top-2 bottom-2 w-px bg-gold" />
        <div className="flex flex-col gap-14">
          {steps.map((s) => (
            <Reveal key={s.step}>
              <div className="relative">
                <span className="absolute -left-[33px] top-1.5 w-[7px] h-[7px] rounded-full bg-gold" />
                <span className="text-gold/60 text-sm tabular-nums tracking-widest">{s.step}</span>
                <h3 className="display-md text-bone mt-2 mb-3">{s.title}</h3>
                <p className="text-bone/40 text-base leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );

  if (reduced) {
    return (
      <section ref={ref} className="relative bg-abyss overflow-hidden">
        {verticalLayout}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-abyss overflow-hidden">
      {/* Mobile: vertical */}
      <div className="md:hidden">{verticalLayout}</div>

      {/* Desktop: pinned horizontal panels */}
      <div className="hidden md:flex h-screen flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full mb-16">
          <p className="eyebrow mb-5">How It Works</p>
          <h2 className="display-lg text-bone">
            Simple from start to <span className="accent-word">launch.</span>
          </h2>
        </div>

        <div className="relative">
          <span className="process-line-h absolute top-[4.5rem] left-0 w-full h-px bg-gold/40" />
          <div ref={trackRef} className="flex">
            {steps.map((s) => (
              <div key={s.step} className="w-screen shrink-0 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto relative">
                  <span
                    className="font-display text-[11rem] leading-none text-white/[0.045] select-none pointer-events-none block"
                    aria-hidden
                  >
                    {s.step}
                  </span>
                  <div className="relative -mt-16 max-w-xl">
                    <span className="inline-block w-[9px] h-[9px] rounded-full bg-gold mb-8" />
                    <h3 className="display-md text-bone mb-5">{s.title}</h3>
                    <p className="text-bone/40 text-lg leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
