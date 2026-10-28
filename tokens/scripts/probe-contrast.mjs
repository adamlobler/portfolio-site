#!/usr/bin/env node
/**
 * Contrast probe — the tool used to pick ramp steps when the gate rejects a pair.
 *
 * The gate in `tokens/lib/contrast.mjs` tells you a pair is too close; this
 * tells you which step of a ramp would clear it, so choosing a replacement is a
 * lookup rather than a guessing game.
 *
 *   node tokens/scripts/probe-contrast.mjs <fg-ramp|fg-ref> <bg-ref...>
 *
 *   # which violet step reads on the dark surfaces?
 *   node tokens/scripts/probe-contrast.mjs violet neutral.900 neutral.800
 *
 *   # can white sit on these?
 *   node tokens/scripts/probe-contrast.mjs white violet.300 violet.400
 *
 * Translucent refs are composited the same way the gate composites them.
 */
import { readFileSync } from "node:fs";
import { converter } from "culori";
import { APCAcontrast, sRGBtoY } from "apca-w3";

const toRgb = converter("rgb");
const prim = JSON.parse(
  readFileSync(new URL("../primitives/color.json", import.meta.url))
).prim.color;
const at = (path) => path.split(".").reduce((node, key) => node?.[key], prim);
const literal = (ref) => {
  const node = at(ref.replace(/^\{?prim\.color\./, "").replace(/\}$/, ""));
  if (!node?.$value) throw new Error(`No primitive colour "${ref}"`);
  return node.$value;
};

const parse = (value) => {
  const c = toRgb(value);
  const q = (n) => Math.max(0, Math.min(255, Math.round(n * 255)));
  return { rgb: [q(c.r), q(c.g), q(c.b)], alpha: c.alpha ?? 1 };
};
const composite = ({ rgb, alpha }, under) =>
  alpha >= 1
    ? rgb
    : rgb.map((v, i) => Math.round(v * alpha + under[i] * (1 - alpha)));
const srgbToLin = (c) =>
  c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const lum = ([r, g, b]) =>
  0.2126 * srgbToLin(r / 255) +
  0.7152 * srgbToLin(g / 255) +
  0.0722 * srgbToLin(b / 255);
const wcag = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const [target, ...bgRefs] = process.argv.slice(2);
if (!target || !bgRefs.length) {
  console.error("usage: probe-contrast.mjs <fg-ramp|fg-ref> <bg-ref...>");
  process.exit(2);
}
const PAGE = process.env.UNDER === "dark" ? [0, 0, 0] : [255, 255, 255];
const steps =
  /\./.test(target) || target === "white" || target === "black"
    ? [target]
    : [
        "white",
        "black",
        ...Object.keys(prim[target] ?? {})
          .filter((k) => !k.startsWith("$"))
          .map((s) => `${target}.${s}`),
      ];
if (steps.length === 0) throw new Error(`No ramp "${target}"`);

const bgs = bgRefs.map((ref) => ({
  ref,
  rgb: composite(parse(literal(ref)), PAGE),
}));
const W = 17;
console.log("fg".padEnd(W) + bgs.map((b) => b.ref.padEnd(W)).join(""));
for (const step of steps) {
  const fg = parse(literal(step));
  const cells = bgs.map((b) => {
    const flat = composite(fg, b.rgb);
    const ratio = wcag(flat, b.rgb);
    const lc = Math.abs(APCAcontrast(sRGBtoY(flat), sRGBtoY(b.rgb)));
    const mark = ratio >= 4.5 ? "✓" : ratio >= 3 ? "~" : "✗";
    return `${mark} ${ratio.toFixed(2)} Lc${lc.toFixed(0)}`.padEnd(W);
  });
  console.log(step.padEnd(W) + cells.join(""));
}
console.log("\n  ✓ >= 4.5 (text)   ~ >= 3.0 (non-text only)   ✗ below both");
