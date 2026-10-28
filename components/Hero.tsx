import React from "react";
import Button from "./ui/Button";

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
      <section className="flex bg-[radial-gradient(120%_100%_at_50%_30%,rgba(240,241,243,0)_0%,rgba(15,10,70,0.4)_50%,rgba(240,241,243,0)_100%)] dark:bg-surface-raised relative flex-col w-screen h-[calc(100vh-76px)] min-h-[600px] lg:min-h-[800px] justify-center items-center">
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
          {/**
           * One row, and the buttons size themselves the way they do
           * everywhere else on the site. This used to be the same two CTAs
           * written twice — a `md:hidden` copy and a `hidden md:flex` copy —
           * each forcing `w-full` and then clawing it back with `lg:w-fit`,
           * which is why the hero's buttons were the only ones on the site
           * that changed width with the viewport. Spacing is a `gap`; the two
           * padding-only spacer divs between them are gone.
           */}
          <div className="hero-reveal hero-reveal--late pointer-events-auto mt-8 flex flex-col items-center gap-inline-sm sm:flex-row lg:items-start">
            <Button href="/contact">Get in touch!</Button>
            <Button href="/works" variant="secondary">
              Discover projects
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
