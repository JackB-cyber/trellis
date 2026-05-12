"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  {
    step: "01",
    title: "Tell Us About Your Business",
    desc: "Fill out our quick form or send us an email. We'll get back within one business day with questions and a clear outline of what's possible.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "We Design & Build",
    desc: "Once you approve the quote, we get to work. You'll see progress at every stage and have real say throughout. Nothing gets built without your sign-off.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "You Launch with Confidence",
    desc: "We handle the technical handoff: domain, hosting, analytics setup. You get a site that's fast, mobile-ready, and fully yours.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-parchment py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl font-bold text-forest leading-tight max-w-sm">
            Simple from Start to Launch
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-sand pointer-events-none" />

          {steps.map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 0.12}>
              <motion.div
                className="relative bg-white rounded-xl p-8 border border-sand h-full"
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(27,51,40,0.07)" }}
                transition={{ duration: 0.25 }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 bg-forest/6 rounded-xl flex items-center justify-center text-forest">
                    {s.icon}
                  </div>
                  <span className="text-4xl font-extrabold text-sand tabular-nums">{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-forest mb-3">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
