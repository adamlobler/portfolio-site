"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

/**
 * The Spline canvas, and nothing else. Split out of `Hero` so that `Hero`
 * itself can be a server component: the headline and the CTAs are now plain
 * server markup and reach the browser in the static HTML, while the three.js
 * runtime stays behind this boundary.
 *
 * `ssr: false` is what keeps the runtime out of the homepage's first chunk —
 * it used to be a static import in a client component, so every visitor paid
 * for it before anything rendered. Phase 4 deletes this file along with
 * Spline itself.
 */
const SplineCanvas = dynamic(() => import("./SplineCanvas"), {
  ssr: false,
});

export default function HeroScene({ scene }: { scene: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute w-screen z-0 h-full">
      {/**
       * The placeholder is the price of un-gating the headline. The Spline
       * scene renders on a *transparent* canvas, so until it resolves the
       * white `<h1>` would be sitting on the near-white page. This is plain
       * server markup — it is in the static HTML, it needs no JS, and with JS
       * off it simply stays. It crossfades out as the canvas fades in, so the
       * loaded hero looks exactly as it did before.
       */}
      <div
        className={`absolute w-screen h-full bg-gray-800 transition-opacity duration-1000 ease-out ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      {/**
       * The fade is the only thing `isLoaded` still drives. It used to also
       * gate the `<h1>`, which is what kept the LCP text out of the HTML.
       */}
      <div
        className={`absolute w-screen z-0 h-full transition-opacity duration-1000 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <SplineCanvas scene={scene} onLoad={() => setIsLoaded(true)} />
      </div>
      <div className="absolute w-screen z-0 bottom-0 h-[60px] bg-white dark:bg-black" />
    </div>
  );
}
