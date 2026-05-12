import AnimatedSection from "./AnimatedSection";

const trustPoints = [
  {
    title: "Done for You",
    description: "We handle the entire process — strategy, design, development, and launch. You focus on running your business.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Fixed Pricing",
    description: "Every package is priced upfront. No hourly billing, no scope creep surprises — what you see is what you pay.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Canadian Owned",
    description: "Alberta-based and proud of it. We understand the Canadian market and the businesses that power local communities.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    description: "Clean code, fast load times, modern platforms. Your site won't need a full rebuild in two years.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function WhyTrellis() {
  return (
    <section className="grain relative bg-deep py-28 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(42,77,60,0.4),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading */}
          <AnimatedSection direction="left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Why Work With Us
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              We Make the Process Easy
            </h2>
            <p className="text-white/45 text-lg leading-relaxed max-w-md">
              Most agencies are overwhelming to work with. We built Trellis
              Digital to be the opposite — transparent, focused, and personal.
            </p>
          </AnimatedSection>

          {/* Right: trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point, i) => (
              <AnimatedSection key={point.title} delay={i * 0.08}>
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-6 hover:bg-white/[0.07] hover:border-gold/20 transition-all duration-300">
                  <div className="w-9 h-9 bg-gold/10 rounded-lg flex items-center justify-center text-gold mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{point.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
