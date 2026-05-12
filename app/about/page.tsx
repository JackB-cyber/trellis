"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedSection from "@/components/AnimatedSection";

const values = [
  {
    title: "Honest Pricing",
    description: "You'll always know what a project costs before any work begins. We publish our rates and stick to them. No scope inflation, no surprise invoices.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Real Communication",
    description: "You'll always know where your project stands. No jargon, no radio silence, no getting passed around to junior staff.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    description: "We build on modern, well-supported platforms. Your site will be fast, secure, and won't need a rebuild in two years.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const storyParagraphs = [
  "Trellis Digital started with a simple belief: small businesses deserve great websites. Too many local companies have been burned by agencies that overpromise, underprepare, or disappear after the invoice is paid. We built something different.",
  "Based in Alberta, we work with business owners across Canada, from tradespeople and restaurants to law firms and tour operators. Every project gets the same attention: we learn your business, your customers, and your goals before any design work begins.",
  "We're not a 50-person agency. We're focused, hands-on, and personally invested in every site we launch. That's not a sales pitch. It's the reason we exist.",
];

function StoryText() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-5">
      {storyParagraphs.map((para, i) => (
        <motion.p
          key={i}
          className="text-muted leading-relaxed"
          initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.55, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {para}
        </motion.p>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="grain relative bg-ink pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight max-w-xl">
              We&apos;re in Your Corner
            </h1>
            <p className="text-white/45 text-lg max-w-xl leading-relaxed">
              Trellis Digital exists to give small businesses the kind of web
              presence that used to take a big agency budget to get.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-parchment py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Quote block */}
            <AnimatedSection direction="left">
              <div className="relative rounded-2xl overflow-hidden bg-forest p-10 md:p-12">
                {/* Decorative quotation mark */}
                <div className="absolute top-6 left-8 text-gold/10 font-serif text-[9rem] leading-none select-none pointer-events-none">
                  &ldquo;
                </div>
                <div className="relative">
                  <blockquote className="text-white/80 text-xl md:text-2xl leading-relaxed font-light italic mb-8">
                    Small businesses deserve the same quality of web presence that used to take a big agency budget to get. That isn&apos;t a tagline. It&apos;s the reason this company exists.
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-px bg-gold" />
                    <div>
                      <div className="text-gold text-sm font-semibold">The Trellis Standard</div>
                      <div className="text-white/35 text-xs mt-0.5">How we approach every project</div>
                    </div>
                  </div>
                </div>
                {/* Decorative stats row */}
                <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                  {[
                    { value: "30+", label: "Sites launched" },
                    { value: "100%", label: "Fixed pricing" },
                    { value: "1 day", label: "Response time" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-gold text-2xl font-extrabold">{stat.value}</div>
                      <div className="text-white/35 text-xs mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Story text */}
            <div>
              <AnimatedSection direction="right" className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-px bg-gold" />
                  <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">How It Started</span>
                </div>
                <h2 className="text-3xl font-bold text-forest leading-tight">
                  Built for the Business Owner Who&apos;s Tired of Being Let Down
                </h2>
              </AnimatedSection>
              <StoryText />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">How We Operate</span>
            </div>
            <h2 className="text-4xl font-bold text-forest leading-tight max-w-sm">
              Our Values
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <motion.div
                  className="bg-parchment rounded-xl p-8 border border-sand h-full"
                  whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(27,51,40,0.07)" }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="w-11 h-11 bg-forest/6 rounded-xl flex items-center justify-center text-forest mb-5"
                    whileHover={{ backgroundColor: "rgba(184,120,42,0.1)", color: "#B8782A" }}
                    transition={{ duration: 0.2 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-forest mb-3">{value.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="grain relative bg-forest py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(11,19,16,0.6),transparent)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-white/45 text-lg mb-10 leading-relaxed">
              Whether you&apos;re starting from scratch or ready for something
              better, tell us about your business.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-gold text-parchment font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors">
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
