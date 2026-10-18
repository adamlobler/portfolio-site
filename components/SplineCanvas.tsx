"use client";

import Spline from "@splinetool/react-spline";

/**
 * A one-line wrapper that exists purely so `HeroScene` has something local to
 * `next/dynamic`. `@splinetool/react-spline`'s exports map declares only an
 * `import` condition, so webpack cannot resolve the bare package path from
 * inside an `import()` — it resolves fine from a static import, which is what
 * this file is.
 */
export default function SplineCanvas({
  scene,
  onLoad,
}: {
  scene: string;
  onLoad: () => void;
}) {
  return (
    <Spline
      className="absolute w-screen z-0 h-full"
      scene={scene}
      onLoad={onLoad}
    />
  );
}
