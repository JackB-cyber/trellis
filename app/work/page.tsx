import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Our Work — Trellis Digital",
  description:
    "A selection of websites we've built for Canadian small businesses across a range of industries.",
};

const projects = [
  {
    name: "Elk Valley Outfitters",
    industry: "Adventure Tourism",
    location: "Fernie, BC",
    description:
      "A complete website rebuild for a guided adventure tour operator in the Rockies. New custom booking form, seasonal trip listings, and a mobile-first gallery — resulting in a 40% increase in online inquiries within three months of launch.",
    tags: ["Website Redesign", "Custom Forms", "SEO Setup"],
    color: "bg-forest",
  },
  {
    name: "Prairie Root Kitchen",
    industry: "Food & Beverage",
    location: "Lacombe, AB",
    description:
      "Brand-new website for a farm-to-table restaurant in central Alberta. Built from scratch with an interactive menu, online reservation form, and local SEO setup targeting nearby communities. Launched ahead of their spring opening.",
    tags: ["New Website", "Reservations", "Local SEO"],
    color: "bg-charcoal",
  },
  {
    name: "Summit Legal Group",
    industry: "Professional Services",
    location: "Calgary, AB",
    description:
      "A clean, authoritative site for a corporate law firm. Includes practice area pages, individual lawyer profiles, a client consultation request form, and schema markup for local search visibility.",
    tags: ["New Website", "Professional Design", "SEO"],
    color: "bg-forest-dark",
  },
];

export default function WorkPage() {
  return (
    <>
      {/* Page Header */}
      <section className="bg-forest pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-block text-gold text-xs font-semibold tracking-widest uppercase mb-4">
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Work We&apos;re Proud Of
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed">
              A selection of sites built for Canadian businesses. Every project
              is custom — no templates, no shortcuts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <AnimatedSection key={project.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden border border-cream-dark hover:shadow-md transition-shadow h-full flex flex-col">
                  {/* Placeholder image block */}
                  <div
                    className={`${project.color} h-48 flex items-center justify-center relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="relative text-center px-6">
                      <div className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-1">
                        {project.industry}
                      </div>
                      <div className="text-white font-bold text-xl">
                        {project.name}
                      </div>
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-forest text-lg leading-tight">
                          {project.name}
                        </h3>
                        <p className="text-charcoal/50 text-xs mt-0.5">
                          {project.location}
                        </p>
                      </div>
                      <span className="shrink-0 bg-cream text-forest text-xs font-medium px-2.5 py-1 rounded-full border border-cream-dark">
                        {project.industry}
                      </span>
                    </div>

                    <p className="text-charcoal/70 text-sm leading-relaxed flex-1 mb-5">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-cream text-charcoal/60 px-2.5 py-1 rounded border border-cream-dark"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#"
                      className="text-forest text-sm font-semibold hover:text-gold transition-colors inline-flex items-center gap-1.5"
                    >
                      View Project
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
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-forest mb-4">
              Want to Be Our Next Project?
            </h2>
            <p className="text-charcoal/65 mb-8 text-lg leading-relaxed">
              We&apos;re currently accepting new clients. Get in touch and
              let&apos;s talk about what we can build for you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-forest text-white font-semibold px-8 py-4 rounded hover:bg-forest-dark transition-colors"
            >
              Start a Project
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
