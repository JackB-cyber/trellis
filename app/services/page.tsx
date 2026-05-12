import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Services & Pricing — Trellis Digital",
  description:
    "Transparent, fixed-price web design packages for Canadian small businesses. Starter, Standard, and Premium tiers plus monthly retainer.",
};

const tiers = [
  {
    name: "Starter",
    price: "$2,000",
    priceNote: "one-time",
    description:
      "Everything you need to get online and look professional. Perfect for new businesses ready to establish their presence.",
    features: [
      "Up to 5 pages",
      "Mobile-first responsive design",
      "Contact form",
      "Basic on-page SEO",
      "Google Analytics setup",
      "1 round of revisions",
      "30-day post-launch support",
    ],
    highlight: false,
    cta: "Get Started",
  },
  {
    name: "Standard",
    price: "$3,500",
    priceNote: "one-time",
    description:
      "A more complete site for established businesses that want to stand out, generate leads, and rank locally.",
    features: [
      "Up to 10 pages",
      "Custom design (no templates)",
      "Contact & inquiry forms",
      "Full on-page SEO setup",
      "Google Business Profile setup",
      "Blog or news section",
      "2 rounds of revisions",
      "60-day post-launch support",
    ],
    highlight: true,
    cta: "Most Popular — Get Started",
  },
  {
    name: "Premium",
    price: "$5,000+",
    priceNote: "one-time",
    description:
      "For businesses that need a robust online presence with advanced features, integrations, or e-commerce capability.",
    features: [
      "Unlimited pages",
      "Custom design & brand direction",
      "E-commerce or booking integrations",
      "Advanced SEO & schema markup",
      "Google Business Profile + local citations",
      "Custom animations & interactions",
      "Priority revisions",
      "90-day post-launch support",
    ],
    highlight: false,
    cta: "Let's Talk",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Services & Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Clear Pricing. No Surprises.
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Every package is priced upfront. You know exactly what you&apos;re
              getting before any work begins.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => (
              <AnimatedSection key={tier.name} delay={i * 0.1}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col border ${
                    tier.highlight
                      ? "bg-forest border-forest shadow-xl"
                      : "bg-white border-cream-dark shadow-sm"
                  }`}
                >
                  {tier.highlight && (
                    <span className="inline-block bg-gold text-forest text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-5 self-start">
                      Most Popular
                    </span>
                  )}
                  <h2
                    className={`text-2xl font-bold mb-1 ${
                      tier.highlight ? "text-white" : "text-forest"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span
                      className={`text-4xl font-extrabold ${
                        tier.highlight ? "text-gold" : "text-forest"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={`text-sm ${
                        tier.highlight ? "text-white/50" : "text-charcoal/50"
                      }`}
                    >
                      {tier.priceNote}
                    </span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      tier.highlight ? "text-white/70" : "text-charcoal/70"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <svg
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            tier.highlight ? "text-gold" : "text-forest"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className={`text-sm ${
                            tier.highlight ? "text-white/80" : "text-charcoal/80"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`text-center font-semibold py-3.5 rounded transition-colors text-sm ${
                      tier.highlight
                        ? "bg-gold text-forest hover:bg-gold-light"
                        : "bg-forest text-white hover:bg-forest-dark"
                    }`}
                  >
                    {tier.highlight ? "Get Started" : tier.cta}
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Retainer */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-cream rounded-2xl p-10 md:p-14 border border-cream-dark">
              <div className="md:flex items-center justify-between gap-10">
                <div className="mb-8 md:mb-0">
                  <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-3">
                    Ongoing Support
                  </span>
                  <h2 className="text-3xl font-bold text-forest mb-4">
                    Monthly Retainer
                  </h2>
                  <p className="text-charcoal/70 leading-relaxed max-w-lg">
                    Keep your site fresh and running smoothly. Includes content
                    updates, hosting support, monthly performance reporting, and
                    priority access for any changes that come up.
                  </p>
                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Monthly content updates",
                      "Hosting & uptime monitoring",
                      "Monthly performance report",
                      "Priority support",
                      "Minor design tweaks",
                      "Plugin & software updates",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-charcoal/80">
                        <svg
                          className="w-4 h-4 text-forest shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="shrink-0 text-center bg-white rounded-xl p-8 border border-cream-dark shadow-sm min-w-[200px]">
                  <div className="text-5xl font-extrabold text-forest mb-1">
                    $250
                  </div>
                  <div className="text-charcoal/50 text-sm mb-6">per month</div>
                  <Link
                    href="/contact"
                    className="block bg-forest text-white font-semibold py-3 rounded text-sm hover:bg-forest-dark transition-colors"
                  >
                    Add to My Plan
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ / Bottom CTA */}
      <section className="bg-cream py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-forest mb-4">
              Not sure which package is right for you?
            </h3>
            <p className="text-charcoal/65 mb-8 leading-relaxed">
              Send us a message and we&apos;ll recommend the best fit based on
              your goals, timeline, and budget.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-forest font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors"
            >
              Get a Free Recommendation
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
