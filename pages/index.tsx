import type { NextPage } from "next";
import Head from "next/head";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavigationBar from "../components/NavigationBar";
import Projects from "../components/Projects";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <Head>
        <title>Adam Lobler | Product designer</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
          rel="stylesheet"
        />
      </Head>
      <NavigationBar />
      <main className="flex max-w-2xl xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
