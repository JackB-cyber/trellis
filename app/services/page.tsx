"use client";

import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  {
    q: "Do I own the website after it's built?",
    a: "Yes, completely. The site, its code, and all content belong to you. We hand everything over at launch. No lock-in, no ongoing dependency unless you choose the retainer.",
  },
  {
    q: "How long does a typical project take?",
    a: "Starter packages typically take 2–3 weeks. Standard projects run 3–5 weeks. Premium or e-commerce builds vary by scope, but we give you a firm timeline in your proposal before any work begins.",
  },
  {
    q: "Do you write the copy (website text)?",
    a: "We'll help you shape and refine your messaging, but the core content comes from you: your story, your services, your details. We send a simple brief to make it straightforward.",
  },
  {
    q: "What if I need changes after launch?",
    a: "Every package includes post-launch support (30, 60, or 90 days depending on tier). For ongoing changes beyond that, our $250/month retainer covers content updates, minor tweaks, and priority support.",
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

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="border-b border-sand last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="text-forest font-semibold text-[15px] group-hover:text-gold transition-colors">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 w-6 h-6 rounded-full border border-sand flex items-center justify-center text-muted group-hover:border-gold group-hover:text-gold transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
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
            <p className="text-muted text-sm leading-relaxed pb-5 max-w-2xl">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const tiers = [
  {
    name: "Starter",
    price: "$2,000",
    priceNote: "one-time",
    description: "Everything you need to get online and look credible. Good for new businesses that are ready to establish a presence.",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "Contact form",
      "Basic on-page SEO",
      "Google Analytics setup",
      "1 round of revisions",
      "30-day post-launch support",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "$3,500",
    priceNote: "one-time",
    description: "A more complete site for established businesses that want to rank locally and bring in more leads.",
    features: [
      "Up to 10 pages",
      "Custom design (no templates)",
      "Contact & inquiry forms",
      "Full on-page SEO setup",
      "Google Business Profile setup",
      "Blog or news section",
      "2 rounds of revisions",
      "60-day post-launch support",
    ],
    highlight: true,
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: "$5,000+",
    priceNote: "one-time",
    description: "For businesses that need a larger site with advanced features, third-party integrations, or an online store.",
    features: [
      "Unlimited pages",
      "Custom design & brand direction",
      "E-commerce or booking integrations",
      "Advanced SEO & schema markup",
      "Google Business Profile + local citations",
      "Custom animations & interactions",
      "Priority revisions",
      "90-day post-launch support",
    ],
    highlight: false,
    cta: "Let's Talk",
  },
];

function TierCard({ tier, index }: { tier: typeof tiers[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <motion.div
        animate={{ y: hovered && !tier.highlight ? -6 : 0, boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12)" : "0 0 0 rgba(0,0,0,0)" }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl p-8 h-full flex flex-col border ${
          tier.highlight ? "bg-forest border-forest-light shadow-2xl" : "bg-white border-sand"
        }`}
      >
        {tier.highlight && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="inline-block bg-gold text-parchment text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 self-start"
          >
            Most Popular
          </motion.span>
        )}

        <h2 className={`text-2xl font-bold mb-1 ${tier.highlight ? "text-white" : "text-forest"}`}>
          {tier.name}
        </h2>

        <div className="flex items-baseline gap-1.5 mb-4">
          <motion.span
            className={`text-4xl font-extrabold ${tier.highlight ? "text-gold" : "text-forest"}`}
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          >
            {tier.price}
          </motion.span>
          <span className={`text-sm ${tier.highlight ? "text-white/45" : "text-muted"}`}>
            {tier.priceNote}
          </span>
        </div>

        <p className={`text-sm leading-relaxed mb-6 ${tier.highlight ? "text-white/60" : "text-muted"}`}>
          {tier.description}
        </p>

        <ul className="flex flex-col gap-2.5 mb-8 flex-1">
          {tier.features.map((feature, fi) => (
            <motion.li
              key={feature}
              className="flex items-start gap-2.5"
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.1 + 0.15 + fi * 0.04, duration: 0.35 }}
            >
              <svg
                className={`w-4 h-4 mt-0.5 shrink-0 ${tier.highlight ? "text-gold" : "text-forest"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className={`text-sm ${tier.highlight ? "text-white/75" : "text-charcoal/75"}`}>
                {feature}
              </span>
            </motion.li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`text-center font-semibold py-3.5 rounded transition-colors text-sm ${
            tier.highlight
              ? "bg-gold text-parchment hover:bg-gold-light"
              : "bg-forest text-white hover:bg-forest-dark"
          }`}
        >
          {tier.cta}
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="grain relative bg-ink pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Services & Pricing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight max-w-xl">
              Clear Pricing.<br />No Surprises.
            </h1>
            <p className="text-white/45 text-lg max-w-xl leading-relaxed">
              Every package is priced upfront. You know exactly what you&apos;re
              getting before we start.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-parchment py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => (
              <TierCard key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Retainer */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-parchment rounded-2xl p-10 md:p-14 border border-sand">
              <div className="md:flex items-center justify-between gap-10">
                <div className="mb-8 md:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-px bg-gold" />
                    <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Ongoing Support</span>
                  </div>
                  <h2 className="text-3xl font-bold text-forest mb-4">Monthly Retainer</h2>
                  <p className="text-muted leading-relaxed max-w-lg">
                    Keep your site current and running well. Covers content
                    updates, hosting support, monthly performance reporting, and
                    priority access whenever something needs changing.
                  </p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Monthly content updates",
                      "Hosting & uptime monitoring",
                      "Monthly performance report",
                      "Priority support",
                      "Minor design tweaks",
                      "Plugin & software updates",
                    ].map((item, i) => (
                      <motion.li
                        key={item}
                        className="flex items-center gap-2 text-sm text-charcoal/75"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                      >
                        <svg className="w-4 h-4 text-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 text-center bg-white rounded-xl p-8 border border-sand shadow-sm min-w-[200px]">
                  <div className="text-5xl font-extrabold text-forest mb-1">$250</div>
                  <div className="text-muted text-sm mb-6">per month</div>
                  <Link href="/contact" className="block bg-forest text-white font-semibold py-3 rounded text-sm hover:bg-forest-dark transition-colors">
                    Add to My Plan
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-parchment py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Common Questions</span>
            </div>
            <h2 className="text-3xl font-bold text-forest leading-tight">
              Frequently Asked Questions
            </h2>
          </AnimatedSection>
          <div className="bg-white rounded-2xl px-8 py-2 border border-sand">
            {faqs.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-forest mb-4">
              Not sure which package is right for you?
            </h3>
            <p className="text-muted mb-8 leading-relaxed">
              Send us a message and we&apos;ll recommend the best fit based on
              your goals, timeline, and budget.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-parchment font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors">
              Get a Free Recommendation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
