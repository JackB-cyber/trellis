"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const headlineWords = ["Your", "Local", "Business", "Deserves", "a", "Website", "That"];
const accentWords = ["Works."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="grain relative bg-ink min-h-screen flex items-center overflow-hidden">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(27,51,40,0.6),transparent)]" />

      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-white"
            style={{ top: `${15 + i * 14}%` }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          />
        ))}
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-36"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-8 h-px bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.2em] uppercase">
            Canadian Web Design
          </span>
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em] text-white"
              initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.3 + i * 0.055,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
          {accentWords.map((word, i) => (
            <motion.span
              key={`a${i}`}
              className="inline-block mr-[0.22em] text-gold"
              initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.3 + (headlineWords.length + i) * 0.055,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg sm:text-xl text-white/55 leading-relaxed mb-12 max-w-lg"
        >
          Done-for-you web design for Canadian small businesses. Fixed
          pricing, zero guesswork — from first call to launch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 bg-gold text-parchment font-semibold px-8 py-4 rounded text-[15px] hover:bg-gold-light transition-colors"
          >
            Get a Free Quote
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center justify-center px-8 py-4 rounded text-[15px] font-medium text-white/70 border border-white/15 hover:border-white/35 hover:text-white hover:bg-white/5 transition-all"
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-20 pt-8 border-t border-white/[0.07] flex flex-wrap gap-x-8 gap-y-3"
        >
          {["Fixed pricing", "Canadian owned", "No hidden fees", "1-day response"].map((item) => (
            <span key={item} className="text-white/35 text-sm flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold inline-block" />
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Fade to background color */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-parchment pointer-events-none" />
    </section>
  );
}
