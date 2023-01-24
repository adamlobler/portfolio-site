import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Socials from "./Socials";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";

const navigationItems = [
  {
    name: "Home",
    link: "/",
  },
  /*}
  {
    name: "About",
    link: "/",
  },*/
  {
    name: "Works",
    link: "/works",
  },
];

const NavigationBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    isOpen
      ? (document.body.style.overflow = "scroll")
      : (document.body.style.overflow = "hidden");
  };
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed overflow-hidden w-full top-0 left-0 max-h-screen z-50">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-button font-semibold whitespace-nowrap dark:text-white">
            Adam Lobler
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              {" "}
              | product designer
            </span>
          </span>
        </Link>
        <div className="flex">
          {/*Desktop navbar items*/}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto mr-8">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-body2 block py-2 pl-3 pr-4 bg-primary-700 rounded md:bg-transparent md:text-black dark:md:text-white hover:text-primary-500 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <ThemeSwitch />
            <a
              className="btn-primary h-14 hidden md:block"
              href="mailto:adam.lobler@vallio.studio"
            >
              Hire me!
            </a>
            <button
              onClick={() => toggleNavbar()}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-primary-500 dark:text-primary-400 rounded-sm md:hidden hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-gray-20 dark:hover:bg-gray-900 dark:focus:ring-gray-800 ml-2"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              title="Menu button"
            >
              <Bars3Icon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen
            ? "flex md:hidden overflow-hidden flex-col items-center justify-center slide-in w-full h-screen space-y-8 pb-12"
            : "hidden"
        }`}
        id="navbar-sticky"
      >
        {/*Mobile navbar items*/}
        <ul className="flex flex-col rounded-lg md:flex-row space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="text-subtitle1 text-center block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-black dark:text-white hover:text-primary-500 md:p-0"
                aria-current="page"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <a
          className="btn-primary w-72 text-center h-14"
          href="mailto:adam.lobler@vallio.studio"
        >
          Hire me!
        </a>
        <div className="pt-14">
          <Socials />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
