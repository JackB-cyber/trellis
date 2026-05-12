import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Website Design",
    description: "A professionally designed, fast-loading website built specifically for your business. Not copied from a template.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "SEO Setup",
    description: "On-page SEO, Google Business Profile setup, and local search optimisation included with every site we build.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Monthly Retainer",
    description: "Ongoing updates, hosting support, and monthly performance reporting so your site stays sharp and current.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-parchment py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-forest leading-tight max-w-xl">
            Everything Your Business Needs Online
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-8 h-full flex flex-col border border-sand hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(27,51,40,0.08)] transition-all duration-300">
                <div className="w-11 h-11 bg-forest/6 rounded-xl flex items-center justify-center text-forest mb-6 group-hover:bg-gold/10 group-hover:text-gold transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-forest mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed flex-1 mb-6">{service.description}</p>
                <Link
                  href="/services"
                  className="text-forest text-sm font-semibold hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  See Pricing
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
