/**
 * The axis manifest — the single source of truth for what axes exist, what
 * values they take, and which value is the default.
 *
 * Everything downstream reads this file: the CSS emitters derive their selectors
 * from it, the canonical-slice preprocessor picks its defaults from it, the
 * contrast gate knows which combinations to score from it, and the generated
 * TypeScript manifest re-exports it so a future switcher UI cannot drift from
 * the CSS. Adding a theme is one entry here plus two JSON files.
 */

/** @typedef {"theme"|"appearance"|"density"|"contrast"} AxisName */

export const AXES = {
  theme: {
    attribute: "data-theme",
    /** Source root these values partition. */
    root: ["semColor", "semExpr"],
    values: ["violet", "slate", "brutalist", "terminal", "solar", "glass"],
    default: "violet",
    description:
      "Palette *and* expression: radius, shadow language, type family, tracking.",
  },
  appearance: {
    attribute: "data-appearance",
    root: ["semColor"],
    values: ["light", "dark"],
    default: "light",
    description:
      "Deliberately independent of theme, so all six themes get both for free.",
  },
  density: {
    attribute: "data-density",
    root: ["semDim"],
    values: ["compact", "comfortable", "spacious"],
    default: "comfortable",
    description: "Spacing and control sizing only. Touches no colour.",
  },
  contrast: {
    attribute: "data-contrast",
    root: ["semColor"],
    values: ["normal", "high"],
    default: "normal",
    description:
      "`high` blocks are deltas layered over `normal` by selector specificity.",
  },
};

/** Token tree roots, and how many leading path segments are axis coordinates. */
export const ROOTS = {
  prim:     { layer: "primitive", prefix: "prim", axisDepth: 0 },
  sem:      { layer: "semantic",  prefix: "sem",  axisDepth: 0 },
  semColor: { layer: "semantic",  prefix: "sem",  axisDepth: 3, axes: ["theme", "appearance", "contrast"] },
  semDim:   { layer: "semantic",  prefix: "sem",  axisDepth: 1, axes: ["density"] },
  semExpr:  { layer: "semantic",  prefix: "sem",  axisDepth: 1, axes: ["theme"] },
  cmp:      { layer: "component", prefix: "cmp", axisDepth: 0 },
};

export const DEFAULTS = Object.fromEntries(
  Object.entries(AXES).map(([name, axis]) => [name, axis.default])
);

/** Every theme × appearance × contrast combination, in emit order. */
export function colorCombinations() {
  const out = [];
  for (const theme of AXES.theme.values)
    for (const appearance of AXES.appearance.values)
      for (const contrast of AXES.contrast.values)
        out.push({ theme, appearance, contrast });
  return out;
}

/**
 * The selector for one colour block. `normal` carries no `data-contrast`
 * clause: it is the complete baseline, and the `high` block only states the
 * deltas, winning on specificity. That halves the hand-written JSON and makes
 * "what does high contrast actually change?" readable straight off the CSS.
 */
export function colorSelector({ theme, appearance, contrast }) {
  const base = `[data-theme="${theme}"][data-appearance="${appearance}"]`;
  return contrast === AXES.contrast.default
    ? base
    : `${base}[data-contrast="${contrast}"]`;
}

/** The CSS selector a block of axis-scoped tokens is emitted under. */
export function selectorFor(root, coords) {
  switch (root) {
    case "semColor":
      return colorSelector({ theme: coords[0], appearance: coords[1], contrast: coords[2] });
    case "semDim":
      return `[data-density="${coords[0]}"]`;
    case "semExpr":
      return `[data-theme="${coords[0]}"]`;
    default:
      return ":root";
  }
}
