/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // `i18n` is a Pages Router option and is rejected by the App Router; the site
  // only ever declared a single `en` locale, so nothing is lost by dropping it.
  images: {
    // Next 15 warns, and Next 16 will require, that every `quality` a page asks
    // for is declared here. `Footer` and `/contact` both request 100.
    qualities: [75, 100],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
