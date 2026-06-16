"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before",
  afterAlt = "After",
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const afterWrapRef = useRef<HTMLDivElement>(null);
  // Bars live outside the image container — separate refs for opacity updates
  const afterBarRef = useRef<HTMLDivElement>(null);
  const beforeBarRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);
  const dragging = useRef(false);

  function applyPos(p: number) {
    const clamped = Math.min(100, Math.max(0, p));
    posRef.current = clamped;
    if (dividerRef.current) dividerRef.current.style.left = `${clamped}%`;
    if (afterWrapRef.current) afterWrapRef.current.style.clipPath = `inset(0 0 0 ${clamped}%)`;
    // After bar (above image): fades in as slider moves left past centre
    if (afterBarRef.current)
      afterBarRef.current.style.opacity = String(Math.min(1, Math.max(0, (50 - clamped) / 25)));
    // Before bar (below image): fades in as slider moves right past centre
    if (beforeBarRef.current)
      beforeBarRef.current.style.opacity = String(Math.min(1, Math.max(0, (clamped - 50) / 25)));
  }

  // Pointer events on the image area only — setPointerCapture keeps drag smooth
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function getPos(clientX: number) {
      const rect = container!.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }
    function onDown(e: PointerEvent) {
      dragging.current = true;
      container!.setPointerCapture(e.pointerId);
      applyPos(getPos(e.clientX));
    }
    function onMove(e: PointerEvent) {
      if (!dragging.current) return;
      applyPos(getPos(e.clientX));
    }
    function onUp() { dragging.current = false; }

    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerup", onUp);
    container.addEventListener("pointercancel", onUp);
    return () => {
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Wiggle hint on mount — fires once after 1s
  useGSAP(
    () => {
      const proxy = { p: 50 };
      const tl = gsap
        .timeline({ delay: 1 })
        .to(proxy, { p: 35, duration: 0.45, ease: "power2.out",   onUpdate: () => applyPos(proxy.p) })
        .to(proxy, { p: 65, duration: 0.65, ease: "power2.inOut", onUpdate: () => applyPos(proxy.p) })
        .to(proxy, { p: 50, duration: 0.45, ease: "power2.out",   onUpdate: () => applyPos(proxy.p), onComplete: () => applyPos(50) });
      return () => tl.kill();
    },
    { scope: containerRef }
  );

  return (
    <div className={`flex flex-col ${className}`}>
      {/* After bar — above the image, fades in when slider moves left */}
      <div
        ref={afterBarRef}
        className="bg-black/80 flex items-center justify-end px-4 h-9 rounded-t-2xl pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span className="eyebrow">After</span>
      </div>

      {/* Image slider — pointer events and GSAP scope live here */}
      <div
        ref={containerRef}
        className="relative overflow-hidden select-none cursor-col-resize"
        style={{ touchAction: "none", aspectRatio: "1324 / 650" }}
      >
        {/* Before image — base layer */}
        <div className="relative w-full h-full">
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        {/* After image — clipped to the right of the divider */}
        <div
          ref={afterWrapRef}
          className="absolute inset-0"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        >
          <Image
            src={afterSrc}
            alt={afterAlt}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-top"
            draggable={false}
          />
        </div>

        {/* Divider line + handle */}
        <div
          ref={dividerRef}
          className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)] pointer-events-none"
          style={{ left: "50%", marginLeft: "-1px" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5">
            <svg className="w-3 h-3 text-abyss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="w-3 h-3 text-abyss" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Before bar — below the image, fades in when slider moves right */}
      <div
        ref={beforeBarRef}
        className="bg-black/80 flex items-center px-4 h-9 rounded-b-2xl pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span className="eyebrow">Before</span>
      </div>
    </div>
  );
}
