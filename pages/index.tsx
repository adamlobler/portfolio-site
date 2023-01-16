import type { NextPage } from "next";
import Head from "next/head";
import About from "../components/About";
import Hero from "../components/Hero";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Adam Lobler | Product designer</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
          rel="stylesheet"
        />
      </Head>

      <main className="flex max-w-2xl xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <Hero />
        <About />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex text-caption items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed and developed by Adam Lobler
        </a>
      </footer>
    </div>
  );
};

export default Home;
