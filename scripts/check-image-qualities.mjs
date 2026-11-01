#!/usr/bin/env node
/**
 * Gate: every `quality` a call site asks `next/image` for must be declared in
 * `images.qualities` in next.config.js.
 *
 * Next 15 checks this at *runtime* and throws, which means an undeclared value
 * is invisible to `next build`, to `tsc` and to ESLint, and only surfaces when
 * someone opens the page. That is how `/viddl` broke: `100` was removed from
 * the config on the belief that nothing used it, while two diagrams in
 * `content/viddl.mdx` still asked for it. Nothing in CI could have caught it.
 *
 * The MDX matters as much as the TSX here — the case studies are where most of
 * the images live, and they are the files least likely to be opened while
 * changing a config.
 *
 *   node scripts/check-image-qualities.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { relative, join } from "node:path";

const require = createRequire(import.meta.url);
const root = new URL("..", import.meta.url).pathname;

const declared = new Set(
  require(join(root, "next.config.js")).images?.qualities ?? []
);

const ROOTS = ["app", "components", "content"];
const EXTENSIONS = /\.(tsx?|jsx?|mdx)$/;

/** `quality={90}`, `quality="90"`, and `quality = 90` (the Img default). */
const NUMERIC = /quality\s*=\s*\{?\s*["']?(\d+)["']?\s*\}?/g;
/** `quality={expr}` — a value this script cannot resolve. */
const DYNAMIC = /quality\s*=\s*\{\s*([A-Za-z_$][\w$.]*)\s*\}/g;

/**
 * Comments and fenced code are prose, not call sites: `Img.tsx` explains
 * Next's `quality={75}` default in a comment, and a check that reads that as a
 * usage would keep 75 alive in the config forever. Blanked rather than
 * removed, so line numbers still point at the real file.
 */
function stripNonCode(source) {
  const blank = (text) => text.replace(/[^\n]/g, " ");
  return source
    .replace(/```[\s\S]*?```/g, blank)
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(
      /(^|[^:])\/\/[^\n]*/g,
      (match, prefix) => prefix + blank(match.slice(prefix.length))
    );
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* walk(path);
    else if (EXTENSIONS.test(entry)) yield path;
  }
}

const used = new Map(); // quality -> [where]
const undeclared = [];
const dynamic = [];

for (const dir of ROOTS) {
  for (const file of walk(join(root, dir))) {
    const lines = stripNonCode(readFileSync(file, "utf8")).split("\n");

    lines.forEach((line, index) => {
      const where = `${relative(root, file)}:${index + 1}`;

      for (const match of line.matchAll(NUMERIC)) {
        const quality = Number(match[1]);
        if (!used.has(quality)) used.set(quality, []);
        used.get(quality).push(where);
        if (!declared.has(quality)) undeclared.push({ quality, where });
      }
      for (const match of line.matchAll(DYNAMIC)) {
        /**
         * `quality={quality}` in `Img.tsx` is the wrapper forwarding its own
         * prop. It introduces no new value — whatever reaches it was written
         * at a call site this check already read — so it is not a hole.
         */
        if (match[1] === "quality") continue;
        dynamic.push(`${where}  (quality={${match[1]}})`);
      }
    });
  }
}

if (undeclared.length) {
  console.error(
    `\n✗ next/image quality: ${undeclared.length} call site(s) ask for a quality ` +
      `that images.qualities does not declare.\n` +
      `  Declared: [${[...declared].sort((a, b) => a - b).join(", ")}]\n` +
      undeclared
        .map(
          ({ quality, where }) =>
            `    ${where}\n      asks for quality=${quality}`
        )
        .join("\n") +
      `\n\n  Next throws on these at runtime, so the page breaks when it is opened,\n` +
      `  not when it is built. Add the value to next.config.js or change the prop.\n`
  );
  process.exit(1);
}

const qualities = [...used.keys()].sort((a, b) => a - b);
console.log(
  `✓ next/image quality: ${qualities.length} value(s) in use ` +
    `(${qualities.join(", ")}), all declared in images.qualities.`
);

/**
 * Advisory, not a failure — an undeclared value breaks a page, an unused one
 * only misleads the next person deciding whether a value is safe to remove.
 */
const unused = [...declared].filter((quality) => !used.has(quality));
if (unused.length) {
  console.warn(
    `⚠ images.qualities declares ${unused.join(", ")}, which no call site uses.`
  );
}
if (dynamic.length) {
  console.warn(
    `⚠ ${dynamic.length} call site(s) pass a computed quality this check cannot ` +
      `resolve:\n    ${dynamic.join("\n    ")}`
  );
}
