/**
 * The canonical semantic slice.
 *
 * Every semantic name exists once per axis value (`semColor.violet.light.normal
 * .surface.base`, `semColor.glass.dark.high.surface.base`, …) but component
 * tokens need to point at *one* stable thing. So before anything else runs, the
 * build lifts the default slice of every axis into a plain `sem.*` tree.
 *
 * That gives three things at once:
 *
 *   1. `{sem.surface.base}` becomes a real, resolvable reference, so component
 *      tokens can be written against it and Style Dictionary can validate them.
 *   2. The lifted tree is emitted into plain `:root`, which is the no-JS /
 *      pre-hydration default — the page is fully themed with zero `data-*`
 *      attributes set.
 *   3. It is the complete semantic vocabulary, which is exactly the list the
 *      `@theme inline` generator needs.
 *
 * Because the lifted copies share a CSS variable *name* with every axis variant
 * (see `naming.mjs`), the `:root` value is overridden by whichever `[data-*]`
 * block matches — no duplication, no cartesian product.
 */
import { AXES, DEFAULTS } from "./axes.mjs";

const META = new Set(["$value", "$type", "$description", "$extensions"]);

/** Deep-merge `src` into `dst`, leaving existing leaves in `dst` alone. */
function mergeGroups(dst, src) {
  for (const [key, node] of Object.entries(src ?? {})) {
    if (META.has(key)) continue;
    if (dst[key] === undefined) {
      dst[key] = structuredClone(node);
    } else if (typeof node === "object" && node !== null && !("$value" in node)) {
      mergeGroups(dst[key], node);
    }
  }
}

export const canonicalSemantics = (tokens) => {
  const out = tokens;
  out.sem ??= {};

  const slices = [
    out.semColor?.[DEFAULTS.theme]?.[DEFAULTS.appearance]?.[DEFAULTS.contrast],
    out.semDim?.[DEFAULTS.density],
    out.semExpr?.[DEFAULTS.theme],
  ];

  for (const slice of slices) {
    if (!slice) {
      throw new Error(
        `Cannot build the canonical semantic slice: a default axis value is missing. ` +
          `Defaults are ${JSON.stringify(DEFAULTS)}; check tokens/lib/axes.mjs against tokens/semantic/.`
      );
    }
    mergeGroups(out.sem, slice);
  }

  // Record where the defaults came from, so the generated CSS can say so.
  out.sem.$extensions = {
    ...(out.sem.$extensions ?? {}),
    "portfolio.canonicalFrom": Object.fromEntries(
      Object.keys(AXES).map((axis) => [axis, DEFAULTS[axis]])
    ),
  };

  return out;
};
