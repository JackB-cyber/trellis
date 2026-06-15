"use client";

import QuoteReveal from "./QuoteReveal";
import Reveal from "./Reveal";

const commitments = [
  {
    value: "1 business day",
    label: "Response time on every inquiry, from first message to launch.",
  },
  {
    value: "Fixed pricing",
    label: "The price we quote is the price you pay. No surprise invoices.",
  },
  {
    value: "You own it all",
    label: "The site, the code, and the content are yours at launch. No lock-in.",
  },
];

/** Honest trust section — our standing commitments, no manufactured testimonials. */
export default function TestimonialsSection() {
  return (
    <section className="relative bg-abyss py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <Reveal className="mb-16 md:mb-20">
          <p className="eyebrow mb-5">Our Promise</p>
          <h2 className="display-lg text-bone">
            What you can hold us <span className="accent-word">to.</span>
          </h2>
        </Reveal>

        <QuoteReveal className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug text-bone mb-20 md:mb-28">
          Every site we build is fast, easy to find, and built to bring in
          customers. If something isn&apos;t right, we fix it. No runaround,
          no excuses, no disappearing after the invoice is paid.
        </QuoteReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {commitments.map((item, i) => (
            <Reveal key={item.value} delay={i * 0.08}>
              <div className="pt-8 border-t border-white/10">
                <div className="font-display text-2xl md:text-3xl text-gold mb-3">
                  {item.value}
                </div>
                <p className="text-bone/45 text-sm leading-relaxed">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
