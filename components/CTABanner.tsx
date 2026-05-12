import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-white rounded-2xl px-8 py-14 md:px-16 text-center border border-cream-dark shadow-sm">
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-5">
              Ready to Get Started?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-forest mb-5 max-w-xl mx-auto leading-tight">
              Let&apos;s Build Something Your Customers Will Remember
            </h2>
            <p className="text-charcoal/65 text-lg max-w-md mx-auto mb-9 leading-relaxed">
              Tell us about your business and we&apos;ll put together a clear
              plan and quote — no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-forest text-white font-semibold px-8 py-4 rounded hover:bg-forest-dark transition-colors"
              >
                Start Your Project
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
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-forest border border-forest/30 hover:border-forest hover:bg-forest/5 transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
