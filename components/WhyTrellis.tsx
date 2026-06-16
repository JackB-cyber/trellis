"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";

const trustPoints = [
  {
    index: "01",
    title: "Done for You",
    description:
      "We handle strategy, design, development, and launch. You focus on running your business.",
  },
  {
    index: "02",
    title: "Fixed Pricing",
    description:
      "Every package is priced upfront. No hourly billing, no scope creep. The price we quote is the price you pay.",
  },
  {
    index: "03",
    title: "Canadian Owned",
    description:
      "Alberta-based and proud of it. We understand the Canadian market and the businesses that power local communities.",
  },
  {
    index: "04",
    title: "Built to Last",
    description:
      "Clean code, fast load times, modern platforms. Your site won't need a full rebuild in two years.",
  },
];

/** The light interlude — parchment break in the dark page rhythm. */
export default function WhyTrellis() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".why-rule").forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: rule, start: "top 90%", once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="grain relative bg-parchment py-28 md:py-40 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
        {/* Sticky claim */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-6">Why Work With Us</p>
            </Reveal>
            <SplitReveal as="h2" className="display-lg text-forest max-w-md mb-8">
              We make the process <span className="accent-word">easy.</span>
            </SplitReveal>
            <Reveal delay={0.1}>
              <p className="text-muted text-lg leading-relaxed max-w-md">
                A lot of agencies are hard to work with. We built Trellis Digital
                to be straightforward: clear communication, honest pricing, and
                people who actually pick up the phone.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Differentiator rows */}
        <div>
          {trustPoints.map((point, i) => (
            <div key={point.title} className="relative py-10 md:py-12">
              <span className="why-rule absolute top-0 left-0 right-0 h-px bg-charcoal/15" />
              <Reveal delay={i * 0.04}>
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-2xl text-gold/70 tabular-nums shrink-0">
                    {point.index}
                  </span>
                  <div>
                    <h3 className="display-md text-charcoal mb-3">{point.title}</h3>
                    <p className="text-muted text-base leading-relaxed max-w-md">
                      {point.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
          <span className="why-rule block h-px bg-charcoal/15" />
        </div>
      </div>
    </section>
  );
}
