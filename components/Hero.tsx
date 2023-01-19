import React from "react";
import Image from "next/image";
import Angled from "../images/angled.png";
import HeroImage from "../images/hero_image.png";
import Socials from "./Socials";
import { Circle } from "./svg/Circle";
import { Triangle } from "./svg/Triangle";
import { Cross } from "./svg/Cross";
import { RotatedRectangle } from "./svg/RotatedRectangle";
import { Rectangle } from "./svg/Rectangle";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col w-full pb-16 xl:pt-16 ">
      <Circle />
      <div className="flex flex-col-reverse xl:flex-row items-center gap-x-8 py-8 xl:py-16">
        <div className="flex flex-col xl:w-1/2 w-full xl:max-w-none justify-center pb-6 xl:pb-0">
          <h1 className="text-h3 dark:text-white md:text-h1 text-left font-bold pb-4 md:pb-8">
            Hi, I’m Adam <br></br> product designer
          </h1>
          <p className="text-subtitle2 text-gray-800 dark:text-gray-300 md:text-subtitle1 xl:max-w-lg text-left pb-4 md:pb-8">
            I’m passionate to make the best digital solution for businesses
          </p>
          <div className="flex flex-col md:flex-row">
            <a className="btn-primary" href="mailto:adam.lobler@vallio.studio">
              Hire me!
            </a>
            <div className="pr-6 pb-4 lg:pb-0" />
            <Link className="btn-secondary" href="/works">
              My previous projets{" "}
            </Link>
          </div>
          <RotatedRectangle />
        </div>
        <div className="flex items-center justify-center w-full  xl:w-auto ">
          <Image width={622} height={576} src={HeroImage} alt="heromockup" />
        </div>
        <Rectangle />
        <div>
          <Triangle />
        </div>
        <Cross />
      </div>
      <p className="text-caption text-gray-800 dark:text-gray-100 pb-4 text-left uppercase">
        Get in touch!
      </p>
      <Socials />
    </section>
  );
};

export default Hero;
