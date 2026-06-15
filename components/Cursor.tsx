"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/** Gold dot + trailing ring cursor accent. Fine-pointer devices only; native cursor stays visible. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    // Velocity-driven sizing: the ring shrinks as the cursor speeds up and eases
    // back to full size as it slows or stops. Hover state (link/drag) and velocity
    // both feed a single scale, applied each frame so they compose without fighting.
    const MIN_SCALE = 0.55; // smallest the ring gets at top speed
    const SPEED_REF = 2.5; // px/ms that maps to maximum shrink
    let speed = 0; // smoothed pointer speed (px/ms)
    let velTarget = 1; // size target derived from speed
    let velScale = 1; // current velocity-based scale (eased toward target)
    let hoverScale = 1; // current hover-based scale (eased)
    let hoverTarget = 1; // hover-based scale target
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let lastMove = 0;
    let primed = false;

    const speedToScale = (s: number) => 1 - Math.min(s / SPEED_REF, 1) * (1 - MIN_SCALE);

    const tick = () => {
      // When the cursor hasn't moved recently, bleed speed off so the ring grows back.
      if (performance.now() - lastMove > 60) {
        speed *= 0.8;
        velTarget = speedToScale(speed);
      }
      velScale += (velTarget - velScale) * 0.18; // eased — never abrupt
      hoverScale += (hoverTarget - hoverScale) * 0.2;
      gsap.set(ring, { scale: hoverScale * velScale });
    };
    gsap.ticker.add(tick);

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.25 });
      }
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      if (primed) {
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        const sample = dist / dt; // px per ms
        speed += (sample - speed) * 0.4; // smooth incoming samples
        velTarget = speedToScale(speed);
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      lastMove = now;
      primed = true;

      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (!target) return;
      const mode = target.getAttribute("data-cursor");
      if (mode === "drag") {
        label.textContent = "Drag";
        hoverTarget = 2.4;
        gsap.to(ring, { backgroundColor: "rgba(184,120,42,0.92)", duration: 0.3 });
        gsap.to(label, { autoAlpha: 1, duration: 0.2 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else {
        hoverTarget = 1.7;
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      if (!target) return;
      hoverTarget = 1;
      gsap.to(ring, { backgroundColor: "rgba(184,120,42,0)", duration: 0.3 });
      gsap.to(label, { autoAlpha: 0, duration: 0.15 });
      gsap.to(dot, { autoAlpha: 1, duration: 0.2 });
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold" />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="text-[10px] font-semibold uppercase tracking-widest text-abyss opacity-0"
        >
          Drag
        </span>
      </div>
    </div>
  );
}
