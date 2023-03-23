import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps, ...appProps }: AppProps) {
  if ([`/contact`].includes(appProps.router.pathname))
    return (
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <Analytics />
      </ThemeProvider>
    );

  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
