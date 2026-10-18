"use client";

import React, { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Socials from "./Socials";
import ThemeSwitch from "./theme/ThemeSwitch";
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
    name: "Projects",
    link: "/works",
  },
];

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * The body lock used to be written here from the *pre-update* `isOpen`, so
   * it set the value for the state it was leaving rather than the one it was
   * entering — the page scrolled while the menu was open and locked once it
   * closed. It also hard-coded `overflow: scroll` on the way out instead of
   * handing the property back to the stylesheet.
   */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const toggleNavbar = () => setIsOpen((open) => !open);
  return (
    <nav className="bg-white pl-4 px-2 sm:px-4 py-2 dark:bg-gray-900 overflow-hidden w-full top-0 left-0 max-h-screen z-50">
      <div className="container flex flex-wrap items-center justify-between max-w-[1800px] mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-button font-semibold whitespace-nowrap dark:text-white">
            Adam Lobler
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              {" "}
              | product designer
            </span>
          </span>
        </Link>
        <div className="flex justify-center items-center">
          {/*Desktop navbar items*/}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto mr-8">
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    className="text-body2 block py-2 pl-3 pr-4 bg-primary-700 rounded-sm md:bg-transparent md:text-black dark:md:text-white hover:text-primary-500 md:p-0 dark:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <ThemeSwitch />
            <Link className="btn-primary hidden md:block" href="/contact">
              Get in touch!
            </Link>
            <button
              onClick={() => toggleNavbar()}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-primary-500 dark:text-primary-400 rounded-xs md:hidden hover:bg-primary-50 dark:hover:bg-primary-800 focus:outline-hidden focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-800 ml-2"
              aria-controls="navbar-sticky"
              aria-expanded={isOpen}
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
            ? "flex md:hidden overflow-hidden flex-col items-center justify-center slide-in w-full h-screen space-y-8 px-4 pb-12"
            : "hidden"
        }`}
        id="navbar-sticky"
      >
        {/*Mobile navbar items*/}
        <ul className="flex flex-col rounded-lg md:flex-row space-y-2">
          {navigationItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className="text-subtitle1 text-center block py-6 text-black  md:bg-transparent dark:text-white md:p-0"
                aria-current="page"
                onClick={() => toggleNavbar()}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-14">
          <Socials />
        </div>
        <Link className="btn-primary w-full mx-8" href="/contact">
          Get in touch!
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
