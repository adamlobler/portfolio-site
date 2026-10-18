/**
 * The contrast gate.
 *
 * Six themes × two appearances × two contrast levels is 24 colour worlds, and
 * nobody eyeballs 24 worlds before a deploy. So the build scores every
 * content-on-surface and label-on-control pair in all of them and refuses to
 * emit CSS for a theme that is not legible. A broken theme fails in CI, not in
 * someone's browser.
 *
 * Two metrics, deliberately treated differently:
 *
 *   WCAG 2.1 contrast ratio — the **gate**. It is the normative, cited standard,
 *     so a failure here fails the build.
 *   APCA (Lc)              — **advisory**. Perceptually far better, especially
 *     for light-on-dark, but still a draft inside WCAG 3, so it reports rather
 *     than blocks. `--strict-apca` promotes its warnings to failures.
 *
 * Translucency is composited, not ignored: the `glass` theme's surfaces are
 * alpha primitives, and measuring those un-composited would score a
 * see-through panel against nothing. Each colour is flattened down its real
 * backdrop stack before either metric runs.
 */
import { converter } from "culori";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import { AXES, DEFAULTS } from "./axes.mjs";

const toRgb = converter("rgb");

/** fg, bg, and which readability class the pair belongs to. */
const PAIRS = [
  ["content.primary", "surface.base", "body"],
  ["content.primary", "surface.raised", "body"],
  ["content.primary", "surface.overlay", "body"],
  ["content.secondary", "surface.base", "body"],
  ["content.secondary", "surface.raised", "body"],
  ["content.muted", "surface.base", "body"],
  ["content.muted", "surface.raised", "body"],
  ["content.muted", "surface.sunken", "body"],
  ["content.inverse", "surface.inverse", "body"],
  ["content.primary", "accent.subtle", "body"],
  ["accent.default", "surface.base", "body"],
  ["accent.default", "surface.raised", "body"],
  ["action.primary-content", "action.primary", "control"],
  ["action.primary-content", "action.primary-hover", "control"],
  ["action.primary-content", "action.primary-active", "control"],
  ["action.secondary-content", "action.secondary", "control"],
  ["action.secondary-content", "action.secondary-hover", "control"],
  ["action.secondary-content", "action.secondary-active", "control"],
  ["border.strong", "surface.base", "nontext"],
  ["focus.ring", "surface.base", "nontext"],
];

/** WCAG is the gate; APCA is advisory unless --strict-apca. */
const THRESHOLDS = {
  body:    { wcag: 4.5, apca: 60, label: "body text" },
  control: { wcag: 4.5, apca: 60, label: "control label" },
  nontext: { wcag: 3.0, apca: 30, label: "non-text" },
};

const lookup = (tree, path) =>
  path.split(".").reduce((node, key) => (node == null ? undefined : node[key]), tree);

/** Follow a chain of pure references down to a literal primitive value. */
function resolveLiteral(tokens, value, seen = new Set()) {
  let current = value;
  while (typeof current === "string" && /^\s*\{[^}]+\}\s*$/.test(current)) {
    const ref = current.trim().slice(1, -1);
    if (seen.has(ref)) throw new Error(`Reference cycle at {${ref}}`);
    seen.add(ref);
    const node = lookup(tokens, ref);
    if (node === undefined) throw new Error(`Unresolvable reference {${ref}}`);
    current = node.$value;
  }
  return current;
}

/**
 * The effective value of a semantic colour in one axis combination. `high`
 * contrast is a delta set, so it falls back to the baseline name by name —
 * exactly the way the emitted CSS cascade behaves.
 */
function semanticValue(tokens, { theme, appearance, contrast }, name) {
  const base = `semColor.${theme}.${appearance}`;
  const node =
    (contrast !== DEFAULTS.contrast ? lookup(tokens, `${base}.${contrast}.${name}`) : undefined) ??
    lookup(tokens, `${base}.${DEFAULTS.contrast}.${name}`);
  if (!node) throw new Error(`No semantic colour "${name}" in ${base}`);
  return resolveLiteral(tokens, node.$value);
}

const ROOT_BACKDROP = { light: [255, 255, 255], dark: [0, 0, 0] };

/** Parse to 8-bit RGB plus alpha. */
function parse(value) {
  const c = toRgb(value);
  if (!c) throw new Error(`Cannot parse colour ${JSON.stringify(value)}`);
  const clamp = (n) => Math.max(0, Math.min(255, Math.round(n * 255)));
  return { rgb: [clamp(c.r), clamp(c.g), clamp(c.b)], alpha: c.alpha ?? 1 };
}

/** Source-over composite of `top` onto an opaque `under`. */
const composite = ({ rgb, alpha }, under) =>
  alpha >= 1 ? rgb : rgb.map((v, i) => Math.round(v * alpha + under[i] * (1 - alpha)));

/** Flatten a semantic colour down its real backdrop stack to an opaque RGB. */
function flatten(tokens, combo, name) {
  const root = ROOT_BACKDROP[combo.appearance];
  const base = composite(parse(semanticValue(tokens, combo, "surface.base")), root);
  if (name === "surface.base") return base;
  return composite(parse(semanticValue(tokens, combo, name)), base);
}

const srgbToLin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const luminance = ([r, g, b]) =>
  0.2126 * srgbToLin(r / 255) + 0.7152 * srgbToLin(g / 255) + 0.0722 * srgbToLin(b / 255);

function wcagRatio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const apcaLc = (fg, bg) => Math.abs(APCAcontrast(sRGBtoY(fg), sRGBtoY(bg)));

export function checkContrast(tokens, { strictApca = false } = {}) {
  const failures = [];
  const warnings = [];
  let checked = 0;

  for (const theme of AXES.theme.values) {
    for (const appearance of AXES.appearance.values) {
      for (const contrast of AXES.contrast.values) {
        const combo = { theme, appearance, contrast };
        const where = `${theme}/${appearance}/${contrast}`;
        for (const [fgName, bgName, kind] of PAIRS) {
          const limit = THRESHOLDS[kind];
          let fg, bg;
          try {
            bg = flatten(tokens, combo, bgName);
            fg = composite(parse(semanticValue(tokens, combo, fgName)), bg);
          } catch (error) {
            failures.push({ where, pair: `${fgName} on ${bgName}`, detail: error.message });
            continue;
          }
          checked += 1;
          const ratio = wcagRatio(fg, bg);
          const lc = apcaLc(fg, bg);
          const entry = {
            where,
            pair: `${fgName} on ${bgName}`,
            kind: limit.label,
            detail: `WCAG ${ratio.toFixed(2)}:1 (needs ${limit.wcag}) · APCA Lc ${lc.toFixed(0)} (wants ${limit.apca})`,
          };
          if (ratio < limit.wcag) failures.push(entry);
          else if (lc < limit.apca) (strictApca ? failures : warnings).push(entry);
        }
      }
    }
  }
  return { failures, warnings, checked };
}

export const reportContrast = (items) =>
  items.map(({ where, pair, detail }) => `    ${where.padEnd(26)} ${pair.padEnd(46)} ${detail}`).join("\n");
