import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section className="bg-parchment py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden bg-forest rounded-2xl px-8 py-16 md:px-16 text-center grain">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(42,77,60,0.8),transparent)] pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-6 h-px bg-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                  Ready to Get Started?
                </span>
                <div className="w-6 h-px bg-gold" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-2xl mx-auto leading-tight">
                Let&apos;s Build Something Your Customers Will Remember
              </h2>
              <p className="text-white/50 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                Tell us about your business and we&apos;ll put together a clear
                plan and quote — no obligation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-parchment font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors"
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
