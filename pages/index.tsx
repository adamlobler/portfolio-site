import type { NextPage } from "next";
import Head from "next/head";
import Projects from "../components/Projects";
import { Fade } from "react-awesome-reveal";
import NewHero from "../components/NewHero";
import NewAbout from "../components/NewAbout";

const Home: NextPage = () => {
  return (
    <>
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
      </Head>
      <Fade className="w-full">
        <NewHero />
      </Fade>
      <main className="flex max-w-5xl xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-4 md:px-16 2xl:px-0 py-16 text-center">
        <Fade triggerOnce className="w-full">
          {/* <Hero />*/}
        </Fade>
        {/*<About id="section-1" />*/}
        <NewAbout id="section-1" />
        <Projects />
      </main>
    </>
  );
};

export default Home;
