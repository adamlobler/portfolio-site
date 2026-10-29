/**
 * Tailwind v4 ships its own PostCSS plugin and does its own vendor prefixing
 * through Lightning CSS, so `autoprefixer` is gone along with `tailwind.config.js`
 * — the theme now lives in CSS (`styles/globals.css` and the generated
 * `styles/tokens/*.css`).
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
