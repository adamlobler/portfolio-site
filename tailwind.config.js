/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#F0F1F3",
        100: "#E0E1E7",
        200: "#C1C3CE",
        300: "#A2A5B6",
        400: "#83879D",
        500: "#646985",
        600: "#4B4F64",
        700: "#323543",
        800: "#191A21",
        900: "#0A0B0D",
      },
      primary: {
        50: "#EEEAFE",
        100: "#DCD5FB",
        200: "#BAABF8",
        300: "#9780F4",
        400: "#7556F1",
        500: "#522CED",
        600: "#3E21B2",
        700: "#291677",
        800: "#150B3B",
        900: "#080418",
      },
    },
    fontSize: {
      oveline: ["10px", { lineHeight: "1rem", fontWeight: 600 }],
      caption: ["12px", { lineHeight: "1.25rem", fontWeight: 500 }],
      button: ["14px", { lineHeight: "1.5rem", fontWeight: 600 }],
      body2: ["14px", { lineHeight: "1.75rem", fontWeight: 600 }],
      body1: ["16px", { lineHeight: "1.75rem", fontWeight: 400 }],
      subtitle2: ["18px", { lineHeight: "1.5rem", fontWeight: 400 }],
      subtitle1: ["22px", { lineHeight: "1.5rem", fontWeight: 400 }],
      h6: ["24px", { lineHeight: "1.2rem", fontWeight: 600 }],
      h5: ["34px", { lineHeight: "1.2", fontWeight: 700 }],
      h4: ["38px", { lineHeight: "1.2", fontWeight: 700 }],
      h3: ["40px", { lineHeight: "1.2", fontWeight: 700 }],
      h2: ["48px", { lineHeight: "1.2", fontWeight: 700 }],
      h1: ["84px", { lineHeight: "1.2", fontWeight: 700 }],
    },
    extend: {
      maxWidth: {
        "7xl": "1344px",
      },
      fontFamily: {
        inter: ["Inter"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "Inter",
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "Inter",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
