import React from "react";
import Button from "./Button";
import Image from "next/image";
import Circle from "../images/circle.png";
import Cross from "../images/cross.png";
import Angled from "../images/angled.png";
import Rectangle from "../images/rectangle.png";
import Triangle from "../images/triangle.png";
import HeroImage from "../images/hero_image.png";
import Instagram from "../images/social/instagram.png";
import Linkedin from "../images/social/linkedin.png";
import Mail from "../images/social/mail.png";
import Upwork from "../images/social/upwork.png";

import Social from "../components/Social";
const socials = [
  {
    image: Instagram,
    altText: "instagram",
    url: "https://www.instagram.com/vallio.studio/",
  },
  {
    image: Linkedin,
    altText: "linkedin",
    url: "https://www.linkedin.com/in/adam-lobler/",
  },
  {
    image: Mail,
    altText: "mail",
    url: "mailto: adam.lobler@vallio.studio",
  },
  {
    image: Upwork,
    altText: "upwork",
    url: "https://www.upwork.com/nx/find-work/best-matches",
  },
];

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col w-full pb-16">
      <Image
        className="lg:absolute xl:block hidden none mt-28 ml-32"
        width={36}
        height={36}
        src={Circle}
        alt="circle"
      />
      <Image
        className="lg:absolute xl:block hidden none mt-16 ml-96"
        width={50}
        height={50}
        src={Cross}
        alt="cross"
      />
      <div className="flex flex-col-reverse xl:flex-row items-center space-x-8 py-8 xl:py-16">
        <div className="flex flex-col xl:w-1/2 w-full xl:max-w-none justify-center pb-6 xl:pb-0">
          <h1 className="text-h3 md:text-h1 text-left font-bold pb-4 md:pb-8">
            Hi, I’m Adam <br></br> product designer
          </h1>
          <p className="text-subtitle2 md:text-subtitle1 xl:max-w-lg text-left pb-4 md:pb-8">
            I’m passionate to make the best digital solution for businesses
          </p>
          <div className="flex flex-col md:flex-row">
            <Button text="Hire me" />
            <div className="pr-6 pb-4 lg:pb-0" />
            <Button text="My previous projets" type="secondary" />
          </div>
          <Image
            className="lg:absolute xl:block hidden none mt-96 ml-96"
            width={50}
            height={50}
            src={Angled}
            alt="angled square"
          />
        </div>
        <div className="flex items-center justify-center w-full xl:w-auto ">
          <Image width={622} height={576} src={HeroImage} alt="heromockup" />
        </div>
        <Image
          className="lg:absolute xl:block hidden none mt-96 -ml-8"
          width={30}
          height={30}
          src={Rectangle}
          alt="rectangle"
        />
        <div>
          <Image
            className="lg:absolute xl:block hidden none"
            width={50}
            height={50}
            src={Triangle}
            alt="triangle"
          />
        </div>
      </div>
      <p className="text-caption pb-4 text-left uppercase">Get in touch!</p>
      <div className="flex space-x-2">
        {socials.map((social) => (
          <Social
            key={social.altText}
            image={social.image}
            alt={social.altText}
            url={social.url}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
