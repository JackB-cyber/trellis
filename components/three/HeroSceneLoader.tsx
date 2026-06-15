"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LatticePoster from "./LatticePoster";

// ssr:false must live in a client component in Next 16 — keeps three out of the server bundle
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <LatticePoster />,
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

  if (!capable) return <LatticePoster />;
  return <HeroScene />;
}
