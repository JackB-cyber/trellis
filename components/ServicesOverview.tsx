import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Website Design",
    description:
      "A professionally designed, fast-loading website tailored to your business. Built from scratch — not a template.",
    cta: "See Pricing",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "SEO Setup",
    description:
      "On-page SEO configuration, Google Business Profile setup, and local search optimization included with every site.",
    cta: "See Pricing",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Monthly Retainer",
    description:
      "Ongoing site updates, hosting support, and monthly performance reporting — so your site stays current.",
    cta: "See Pricing",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-4">
            Everything Your Business Needs Online
          </h2>
          <p className="text-charcoal/70 max-w-xl mx-auto text-lg leading-relaxed">
            We handle design, development, and ongoing support — all under one
            roof, at a price you can plan around.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <div className="bg-white rounded-xl p-8 h-full flex flex-col border border-cream-dark hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-forest/8 rounded-lg flex items-center justify-center text-forest mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-forest mb-3">
                  {service.title}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="text-forest text-sm font-semibold hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  {service.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
