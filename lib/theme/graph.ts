/**
 * The reading half of the token system: `tokens/generated/graph.json` plus the
 * three lookups the inspector needs.
 *
 * Deliberately not a client module — it is pure, so the playground's server
 * components can use it too, and the JSON only enters a browser bundle because
 * the inspector (a client component) imports from here.
 */

import graph from "../../tokens/generated/graph.json";
import { AXES, AXIS_DEFAULTS, type AxisName, type AxisSelection } from "./axes";

export type Layer = "primitive" | "semantic" | "component";

export type TokenNode = {
  layer: Layer;
  type: string | null;
  group: string | null;
  /** The Tailwind theme variable this maps onto, for semantic tokens. */
  tailwind: string | null;
  /** Axes the token's value depends on. Empty for an axis-free token. */
  varies: AxisName[];
  /** Authored value per axis slice, keyed by the coordinates joined with ".". */
  values: Record<string, string>;
};

/** The axis-free slice — a token emitted into plain `:root`. */
export const DEFAULT_SLICE = graph.slices.default;

export const NODES = graph.nodes as unknown as Record<string, TokenNode>;

export const TOKEN_NAMES = Object.keys(NODES);

export const LAYERS: Layer[] = ["component", "semantic", "primitive"];

const REF = /\{([^}]+)\}/g;

/**
 * `{prim.color.white}` → `prim-color-white`.
 *
 * Safe as a pure string transform because of the one naming rule the build
 * enforces: references may only ever point at a root with no axis coordinates
 * (`prim.*` or the canonical `sem.*`), so there is nothing to strip.
 */
export const refToName = (ref: string) => ref.trim().split(".").join("-");

export const refsIn = (value: string) =>
  [...value.matchAll(REF)].map((match) => refToName(match[1]));

/**
 * The authored value that applies under `selection`, and which slice it came
 * from. Falls back the way the CSS cascade does: an exact slice, else the same
 * slice at the default contrast (`high` blocks are deltas and most names have
 * none), else the axis-free `:root` value.
 */
export function authoredFor(
  node: TokenNode,
  selection: AxisSelection
): { slice: string; value: string } {
  if (node.varies.length === 0) {
    return { slice: DEFAULT_SLICE, value: node.values[DEFAULT_SLICE] };
  }

  const key = (overrides: Partial<AxisSelection> = {}) =>
    node.varies.map((axis) => overrides[axis] ?? selection[axis]).join(".");

  for (const candidate of [
    key(),
    key({ contrast: AXIS_DEFAULTS.contrast as AxisSelection["contrast"] }),
    DEFAULT_SLICE,
  ]) {
    const value = node.values[candidate];
    if (value !== undefined) return { slice: candidate, value };
  }
  return { slice: DEFAULT_SLICE, value: "" };
}

export type ChainStep = {
  name: string;
  node: TokenNode;
  /** Which axis slice this step's value was read from. */
  slice: string;
  authored: string;
  /** The next token down, if this step is a reference. */
  next: string | null;
};

/**
 * The full reference chain for one token under one selection:
 * `cmp-button-primary-bg → sem-action-primary → prim-color-violet-500`.
 *
 * Every link is a real edge in the authored JSON, which is why this is worth
 * showing: it is the architecture rule (component → semantic → primitive) made
 * visible, and the build fails if a token ever skips a step.
 */
export function chainFor(name: string, selection: AxisSelection): ChainStep[] {
  const steps: ChainStep[] = [];
  const seen = new Set<string>();
  let current: string | null = name;

  while (current && !seen.has(current)) {
    seen.add(current);
    const node = NODES[current];
    if (!node) break;
    const { slice, value } = authoredFor(node, selection);
    const next = refsIn(value)[0] ?? null;
    steps.push({ name: current, node, slice, authored: value, next });
    current = next;
  }
  return steps;
}

/** Human label for a slice key, e.g. `violet.dark.high` → `theme: violet …`. */
export function describeSlice(node: TokenNode, slice: string): string {
  if (slice === DEFAULT_SLICE) return ":root default";
  return slice
    .split(".")
    .map((value, i) => `${node.varies[i]}: ${value}`)
    .join(", ");
}

export { AXES };
