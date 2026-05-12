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
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-forest-light">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
                <span className="text-forest font-bold text-xs tracking-wide">
                  TD
                </span>
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Trellis Digital
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Done-for-you web design for Canadian small and medium businesses.
              Professional sites, fixed pricing.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
              Get in Touch
            </h3>
            <a
              href="mailto:hello@trellisdigital.ca"
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              hello@trellisdigital.ca
            </a>
            <p className="text-white/50 text-sm mt-2">Alberta, Canada</p>
            <Link
              href="/contact"
              className="inline-block mt-5 bg-gold text-forest text-sm font-semibold px-5 py-2.5 rounded hover:bg-gold-light transition-colors"
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Trellis Digital. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Canadian-owned &amp; operated
          </p>
        </div>
      </div>
    </footer>
  );
}
