import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import { Link as Scrolllink, animateScroll as scroll } from "react-scroll";
import ScrollIcon from "./ScrollIcon/ScrollIcon";

const NewHero = () => {
  return (
    <section className="flex flex-col w-screen h-[calc(100vh-76px)] justify-center items-center pb-16 2xl:pt-16 ">
      <Image
        className="absolute w-screen h-[calc(100vh-76px)]"
        alt="bg"
        width={2880}
        height={1700}
        src="/img/gradient.png"
      />
      <div className="flex mx-6 z-10 flex-col md:items-center">
        <Fade triggerOnce direction="up" duration={1500}>
          <h1 className="whitespace-pre-line drop-shadow-2xl text-white 2xl:max-w-[2000px] text-[12vw] md:text-[7vw] xl:text-[6vw] 2xl:text-[5vw] text-center leading-tight uppercase font-bold pb-8 2xl:pb-16">
            Hi, I’m Adam {"\n"} product designer
          </h1>
        </Fade>
        <Fade triggerOnce direction="up" duration={1500} delay={400}>
          <h2 className="text-subtitle1 text-center drop-shadow-sm text-white md:text-h5 pb-8 2xl:pb-16">
            I’m passionate to make the best digital solution for businesses
          </h2>
        </Fade>
        <Fade triggerOnce direction="up" duration={1500} delay={800}>
          <div className="flex w-full flex-col md:flex-row">
            <a
              className="flex hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
              href="mailto:adam.lobler@vallio.studio"
            >
              Hire me!
            </a>
            <div className="pr-6 pb-4 lg:pb-0" />
            <Link
              className="flex hover:drop-shadow-2xl items-center justify-center border-2 text-white hover:bg-white hover:bg-opacity-10 text-button py-4 px-6 rounded-sm transition-all duration-300"
              href="/works"
            >
              My previous projets{" "}
            </Link>
          </div>
        </Fade>
        <Fade triggerOnce duration={3000} delay={3000}>
          <Scrolllink
            activeClass="active"
            to="section-1"
            spy={true}
            smooth={true}
            offset={-76}
            duration={1500}
            className="cursor-pointer"
          >
            <ScrollIcon />
          </Scrolllink>
        </Fade>
      </div>
    </section>
  );
};

export default NewHero;
