"use client";

import { useEffect, useRef, useState } from "react";

import {
  createEngine,
  type Engine,
  type EngineStats,
} from "../../lib/hero/engine";
import { useHeroPalette } from "../../lib/hero/palette";
import { DEFAULT_TREATMENT, treatmentById } from "../../lib/hero/treatments";

/**
 * The canvas, and only the canvas.
 *
 * It is never on the critical path: `HeroBackdrop` loads it with
 * `next/dynamic` after hydration, the headline is server markup that does not
 * wait for it, and the static gradient it fades in over is already painted.
 * If this chunk never arrives — JS off, a network failure, a browser that
 * cannot parse `oklch()` — the hero is the gradient, which is the same tokens.
 *
 * The engine is created once per treatment and kept across theme changes:
 * `setPalette` hands it new colours mid-flight, so switching themes
 * *recolours* the running animation rather than restarting it.
 */
export default function HeroCanvas({
  treatmentId,
  className,
  onStats,
}: {
  treatmentId?: string;
  className?: string;
  onStats?: (stats: EngineStats) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const palette = useHeroPalette();
  const [painted, setPainted] = useState(false);

  // Kept in a ref so a new callback identity cannot tear the engine down.
  const statsRef = useRef(onStats);
  statsRef.current = onStats;

  const treatment =
    (treatmentId ? treatmentById(treatmentId) : undefined) ?? DEFAULT_TREATMENT;

  /**
   * The palette the engine is *built* with, versus the palette it is *given*:
   * the first effect only re-runs when the treatment changes or when a palette
   * becomes available at all, and the second pushes every later change into
   * the running engine.
   */
  const paletteRef = useRef(palette);
  paletteRef.current = palette;
  const engineRef = useRef<Engine | null>(null);
  const ready = palette !== null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const initial = paletteRef.current;
    if (!canvas || !initial) return;

    const engine = createEngine({
      canvas,
      treatment,
      palette: initial,
      onFirstFrame: () => setPainted(true),
      onStats: (stats) => statsRef.current?.(stats),
    });
    engineRef.current = engine;

    return () => {
      engine.destroy();
      engineRef.current = null;
      setPainted(false);
    };
  }, [treatment, ready]);

  useEffect(() => {
    if (palette) engineRef.current?.setPalette(palette);
  }, [palette]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hero__canvas${painted ? " is-painted" : ""}${
        className ? ` ${className}` : ""
      }`}
    />
  );
}
