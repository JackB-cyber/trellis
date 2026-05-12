"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const transparent = !scrolled && !isOpen;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        backgroundColor: transparent ? "rgba(11,19,16,0)" : "rgba(241,235,224,0.97)",
        backdropFilter: transparent ? "blur(0px)" : "blur(12px)",
        boxShadow: transparent
          ? "0 0 0 0 rgba(0,0,0,0)"
          : "0 1px 0 0 rgba(28,24,18,0.08)",
      }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-gold rounded flex items-center justify-center">
              <span className="text-parchment font-bold text-xs tracking-wide">
                TD
              </span>
            </div>
            <span
              className="font-semibold text-base tracking-tight transition-colors duration-300"
              style={{ color: transparent ? "rgba(241,235,224,0.95)" : "#1B3328" }}
            >
              Trellis Digital
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors duration-300"
                style={{
                  color:
                    pathname === link.href
                      ? transparent
                        ? "rgba(184,120,42,1)"
                        : "#B8782A"
                      : transparent
                      ? "rgba(241,235,224,0.7)"
                      : "#6B6358",
                  fontWeight: pathname === link.href ? 500 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-gold text-parchment text-sm font-semibold px-5 py-2.5 rounded hover:bg-gold-light transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 transition-colors duration-300"
            style={{ color: transparent ? "rgba(241,235,224,0.9)" : "#1C1812" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-parchment border-t border-sand overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-sm border-b border-sand last:border-0 transition-colors ${
                    pathname === link.href
                      ? "text-forest font-medium"
                      : "text-muted hover:text-forest"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 text-center bg-gold text-parchment font-semibold py-3 rounded text-sm hover:bg-gold-light transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
