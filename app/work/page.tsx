import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

export const metadata: Metadata = {
  title: "Our Work — Trellis Digital",
  description: "A selection of websites we've built for Canadian small businesses across a range of industries.",
};

const projects = [
  {
    name: "Elk Valley Outfitters",
    industry: "Adventure Tourism",
    location: "Fernie, BC",
    description:
      "A full rebuild for a guided adventure tour operator in the Rockies. New booking form, seasonal trip listings, and a mobile-first gallery. Online inquiries were up 40% within three months of launch.",
    tags: ["Website Redesign", "Custom Forms", "SEO Setup", "Mobile-First"],
    gradient: "bg-gradient-to-br from-[#1B4D35] via-[#163D2A] to-[#0B1310]",
    accentColor: "#4CAF82",
    pattern: "mountains",
  },
  {
    name: "Prairie Root Kitchen",
    industry: "Food & Beverage",
    location: "Lacombe, AB",
    description:
      "A brand-new site for a farm-to-table restaurant in central Alberta. Interactive menu, online reservations, and local SEO targeting the surrounding communities. Launched ahead of schedule.",
    tags: ["New Website", "Reservations", "Local SEO", "Menu System"],
    gradient: "bg-gradient-to-br from-[#5C3317] via-[#3D2010] to-[#1A0A05]",
    accentColor: "#D4854A",
    pattern: "organic",
  },
  {
    name: "Summit Legal Group",
    industry: "Professional Services",
    location: "Calgary, AB",
    description:
      "A clean, professional site for a corporate law firm. Practice area pages, lawyer profiles, a consultation request form, and schema markup for local search.",
    tags: ["New Website", "Professional Design", "SEO", "Consultation Form"],
    gradient: "bg-gradient-to-br from-[#1C2E4A] via-[#122038] to-[#080F1C]",
    accentColor: "#6B9FD4",
    pattern: "grid",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Page Header */}
      <section className="grain relative bg-ink pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
                Portfolio
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-5 leading-tight max-w-xl">
              Work We&apos;re Proud Of
            </h1>
            <p className="text-white/45 text-lg max-w-lg leading-relaxed">
              Every project is built from scratch. Hover over a card to read
              about the work.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Slideshow */}
      <section className="bg-deep py-16">
        <AnimatedSection delay={0.1}>
          <PortfolioSlideshow projects={projects} />
        </AnimatedSection>

        {/* Scroll hint */}
        <AnimatedSection delay={0.2} className="max-w-7xl mx-auto px-6 lg:px-8 mt-6">
          <p className="text-white/25 text-xs tracking-widest uppercase">
            Scroll to explore →
          </p>
        </AnimatedSection>
      </section>

      {/* Bottom CTA */}
      <section className="grain relative bg-ink py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(27,51,40,0.4),transparent)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-5 leading-tight">
              Want to Be Our Next Project?
            </h2>
            <p className="text-white/40 mb-10 text-lg leading-relaxed">
              We&apos;re currently taking on new clients. Get in touch and
              tell us what you&apos;re working with.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gold text-parchment font-semibold px-8 py-4 rounded hover:bg-gold-light transition-colors"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
