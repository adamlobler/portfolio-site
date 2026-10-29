/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // `i18n` is a Pages Router option and is rejected by the App Router; the site
  // only ever declared a single `en` locale, so nothing is lost by dropping it.
  images: {
    // Next 15 warns, and Next 16 will require, that every `quality` a page asks
    // for is declared here — Next *throws at runtime* on an undeclared one, so
    // `scripts/check-image-qualities.mjs` gates this list against every call
    // site in app/, components/ and content/ rather than leaving it to whoever
    // opens the page. 90 is `components/Img.tsx`'s default; 100 is the two
    // line-art diagrams in `content/viddl.mdx`, thin 1px rules that band at
    // anything lower. Next's own 75 default is unreachable: every image on the
    // site goes through `Img`, which always sets a quality. Add a value here
    // when a call site needs it — the gate will say so by name.
    qualities: [90, 100],
    // The masters in `public/img` are webp; avif is the one format that still
    // beats them, and it is tried first.
    formats: ["image/avif", "image/webp"],
    // Default is 60s, which re-optimises assets that have not changed since
    // the last deploy. These are build-time files with content-addressed URLs.
    minimumCacheTTL: 31536000,
  },
  webpack(config) {
    /**
     * SVG-as-component, scoped.
     *
     * The previous rule was an unscoped `push` of @svgr/webpack, which does
     * not narrow Next's own `.svg` asset rule — it shadows it. That is only
     * harmless while nothing imports an SVG: the moment one does,
     * `import Logo from "./logo.svg"` yields a React component where
     * `next/image` expects `StaticImageData`, and a `url()` in a stylesheet is
     * handed to a loader that emits JSX.
     *
     * So: find Next's asset rule, re-register it behind `?url` as the opt-out,
     * exclude `.svg` from the original, and hand the rest to svgr.
     *
     * The scoping is `issuer: { not: <stylesheet> }` rather than the
     * `issuer: /\.[jt]sx?$/` the usual recipe shows, because that one matches
     * nothing here: under the App Router the importer reaches this rule
     * through Next's RSC loaders rather than as a plain `.tsx` path, and every
     * icon import fails with "no loaders are configured". Excluding
     * stylesheets keeps the part that matters — a `url()` in CSS must not be
     * handed to a loader that emits JSX.
     *
     * Note this hook is ignored under Turbopack — the scripts run plain
     * `next dev` / `next build`, so webpack is what is in use.
     */
    const assetRule = config.module.rules.find((rule) =>
      rule?.test?.test?.(".svg")
    );

    if (assetRule) {
      config.module.rules.push({
        ...assetRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      });
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { not: /\.(css|scss|sass|less)$/ },
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: "@svgr/webpack",
          // The icons keep their width/height as intrinsic defaults, so an
          // unsized <MailIcon /> still renders at 32x32 the way the
          // <Image width={32} height={32} /> it replaces did.
          options: { titleProp: true },
        },
      ],
    });

    return config;
  },
};
