"use client";

/**
 * Reading the token layer at runtime.
 *
 * Canvas cannot use a custom property, so the one place on the site where CSS
 * is not enough is this: the hero has to resolve `--cmp-hero-*` itself and
 * re-resolve it whenever an axis moves. It does *not* get its own observer —
 * `lib/theme/store` already watches `<html>`'s `data-*` attributes, and the
 * DOM is the store, so subscribing to that hook is subscribing to the theme.
 *
 * Everything still goes through the token pipeline: these are component
 * tokens, declared in `tokens/component/hero.json`, pointing at semantics like
 * any recipe in `styles/recipes.css`. The canvas is just a consumer that reads
 * them with `getComputedStyle` instead of with `var()`.
 */

import { useEffect, useState } from "react";

import { useAxes } from "../theme/store";
import type { HeroPalette } from "./types";

/** The CSS custom properties the canvas is allowed to know about. */
const VARS = [
  "--cmp-hero-bg",
  "--cmp-hero-ink-primary",
  "--cmp-hero-ink-secondary",
  "--cmp-hero-ink-tertiary",
  "--cmp-hero-glow",
  "--cmp-hero-grid",
  "--cmp-hero-stroke-width",
] as const;

/**
 * The luminance of a colour, by painting one pixel of it and reading the
 * pixel back. Tokens are `oklch()` with alpha, so parsing the string here
 * would mean shipping a colour library to answer one yes/no question; the
 * browser already has a parser and a compositor, and this uses both.
 */
function isDarkColor(color: string): boolean {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return false;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
  // A translucent surface (the `glass` theme) is judged against the page it
  // sits on, which for an unpainted canvas is whatever `bg` resolves over.
  if (a === 0) return false;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.5;
}

export function readPalette(element: Element): HeroPalette {
  const style = getComputedStyle(element);
  const read = (name: (typeof VARS)[number]) =>
    style.getPropertyValue(name).trim();

  const bg = read("--cmp-hero-bg");

  return {
    bg,
    ink: [
      read("--cmp-hero-ink-primary"),
      read("--cmp-hero-ink-secondary"),
      read("--cmp-hero-ink-tertiary"),
    ],
    glow: read("--cmp-hero-glow"),
    grid: read("--cmp-hero-grid"),
    strokeWidth: Math.max(1, parseFloat(read("--cmp-hero-stroke-width")) || 1),
    isDark: isDarkColor(bg),
  };
}

/**
 * Whether this browser can paint the colours the tokens are written in.
 *
 * The primitives are `oklch()`, which every browser that ships
 * `color-mix()`-era CSS can also parse as a canvas fill — but assigning an
 * unparseable value to `fillStyle` is a *silent no-op*, which would paint the
 * whole hero in whatever colour happened to be set last. So it is checked once
 * and, on a browser that cannot, the canvas never mounts and the static
 * gradient (which is plain CSS, and fine) is what the visitor keeps.
 */
export function canPaint(palette: HeroPalette): boolean {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return false;
  const SENTINEL = "#010203";
  return [palette.bg, ...palette.ink, palette.glow, palette.grid].every(
    (color) => {
      ctx.fillStyle = SENTINEL;
      ctx.fillStyle = color;
      return ctx.fillStyle !== SENTINEL;
    }
  );
}

/** The palette for the current axis selection, re-read when any axis moves. */
export function useHeroPalette(): HeroPalette | null {
  const axes = useAxes();
  const [palette, setPalette] = useState<HeroPalette | null>(null);

  useEffect(() => {
    const next = readPalette(document.documentElement);
    setPalette(canPaint(next) ? next : null);
  }, [axes]);

  return palette;
}
