import React from "react";
import Socials from "./Socials";
import Image from "next/image";
import Background from "../public/img/gradient.jpg";

const Footer = () => {
  return (
    <footer className="flex  relative overflow-hidden flex-col w-full h-[680px] bg-[#341692] dark:bg-gray-900 items-center justify-center ">
      <Image
        className="absolute top-0 w-screen h-[680px] bg-[#341692]"
        src={Background}
        quality={100}
        width={480}
        height={284}
        alt="bg"
        placeholder="blur"
      />
      <div className="flex max-w-4xl z-10 xl:max-w-7xl flex-col xl:flex-row w-full space-y-16 xl:items-center justify-between px-4 py-16 md:py-32">
        <div className="flex flex-col items-start space-y-8">
          <h2 className="text-h2 xl:text-h1 text-white drop-shadow-sm">
            Looking for help with design?
          </h2>
          <p className="text-subtitle1 text-white drop-shadow-md">
            Send me an e-mail and discuss the details!
          </p>
          <a
            href="mailto:contact@adamlobler.com"
            className="flex hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
          >
            Get in touch!
          </a>
        </div>
        <div className="flex flex-col xl:items-end w-fit">
          <p className="text-caption text-white pb-8 text-left uppercase">
            contact information
          </p>
          <a
            href="mailto:contact@adamlobler.com"
            className="text-subtitle1 text-white pb-8 text-left"
          >
            contact@adamlobler.com
          </a>
          <Socials />
        </div>
      </div>
      <a
        className="flex z-10 text-white uppercase text-caption items-center justify-center"
        href="https://adamlobler.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Designed and developed by Adam Lobler
      </a>
    </footer>
  );
};

export default Footer;
