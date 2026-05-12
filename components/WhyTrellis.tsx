import AnimatedSection from "./AnimatedSection";

const trustPoints = [
  {
    title: "Done for You",
    description:
      "We handle the entire process — strategy, design, development, and launch. You focus on your business.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Fixed Pricing",
    description:
      "Every package is priced upfront. No hourly billing, no scope creep surprises — what you see is what you pay.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Canadian Owned",
    description:
      "Alberta-based and proud of it. We understand the Canadian market and the businesses that power local communities.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    description:
      "Clean code, fast load times, and modern platforms. Your site won't need a full rebuild in two years.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
];

export default function WhyTrellis() {
  return (
    <section className="bg-forest py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            Why Work With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            We Make the Process Easy
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-lg leading-relaxed">
            Most agencies are overwhelming to work with. We built Trellis
            Digital to be the opposite.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, i) => (
            <AnimatedSection key={point.title} delay={i * 0.08}>
              <div className="bg-forest-light/40 border border-forest-light rounded-xl p-7 h-full">
                <div className="w-11 h-11 bg-gold/10 rounded-lg flex items-center justify-center text-gold mb-5">
                  {point.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {point.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
