/**
 * The architecture validator.
 *
 * The three-layer rule is the whole point of this token system, so it is
 * *enforced*, not documented. If a semantic token ever holds a raw hex, or a
 * component token reaches past the semantic layer into a primitive, the build
 * fails — which means the architecture cannot quietly erode over time.
 *
 *   primitive  →  literal values only. Never a reference.
 *   semantic   →  references only. May point at a primitive, or alias another
 *                 semantic. Never a literal, never an axis-scoped token.
 *   component  →  references only, and only into the semantic layer. Never a
 *                 primitive, never another component token.
 *
 * It also enforces *completeness*, which is what stops a seventh theme from
 * half-existing: every axis value must define the full set its default defines,
 * and a high-contrast delta may only override names that exist in the baseline.
 */
import { AXES, DEFAULTS, ROOTS } from "./axes.mjs";

const REF = /\{([^}]+)\}/g;
const PURE_REF = /^\s*\{[^}]+\}\s*$/;

/** Yield `{ path, token }` for every leaf with a `$value`. */
export function* walkTokens(node, path = []) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$") || value === null || typeof value !== "object")
      continue;
    if ("$value" in value) yield { path: [...path, key], token: value };
    else yield* walkTokens(value, [...path, key]);
  }
}

const refsIn = (value) =>
  [...String(value).matchAll(REF)].map((m) => m[1].trim());
const lookup = (tree, path) =>
  path
    .split(".")
    .reduce((node, key) => (node == null ? undefined : node[key]), tree);

/** Leaf names (dot-joined, relative to the slice root) defined under a subtree. */
function leafNames(slice) {
  return new Set(
    [...walkTokens(slice ?? {})].map(({ path }) => path.join("."))
  );
}

export function validate(tokens) {
  /** @type {{rule: string, token: string, detail: string}[]} */
  const problems = [];
  const fail = (rule, token, detail) => problems.push({ rule, token, detail });

  // ---- layer rules -------------------------------------------------------
  for (const { path, token } of walkTokens(tokens)) {
    const id = path.join(".");
    const root = ROOTS[path[0]];
    if (!root) {
      fail(
        "unknown-root",
        id,
        `"${path[0]}" is not a token root declared in axes.mjs`
      );
      continue;
    }
    const value = token.$value;
    const refs = refsIn(value);

    if (root.layer === "primitive") {
      if (refs.length) {
        fail(
          "primitive-holds-reference",
          id,
          `primitives are raw scales and must be literal, but this references ${refs.map((r) => `{${r}}`).join(", ")}`
        );
      }
    } else {
      if (!PURE_REF.test(String(value))) {
        fail(
          root.layer === "semantic"
            ? "semantic-holds-literal"
            : "component-holds-literal",
          id,
          `${root.layer} tokens must be a single reference, got ${JSON.stringify(value)}`
        );
      }
      for (const ref of refs) {
        const target = ROOTS[ref.split(".")[0]];
        if (!target) {
          fail(
            "broken-reference",
            id,
            `{${ref}} does not start at a known token root`
          );
          continue;
        }
        if (lookup(tokens, ref) === undefined) {
          fail("broken-reference", id, `{${ref}} does not resolve to a token`);
          continue;
        }
        if (root.layer === "semantic") {
          if (target.axisDepth > 0) {
            fail(
              "semantic-references-axis-scoped",
              id,
              `{${ref}} is scoped to the ${target.axes.join("/")} axis; reference the axis-free \`sem.*\` name instead, or a primitive`
            );
          } else if (target.layer === "component") {
            fail(
              "semantic-references-component",
              id,
              `{${ref}} points down a layer, into the component layer`
            );
          }
        }
        if (root.layer === "component") {
          if (target.layer === "primitive") {
            fail(
              "component-references-primitive",
              id,
              `{${ref}} skips the semantic layer — component tokens must go through \`sem.*\` so they follow every axis`
            );
          } else if (target.layer === "component") {
            fail(
              "component-references-component",
              id,
              `{${ref}} chains component tokens; keep the component layer flat`
            );
          } else if (target.axisDepth > 0) {
            fail(
              "component-references-axis-scoped",
              id,
              `{${ref}} bakes in a single ${target.axes.join("/")} value; reference the axis-free \`sem.*\` name`
            );
          }
        }
      }
    }
  }

  // ---- completeness ------------------------------------------------------
  const baseline = leafNames(
    tokens.semColor?.[DEFAULTS.theme]?.[DEFAULTS.appearance]?.[
      DEFAULTS.contrast
    ]
  );
  for (const theme of AXES.theme.values) {
    for (const appearance of AXES.appearance.values) {
      const full = tokens.semColor?.[theme]?.[appearance]?.[DEFAULTS.contrast];
      const slice = `semColor.${theme}.${appearance}.${DEFAULTS.contrast}`;
      if (!full) {
        fail(
          "incomplete-axis-value",
          slice,
          `theme "${theme}" does not define its ${appearance} baseline`
        );
        continue;
      }
      const have = leafNames(full);
      for (const name of baseline) {
        if (!have.has(name)) {
          fail(
            "incomplete-axis-value",
            `${slice}.${name}`,
            `every theme must define the full semantic colour contract; "${name}" is missing`
          );
        }
      }
      // High contrast is a delta set, so it needs no completeness check — but it
      // may only override names the baseline actually has.
      for (const name of leafNames(
        tokens.semColor?.[theme]?.[appearance]?.high
      )) {
        if (!baseline.has(name)) {
          fail(
            "unknown-delta-token",
            `semColor.${theme}.${appearance}.high.${name}`,
            `high-contrast deltas may only override baseline names; "${name}" is not one`
          );
        }
      }
    }
  }

  for (const [root, axis] of [
    ["semDim", "density"],
    ["semExpr", "theme"],
  ]) {
    const required = leafNames(tokens[root]?.[DEFAULTS[axis]]);
    for (const value of AXES[axis].values) {
      const have = leafNames(tokens[root]?.[value]);
      if (have.size === 0) {
        fail(
          "incomplete-axis-value",
          `${root}.${value}`,
          `${axis} value "${value}" defines no tokens`
        );
        continue;
      }
      for (const name of required) {
        if (!have.has(name)) {
          fail(
            "incomplete-axis-value",
            `${root}.${value}.${name}`,
            `every ${axis} value must define the full set; "${name}" is missing`
          );
        }
      }
    }
  }

  return problems;
}

export function reportProblems(problems) {
  const byRule = new Map();
  for (const p of problems) {
    if (!byRule.has(p.rule)) byRule.set(p.rule, []);
    byRule.get(p.rule).push(p);
  }
  const lines = [];
  for (const [rule, items] of [...byRule].sort()) {
    lines.push(`\n  ${rule}  (${items.length})`);
    for (const { token, detail } of items.slice(0, 12))
      lines.push(`    ${token}\n      ${detail}`);
    if (items.length > 12) lines.push(`    … and ${items.length - 12} more`);
  }
  return lines.join("\n");
}
