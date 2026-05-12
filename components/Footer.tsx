import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="grain relative bg-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(27,51,40,0.3),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/[0.07]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 bg-gold rounded flex items-center justify-center">
                <span className="text-parchment font-bold text-xs tracking-wide">TD</span>
              </div>
              <span className="font-semibold text-base tracking-tight">Trellis Digital</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Done-for-you web design for Canadian small and medium businesses.
              Professional sites, fixed pricing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gold text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold text-xs font-semibold uppercase tracking-[0.18em] mb-5">
              Get in Touch
            </h3>
            <a
              href="mailto:hello@trellisdigital.ca"
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              hello@trellisdigital.ca
            </a>
            <p className="text-white/25 text-sm mt-1.5">Alberta, Canada</p>
            <Link
              href="/contact"
              className="inline-block mt-6 bg-gold text-parchment text-sm font-semibold px-5 py-2.5 rounded hover:bg-gold-light transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Trellis Digital. All rights reserved.
          </p>
          <p className="text-white/20 text-sm">Canadian-owned &amp; operated</p>
        </div>
      </div>
    </footer>
  );
}
