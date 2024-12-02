"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Spline from "@splinetool/react-spline";
import { Animator, Fade as ScrollFade } from "react-scroll-motion";
import Head from "next/head";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Function to monitor loading
  const handleLoad = () => {
    setIsLoaded(true); // Set that the Spline and wasm have loaded
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
      <section className="flex bg-[radial-gradient(120%_100%_at_50%_30%,rgba(240,241,243,0)_0%,rgba(15,10,70,0.4)_50%,rgba(240,241,243,0)_100%)] dark:bg-gray-800 relative flex-col w-screen h-[calc(100vh-76px)] min-h-[600px] lg:min-h-[800px] justify-center items-center">
        {/* Spline Background */}
        <div className="absolute w-screen z-0 h-full">
          {/* Spline animation */}
          <Fade
            triggerOnce
            delay={500}
            duration={4000}
            className="absolute w-screen z-0 h-full"
          >
            <Spline
              className="absolute w-screen z-0 h-full"
              scene="https://prod.spline.design/050qyBgNdNCwvAVO/scene.splinecode"
              onLoad={handleLoad} // Monitoring load
            />
          </Fade>
          <div className="absolute w-screen z-0 bottom-0 h-[60px] bg-white dark:bg-black" />
        </div>

        {/* Text content and buttons */}
        {isLoaded && ( // Only show elements when Spline and wasm have loaded
          <div className="flex pointer-events-none max-w-[1800px] px-8 flex-col max-h-full z-10 w-full pb-16 md:py-16 items-center lg:items-start">
            <Fade triggerOnce direction="up" duration={1500}>
              <h1 className="z-99 whitespace-pre-line text-center lg:text-left drop-shadow-md text-white text-[13vw] md:text-[6vw] xl:text-[6vw] 2xl:text-[100px] leading-tight uppercase font-bold pb-2">
                Reshape digital products together!
              </h1>
            </Fade>

            <Animator animation={ScrollFade()} className="!block min-w-[300px]">
              <Fade triggerOnce direction="up" duration={1500} delay={800}>
                {/*Mobile CTAs */}
                <div className="flex pointer-events-auto md:hidden w-full items-center flex-col mt-8">
                  <Link
                    className="btn-primary lg:hidden w-full"
                    href="/contact"
                  >
                    Get in touch!
                  </Link>
                  <div className="pr-6 pb-4 lg:pb-0" />
                  <Link className="btn-secondary w-full" href="/works">
                    Discover projects
                  </Link>
                </div>

                {/*Desktop CTAs*/}
                <div className="hidden pointer-events-auto my-4 md:flex w-full max-w-sm items-center lg:max-w-none flex-col lg:flex-row">
                  <Link className="btn-primary w-full lg:w-fit" href="/contact">
                    Get in touch!
                  </Link>
                  <div className="pr-6 pb-4 lg:pb-0" />
                  <Link
                    className="btn-secondary  w-full lg:w-fit"
                    href="/works"
                  >
                    Discover projects
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

export default Hero;
