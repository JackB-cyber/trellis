"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";
import QuoteReveal from "@/components/QuoteReveal";

const values = [
  {
    index: "01",
    title: "Honest Pricing",
    description:
      "You'll always know what a project costs before any work begins. We publish our rates and stick to them. No scope inflation, no surprise invoices.",
  },
  {
    index: "02",
    title: "Real Communication",
    description:
      "You'll always know where your project stands. No jargon, no radio silence, no getting passed around to junior staff.",
  },
  {
    index: "03",
    title: "Built to Last",
    description:
      "We build on modern, well-supported platforms. Your site will be fast, secure, and won't need a rebuild in two years.",
  },
];

const storyParagraphs = [
  "Trellis Digital started with a simple belief: small businesses deserve great websites. Too many local companies have been burned by agencies that overpromise, underprepare, or disappear after the invoice is paid. We built something different.",
  "Based in Alberta, we work with business owners across Canada, from tradespeople and restaurants to law firms and tour operators. Every project gets the same attention: we learn your business, your customers, and your goals before any design work begins.",
  "We're not a 50-person agency. We're focused, hands-on, and personally invested in every site we launch. That's not a sales pitch. It's the reason we exist.",
];

const stats = [
  { value: "30+", label: "Sites launched" },
  { value: "100%", label: "Fixed pricing" },
  { value: "1 day", label: "Response time" },
];

export default function AboutContent() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".value-rule").forEach((rule) => {
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
    <div ref={ref}>
      {/* Page hero */}
      <section className="relative bg-abyss pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-6">Our Story</p>
          </Reveal>
          <SplitReveal as="h1" trigger="load" delay={0.3} className="display-xl text-bone mb-8">
            We&apos;re in your <span className="accent-word">corner.</span>
          </SplitReveal>
          <Reveal delay={0.6}>
            <p className="text-bone/45 text-lg max-w-xl leading-relaxed">
              Trellis Digital exists to give small businesses the kind of web
              presence that used to take a big agency budget to get.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Editorial story */}
      <section className="bg-abyss py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-24">
          <div>
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="eyebrow mb-6">How It Started</p>
              </Reveal>
              <SplitReveal as="h2" className="display-lg text-bone max-w-md">
                Built for the business owner who&apos;s tired of being{" "}
                <span className="accent-word">let down.</span>
              </SplitReveal>
            </div>
          </div>
          <div className="space-y-8 lg:pt-4">
            {storyParagraphs.map((para, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <p
                  className={`leading-relaxed ${
                    i === 0
                      ? "font-display text-xl md:text-2xl text-bone/80"
                      : "text-bone/45 text-lg"
                  }`}
                >
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parchment quote interlude */}
      <section className="grain relative bg-parchment py-28 md:py-40 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-10">The Trellis Standard</p>
          </Reveal>
          <QuoteReveal className="font-display text-3xl sm:text-4xl md:text-5xl leading-snug text-forest mb-10">
            &ldquo;Small businesses deserve the same quality of web presence
            that used to take a big agency budget to get. That isn&apos;t a
            tagline. It&apos;s the reason this company exists.&rdquo;
          </QuoteReveal>
          <Reveal>
            <div className="flex items-center gap-4 mb-16">
              <span className="block w-10 h-px bg-gold" />
              <span className="text-muted text-sm">How we approach every project</span>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-charcoal/10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl md:text-5xl text-forest">{stat.value}</div>
                  <div className="text-muted text-sm mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-abyss py-24 md:py-36">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-16">
            <p className="eyebrow mb-5">How We Operate</p>
            <SplitReveal as="h2" className="display-lg text-bone">
              Our <span className="accent-word">values.</span>
            </SplitReveal>
          </Reveal>

          <div>
            {values.map((value, i) => (
              <div key={value.title} className="relative py-10 md:py-12 group">
                <span className="value-rule absolute top-0 left-0 right-0 h-px bg-white/10" />
                <Reveal delay={i * 0.05}>
                  <div className="md:flex items-baseline gap-10">
                    <span className="font-display text-2xl text-gold/70 tabular-nums shrink-0 block mb-3 md:mb-0">
                      {value.index}
                    </span>
                    <div className="md:flex items-baseline justify-between gap-10 flex-1 transition-transform duration-300 group-hover:translate-x-2">
                      <h3 className="display-md text-bone shrink-0 mb-3 md:mb-0">{value.title}</h3>
                      <p className="text-bone/40 text-base leading-relaxed md:max-w-md">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
            <span className="value-rule block h-px bg-white/10" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative bg-forest py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(11,19,16,0.6),transparent)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="display-lg text-bone mb-6">
              Let&apos;s work <span className="accent-word">together.</span>
            </h2>
            <p className="text-bone/50 text-lg mb-10 leading-relaxed">
              Whether you&apos;re starting from scratch or ready for something
              better, tell us about your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-abyss font-semibold px-8 py-4 rounded-full hover:bg-gold-bright transition-colors"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
