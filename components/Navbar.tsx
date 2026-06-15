"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuOverlay from "./MenuOverlay";
import TrellisLogo from "./TrellisLogo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setOpen(false);
  }, [pathname]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-[70] transition-colors duration-300 border-b ${
          solid
            ? "bg-abyss md:bg-abyss/80 md:backdrop-blur-md border-white/[0.06]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
            <TrellisLogo height={28} />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href="/contact"
              className="hidden sm:inline-flex border border-gold/40 text-gold text-sm font-medium px-5 py-2 rounded-full hover:bg-gold hover:text-abyss transition-colors"
            >
              Get a Quote
            </Link>

            <button
              onClick={() => setOpen((p) => !p)}
              aria-expanded={open}
              aria-label="Toggle navigation menu"
              className="group flex items-center gap-2.5 text-bone text-sm font-medium tracking-wide py-2"
            >
              <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="relative w-6 h-3.5 flex flex-col justify-between">
                <span
                  className={`block h-px bg-bone transition-transform duration-300 origin-center ${
                    open ? "translate-y-[6.5px] rotate-45" : "group-hover:scale-x-75"
                  }`}
                />
                <span
                  className={`block h-px bg-bone transition-transform duration-300 origin-center ${
                    open ? "-translate-y-[6.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} />
    </>
  );
}
