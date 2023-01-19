import React from "react";
import Socials from "./Socials";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col w-full bg-gray-50 dark:bg-gray-900 items-center justify-center ">
      <div className="flex max-w-2xl xl:max-w-7xl flex-col xl:flex-row w-full space-y-16 xl:items-center justify-between px-4 py-16 md:py-32">
        <div className="flex flex-col items-start space-y-8">
          <h2 className="text-h4 xl:text-h2 dark:text-white">
            Looking for help with{" "}
            <span className=" text-primary-500 dark:text-primary-400">
              design?
            </span>
          </h2>
          <p className="text-subtitle1 text-gray-600 dark:text-gray-400">
            Send me an e-mail to my mail address!
          </p>
          <button className="btn-primary">Contact me!</button>
        </div>
        <div className="flex flex-col w-fit">
          <p className="text-caption text-gray-800 dark:text-gray-100 pb-4 text-left uppercase">
            Get in touch!
          </p>

          <Socials />
        </div>
      </div>
      <a
        className="flex text-gray-600 uppercase text-caption items-center justify-center py-4"
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
