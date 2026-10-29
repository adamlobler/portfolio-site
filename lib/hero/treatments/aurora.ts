/**
 * "Aurora" — a gradient mesh of soft blobs on Lissajous paths.
 *
 * The closest thing to what the Spline scene looked like, at roughly four
 * orders of magnitude less code: six radial gradients, each from one token
 * colour to transparent, orbiting on irrational-ratio paths so the
 * composition never repeats.
 *
 * Two details that matter. The gradients end at `transparent` rather than at
 * an alpha of the same colour, because canvas interpolates gradients in
 * premultiplied alpha — so a transparent stop adds no grey fringe and the
 * blob can be written without knowing anything about the colour's format
 * (these are `oklch()` strings straight out of the cascade). And the canvas
 * is cleared rather than faded, so a theme change is visible on the very next
 * frame instead of ghosting for a second.
 */
import type { HeroFrame, Treatment } from "../types";

type Blob = {
  /** Lissajous frequencies and phase, in units of the canvas. */
  fx: number;
  fy: number;
  phase: number;
  /** Radius as a fraction of the canvas diagonal. */
  size: number;
  /**
   * Which palette entry, resolved per frame so a theme swap is free — and
   * resolved from the palette rather than fixed, because `glow` is
   * `accent.subtle`: a pale wash that reads beautifully on a light backdrop
   * and is almost black on a dark one, where an *additive* blob needs a lit
   * colour to add. Same token vocabulary, opposite ends of it.
   */
  ink: (p: HeroFrame["palette"]) => string;
  alpha: number;
};

/**
 * Six blobs, each naming the token it wants on a dark backdrop and the token
 * it wants on a light one.
 *
 * That pairing is not symmetry for its own sake. A semantic colour scale is
 * built so each colour is *legible on its own page*, which means the same
 * token sits at opposite ends of the lightness range in the two appearances —
 * measured across the twelve colour worlds, `accent.subtle` runs L≈0.9 in the
 * light ones and L≈0.1 in the dark ones, and `accent.strong` does the
 * reverse. An additive blob needs a lit colour and a multiplied one needs a
 * pale colour, so each slot asks for whichever end of the ramp its blend mode
 * can actually use. `brutalist` is the theme that makes the point: its accent
 * is an olive at L=0.28, which multiplied over white reads as dirt.
 */
const BLOBS: Blob[] = [
  {
    fx: 0.031,
    fy: 0.047,
    phase: 0.0,
    size: 0.62,
    alpha: 0.75,
    ink: (p) => p.ink[0],
  },
  {
    fx: 0.043,
    fy: 0.029,
    phase: 1.7,
    size: 0.52,
    alpha: 0.7,
    ink: (p) => (p.isDark ? p.ink[2] : p.ink[1]),
  },
  {
    fx: 0.023,
    fy: 0.037,
    phase: 3.1,
    size: 0.7,
    alpha: 0.85,
    ink: (p) => (p.isDark ? p.ink[0] : p.glow),
  },
  {
    /** `accent.strong` either way: the brightest blob on a dark backdrop and
     *  the deepest on a light one, which is the same token doing the same job
     *  from both ends of the ramp. */
    fx: 0.053,
    fy: 0.041,
    phase: 4.6,
    size: 0.42,
    alpha: 0.45,
    ink: (p) => p.ink[2],
  },
  {
    /** `surface.brand` is the one token that stays deep in the dark themes,
     *  so on a dark backdrop this is the mass that keeps the composition from
     *  flattening into a single wash. */
    fx: 0.019,
    fy: 0.059,
    phase: 2.2,
    size: 0.46,
    alpha: 0.55,
    ink: (p) => (p.isDark ? p.ink[1] : p.ink[0]),
  },
  {
    fx: 0.037,
    fy: 0.017,
    phase: 5.4,
    size: 0.56,
    alpha: 0.6,
    ink: (p) => (p.isDark ? p.ink[2] : p.glow),
  },
];

export const aurora: Treatment = {
  id: "aurora",
  label: "Aurora",
  blurb:
    "Six soft gradient blobs on Lissajous paths — the nearest thing to the old 3D scene, in about sixty lines.",

  create() {
    return {
      draw({ ctx, width, height, time, palette }: HeroFrame) {
        ctx.clearRect(0, 0, width, height);

        /**
         * Where two blobs overlap they should behave like what they are: on a
         * dark backdrop they are lights, so they add; on a light one they are
         * washes, so they subtract. Both are blend modes *within* the canvas —
         * the canvas as a whole still composites normally over the gradient,
         * which is what keeps the treatment legible in all twelve colour
         * worlds instead of only in the dark half.
         */
        ctx.globalCompositeOperation = palette.isDark ? "lighter" : "multiply";

        const diagonal = Math.hypot(width, height);

        for (const blob of BLOBS) {
          // Kept inside the frame with a generous margin: a blob whose centre
          // leaves the canvas reads as a wipe rather than as a light source.
          const x =
            width *
            (0.5 + 0.38 * Math.sin(time * blob.fx * Math.PI + blob.phase));
          const y =
            height *
            (0.5 +
              0.34 * Math.cos(time * blob.fy * Math.PI + blob.phase * 1.3));
          const radius = diagonal * blob.size * 0.5;

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, blob.ink(palette));
          gradient.addColorStop(1, "transparent");

          /**
           * The two blend modes do not stack the same way: additive blobs
           * converge on white and stop, while multiplied ones keep darkening
           * with every overlap. So the light half runs at roughly a third of
           * the dark half's alpha — same composition, same tokens, and the
           * headline keeps its contrast where three blobs happen to meet.
           */
          ctx.globalAlpha = blob.alpha * (palette.isDark ? 1.15 : 0.4);
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      },
    };
  },
};
