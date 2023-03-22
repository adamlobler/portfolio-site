import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import dynamic from "next/dynamic";
import Background from "../public/img/gradient.png";
import Mockups from "../public/img/hero_mockups.png";

import {
  ScrollContainer,
  batch,
  Fade as ScrollFade,
  Move,
} from "react-scroll-motion";

const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);

const Hero = () => {
  return (
    <ScrollContainer snap="none">
      <section className="flex bg-[#341692] h-fit relative flex-col w-screen lg:h-[calc(100vh-76px)] justify-center items-center pb-16 2xl:pt-16 ">
        <Image
          src={Background}
          className="absolute w-screen h-full lg:h-[calc(100vh-76px)]"
          alt="bg"
        />
        <div className="flex max-w-[1800px] px-8 flex-col-reverse lg:flex-row max-h-full lg:space-x-16 z-10 w-full items-center md:justify-between">
          <div className="lg:w-7/12 2xl:w-1/2">
            <Animator animation={ScrollFade()} className="!block">
              <Fade triggerOnce direction="up" duration={1500}>
                <h1 className="whitespace-pre-line text-center lg:text-left drop-shadow-2xl text-white text-[13vw] md:text-[6vw] xl:text-[6vw] 2xl:text-[100px] leading-tight uppercase font-bold pb-2">
                  Hi, I’m Adam
                </h1>
                <h1 className="whitespace-pre-line text-center lg:text-left drop-shadow-2xl text-white text-[8vw] md:text-[5vw] xl:text-[5vw] 2xl:text-[72px] leading-tight uppercase font-bold pb-8 2xl:pb-16">
                  product designer
                </h1>
              </Fade>
            </Animator>
            <Animator animation={ScrollFade()} className="!block">
              <Fade triggerOnce direction="up" duration={1500} delay={400}>
                <h2 className="text-subtitle1 text-center lg:text-left drop-shadow-sm text-white md:text-h5 pb-8 2xl:pb-16">
                  I’m passionate to make the best digital solution for
                  businesses
                </h2>
              </Fade>
              <Fade triggerOnce direction="up" duration={1500} delay={800}>
                <div className="flex w-full max-w-sm items-center mx-auto lg:max-w-none flex-col lg:flex-row">
                  <a
                    className="flex w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
                    href="mailto:adam.lobler@vallio.studio"
                  >
                    Hire me!
                  </a>
                  <div className="pr-6 pb-4 lg:pb-0" />
                  <Link
                    className="flex w-full lg:w-auto hover:drop-shadow-2xl items-center justify-center border-2 text-white hover:bg-white hover:bg-opacity-10 text-button py-4 px-6 rounded-sm transition-all duration-300"
                    href="/works"
                  >
                    My previous projets{" "}
                  </Link>
                </div>
              </Fade>
            </Animator>
          </div>
          <Animator
            animation={batch(Move(), ScrollFade())}
            className="!block aspect-[596/616] w-full max-w-md lg:max-w-[836px] lg:w-5/12 2xl:w-1/2 my-4"
          >
            <Fade triggerOnce direction="up" duration={1200}>
              <Image
                className=" max-w-md lg:max-w-none w-full my-4"
                alt="hero_mockups"
                src={Mockups}
                quality={70}
                width={836}
                height={600}
                priority
              />
            </Fade>
          </Animator>
        </div>
      </section>
    </ScrollContainer>
  );
};

export default Hero;
