"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const headlineWords = ["Your", "Local", "Business", "Deserves", "a", "Website", "That"];
const accentWords = ["Works."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const slowX = useSpring(mouseX, { stiffness: 18, damping: 18 });
  const slowY = useSpring(mouseY, { stiffness: 18, damping: 18 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const orbX1 = useTransform(smoothX, [0, 1], ["-10%", "30%"]);
  const orbY1 = useTransform(smoothY, [0, 1], ["-20%", "20%"]);
  const orbX2 = useTransform(slowX, [0, 1], ["40%", "80%"]);
  const orbY2 = useTransform(slowY, [0, 1], ["10%", "60%"]);

  return (
    <section ref={ref} className="grain relative bg-ink min-h-screen flex items-center overflow-hidden">
      {/* Cursor-reactive gradient orbs — reduced on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              x: orbX1,
              y: orbY1,
              background: "radial-gradient(circle, rgba(27,51,40,0.65) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              x: orbX2,
              y: orbY2,
              background: "radial-gradient(circle, rgba(184,120,42,0.12) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </>
      )}
      {isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(27,51,40,0.5) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Static depth gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-5%,rgba(27,51,40,0.5),transparent)] pointer-events-none" />

      {/* Scan lines — pure CSS, zero JS animation cost */}
      <div
        className="scan-lines absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent calc(12.5% - 0.5px), rgba(255,255,255,0.04) calc(12.5% - 0.5px), rgba(255,255,255,0.04) 12.5%)",
        }}
      />

      {/* Two-column layout */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity, willChange: "transform, opacity" }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-32 pt-36"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — copy */}
          <div className="flex-1 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.div
                className="h-px bg-gold"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              />
              <span className="text-gold text-xs font-semibold tracking-[0.22em] uppercase">
                Canadian Web Design
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.22em] text-white"
                  initial={{ opacity: 0, y: isMobile ? 12 : 20, ...(isMobile ? {} : { filter: "blur(12px)" }) }}
                  animate={{ opacity: 1, y: 0, ...(isMobile ? {} : { filter: "blur(0px)" }) }}
                  transition={{ duration: isMobile ? 0.35 : 0.55, delay: 0.3 + i * (isMobile ? 0.03 : 0.055), ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              {accentWords.map((word, i) => (
                <motion.span
                  key={`a${i}`}
                  className="inline-block mr-[0.22em] text-gold"
                  initial={{ opacity: 0, y: isMobile ? 12 : 20, ...(isMobile ? {} : { filter: "blur(12px)" }) }}
                  animate={{ opacity: 1, y: 0, ...(isMobile ? {} : { filter: "blur(0px)" }) }}
                  transition={{
                    duration: isMobile ? 0.35 : 0.55,
                    delay: 0.3 + (headlineWords.length + i) * (isMobile ? 0.03 : 0.055),
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-lg sm:text-xl text-white/50 leading-relaxed mb-12 max-w-lg"
            >
              Web design for Canadian small businesses. Fixed pricing, honest
              timelines, and everything handled start to finish.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 bg-gold text-parchment font-semibold px-8 py-4 rounded text-[15px] hover:bg-gold-light transition-colors"
              >
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center px-8 py-4 rounded text-[15px] font-medium text-white/60 border border-white/12 hover:border-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-16 pt-8 border-t border-white/[0.06] grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8"
            >
              {["Fixed pricing", "Canadian owned", "No hidden fees", "1-day response"].map((item) => (
                <span key={item} className="text-white/30 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold inline-block" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Browser mockup (desktop only) */}
          <motion.div
            className="hidden lg:block flex-shrink-0 w-[460px] relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Floating stat badge — top right */}
            <motion.div
              className="absolute -top-5 -right-6 z-20 bg-forest border border-forest-light rounded-xl px-4 py-2.5 shadow-2xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ willChange: "transform" }}
            >
              <div className="text-gold text-sm font-bold">↑ 40% more leads</div>
              <div className="text-white/40 text-xs mt-0.5">3 months post-launch</div>
            </motion.div>

            {/* Floating stat badge — bottom left */}
            <motion.div
              className="absolute -bottom-5 -left-6 z-20 bg-parchment rounded-xl px-4 py-2.5 shadow-2xl"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{ willChange: "transform" }}
            >
              <div className="text-forest text-sm font-bold">PageSpeed 98</div>
              <div className="text-muted text-xs mt-0.5">Performance score</div>
            </motion.div>

            {/* Browser frame */}
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              {/* Chrome bar */}
              <div className="bg-white/8 border-b border-white/8 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                </div>
                <div className="flex-1 bg-white/8 rounded px-3 py-1 text-white/25 text-xs font-mono">
                  yourclient.com
                </div>
              </div>

              {/* Simulated page content */}
              <div className="bg-[#0d1a14] p-5 space-y-4">
                {/* Fake nav */}
                <div className="flex items-center justify-between pb-3 border-b border-white/6">
                  <div className="w-16 h-3 bg-white/20 rounded" />
                  <div className="flex gap-2 items-center">
                    <div className="w-8 h-2 bg-white/10 rounded" />
                    <div className="w-8 h-2 bg-white/10 rounded" />
                    <div className="w-8 h-2 bg-white/10 rounded" />
                    <div className="w-16 h-6 bg-gold/60 rounded" />
                  </div>
                </div>

                {/* Fake hero text */}
                <div className="py-4 space-y-2">
                  <div className="w-3/4 h-5 bg-white/25 rounded" />
                  <div className="w-1/2 h-5 bg-gold/40 rounded" />
                  <div className="w-full h-2 bg-white/8 rounded mt-3" />
                  <div className="w-5/6 h-2 bg-white/8 rounded" />
                  <div className="flex gap-2 mt-4">
                    <div className="w-20 h-7 bg-gold/60 rounded" />
                    <div className="w-20 h-7 bg-white/8 rounded border border-white/10" />
                  </div>
                </div>

                {/* Fake cards row */}
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="bg-white/4 border border-white/6 rounded-lg p-3">
                      <div className="w-5 h-5 bg-gold/25 rounded mb-2" />
                      <div className="w-full h-2 bg-white/15 rounded mb-1" />
                      <div className="w-2/3 h-1.5 bg-white/8 rounded" />
                    </div>
                  ))}
                </div>

                {/* Fake testimonial strip */}
                <div className="bg-white/4 border border-white/6 rounded-lg p-3 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, s) => (
                      <div key={s} className="w-2 h-2 bg-gold/50 rounded-sm" />
                    ))}
                  </div>
                  <div className="flex-1 h-2 bg-white/10 rounded" />
                  <div className="w-6 h-6 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fade to page bg */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent to-parchment pointer-events-none" />
    </section>
  );
}
