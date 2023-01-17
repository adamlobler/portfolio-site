import Image from "next/image";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Socials from "./Socials";

const navigationItems = [
  {
    name: "Home",
    link: "#",
  },
  {
    name: "About",
    link: "#",
  },
  {
    name: "Projects",
    link: "#",
  },
];

const NavigationBar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    isOpen
      ? (document.body.style.overflow = "scroll")
      : (document.body.style.overflow = "hidden");
  };
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed overflow-hidden w-full top-0 left-0 max-h-screen">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="https://adamlobler.com/" className="flex items-center">
          <span className="text-button font-semibold whitespace-nowrap dark:text-white">
            Adam Lobler
            <span className="text-gray-400 font-medium">
              {" "}
              | product designer
            </span>
          </span>
        </a>
        <div className="flex">
          <div className="flex md:order-2">
            <button type="button" className="btn-primary hidden md:block">
              Hire me!
            </button>
            <button
              onClick={() => toggleNavbar()}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-primary-500 rounded-sm md:hidden hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <Bars3Icon className="w-8 h-8" />
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-8"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className="text-body2 block py-2 pl-3 pr-4 text-white bg-primary-700 rounded md:bg-transparent md:text-black hover:text-primary-500 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
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
        <ul className="flex flex-col rounded-lgmd:flex-row space-y-8 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {navigationItems.map((item) => (
            <li key={item.name}>
              <a
                href="#"
                className="text-subtitle1 text-center block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:text-black hover:text-primary-500 md:p-0 dark:text-white"
                aria-current="page"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <button className="btn-primary w-72">Hire me!</button>
        <div className="pt-14">
          <Socials />
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
