/**
 * Flat config, ESLint 9.
 *
 * This replaces `.eslintrc.json` + `next lint`, which Next 15 deprecates and
 * Next 16 removes. It also cuts the single largest block of audit findings in
 * the tree: ESLint 8 dragged in the old `minimatch` / `brace-expansion` chain
 * through its `@eslint/eslintrc` internals, and 9 does not.
 *
 * `eslint-config-next` is still eslintrc-shaped (it has no flat export as of
 * 15.5), so `FlatCompat` translates it. That is the same bridge
 * `create-next-app` generates for Next 15, and it drops out when the config
 * ships a flat entry point.
 */
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const config = [
  {
    /**
     * `next lint` linted a fixed set of directories; `eslint .` lints the repo,
     * so the generated output and the build artefacts have to be named. These
     * are the same paths `.prettierignore` carries, for the same reason: they
     * are written by `yarn tokens` or by Next, not by a person.
     */
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      "public/**",
      "styles/tokens/**",
      "tokens/generated/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
];

export default config;
