import type { NextPage } from "next";
import Head from "next/head";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import NavigationBar from "../components/NavigationBar";
import Projects from "../components/Projects";
import { Fade } from "react-awesome-reveal";

const Home: NextPage = () => {
  return (
    <div className="flex dark:bg-black min-h-screen flex-col items-center justify-center transition-all duration-300">
      <Head>
        <title>Adam Lobler | Product designer</title>
        <meta
          name="description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
          key="desc"
        />
        <meta property="og:title" content="Adam Lobler | Product designer" />
        <meta
          property="og:description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
        />
        <meta property="og:image" content="https://i.imgur.com/5vJ6ZN7.png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
          rel="stylesheet"
        />
      </Head>
      <NavigationBar />
      <main className="flex max-w-5xl xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-4 md:px-16 2xl:px-0 py-16 text-center">
        <Fade triggerOnce className="w-full">
          <Hero />
        </Fade>
        <About />
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
