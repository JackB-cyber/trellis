"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isMobile = useIsMobile();

  const initial = {
    opacity: 0,
    y: direction === "up" ? 24 : 0,
    x: direction === "left" ? -24 : direction === "right" ? 24 : 0,
    ...(isMobile ? {} : { filter: "blur(4px)" }),
  };

  const visible = {
    opacity: 1,
    y: 0,
    x: 0,
    ...(isMobile ? {} : { filter: "blur(0px)" }),
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? visible : initial}
      transition={{
        duration: isMobile ? 0.4 : 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
