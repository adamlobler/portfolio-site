#!/usr/bin/env node
/**
 * The token build.
 *
 * Reads `tokens/**\/*.json` (DTCG `$value` / `$type`), enforces the three-layer
 * architecture, gates every theme on contrast, then emits:
 *
 *   styles/tokens/primitives.css        raw scales, `:root`
 *   styles/tokens/semantic-root.css     axis-free defaults + invariants, `:root`
 *   styles/tokens/semantic-color.css    theme x appearance (+ high-contrast deltas)
 *   styles/tokens/semantic-density.css  [data-density]
 *   styles/tokens/expression.css        [data-theme]
 *   styles/tokens/component.css         component tokens, `:root`
 *   styles/tokens/theme.css             the generated `@theme inline` block
 *   tokens/generated/tokens.ts          typed vocabulary + axis manifest
 *   tokens/generated/graph.json         layer + axis + reference graph, for the inspector
 *
 * Flags:
 *   --check        validate and gate, write nothing (CI, and `yarn tokens:check`)
 *   --strict-apca  promote advisory APCA warnings to build failures
 */
import StyleDictionary from "style-dictionary";
import { AXES } from "./lib/axes.mjs";
import { tokenName } from "./lib/naming.mjs";
import { canonicalSemantics } from "./lib/preprocess.mjs";
import { validate, reportProblems, walkTokens } from "./lib/validate.mjs";
import { checkContrast, reportContrast } from "./lib/contrast.mjs";
import {
  cssBlock,
  cssAxisBlocks,
  cssThemeInline,
  jsonGraph,
  tsManifest,
} from "./lib/formats.mjs";

const argv = new Set(process.argv.slice(2));
const CHECK_ONLY = argv.has("--check");
const STRICT_APCA = argv.has("--strict-apca");

const byRoot = (root) => (token) => token.path[0] === root;

const THEME_DESCRIPTIONS = {
  violet: "Refined brand violet on cool grey. Soft radii, soft shadows.",
  slate: "Neutral editorial. Serif display, ink-blue accent, almost no shadow.",
  brutalist: "Zero radius, hard offset shadows, heavy mono, black hairlines.",
  terminal:
    "CRT phosphor. Mono throughout, dashed rules, glow instead of shadow.",
  solar: "Warm stone and low-sun amber. Large radii, glow shadows.",
  glass:
    "Translucent surfaces and backdrop blur. High contrast turns it opaque.",
};

