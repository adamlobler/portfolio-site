import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import ThemeScript from "../components/theme/ThemeScript";
import "../styles/globals.css";

/**
 * `public/Inter/` used to hold 3.5 MB of TTFs that no stylesheet ever
 * referenced — no `@font-face`, no `next/font`, no Google Fonts link — so the
 * family named first in every stack only rendered for visitors who happened
 * to have it installed. `next/font` self-hosts a subset at build time, emits
 * it from our own origin with no request to Google, and reserves metrics via
 * `adjustFontFallback` so swapping in costs no layout shift.
 *
 * The variable it exposes is consumed by `prim.font.family.sans`, so the font
 * enters through the token pipeline rather than past it.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const DESCRIPTION =
  "I'm Adam, product designer. I’m passionate to make the best digital solution for businesses.";

export const metadata: Metadata = {
  metadataBase: new URL("https://adamlobler.com"),
  title: {
    default: "Adam Lobler | Product designer",
    template: "Adam Lobler | %s",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Adam Lobler | Product designer",
    description: DESCRIPTION,
    images: ["/img/og_image.png"],
    type: "website",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    /**
     * `suppressHydrationWarning` is required and is scoped to exactly one
     * element: `ThemeScript` writes the four `data-*` attributes onto this
     * tag before React ever sees it, so the server HTML and the live DOM
     * differ here by design. Nothing below `<html>` is suppressed.
     */
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {children}
        {/* Both of these used to live inside `Layout`, which `/contact` bypassed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
