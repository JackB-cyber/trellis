"use client";

import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    quote:
      "We'd been burned by another agency. Slow delivery, no communication, and a site that barely worked on mobile. Trellis was completely different. Clear pricing, fast turnaround, and they actually listened.",
    name: "Marcus T.",
    business: "Summit Legal Group",
    location: "Calgary, AB",
    initial: "M",
  },
  {
    quote:
      "I needed a site before our spring opening and was nervous it wouldn't happen. Trellis hit the deadline, the design is beautiful, and our reservations went up the first week. I keep getting compliments on it.",
    name: "Dana H.",
    business: "Prairie Root Kitchen",
    location: "Lacombe, AB",
    initial: "D",
  },
  {
    quote:
      "The fixed pricing is what sold me. I knew exactly what I was paying before anything started. They walked me through every decision and launched ahead of schedule. The inquiry numbers say the rest.",
    name: "James R.",
    business: "Elk Valley Outfitters",
    location: "Fernie, BC",
    initial: "J",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              Client Stories
            </span>
          </div>
          <h2 className="text-4xl font-bold text-forest leading-tight max-w-xs">
            Don&apos;t Take Our Word For It
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div className="bg-parchment rounded-xl p-8 border border-sand h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-muted text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-sand">
                  <div className="w-9 h-9 bg-forest rounded-full flex items-center justify-center text-gold text-sm font-bold shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <div className="text-forest font-semibold text-sm">{t.name}</div>
                    <div className="text-muted text-xs">
                      {t.business} &middot; {t.location}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
