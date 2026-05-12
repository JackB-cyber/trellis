"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

const steps = [
  { step: "1", title: "We review your inquiry", desc: "We read every submission carefully before responding." },
  { step: "2", title: "We send a clear proposal", desc: "A fixed-price quote with scope, timeline, and next steps." },
  { step: "3", title: "We get to work", desc: "Once approved, we kick off design within days." },
];

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="grain relative bg-ink pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">Get in Touch</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight max-w-xl">
              Let&apos;s Talk About Your Project
            </h1>
            <p className="text-white/45 text-lg max-w-xl leading-relaxed">
              Fill out the form and we&apos;ll get back to you within one
              business day with a clear plan and a fixed quote.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-parchment py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-forest mb-5">What Happens Next?</h2>
                  <ol className="space-y-5">
                    {steps.map((item, i) => (
                      <motion.li
                        key={item.step}
                        className="flex gap-4"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div className="w-7 h-7 bg-forest rounded-full flex items-center justify-center shrink-0 text-gold text-xs font-bold mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-semibold text-forest text-sm">{item.title}</div>
                          <div className="text-muted text-sm mt-0.5">{item.desc}</div>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                <motion.div
                  className="bg-white rounded-xl p-6 border border-sand"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="font-bold text-forest mb-2 text-sm">Prefer email?</h3>
                  <a href="mailto:hello@trellisdigital.ca" className="text-forest text-sm font-medium hover:text-gold transition-colors">
                    hello@trellisdigital.ca
                  </a>
                  <p className="text-muted/60 text-xs mt-3 leading-relaxed">
                    Alberta, Canada. Serving clients across the country.
                  </p>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-sand shadow-sm">
                <h2 className="text-2xl font-bold text-forest mb-7">Tell Us About Your Project</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
