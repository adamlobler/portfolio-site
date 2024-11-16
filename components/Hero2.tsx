import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import dynamic from "next/dynamic";
import Spline from "@splinetool/react-spline";
import { Fade as ScrollFade } from "react-scroll-motion";
import Head from "next/head";

const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: true }
);

const Hero2 = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Funkció a betöltés figyelésére
  const handleLoad = () => {
    setIsLoaded(true); // Beállítjuk, hogy a Spline és a wasm betöltődött
  };

  return (
    <>
      {/* Preload Spline scene */}
      <Head>
        <link
          rel="preload"
          href="https://prod.spline.design/050qyBgNdNCwvAVO/scene.splinecode"
          as="fetch"
          type="application/octet-stream"
          crossOrigin="anonymous"
        />
      </Head>

      {/* Az oldal tartalmának rejtése a process.wasm betöltése előtt */}
      {!isLoaded && (
        <div className="absolute w-screen h-screen bg-black flex justify-center items-center">
          {/* Itt helyezhetünk el egy betöltő animációt */}
          <div className="text-white">Loading...</div>
        </div>
      )}

      <section className="flex bg-[radial-gradient(120%_100%_at_50%_30%,rgba(240,241,243,0)_0%,rgba(15,10,70,0.3)_50%,rgba(240,241,243,0)_100%)] dark:bg-gray-800 relative flex-col w-screen h-[calc(100vh-76px)] justify-center items-center">
        {/* Spline Background */}
        <div className="absolute w-screen z-0 h-full lg:h-[calc(100vh-76px)]">
          {/* Spline animáció */}
          <Fade
            triggerOnce
            delay={500}
            duration={4000}
            className="absolute w-screen z-0 h-full lg:h-[calc(100vh-76px)]"
          >
            <Spline
              className="absolute w-screen z-0 h-full lg:h-[calc(100vh-76px)]"
              scene="https://prod.spline.design/050qyBgNdNCwvAVO/scene.splinecode"
              onLoad={handleLoad} // Betöltés figyelése
            />
          </Fade>
        </div>

        {/* Szöveges tartalom és gombok */}
        {isLoaded && ( // Csak akkor jelenjenek meg az elemek, ha a Spline és a wasm betöltődött
          <div className="flex max-w-[1800px] pointer-events-none px-8 flex-col max-h-full z-10 w-full pb-16 md:py-16 items-center lg:items-start">
            <Fade triggerOnce direction="up" duration={1500}>
              <h1 className="z-99 whitespace-pre-line text-center lg:text-left drop-shadow-md text-white text-[13vw] md:text-[6vw] xl:text-[6vw] 2xl:text-[100px] leading-tight uppercase font-bold pb-2">
                Reshape digital products together!
              </h1>
            </Fade>

            <Animator animation={ScrollFade()} className="!block min-w-[300px]">
              <Fade triggerOnce direction="up" duration={1500} delay={800}>
                {/*Mobile CTAs */}
                <div className="flex md:hidden w-full items-center flex-col mt-8">
                  <Link
                    className="flex w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
                    href="/contact"
                  >
                    Contact me!
                  </Link>
                  <div className="pr-6 pb-4 lg:pb-0" />
                  <Link
                    className="flex bg-[#0004] w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center border-2 text-white hover:bg-white hover:bg-opacity-10 text-button py-4 px-6 rounded-sm transition-all duration-300"
                    href="/works"
                  >
                    Previous projects
                  </Link>
                </div>

                {/*Desktop CTAs*/}
                <div className="hidden pointer-events-auto my-4 md:flex w-full max-w-sm items-center lg:max-w-none flex-col lg:flex-row">
                  <Link
                    className="flex w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
                    href="/contact"
                  >
                    Contact me!
                  </Link>
                  <div className="pr-6 pb-4 lg:pb-0" />
                  <Link
                    className="flex bg-[#0004] w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center border-2 text-white hover:bg-white hover:bg-opacity-10 text-button py-4 px-6 rounded-sm transition-all duration-300"
                    href="/works"
                  >
                    Previous projects
                  </Link>
                </div>
              </Fade>
            </Animator>
          </div>
        )}
      </section>
    </>
  );
};

export default Hero2;
