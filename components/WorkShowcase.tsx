"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Reveal from "./Reveal";
import { PatternOverlay, type Project } from "./PortfolioSlideshow";

/** Desktop work presentation: full-bleed panels with clip reveals and parallax media. */
export default function WorkShowcase({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".work-media").forEach((media) => {
        gsap.fromTo(
          media,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: { trigger: media, start: "top 78%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".work-media-inner").forEach((inner) => {
        gsap.fromTo(
          inner,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: inner.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-32 lg:gap-44">
      {projects.map((project, i) => (
        <article key={project.name}>
          {/* Parallax media frame */}
          <div
            className="work-media relative overflow-hidden rounded-2xl"
            style={{ height: "clamp(420px, 68vh, 700px)", clipPath: "inset(0 0 100% 0)" }}
          >
            <div className={`work-media-inner absolute -top-[10%] -bottom-[10%] left-0 right-0 ${project.gradient}`}>
              <PatternOverlay pattern={project.pattern} accentColor={project.accentColor} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
            <span
              className="absolute bottom-6 right-8 font-display text-[6rem] leading-none text-white/10 select-none"
              aria-hidden
            >
              0{i + 1}
            </span>
          </div>

          {/* Project info */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-20 mt-10">
            <Reveal>
              <p className="eyebrow mb-3" style={{ color: project.accentColor }}>
                {project.industry}
              </p>
              <h2 className="display-lg text-bone">{project.name}</h2>
              {project.location && (
                <p className="text-bone/35 text-sm mt-2">{project.location}</p>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-bone/50 text-lg leading-relaxed mb-7 lg:pt-10">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/[0.05] border border-white/10 text-bone/50 px-3.5 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </article>
      ))}
    </div>
  );
}
