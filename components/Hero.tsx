import React from "react";
import Button from "./button";
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

import Social from "./social";

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

const Hero: React.FC = (props) => {
  return (
    <div className="pb-16">
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
      <div className="flex flex-col-reverse justify-center xl:flex-row py-8 lg:py-16">
        <div className="flex pb-6 flex-col justify-center lg:pr-4 lg:pb-0">
          <h1 className="text-h3 md:text-h1 pb-8 max-w-2xl text-left font-bold">
            Hi, I’m Adam product designer
          </h1>
          <p className="text-subtitle2 md:text-subtitle1 pb-8 max-w-lg text-left">
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
        <Image width={658} height={576} src={HeroImage} alt="heromockup" />
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
    </div>
  );
};

export default Hero;
