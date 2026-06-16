"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import Reveal from "./Reveal";

const marqueeItems = Array(20).fill("Get a free quote");

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Forest panel blooms open behind the headline — scrubbed clip-path on
      // desktop, but clip-path recalculation every scroll frame is expensive,
      // so mobile gets a cheap one-time opacity fade instead.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".cta-panel",
          { clipPath: "circle(0% at 50% 65%)" },
          {
            clipPath: "circle(120% at 50% 65%)",
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              end: "top 15%",
              scrub: true,
            },
          }
        );
      });
      mm.add("(max-width: 767px)", () => {
        gsap.set(".cta-panel", { clipPath: "circle(120% at 50% 65%)", opacity: 0 });
        gsap.to(".cta-panel", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
        });
      });

      // Magnetic CTA — fine pointers only
      const fine = window.matchMedia("(pointer: fine)").matches;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const wrap = magnetRef.current;
      if (!fine || reduced || !wrap) return () => mm.revert();

      const xTo = gsap.quickTo(wrap, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(wrap, "y", { duration: 0.4, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const rect = wrap.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        xTo(gsap.utils.clamp(-16, 16, dx * 0.25));
        yTo(gsap.utils.clamp(-12, 12, dy * 0.25));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };
      wrap.addEventListener("mousemove", onMove);
      wrap.addEventListener("mouseleave", onLeave);
      return () => {
        wrap.removeEventListener("mousemove", onMove);
        wrap.removeEventListener("mouseleave", onLeave);
        mm.revert();
      };
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-abyss overflow-hidden">
      {/* Gold marquee strip */}
      <div className="bg-gold py-3 overflow-hidden">
        <div className="marquee-track marquee-track-fast">
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-6 text-abyss text-sm font-semibold uppercase tracking-[0.18em] whitespace-nowrap pr-6"
            >
              {item}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          ))}
        </div>
      </div>

      <div className="relative py-32 md:py-44">
        {/* Clip-circle forest bloom */}
        <div
          className="cta-panel absolute inset-0 bg-forest"
          style={{ clipPath: "circle(0% at 50% 65%)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(42,77,60,0.8),transparent)]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <p className="eyebrow mb-8">Ready to Get Started?</p>
          </Reveal>
          <SplitReveal as="h2" className="display-lg text-bone mb-7">
            Let&apos;s build something your customers will{" "}
            <span className="accent-word">remember.</span>
          </SplitReveal>
          <Reveal delay={0.1}>
            <p className="text-bone/50 text-lg max-w-md mx-auto mb-12 leading-relaxed">
              Tell us about your business. We&apos;ll put together a clear plan
              and a fixed quote at no cost to you.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div ref={magnetRef} className="inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-abyss font-semibold px-9 py-4 rounded-full hover:bg-gold-bright transition-colors"
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-9 py-4 rounded-full font-medium text-bone/70 border border-white/20 hover:border-gold/50 hover:text-bone transition-all"
              >
                View Pricing
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
