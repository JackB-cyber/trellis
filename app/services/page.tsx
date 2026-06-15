"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitReveal from "@/components/SplitReveal";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "Do I own the website after it's built?",
    a: "Yes, completely. The site, its code, and all content belong to you. We hand everything over at launch. No lock-in, no ongoing dependency unless you choose the retainer.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects take 3–5 weeks from kickoff to launch. Builds with features beyond the standard package vary by scope, but we give you a firm timeline in your proposal before any work begins.",
  },
  {
    q: "Do you write the copy (website text)?",
    a: "We'll help you shape and refine your messaging, but the core content comes from you: your story, your services, your details. We send a simple brief to make it straightforward.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Every project includes 60 days of post-launch support. For ongoing changes beyond that, our retainer (starting at $500/month) covers content updates, minor tweaks, and priority support.",
  },
  {
    q: "Can you work with my existing domain and hosting?",
    a: "Yes. We'll work with whatever you have, or help you set up new hosting if needed. We handle the migration and setup. You don't need to touch any of it.",
  },
  {
    q: "Do you work with businesses outside Alberta?",
    a: "We're based in Alberta but work with clients across Canada. Everything is handled remotely with direct communication throughout.",
  },
];

function FAQItem({ item }: { item: (typeof faqs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-moss/25 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-display text-lg md:text-xl text-bone group-hover:text-gold transition-colors">
          {item.q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-moss/40 flex items-center justify-center text-gold transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="text-bone/45 text-sm md:text-base leading-relaxed pb-6 max-w-2xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const packageFeatures = [
  "Custom design (no templates)",
  "Mobile-first responsive build",
  "Contact & inquiry forms",
  "Full on-page SEO setup",
  "Google Business Profile setup",
  "Google Analytics setup",
  "Blog or news section",
  "2 rounds of revisions",
  "60-day post-launch support",
];

const extras = [
  "E-commerce & online stores",
  "Booking & reservation systems",
  "Third-party integrations",
  "Brand direction & custom animations",
];

const retainerFeatures = [
  "Monthly content updates",
  "Hosting & uptime monitoring",
  "Monthly performance report",
  "Priority support",
  "Minor design tweaks",
  "Plugin & software updates",
];

export default function ServicesPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Retainer band border draws in
      gsap.fromTo(
        ".retainer-rule",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: ".retainer-band", start: "top 80%", once: true },
        }
      );
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
            <p className="eyebrow mb-6">Services &amp; Pricing</p>
          </Reveal>
          <SplitReveal as="h1" trigger="load" delay={0.3} className="display-xl text-bone mb-8">
            Clear pricing. No <span className="accent-word">surprises.</span>
          </SplitReveal>
          <Reveal delay={0.6}>
            <p className="text-bone/45 text-lg max-w-xl leading-relaxed">
              One package, priced upfront. You know exactly what you&apos;re
              getting before we start.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The package */}
      <section className="bg-abyss pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl p-8 md:p-12 border border-gold/60 bg-ink">
              <span className="absolute -top-3 left-8 md:left-12 bg-gold text-abyss text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                The Website Package
              </span>
              <div className="md:flex md:items-start md:justify-between md:gap-12">
                <div className="md:max-w-sm mb-8 md:mb-0">
                  <p className="text-bone/35 text-sm mb-2 mt-2">Starting at</p>
                  <div className="flex items-baseline gap-2 mb-5">
                    <span className="font-display text-5xl md:text-7xl text-bone tracking-tight">
                      $3,597
                    </span>
                    <span className="text-bone/35 text-sm">one-time</span>
                  </div>
                  <p className="text-bone/45 text-base leading-relaxed mb-8">
                    A complete, custom-built website for your business. Designed
                    from scratch, optimised for local search, and handled start
                    to finish.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm bg-gold text-abyss hover:bg-gold-bright transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 md:flex-1 md:pt-2">
                  {packageFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <svg
                        className="w-4 h-4 mt-0.5 shrink-0 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-bone/60">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Beyond the package */}
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl p-8 md:p-10 border border-white/[0.08] bg-white/[0.02]">
              <div className="md:flex md:items-center md:justify-between gap-10">
                <div className="mb-6 md:mb-0">
                  <h2 className="font-display text-xl md:text-2xl text-bone mb-2">
                    Need more than the standard build?
                  </h2>
                  <p className="text-bone/40 text-sm leading-relaxed max-w-md">
                    Features beyond the package are scoped on a quick call after
                    your inquiry, with a fixed quote before any work begins.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2.5 md:max-w-sm md:justify-end">
                  {extras.map((item) => (
                    <li
                      key={item}
                      className="text-xs bg-white/[0.05] border border-white/10 text-bone/50 px-3.5 py-1.5 rounded-full"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Retainer band */}
      <section className="bg-abyss pb-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="retainer-band relative pt-10">
            <span className="retainer-rule absolute top-0 left-0 right-0 h-px bg-gold/60" />
            <Reveal>
              <div className="md:flex items-start justify-between gap-12">
                <div className="mb-10 md:mb-0">
                  <p className="eyebrow mb-4">Ongoing Support</p>
                  <h2 className="display-md text-bone mb-5">Monthly Retainer</h2>
                  <p className="text-bone/45 leading-relaxed max-w-lg mb-8">
                    Keep your site current and running well. Covers content
                    updates, hosting support, monthly performance reporting, and
                    priority access whenever something needs changing.
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg">
                    {retainerFeatures.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-bone/60">
                        <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 text-center md:text-right">
                  <p className="text-bone/35 text-sm mb-1">Starting at</p>
                  <div className="font-display text-6xl md:text-7xl text-gold mb-1">$500</div>
                  <div className="text-bone/35 text-sm mb-8">per month</div>
                  <Link
                    href="/contact"
                    className="inline-flex bg-gold text-abyss font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-gold-bright transition-colors"
                  >
                    Add to My Plan
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ink py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Reveal className="mb-14">
            <p className="eyebrow mb-5">Common Questions</p>
            <SplitReveal as="h2" className="display-lg text-bone">
              Questions, <span className="accent-word">answered.</span>
            </SplitReveal>
          </Reveal>
          <div>
            {faqs.map((item) => (
              <FAQItem key={item.q} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-abyss py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h3 className="display-md text-bone mb-5">
              Not sure if the package fits your project?
            </h3>
            <p className="text-bone/45 mb-10 leading-relaxed">
              Send us a message and we&apos;ll talk it through. You&apos;ll get
              a clear recommendation and a fixed quote, no obligation.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-abyss font-semibold px-8 py-4 rounded-full hover:bg-gold-bright transition-colors"
            >
              Get a Free Quote
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
