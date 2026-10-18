import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import ThemeScript from "../components/theme/ThemeScript";
import "../styles/globals.css";

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
    <html lang="en" suppressHydrationWarning>
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
