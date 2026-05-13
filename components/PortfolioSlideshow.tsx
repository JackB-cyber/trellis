"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Project {
  name: string;
  industry: string;
  location: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor?: string;
  pattern?: string;
}

interface Props {
  projects: Project[];
}

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (d: number) => ({
    x: d > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.96,
    filter: "blur(4px)",
  }),
};

function PatternOverlay({ pattern, accentColor }: { pattern?: string; accentColor?: string }) {
  const color = accentColor ?? "rgba(255,255,255,0.06)";

  if (pattern === "mountains") {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path
          d="M0 600 L120 320 L240 440 L360 200 L480 380 L600 160 L720 300 L800 220 L800 600 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M0 600 L180 380 L320 480 L460 260 L580 420 L700 200 L800 300 L800 600 Z"
          fill={color}
          opacity="0.08"
        />
        <circle cx="600" cy="120" r="80" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
        <circle cx="600" cy="120" r="140" fill="none" stroke={color} strokeWidth="0.5" opacity="0.12" />
      </svg>
    );
  }

  if (pattern === "organic") {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <ellipse cx="650" cy="150" rx="180" ry="180" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
        <ellipse cx="650" cy="150" rx="120" ry="120" fill={color} opacity="0.07" />
        <ellipse cx="150" cy="480" rx="120" ry="120" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
        <path
          d="M600 50 Q750 150 700 300 Q650 450 500 400 Q350 350 400 200 Q450 50 600 50 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.15"
        />
        <circle cx="680" cy="480" r="40" fill={color} opacity="0.08" />
        <circle cx="100" cy="150" r="60" fill={color} opacity="0.06" />
      </svg>
    );
  }

  if (pattern === "grid") {
    return (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {/* Vertical lines */}
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="600" stroke={color} strokeWidth="0.75" opacity="0.2" />
        ))}
        {/* Horizontal lines */}
        {[100, 200, 300, 400, 500].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} stroke={color} strokeWidth="0.75" opacity="0.2" />
        ))}
        {/* Accent rectangle */}
        <rect x="500" y="80" width="220" height="160" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
        <rect x="520" y="100" width="180" height="120" fill={color} opacity="0.05" />
        {/* Corner marks */}
        <path d="M60 60 L60 90 M60 60 L90 60" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
        <path d="M740 60 L740 90 M740 60 L710 60" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      </svg>
    );
  }

  // Default dot grid
  return (
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseEnter = () => { if (!isMobile) setOpen(true); };
  const handleMouseLeave = () => { if (!isMobile) setOpen(false); };
  const handleClick = () => { if (isMobile) setOpen((p) => !p); };

  return (
    <div
      className="relative overflow-hidden rounded-2xl w-full select-none"
      style={{ height: "clamp(420px, 65vh, 640px)", cursor: isMobile ? "pointer" : "default" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Background — blurs when panel is open (desktop only) */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: open && !isMobile ? "blur(10px) brightness(0.5)" : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className={`absolute inset-0 ${project.gradient}`} />
        <PatternOverlay pattern={project.pattern} accentColor={project.accentColor} />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />

      {/* Accent color pulse in corner */}
      {project.accentColor && (
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}18 0%, transparent 70%)`,
            transform: "translate(30%, -30%)",
          }}
        />
      )}

      {/* Always-visible label */}
      <motion.div
        className="absolute top-8 left-8 right-8 z-10"
        animate={{ opacity: open ? 0 : 1, y: open ? -6 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="inline-block text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
          {project.industry}
        </span>
        <h3 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
          {project.name}
        </h3>
        <p className="text-white/35 text-sm mt-1.5">{project.location}</p>
      </motion.div>

      {/* Hover/tap hint */}
      <motion.div
        className="absolute bottom-7 right-7 z-10"
        animate={{ opacity: open ? 0 : 0.5, y: open ? 6 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
      </motion.div>

      {/* Slide-up overlay */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-ink/92 p-8 ${isMobile ? "" : "backdrop-blur-sm"}`}
        initial={{ y: "100%" }}
        animate={{ y: open ? "0%" : "100%" }}
        transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button — mobile only */}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        <span
          className="text-xs font-semibold tracking-[0.18em] uppercase"
          style={{ color: project.accentColor ?? "#B8782A" }}
        >
          {project.industry}
        </span>
        <h3 className="text-white text-xl font-bold mt-1 mb-0.5">{project.name}</h3>
        <p className="text-white/30 text-xs mb-4">{project.location}</p>
        <p className="text-white/60 text-sm leading-relaxed mb-5">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/6 border border-white/10 text-white/50 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function PortfolioSlideshow({ projects }: Props) {
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) => {
    const next = current + dir;
    if (next >= 0 && next < projects.length) {
      setPage([next, dir]);
    }
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) paginate(1);
    else if (info.offset.x > 60) paginate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      {/* Slide area */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{ willChange: "transform, opacity" }}
          >
            <ProjectCard project={projects[current]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Prev / Next */}
        <div className="flex gap-3">
          <button
            onClick={() => paginate(-1)}
            disabled={current === 0}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-gold/50 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Previous project"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={current === projects.length - 1}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-gold/50 hover:text-gold disabled:opacity-20 disabled:cursor-not-allowed transition-all"
            aria-label="Next project"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > current ? 1 : -1])}
              className="transition-all duration-300"
              aria-label={`Go to project ${i + 1}`}
            >
              <motion.div
                animate={{
                  width: i === current ? 24 : 6,
                  backgroundColor: i === current ? "#B8782A" : "rgba(255,255,255,0.2)",
                }}
                transition={{ duration: 0.3 }}
                className="h-1.5 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Counter */}
        <p className="text-white/25 text-sm tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
