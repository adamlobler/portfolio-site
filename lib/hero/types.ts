/**
 * The contract between the hero's canvas engine and the three treatments.
 *
 * Nothing here is React, and nothing here names a colour: a treatment is a
 * pure function of time and a palette it is handed, and the palette is read
 * out of the CSS cascade (see `palette.ts`). That is the whole trick behind
 * "the hero repaints when you change the theme" — the treatments never learn
 * which theme is on, they just get different strings.
 */

/** The `--cmp-hero-*` colours a treatment may paint with. */
export type HeroPalette = {
  /** The backdrop. The canvas itself stays transparent, so this is for
   *  treatments that need to know what they are sitting on. */
  bg: string;
  /** Three marks, in the order a treatment should reach for them. */
  ink: readonly [string, string, string];
  glow: string;
  grid: string;
  /** `--cmp-hero-stroke-width`, resolved to CSS px. */
  strokeWidth: number;
  /**
   * Whether `bg` is a dark surface, measured rather than assumed — the
   * appearance axis is not the answer, because `brutalist` light and `glass`
   * dark are nothing like each other. A treatment that composites (rather
   * than just draws) needs this to pick a blend mode that adds light on a
   * dark backdrop and removes it on a light one.
   */
  isDark: boolean;
};

export type HeroFrame = {
  ctx: CanvasRenderingContext2D;
  /** CSS pixels — the context is pre-scaled by the device pixel ratio. */
  width: number;
  height: number;
  /** Seconds since the treatment started drawing. */
  time: number;
  /** Seconds since the previous frame, clamped so a backgrounded tab does not
   *  teleport everything on the first frame back. */
  dt: number;
  palette: HeroPalette;
};

export type HeroRenderer = {
  /** Called on mount and on every resize, in CSS pixels. */
  resize?(width: number, height: number): void;
  draw(frame: HeroFrame): void;
};

export type Treatment = {
  id: string;
  label: string;
  /** One line, shown in `/lab` next to the canvas. */
  blurb: string;
  create(): HeroRenderer;
};
