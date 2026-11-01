/**
 * The runtime half of the axis system. Everything structural — which axes
 * exist, what values they take, which value is the default — comes from
 * `tokens/generated/tokens.ts`, which `yarn tokens` writes from the same
 * manifest the CSS is emitted from. Nothing here hard-codes an axis name, so
 * adding a seventh theme or a fifth axis is still a one-file change in
 * `tokens/lib/axes.mjs`.
 */

import {
  AXES,
  AXIS_DEFAULTS,
  type AxisSelection,
} from "../../tokens/generated/tokens";

export type AxisName = keyof typeof AXES;

/** Axis order is the cookie's wire format, so it must be stable. */
export const AXIS_NAMES = Object.keys(AXES) as AxisName[];

export const AXIS_COOKIE = "al-axes";

/** A year. The preference is cosmetic, so there is nothing to expire sooner. */
export const AXIS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * System preferences that seed an axis the visitor has not chosen yet. Only
 * two of the four axes have a platform-level signal; density and theme have
 * none, so they fall back to the manifest default.
 */
export const SYSTEM_PREFERENCE: Partial<
  Record<AxisName, { query: string; value: string }>
> = {
  appearance: { query: "(prefers-color-scheme: dark)", value: "dark" },
  contrast: { query: "(prefers-contrast: more)", value: "high" },
};

export const DEFAULT_SELECTION: AxisSelection = Object.freeze({
  ...AXIS_DEFAULTS,
}) as AxisSelection;

export function isAxisValue(axis: AxisName, value: unknown): boolean {
  return (AXES[axis].values as readonly string[]).includes(value as string);
}

/**
 * Positional encoding — `violet.dark.comfortable.normal`. Compact enough to
 * read in devtools, and because every field is validated against the manifest
 * on the way back in, a stale cookie written before an axis existed still
 * parses: the missing trailing fields simply fall back.
 */
export function encodeSelection(selection: AxisSelection): string {
  return AXIS_NAMES.map((axis) => selection[axis]).join(".");
}

export function decodeSelection(raw: string | undefined | null): AxisSelection {
  const parts = raw ? raw.split(".") : [];
  const out = {} as Record<AxisName, string>;
  AXIS_NAMES.forEach((axis, i) => {
    out[axis] = isAxisValue(axis, parts[i])
      ? parts[i]
      : (AXIS_DEFAULTS[axis] as string);
  });
  return out as AxisSelection;
}

export { AXES, AXIS_DEFAULTS };
export type { AxisSelection };
