"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import HeroSceneLoader from "./three/HeroSceneLoader";

const trustItems = ["Fixed pricing", "Canadian owned", "No hidden fees", "1-day response"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-eyebrow",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.7, delay: 0.45, ease: "power2.out" }
      );
      gsap.fromTo(
        ".hero-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, delay: 0.5, ease: "power3.out", transformOrigin: "left center" }
      );
      gsap.fromTo(
        ".hero-fade",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, delay: 1.2, ease: "power3.out" }
      );

      // Content drifts up and fades as the lattice takes over on scroll-out
      gsap.to(".hero-content", {
        autoAlpha: 0,
        y: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "25% top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="relative bg-abyss min-h-screen flex items-center overflow-hidden">
      {/* Depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_60%_30%,rgba(27,51,40,0.55),transparent)] pointer-events-none" />

      {/* Firefly / spore field */}
      <div className="absolute inset-0 opacity-50 md:opacity-100">
        <HeroSceneLoader />
      </div>

      {/* Copy */}
      <div className="hero-content relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-36">
        <div className="hero-eyebrow invisible flex items-center gap-3 mb-8">
          <span className="hero-rule block h-px w-8 bg-gold" />
          <span className="eyebrow">Canadian Web Design</span>
        </div>

        <SplitReveal
          as="h1"
          trigger="load"
          delay={0.55}
          className="display-xl text-bone max-w-6xl mb-10"
        >
          Your local business deserves a website that{" "}
          <span className="accent-word">works.</span>
        </SplitReveal>

        <p className="hero-fade invisible text-lg sm:text-xl text-bone/45 leading-relaxed mb-12 max-w-lg">
          Web design for Canadian small businesses. Fixed pricing, honest
          timelines, and everything handled start to finish.
        </p>

        <div className="hero-fade invisible flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 bg-gold text-abyss font-semibold px-8 py-4 rounded-full text-[15px] hover:bg-gold-bright transition-colors"
          >
            Get a Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-[15px] font-medium text-bone/60 border border-white/15 hover:border-gold/50 hover:text-bone transition-all"
          >
            View Our Services
          </Link>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="hero-fade invisible absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.06] py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(8)].map((_, rep) => (
            <span key={rep} className="flex shrink-0">
              {trustItems.map((item) => (
                <span key={item} className="flex items-center gap-3 text-bone/35 text-sm whitespace-nowrap pr-10">
                  <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
