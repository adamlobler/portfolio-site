/**
 * Scaffolding script — regenerates `tokens/primitives/color.json`.
 *
 * Primitive colour ramps are *perceptually* even, not evenly spaced in sRGB:
 * every step is placed on a fixed OKLCH lightness curve with a chroma bell that
 * peaks mid-ramp, which is why the 500s read as "the same strength" across hues.
 *
 * Two kinds of ramp:
 *   - `derive`: generated from an anchor hue/chroma (the five new theme ramps).
 *   - `adopt` : the existing brand hexes, converted to OKLCH so the whole
 *               primitive layer speaks one colour space. Values are preserved,
 *               not re-derived, so the violet theme still matches the live site.
 *
 * Run with `node tokens/scripts/make-color-primitives.mjs`. The emitted JSON is
 * committed and is the source of truth; this script only exists so the curve
 * behind the numbers is auditable.
 */
import { writeFileSync } from "node:fs";
import { converter, formatHex } from "culori";

const toOklch = converter("oklch");
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

/** Fixed lightness curve shared by every derived ramp. */
const LIGHTNESS = [0.975, 0.94, 0.885, 0.825, 0.75, 0.665, 0.58, 0.49, 0.405, 0.32, 0.22];
/** Chroma multiplier — peaks at 500, collapses at both ends. */
const CHROMA_CURVE = [0.18, 0.34, 0.6, 0.82, 0.96, 1, 0.94, 0.82, 0.66, 0.5, 0.34];

const round = (n, p = 4) => Number(n.toFixed(p));

/** Derive an 11-step ramp from a peak chroma and a hue (optionally a hue arc). */
function derive({ hue, chroma, hueShift = 0 }) {
  return STEPS.map((step, i) => [
    step,
    {
      l: round(LIGHTNESS[i], 3),
      c: round(chroma * CHROMA_CURVE[i]),
      h: round(hue + hueShift * (i / (STEPS.length - 1) - 0.5) * 2, 2),
    },
  ]);
}

/** Convert existing brand hexes to OKLCH, keeping their exact appearance. */
function adopt(hexes) {
  return Object.entries(hexes).map(([step, hex]) => {
    const { l, c, h } = toOklch(hex);
    return [step, { l: round(l, 3), c: round(c), h: round(h ?? 0, 2) }];
  });
}

const css = ({ l, c, h }) => `oklch(${l} ${c} ${h})`;

const RAMPS = {
  // --- adopted from the live site, so the violet theme is pixel-faithful -----
  neutral: {
    $description: "Cool grey. The site's existing `gray` scale, adopted as-is.",
    steps: adopt({
      50: "#F0F1F3", 100: "#E0E1E7", 200: "#C1C3CE", 300: "#A2A5B6",
      400: "#83879D", 500: "#646985", 600: "#4B4F64", 700: "#323543",
      800: "#191A21", 900: "#0A0B0D", 950: "#050507",
    }),
  },
  violet: {
    $description: "Brand violet. The site's existing `primary` scale, adopted as-is.",
    steps: adopt({
      50: "#EEEAFE", 100: "#DCD5FB", 200: "#BAABF8", 300: "#9780F4",
      400: "#7556F1", 500: "#522CED", 600: "#3E21B2", 700: "#291677",
      800: "#150B3B", 900: "#080418", 950: "#04020C",
    }),
  },
  // --- derived ramps for the five new themes --------------------------------
  steel: { $description: "Ink-blue accent for the `slate` editorial theme.", steps: derive({ hue: 248, chroma: 0.085 }) },
  ink: { $description: "Near-achromatic ramp for `brutalist`; deliberately harsh.", steps: derive({ hue: 270, chroma: 0.008 }) },
  electric: { $description: "High-voltage yellow accent for `brutalist`.", steps: derive({ hue: 102, chroma: 0.185 }) },
  carbon: { $description: "Black-green neutral for the `terminal` theme.", steps: derive({ hue: 158, chroma: 0.032 }) },
  phosphor: { $description: "CRT phosphor green accent for `terminal`.", steps: derive({ hue: 146, chroma: 0.19 }) },
  stone: { $description: "Warm neutral for the `solar` theme.", steps: derive({ hue: 68, chroma: 0.022 }) },
  amber: { $description: "Low-sun amber accent for `solar`.", steps: derive({ hue: 62, chroma: 0.17, hueShift: 26 }) },
  azure: { $description: "Cold translucent blue accent for `glass`.", steps: derive({ hue: 232, chroma: 0.145 }) },
};

/**
 * Translucent primitives. Opaque ramps cannot express a surface you can see
 * through, which the `glass` theme is entirely built on, so alpha is a first-
 * class part of the primitive layer rather than something semantics invent.
 */
const ALPHAS = [4, 8, 12, 16, 24, 32, 48, 64, 80];
const alpha = {};
for (const a of ALPHAS) {
  alpha[`white-${a}`] = { $value: `oklch(1 0 0 / ${a / 100})` };
  alpha[`black-${a}`] = { $value: `oklch(0 0 0 / ${a / 100})` };
}

const color = {
  $type: "color",
  white: { $value: "#ffffff" },
  black: { $value: "#000000" },
  transparent: { $value: "transparent" },
  alpha: { $description: "Neutral translucency steps, as percentages.", ...alpha },
};

for (const [name, { $description, steps }] of Object.entries(RAMPS)) {
  color[name] = { $description };
  for (const [step, oklch] of steps) {
    color[name][step] = { $value: css(oklch), $description: formatHex(css(oklch)) ?? undefined };
  }
}

writeFileSync(
  new URL("../primitives/color.json", import.meta.url),
  JSON.stringify({ prim: { color } }, null, 2) + "\n"
);
console.log("wrote tokens/primitives/color.json");
