/**
 * Path → CSS custom property name.
 *
 * The one rule that makes the whole architecture work: **axis coordinates are
 * stripped from the name.** `semColor.brutalist.dark.high.surface.base` and
 * `semColor.violet.light.normal.surface.base` both become `--sem-surface-base`.
 * Twenty-four colour blocks, one vocabulary — so a consumer never learns which
 * axis a semantic token happens to vary on, and a component token can point at
 * `var(--sem-surface-base)` once and track all four axes forever.
 */
import { ROOTS } from "./axes.mjs";

/** @param {string[]} path */
export function tokenName(path) {
  const root = ROOTS[path[0]];
  if (!root)
    throw new Error(`Unknown token root "${path[0]}" in ${path.join(".")}`);
  const tail = path.slice(1 + root.axisDepth);
  if (tail.length === 0)
    throw new Error(
      `Token ${path.join(".")} has no name past its axis coordinates`
    );
  return `${root.prefix}-${tail.join("-")}`;
}

/** @param {string[]} path */
export const cssVar = (path) => `--${tokenName(path)}`;

/** `{a.b.c}` → `var(--…)`, for any number of references inside one value. */
export function refsToVars(value) {
  return String(value).replace(
    /\{([^}]+)\}/g,
    (_, ref) => `var(${cssVar(ref.trim().split("."))})`
  );
}

export const hasRef = (value) =>
  typeof value === "string" && /\{[^}]+\}/.test(value);

/** The semantic name with its `sem-` prefix removed, e.g. `surface-base`. */
export const semanticKey = (name) => name.replace(/^sem-/, "");
