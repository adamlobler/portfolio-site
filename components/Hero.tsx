import React from "react";
import Link from "next/link";

import HeroScene from "./HeroScene";

const SCENE = "https://prod.spline.design/050qyBgNdNCwvAVO/scene.splinecode";

/**
 * A server component. Everything a visitor needs to read and click is plain
 * HTML; only `HeroScene` crosses to the client.
 *
 * The headline no longer waits on Spline's `onLoad`, so it paints on a page
 * where the canvas has not resolved yet; `HeroScene` carries the placeholder
 * that gives the white text something to sit on until it does.
 */
const Hero = () => {
  return (
    <>
      {/**
       * Was a `next/head` block, which the App Router does not have. React 19
       * hoists `<link rel="preload">` into `<head>` on its own, so the preload
       * still happens and still lives next to the thing it preloads. Phase 4
       * deletes both along with Spline.
       */}
      <link
        rel="preload"
        href={SCENE}
        as="fetch"
        type="application/octet-stream"
        crossOrigin="anonymous"
      />
      <section className="flex bg-[radial-gradient(120%_100%_at_50%_30%,rgba(240,241,243,0)_0%,rgba(15,10,70,0.4)_50%,rgba(240,241,243,0)_100%)] dark:bg-gray-800 relative flex-col w-screen h-[calc(100vh-76px)] min-h-[600px] lg:min-h-[800px] justify-center items-center">
        <HeroScene scene={SCENE} />

        {/* Text content and buttons — in the static HTML, ungated. */}
        <div className="flex pointer-events-none max-w-[1800px] px-8 flex-col max-h-full z-10 w-full pb-16 md:py-16 items-center lg:items-start">
          <h1 className="hero-reveal z-99 whitespace-pre-line text-center lg:text-left drop-shadow-md text-white text-[13vw] md:text-[6vw] xl:text-[6vw] 2xl:text-[100px] leading-tight uppercase font-bold pb-2">
            Reshape digital products together!
          </h1>

          {/**
           * The `react-scroll-motion` <Animator> that used to wrap these
           * CTAs is gone: the package pins `react@^18.0.11` and blocked the
           * React 19 upgrade. It faded the buttons on scroll; phase 4 was
           * already going to delete it with the rest of the hero.
           */}
          <div className="hero-reveal hero-reveal--late">
            {/*Mobile CTAs */}
            <div className="flex pointer-events-auto md:hidden w-full items-center flex-col mt-8">
              <Link className="btn-primary lg:hidden w-full" href="/contact">
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
              <Link className="btn-secondary w-full lg:w-fit" href="/works">
                Discover projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
