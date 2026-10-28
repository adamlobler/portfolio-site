/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // `i18n` is a Pages Router option and is rejected by the App Router; the site
  // only ever declared a single `en` locale, so nothing is lost by dropping it.
  images: {
    // Next 15 warns, and Next 16 will require, that every `quality` a page asks
    // for is declared here. 90 is `components/Img.tsx`'s default; a few call
    // sites still ask for 100, and 75 stays for anything that opts back down.
    qualities: [75, 90, 100],
    // The masters in `public/img` are webp; avif is the one format that still
    // beats them, and it is tried first.
    formats: ["image/avif", "image/webp"],
    // Default is 60s, which re-optimises assets that have not changed since
    // the last deploy. These are build-time files with content-addressed URLs.
    minimumCacheTTL: 31536000,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
