"use client";

import { useEffect, useRef } from "react";

export default function SandCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    interface Grain {
      ox: number; // resting x
      oy: number; // resting y
      x: number;
      y: number;
      size: number;
      opacity: number;
      phase: number;
    }

    let grains: Grain[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let animId: number;

    const INFLUENCE = 88;
    const MAX_DISPLACE = 20;
    const SPRING = 0.11;
    const DRIFT_AMP = 1.4;

    const build = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const count = Math.min(750, Math.floor((w * h) / 1300));
      grains = Array.from({ length: count }, () => {
        const ox = Math.random() * w;
        const oy = Math.random() * h;
        return {
          ox,
          oy,
          x: ox,
          y: oy,
          size: Math.random() * 1.0 + 0.35,
          opacity: Math.random() * 0.12 + 0.04,
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    build();
    window.addEventListener("resize", build);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    let start = performance.now();

    const frame = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const g of grains) {
        // Very slow organic drift at rest
        const driftX = Math.sin(t * 0.00024 + g.phase) * DRIFT_AMP;
        const driftY = Math.cos(t * 0.00031 + g.phase * 1.4) * DRIFT_AMP;

        // Repulsion — measured from resting origin so force is stable
        const dx = mouseX - g.ox;
        const dy = mouseY - g.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = g.ox + driftX;
        let targetY = g.oy + driftY;

        if (dist < INFLUENCE && dist > 0) {
          const strength = Math.pow(1 - dist / INFLUENCE, 1.6);
          targetX -= (dx / dist) * strength * MAX_DISPLACE;
          targetY -= (dy / dist) * strength * MAX_DISPLACE;
        }

        // Spring toward target
        g.x += (targetX - g.x) * SPRING;
        g.y += (targetY - g.y) * SPRING;

        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(241,235,224,${g.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}
