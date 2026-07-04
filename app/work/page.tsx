import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import WorkShowcase from "@/components/WorkShowcase";
import PortfolioSlideshow from "@/components/PortfolioSlideshow";

const BeforeAfterSlider = dynamic(() => import("@/components/BeforeAfterSlider"));

export const metadata: Metadata = {
  title: "Our Portfolio",
  description:
    "Websites we've built for restaurants, the trades, and professional services.",
  // Page is unfinished and hidden on purpose (also disallowed in robots.txt)
  robots: { index: false, follow: false },
};

const projects = [
  {
    name: "Restaurant & Hospitality",
    industry: "Restaurant Industry",
    description:
      "A full website for a restaurant: interactive menu, online reservations, and local SEO to help fill tables. It's mobile-first, which is how most people look up a place to eat.",
    tags: ["Interactive Menu", "Reservations", "Local SEO", "Mobile-First"],
    gradient: "bg-gradient-to-br from-[#5C3317] via-[#3D2010] to-[#1A0A05]",
    accentColor: "#D4854A",
    pattern: "organic",
  },
  {
    name: "Trades & Contracting",
    industry: "Skilled Trades",
    description:
      "Built for contractors and trades businesses: service area pages, a quick quote-request form, project galleries, and local search setup so nearby homeowners can find you.",
    tags: ["Quote Request Forms", "Service Area Pages", "Project Gallery", "Local SEO"],
    gradient: "bg-gradient-to-br from-[#1B4D35] via-[#163D2A] to-[#0B1310]",
    accentColor: "#4CAF82",
    pattern: "mountains",
  },
  {
    name: "Professional Services",
    industry: "Professional Services",
    description:
      "A straightforward site for firms and practices: service pages, team profiles, a consultation request form, and schema markup so search engines understand what you do.",
    tags: ["Consultation Forms", "Team Profiles", "Schema Markup", "SEO"],
    gradient: "bg-gradient-to-br from-[#1C2E4A] via-[#122038] to-[#080F1C]",
    accentColor: "#6B9FD4",
    pattern: "grid",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative bg-abyss pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-6">Our Portfolio</p>
          </Reveal>
          <SplitReveal as="h1" trigger="load" delay={0.3} className="display-xl text-bone mb-8">
            Work that <span className="accent-word">grows</span> businesses.
          </SplitReveal>
          <Reveal delay={0.6}>
            <p className="text-bone/45 text-lg max-w-lg leading-relaxed">
              A few of the websites we&apos;ve built, across different
              industries. Each one is built around how that business brings in
              customers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PlantResQ case study — before/after slider */}
      <section className="bg-abyss pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow mb-4" style={{ color: "#4CAF82" }}>Client Case Study</p>
            <h2 className="display-md text-bone mb-3">PlantResQ Solutions</h2>
            <p className="text-bone/40 text-base max-w-lg leading-relaxed mb-10">
              Natural lawn restoration in Edmonton. We rebuilt their site from scratch
              with a cleaner layout, faster load times, and a more professional look.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfterSlider
              beforeSrc="/Before.webp"
              afterSrc="/After.webp"
              beforeAlt="PlantResQ old website"
              afterAlt="PlantResQ redesigned by Trellis Digital"
              className="w-full shadow-2xl"
            />
            <p className="text-bone/25 text-xs tracking-widest uppercase mt-4">
              Drag to compare ←→
            </p>
          </Reveal>
        </div>
      </section>

      {/* Desktop: scroll showcase */}
      <section className="hidden md:block bg-abyss pb-32">
        <WorkShowcase projects={projects} />
      </section>

      {/* Mobile: drag slideshow */}
      <section className="md:hidden bg-abyss pb-20">
        <Reveal>
          <PortfolioSlideshow projects={projects} />
        </Reveal>
        <Reveal delay={0.1} className="max-w-7xl mx-auto px-6 mt-6">
          <p className="text-bone/25 text-xs tracking-widest uppercase">
            Swipe to explore →
          </p>
        </Reveal>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-ink py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(27,51,40,0.4),transparent)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="display-lg text-bone mb-6">
              Your project <span className="accent-word">here.</span>
            </h2>
            <p className="text-bone/40 mb-10 text-lg leading-relaxed">
              We&apos;re currently taking on new clients. Get in touch and tell
              us what you&apos;re working with.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gold text-abyss font-semibold px-8 py-4 rounded-full hover:bg-gold-bright transition-colors"
            >
              Start a Project
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
