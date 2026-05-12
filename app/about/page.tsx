import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "About — Trellis Digital",
  description:
    "Alberta-based web design agency helping Canadian small businesses build a professional online presence.",
};

const values = [
  {
    title: "Honest Pricing",
    description:
      "You'll always know what a project costs before any work begins. We publish our rates and stick to them — no scope inflation, no surprise invoices.",
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Real Communication",
    description:
      "You'll always know where your project stands. We keep things clear and straightforward — no jargon, no radio silence, no getting passed around to junior staff.",
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
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Built to Last",
    description:
      "We build on modern, well-supported platforms using clean, maintainable code. Your site will be fast, secure, and won't require a full rebuild in two years.",
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
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              We&apos;re in Your Corner
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Trellis Digital exists to give small businesses the kind of web
              presence that used to be reserved for companies with big budgets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <AnimatedSection direction="left">
              <div className="bg-cream-dark rounded-2xl aspect-[4/3] flex items-center justify-center border border-cream-dark">
                <div className="text-center text-charcoal/30">
                  <svg
                    className="w-16 h-16 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <p className="text-sm">Photo coming soon</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Story text */}
            <AnimatedSection direction="right">
              <div>
                <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
                  How It Started
                </span>
                <h2 className="text-3xl font-bold text-forest mb-6 leading-tight">
                  Built for the Business Owner Who&apos;s Tired of Being Let
                  Down
                </h2>
                <div className="space-y-5 text-charcoal/75 leading-relaxed">
                  <p>
                    Trellis Digital was founded on a simple belief: small
                    businesses deserve great websites. Too many local companies
                    have been burned by agencies that overpromise, underprepare,
                    or disappear after the invoice is paid. We built something
                    different.
                  </p>
                  <p>
                    Based in Alberta, we&apos;ve worked with local business
                    owners across Canada — from tradespeople and restaurants to
                    law firms and tour operators. Every project is treated the
                    same: we take the time to understand your business, your
                    customers, and your goals before we touch a single pixel.
                  </p>
                  <p>
                    We&apos;re not a 50-person agency. We&apos;re focused,
                    hands-on, and personally invested in every site we launch.
                    That&apos;s not a line — it&apos;s the reason we exist.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              How We Operate
            </span>
            <h2 className="text-3xl font-bold text-forest mb-4">Our Values</h2>
            <p className="text-charcoal/65 max-w-lg mx-auto text-lg leading-relaxed">
              Three things we don&apos;t compromise on, no matter the project.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="bg-cream rounded-xl p-8 h-full border border-cream-dark">
                  <div className="w-11 h-11 bg-forest/8 rounded-lg flex items-center justify-center text-forest mb-5">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-3">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white mb-5">
              Let&apos;s Work Together
            </h2>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              Whether you&apos;re starting from scratch or ready for a new site,
              we&apos;d love to hear about your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold text-forest font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors"
            >
              Get in Touch
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
