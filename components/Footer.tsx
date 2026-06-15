import Link from "next/link";
import Reveal from "./Reveal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_110%,rgba(27,51,40,0.45),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 md:pt-28 pb-10">
        <Reveal>
          <p className="eyebrow mb-6">Get in touch</p>
          <h2 className="display-lg text-bone max-w-3xl mb-8">
            Let&apos;s build something that <span className="accent-word">lasts.</span>
          </h2>
          <a
            href="mailto:hello@trellisdigital.ca"
            className="draw-link inline-block text-bone/70 hover:text-bone text-lg md:text-2xl font-light transition-colors"
          >
            hello@trellisdigital.ca
          </a>
        </Reveal>

        <div className="mt-16 md:mt-24 pt-10 border-t border-white/[0.07] grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-gold rounded flex items-center justify-center">
                <span className="text-abyss font-bold text-xs tracking-wide">TD</span>
              </div>
              <span className="font-display text-base text-bone tracking-tight">Trellis Digital</span>
            </div>
            <p className="text-bone/30 text-sm leading-relaxed max-w-xs">
              Done-for-you web design for Canadian small businesses. Fixed pricing,
              no surprises, real communication.
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-bone/40 text-sm hover:text-bone transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Social</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/40 text-sm hover:text-bone transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone/40 text-sm hover:text-bone transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Start a project</h3>
            <p className="text-bone/30 text-sm mb-4">Alberta, Canada</p>
            <Link
              href="/contact"
              className="inline-flex border border-gold/40 text-gold text-sm font-medium px-5 py-2 rounded-full hover:bg-gold hover:text-abyss transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-bone/20 text-sm">
            © {new Date().getFullYear()} Trellis Digital. All rights reserved.
          </p>
          <p className="text-bone/20 text-sm">Made in Canada</p>
        </div>
      </div>
    </footer>
  );
}
