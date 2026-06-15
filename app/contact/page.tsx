"use client";

import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import ContactForm from "@/components/ContactForm";

const steps = [
  {
    step: "01",
    title: "We review your inquiry",
    desc: "We read every submission carefully before responding.",
  },
  {
    step: "02",
    title: "We send a clear proposal",
    desc: "A fixed-price quote with scope, timeline, and next steps.",
  },
  {
    step: "03",
    title: "We get to work",
    desc: "Once approved, we kick off design within days.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-abyss pt-40 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-6">Get in Touch</p>
          </Reveal>
          <SplitReveal as="h1" trigger="load" delay={0.3} className="display-xl text-bone mb-8">
            Tell us what you&apos;re <span className="accent-word">building.</span>
          </SplitReveal>
          <Reveal delay={0.6}>
            <p className="text-bone/45 text-lg max-w-xl leading-relaxed">
              Fill out the form and we&apos;ll get back to you within one
              business day with a clear plan and a fixed quote.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="bg-abyss pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24">
            {/* Sidebar */}
            <Reveal>
              <div className="lg:sticky lg:top-32 space-y-12">
                <div>
                  <h2 className="display-md text-bone mb-8">What happens next?</h2>
                  <ol className="space-y-7">
                    {steps.map((item) => (
                      <li key={item.step} className="flex gap-5 pb-7 border-b border-white/[0.06] last:border-0 last:pb-0">
                        <span className="font-display text-xl text-gold/70 tabular-nums shrink-0">
                          {item.step}
                        </span>
                        <div>
                          <div className="font-display text-lg text-bone">{item.title}</div>
                          <div className="text-bone/40 text-sm mt-1.5 leading-relaxed">{item.desc}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <h3 className="eyebrow mb-3">Prefer email?</h3>
                  <a
                    href="mailto:hello@trellisdigital.ca"
                    className="draw-link text-bone/70 hover:text-bone text-lg transition-colors"
                  >
                    hello@trellisdigital.ca
                  </a>
                  <p className="text-bone/25 text-sm mt-4 leading-relaxed">
                    Alberta, Canada. Serving clients across the country.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
