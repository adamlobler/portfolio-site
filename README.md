# adamlobler.com

My portfolio, and the thing it is a portfolio of: a design-token system with
four independent theme axes, built from JSON, enforced by the build, and
documented by a page you can click.

**Next.js 15 (App Router) · React 19 · Tailwind CSS v4 (CSS-first) ·
Style Dictionary 4 · TypeScript**

Six themes × two appearances × three densities × two contrast levels = **72
combinations**, served as ~35 blocks of static CSS, with no runtime style
engine and no per-request rendering. Every route is statically generated.

See it at [`/playground`](https://adamlobler.com/playground): the four axes as
live controls, every component underneath them, and an inspector that shows
each token's computed value next to its reference chain.

---

## The architecture

```
tokens/**/*.json          authored, DTCG ($value / $type)
        │
        │  yarn tokens  ──  gate 1: layer rules      (tokens/lib/validate.mjs)
        │               ──  gate 2: WCAG + APCA      (tokens/lib/contrast.mjs)
        ▼
styles/tokens/*.css       generated CSS custom properties
tokens/generated/*        typed vocabulary + reference graph
        │
        ▼
styles/recipes.css        .btn / .card / .tag / .site-nav — all var(--cmp-*)
components/ui/*.tsx       cva() variant tables: props → class names
```

Three layers, and a rule between each pair:

| Layer         | Prefix  | May hold            | May reference        |
| ------------- | ------- | ------------------- | -------------------- |
| **Primitive** | `prim-` | literal values only | nothing              |
| **Semantic**  | `sem-`  | references only     | primitives, semantic |
| **Component** | `cmp-`  | references only     | semantic only        |

So `--cmp-button-primary-bg` → `--sem-action-primary` → `--prim-color-violet-500`.
A component token that reached straight for a primitive would bake in one
theme's answer; the build fails rather than letting that happen.

### The four axes

| Axis         | Attribute         | Values                                      | Varies                                                                     |
| ------------ | ----------------- | ------------------------------------------- | -------------------------------------------------------------------------- |
| `theme`      | `data-theme`      | violet slate brutalist terminal solar glass | palette **and** expression: radius, shadow language, type family, tracking |
| `appearance` | `data-appearance` | light dark                                  | colour only — so all six themes get both for free                          |
| `density`    | `data-density`    | compact comfortable spacious                | spacing and control sizing. Touches no colour                              |
| `contrast`   | `data-contrast`   | normal high                                 | colour deltas layered over `normal` by specificity                         |

They are independent because each axis partitions a _different_ set of
semantic tokens (`tokens/lib/axes.mjs` declares which), and because axis
coordinates are **stripped from the token name**: every one of the 24 colour
blocks emits the same `--sem-surface-base`. That is the whole trick — 72
combinations cost 24 short blocks plus three small ones, not a cartesian
product, and a component token points at one name and follows all four axes
forever.

### How a theme reaches the page

`<html>` carries the four `data-*` attributes and **is** the store. A blocking
inline script in `<head>` (`components/theme/ThemeScript.tsx`, a few hundred
bytes, generated from the same manifest) reads the preference cookie and sets
them before first paint; CSS reads the attributes directly; `lib/theme/store.ts`
subscribes to them with `useSyncExternalStore` and a `MutationObserver`.

No provider, no context, no `mounted` gate, no flash — and no `cookies()` call
on the server, which is what keeps every route static. With JavaScript off the
page still renders fully themed, from the `:root` defaults the build emits.

---

## Adding a seventh theme

1. `tokens/semantic/color/<name>.json` — the colour contract, light and dark,
   plus any high-contrast deltas.
2. `tokens/semantic/expression/<name>.json` — radius, stroke, shadow, type.
3. Add `"<name>"` to `AXES.theme.values` in `tokens/lib/axes.mjs`.
4. `yarn tokens`.

That is the complete list. No component, stylesheet, switcher or type
definition is touched: the CSS selectors, the Tailwind `@theme` block, the
TypeScript union, the bootstrap script and the playground control are all
emitted from that manifest. If step 1 misses a token the default theme defines,
the build names it and fails — a theme cannot half-exist.

## Enforcement

Nothing above is a convention anyone has to remember:

- **Layer rules** — `yarn tokens` fails on a primitive holding a reference, a
  semantic holding a literal, a component reaching past the semantic layer, or
  any token referencing an axis-scoped name.
- **Completeness** — every theme must define the full semantic colour contract
  in both appearances; every density must define the full dimension set; a
  high-contrast block may only override names that exist in the baseline.
- **Contrast** — every text/background pair in all 24 colour worlds is scored
  for WCAG AA, and advisory-scored with APCA. A failing pair fails the build.
  `--strict-apca` promotes the advisories.
- **Sync** — CI regenerates the token output and fails if the committed CSS is
  not what the JSON emits, so the generated files can stay in the repo (they
  are committed on purpose: a theme change should be reviewable as a diff).

`.github/workflows/ci.yml` runs the gates, Prettier, ESLint, `tsc --noEmit` and
the production build on every push and pull request.

## Components

Tailwind utilities are token-named (`bg-surface-raised`, `text-content-muted`,
`px-gutter`, `max-w-page`), because the `@theme inline` block is generated from
the semantic layer — the token name _is_ the class name, and there is no
mapping to keep in sync.

Only three components have a real variant matrix, so only three use
`class-variance-authority`: `Button`, `Card`, `Tag` in `components/ui/`. Their
`cva()` tables hold **class names, never declarations** — appearance lives in
`styles/recipes.css` and resolves through `--cmp-*`. A new theme restyles every
component without a line of TypeScript changing.

Headless behaviour is one file, `lib/a11y/dialog.ts`: focus containment,
reference-counted scroll locking, Escape, and focus restoration, used by the
mobile nav sheet. (The gallery lightbox gets the same four from
`yet-another-react-lightbox` and is left alone.) That is the whole case for not
adding a headless component library.

## Commands

```bash
yarn dev            # Next dev server
yarn tokens         # build the token CSS + TS from JSON (runs on prebuild)
yarn tokens:check   # run both gates, write nothing
yarn verify         # tokens:check + format:check + lint + typecheck
yarn build          # tokens, then next build, then the sitemap
```

Node 22 (`.nvmrc`) — Tailwind v4's oxide binary needs ≥ 20.

## Layout

```
app/                 App Router. (site) has the full chrome, (bare) is /contact
components/ui/       Button, Card, Tag — the cva layer
components/playground/  axis controls, component gallery, token inspector
lib/theme/           axis manifest, the DOM-as-store hook, the token graph
lib/a11y/            the one headless primitive
styles/recipes.css   component recipes, every value a var(--cmp-*)
styles/tokens/       GENERATED
tokens/              authored JSON, the build, the validators, the emitters
```