const sd = new StyleDictionary({
  usesDtcg: true,
  // Name collisions are the *architecture*, not a bug: every axis block emits the
  // same variable names on purpose, which is the whole reason 24 colour worlds
  // cost 24 short blocks instead of a cartesian product. Style Dictionary cannot
  // know that, so its collision warning is silenced here rather than printed on
  // every build. Broken references still throw.
  log: {
    warnings: "disabled",
    verbosity: "default",
    errors: { brokenReferences: "throw" },
  },
  source: [
    "tokens/primitives/*.json",
    "tokens/semantic/**/*.json",
    "tokens/component/*.json",
  ],
  preprocessors: ["canonical-semantics"],
  hooks: {
    preprocessors: { "canonical-semantics": canonicalSemantics },
    transforms: {
      "name/axis-stripped": {
        type: "name",
        transform: (token) => tokenName(token.path),
      },
    },
    formats: {
      "css/block": cssBlock,
      "css/axis-blocks": cssAxisBlocks,
      "css/theme-inline": cssThemeInline,
      "json/graph": jsonGraph,
      "ts/manifest": tsManifest,
    },
  },
  platforms: {
    css: {
      transforms: ["name/axis-stripped"],
      buildPath: "styles/tokens/",
      files: [
        {
          destination: "primitives.css",
          format: "css/block",
          filter: byRoot("prim"),
          options: {
            selector: ":root",
            note: "Primitive layer — raw scales with no meaning. Never consume these directly; the validator fails the build if a component token tries.",
          },
        },
        {
          destination: "semantic-root.css",
          format: "css/block",
          filter: byRoot("sem"),
          options: {
            selector: ":root",
            note: "Semantic defaults. Everything a theme would set, pre-set to the default axis slice, plus the semantics that vary on no axis at all. This block is why the page is fully themed with zero data-* attributes — no FOUC, no JS.",
          },
        },
        {
          destination: "semantic-color.css",
          format: "css/axis-blocks",
          filter: byRoot("semColor"),
          options: {
            root: "semColor",
            note: "Colour semantics: theme x appearance. High-contrast blocks are deltas that win on specificity, so they state only what they change.",
          },
        },
        {
          destination: "semantic-density.css",
          format: "css/axis-blocks",
          filter: byRoot("semDim"),
          options: {
            root: "semDim",
            note: "Dimension semantics. These vary on density and nothing else — no colour, no type.",
          },
        },
        {
          destination: "expression.css",
          format: "css/axis-blocks",
          filter: byRoot("semExpr"),
          options: {
            root: "semExpr",
            note: "Expression semantics: radius, stroke, shadow language, type family, weight, tracking, blur. These vary on theme alone, and they are the reason brutalist / terminal / solar / glass are themes rather than palettes.",
          },
        },
        {
          destination: "component.css",
          format: "css/block",
          filter: byRoot("cmp"),
          options: {
            selector: ":root",
            note: "Component layer. Every value is a var() into the semantic layer, so this block varies on NO axis and is emitted once — flipping any data-* attribute re-resolves all of it through the cascade. That indirection is what turns 144 theoretical combinations into ~35 blocks of CSS.",
          },
        },
        {
          destination: "theme.css",
          format: "css/theme-inline",
          filter: byRoot("sem"),
          options: {
            note: "Generated off the semantic layer: every semantic token becomes a Tailwind utility, so the token name IS the class name and the two cannot drift.",
          },
        },
      ],
    },
    ts: {
      transforms: ["name/axis-stripped"],
      buildPath: "tokens/generated/",
      files: [
        {
          destination: "tokens.ts",
          format: "ts/manifest",
          filter: () => true,
          options: { themeDescriptions: THEME_DESCRIPTIONS },
        },
        {
          destination: "graph.json",
          format: "json/graph",
          filter: () => true,
          options: {
            note: "Every token's layer, the axes it varies on, and its authored reference per axis slice. Read by the token inspector at /playground; resolved values are read from the live CSS, not from here.",
          },
        },
      ],
    },
  },
});

await sd.hasInitialized;

// ---------------------------------------------------------------------------
// Gate 1 — the architecture. Runs on the preprocessed tree, before any CSS is
// written, so a layering mistake can never reach disk.
// ---------------------------------------------------------------------------
const problems = validate(sd.tokens);
if (problems.length) {
  console.error(
    `\n✗ Token architecture: ${problems.length} violation(s).${reportProblems(problems)}\n`
  );
  process.exit(1);
}
const counts = { primitive: 0, semantic: 0, component: 0 };
for (const { path } of walkTokens(sd.tokens)) {
  if (path[0] === "prim") counts.primitive += 1;
  else if (path[0] === "cmp") counts.component += 1;
  else counts.semantic += 1;
}
console.log(
  `✓ Architecture: ${counts.primitive} primitive, ${counts.semantic} semantic, ${counts.component} component tokens — layer rules hold.`
);

// ---------------------------------------------------------------------------
// Gate 2 — contrast, across all 24 colour worlds.
// ---------------------------------------------------------------------------
const { failures, warnings, checked } = checkContrast(sd.tokens, {
  strictApca: STRICT_APCA,
});
if (failures.length) {
  console.error(
    `\n✗ Contrast gate: ${failures.length} of ${checked} pairs below threshold.\n` +
      `${reportContrast(failures)}\n`
  );
  process.exit(1);
}
console.log(
  `✓ Contrast: ${checked} pairs across ${AXES.theme.values.length} themes x ` +
    `${AXES.appearance.values.length} appearances x ${AXES.contrast.values.length} contrast levels pass WCAG.`
);
if (warnings.length) {
  console.warn(
    `\n⚠ APCA advisory: ${warnings.length} pair(s) pass WCAG but fall short of the APCA target.\n` +
      `${reportContrast(warnings)}\n  (run with --strict-apca to fail the build on these)\n`
  );
}

if (CHECK_ONLY) {
  console.log("\n--check: both gates passed, no files written.");
  process.exit(0);
}

await sd.buildAllPlatforms();
