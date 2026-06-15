"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MenuOverlay({ open }: { open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      gsap.set(root, { autoAlpha: 0 });
      gsap.set(".menu-panel", { scaleY: 0, transformOrigin: "top center" });
      gsap.set(".menu-link-inner", { yPercent: 115 });
      gsap.set(".menu-footer", { autoAlpha: 0, y: 14 });

      tl.current = gsap
        .timeline({ paused: true })
        .set(root, { autoAlpha: 1 })
        .to(".menu-panel", { scaleY: 1, duration: 0.6, ease: "expo.inOut" })
        .to(
          ".menu-link-inner",
          { yPercent: 0, duration: 0.75, stagger: 0.07, ease: "power4.out" },
          "-=0.18"
        )
        .to(".menu-footer", { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.45");
    },
    { scope: ref }
  );

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.timeScale(1).play();
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      tl.current.timeScale(1.5).reverse();
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [open, lenis]);

  return (
    <div ref={ref} className="fixed inset-0 z-[60] invisible" aria-hidden={!open}>
      <div className="menu-panel absolute inset-0 bg-deep" />

      <nav className="relative h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8 pt-16">
        <ul>
          {links.map((link, i) => (
            <li key={link.href} className="overflow-hidden border-b border-white/[0.06]">
              <Link
                href={link.href}
                className="menu-link-inner group flex items-baseline gap-4 sm:gap-6 py-3 md:py-4"
                tabIndex={open ? 0 : -1}
              >
                <span className="text-gold/50 text-xs sm:text-sm tabular-nums tracking-widest">
                  0{i + 1}
                </span>
                <span
                  className={`display-lg transition-colors duration-300 group-hover:text-gold group-hover:italic ${
                    pathname === link.href ? "text-gold" : "text-bone"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="menu-footer mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-bone/40">
          <a
            href="mailto:hello@trellisdigital.ca"
            className="draw-link hover:text-bone transition-colors"
            tabIndex={open ? 0 : -1}
          >
            hello@trellisdigital.ca
          </a>
          <span>Alberta, Canada · Canadian-owned &amp; operated</span>
        </div>
      </nav>
    </div>
  );
}
