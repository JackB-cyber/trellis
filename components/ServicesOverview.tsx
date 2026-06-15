"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";

const services = [
  {
    index: "01",
    title: "Website Design",
    description:
      "A professionally designed, fast-loading website built specifically for your business. Not copied from a template.",
  },
  {
    index: "02",
    title: "SEO Setup",
    description:
      "On-page SEO, Google Business Profile setup, and local search optimisation included with every site we build.",
  },
  {
    index: "03",
    title: "Monthly Retainer",
    description:
      "Ongoing updates, hosting support, and monthly performance reporting so your site stays sharp and current.",
  },
];

export default function ServicesOverview() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Hairline above each row draws in as it enters
      gsap.utils.toArray<HTMLElement>(".service-rule").forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: rule, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-abyss py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24">
        {/* Sticky heading column */}
        <div>
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow mb-6">What We Do</p>
            </Reveal>
            <SplitReveal as="h2" className="display-lg text-bone max-w-md">
              Everything your business needs <span className="accent-word">online.</span>
            </SplitReveal>
          </div>
        </div>

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <div key={service.title} className="relative py-12 md:py-16">
              <span className="service-rule absolute top-0 left-0 right-0 h-px bg-white/10" />
              {/* Ghost numeral */}
              <span
                className="absolute -top-2 right-0 font-display text-[7rem] md:text-[9rem] leading-none text-white/[0.04] select-none pointer-events-none"
                aria-hidden
              >
                {service.index}
              </span>
              <Reveal delay={i * 0.05}>
                <span className="text-gold/60 text-sm tabular-nums tracking-widest">
                  {service.index}
                </span>
                <h3 className="display-md text-bone mt-3 mb-4">{service.title}</h3>
                <p className="text-bone/40 text-base leading-relaxed max-w-md mb-6">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="draw-link inline-flex items-center gap-2 text-gold text-sm font-medium"
                >
                  See Pricing
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          ))}
          <span className="service-rule block h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
