"use client";

import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "@/lib/gsap";

// Drifting ember/spore field — forest-to-gold points rising slowly through the hero.
// Deliberately simple: one draw call, no geometry to misbehave.

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  uniform float uScale;

  attribute float aSeed;
  attribute float aSize;

  varying float vAlpha;
  varying float vGold;

  void main() {
    // position.y stores a phase in [0, 9) — particles rise and wrap, fading at the edges
    float y = mod(position.y + uTime * (0.06 + aSeed * 0.1), 9.0) - 4.5;
    vec3 pos = vec3(position.x, y, position.z);

    float t = uTime * (0.25 + aSeed * 0.35);
    pos.x += sin(t + aSeed * 6.2831) * 0.2;
    pos.z += cos(t * 0.7 + aSeed * 12.566) * 0.15;

    vGold = aSeed;

    float reveal = smoothstep(aSeed - 0.25, aSeed, uReveal);
    float edgeFade = smoothstep(4.6, 3.4, abs(y)) * smoothstep(5.4, 4.0, abs(pos.x));
    float bokehDim = mix(1.0, 0.3, step(40.0, aSize)); // big bokeh discs stay faint
    vAlpha = reveal * edgeFade * bokehDim * (0.3 + 0.7 * fract(aSeed * 7.13));

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uScale * aSize / max(-mv.z, 0.1);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying float vGold;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    float a = smoothstep(0.5, 0.08, d) * vAlpha;
    if (a < 0.005) discard;
    vec3 forest = vec3(0.24, 0.42, 0.31);
    vec3 gold = vec3(0.85, 0.60, 0.27);
    vec3 col = mix(forest, gold, smoothstep(0.3, 0.85, vGold));
    gl_FragColor = vec4(col, a);
  }
`;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildField(count: number) {
  const rand = mulberry32(11);
  const positions = new Float32Array(count * 3);
  const aSeed = new Float32Array(count);
  const aSize = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (rand() - 0.5) * 10; // x
    positions[i * 3 + 1] = rand() * 9; // y phase
    positions[i * 3 + 2] = (rand() - 0.5) * 4; // z depth
    aSeed[i] = rand();
    // mostly fine dust, a few large soft bokeh discs
    aSize[i] = rand() > 0.94 ? 50 + rand() * 50 : 8 + rand() * 22;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
  return geo;
}

interface Props {
  scrollRef: React.RefObject<number>;
  cursorRef: React.RefObject<{ x: number; y: number }>;
  isMobile: boolean;
}

export default function SporeField({ scrollRef, cursorRef, isMobile }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const invalidate = useThree((s) => s.invalidate);

  const geometry = useMemo(() => buildField(isMobile ? 300 : 1100), [isMobile]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uReveal: { value: 0 },
      uScale: {
        value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1,
      },
    }),
    []
  );

  // Material built imperatively: R3F deep-copies a `uniforms` JSX prop, which would
  // disconnect this uniforms object from the material and freeze the animation.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );
  useEffect(() => () => material.dispose(), [material]);

  // Entry: particles fade in staggered by seed
  useEffect(() => {
    const target = { r: 0 };
    const tween = gsap.to(target, {
      r: 1,
      duration: 2.2,
      ease: "power2.out",
      delay: 0.3,
      onUpdate: () => {
        uniforms.uReveal.value = target.r;
        invalidate();
      },
    });
    return () => {
      tween.kill();
    };
  }, [uniforms, invalidate]);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    if (!isMobile) {
      uniforms.uTime.value = state.clock.elapsedTime;
    }

    const scroll = scrollRef.current ?? 0;
    group.position.y = scroll * 1.8;

    const cursor = cursorRef.current ?? { x: 0, y: 0 };
    const targetRotY = cursor.x * 0.06;
    const targetRotX = cursor.y * 0.04;
    group.rotation.y += (targetRotY - group.rotation.y) * 0.05;
    group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef} position={[isMobile ? 0 : 0.6, 0, 0]}>
      <points geometry={geometry} material={material} />
    </group>
  );
}
