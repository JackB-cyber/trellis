import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Trellis Digital",
  description:
    "Get a free quote for your website project. Tell us about your business and we'll put together a clear plan and proposal.",
};

export default function ContactPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Let&apos;s Talk About Your Project
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              Fill out the form below and we&apos;ll get back to you within 1
              business day with a clear plan and a fixed quote.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Sidebar Info */}
            <AnimatedSection direction="left" className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-forest mb-3">
                    What Happens Next?
                  </h2>
                  <ol className="space-y-4">
                    {[
                      {
                        step: "1",
                        title: "We review your inquiry",
                        desc: "We read every submission carefully before responding.",
                      },
                      {
                        step: "2",
                        title: "We send a clear proposal",
                        desc: "A fixed-price quote with scope, timeline, and next steps.",
                      },
                      {
                        step: "3",
                        title: "We get to work",
                        desc: "Once approved, we kick off design within days.",
                      },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-4">
                        <div className="w-7 h-7 bg-forest rounded-full flex items-center justify-center shrink-0 text-gold text-xs font-bold mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <div className="font-semibold text-forest text-sm">
                            {item.title}
                          </div>
                          <div className="text-charcoal/60 text-sm mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="bg-white rounded-xl p-6 border border-cream-dark">
                  <h3 className="font-bold text-forest mb-2 text-sm">
                    Prefer email?
                  </h3>
                  <a
                    href="mailto:hello@trellisdigital.ca"
                    className="text-forest text-sm font-medium hover:text-gold transition-colors"
                  >
                    hello@trellisdigital.ca
                  </a>
                  <p className="text-charcoal/50 text-xs mt-3 leading-relaxed">
                    Alberta, Canada — serving clients across the country.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 md:p-10 border border-cream-dark shadow-sm">
                <h2 className="text-2xl font-bold text-forest mb-7">
                  Tell Us About Your Project
                </h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
