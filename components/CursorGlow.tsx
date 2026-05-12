"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring, motion, useMotionTemplate } from "framer-motion";

export default function CursorGlow() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 22, restDelta: 0.001 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 22, restDelta: 0.001 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(520px circle at ${springX}px ${springY}px, rgba(184,120,42,0.07), transparent 70%)`;

  return (
    <motion.div
      className="fixed inset-0 z-[1] pointer-events-none"
      style={{ background }}
      aria-hidden
    />
  );
}
