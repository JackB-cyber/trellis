"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  name: string;
  industry: string;
  location: string;
  description: string;
  tags: string[];
  gradient: string;
}

interface Props {
  projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative shrink-0 snap-center overflow-hidden rounded-2xl cursor-default select-none"
      style={{ width: "clamp(280px, 72vw, 840px)", height: "clamp(400px, 65vh, 620px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background — blurs when overlay is open */}
      <motion.div
        className="absolute inset-0"
        animate={{
          filter: hovered ? "blur(8px) brightness(0.55)" : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className={`absolute inset-0 ${project.gradient}`} />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
      </motion.div>

      {/* Always-visible top label */}
      <motion.div
        className="absolute top-8 left-8 right-8"
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <span className="inline-block text-white/50 text-xs font-semibold tracking-[0.18em] uppercase mb-2">
          {project.industry}
        </span>
        <h3 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
          {project.name}
        </h3>
        <p className="text-white/40 text-sm mt-1">{project.location}</p>
      </motion.div>

      {/* Hover arrow hint (desktop) */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{ opacity: hovered ? 0 : 0.4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        </div>
      </motion.div>

      {/* Slide-up overlay panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-ink/90 backdrop-blur-sm p-8"
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Project name repeated in panel */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-gold text-xs font-semibold tracking-[0.18em] uppercase">
              {project.industry}
            </span>
            <h3 className="text-white text-xl font-bold mt-1">{project.name}</h3>
            <p className="text-white/35 text-xs mt-0.5">{project.location}</p>
          </div>
        </div>

        <p className="text-white/65 text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-white/8 border border-white/10 text-white/60 px-3 py-1 rounded-full"
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
  return (
    <div className="relative">
      {/* Scroll track */}
      <div
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))", paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))" }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 bottom-6 w-16 bg-gradient-to-r from-deep to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-6 w-16 bg-gradient-to-l from-deep to-transparent pointer-events-none" />
    </div>
  );
}
