"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ssr:false must live in a client component in Next 16 — keeps three out of the server bundle.
// Fallback is null (not a poster): the hero already paints its own dark gradient backdrop, so
// there's nothing to fill, and the firefly scene fades in from zero on its own.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroSceneLoader() {
  const [capable, setCapable] = useState<boolean | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setCapable(!reduced && webgl);
  }, []);

  // No-WebGL / reduced-motion users get the hero's static gradient backdrop, no particles.
  if (!capable) return null;
  return <HeroScene />;
}
