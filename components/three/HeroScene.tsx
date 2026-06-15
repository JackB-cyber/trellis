"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import SporeField from "./SporeField";

// Hands the R3F invalidate function out to DOM-side scroll handlers (demand mode).
function InvalidateBridge({ fnRef }: { fnRef: React.RefObject<(() => void) | null> }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    fnRef.current = invalidate;
    return () => {
      fnRef.current = null;
    };
  }, [invalidate, fnRef]);
  return null;
}

export default function HeroScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const cursorRef = useRef({ x: 0, y: 0 });
  const invalidateRef = useRef<(() => void) | null>(null);
  const isMobile = useIsMobile();
  const [inView, setInView] = useState(true);

  // Scroll progress of the parent hero section drives the scene
  useGSAP(
    () => {
      const section = wrapRef.current?.closest("section");
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self) => {
          scrollRef.current = self.progress;
          invalidateRef.current?.();
        },
      });
    },
    { scope: wrapRef }
  );

  // Cursor parallax — desktop only
  useEffect(() => {
    if (isMobile) return;
    const section = wrapRef.current?.closest("section");
    if (!section) return;
    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      cursorRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      cursorRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    section.addEventListener("pointermove", onMove as EventListener, { passive: true });
    return () => section.removeEventListener("pointermove", onMove as EventListener);
  }, [isMobile]);

  // Stop rendering entirely once the hero is off screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = !inView ? "never" : isMobile ? "demand" : "always";

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 38 }}
        dpr={isMobile ? 1 : [1, 1.75]}
        frameloop={frameloop}
        gl={{ powerPreference: "high-performance", antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
      >
        <InvalidateBridge fnRef={invalidateRef} />
        <SporeField scrollRef={scrollRef} cursorRef={cursorRef} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
