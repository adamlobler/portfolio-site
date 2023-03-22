import Image, { StaticImageData } from "next/image";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Fade } from "react-awesome-reveal";

type Props = {
  path?: string;
  title: string;
  link?: string;
  tags: string[];
  description: string;
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
  size: "large" | "small";
};

const Project: React.FC<Props> = (props) => {
  return (
    <div className="group space-y-8 mx-[-24px] lg:mx-auto">
      <Image
        src={props.desktopImage}
        alt="desktop_image"
        className={`${props.size == "large" ? "hidden xl:flex" : "hidden"}`}
        sizes="1216px"
      />
      <Image
        src={props.mobileImage}
        alt="mobile_image"
        className={`${
          props.size == "large"
            ? "flex xl:hidden overflow-hidden ease-in-out duration-500 "
            : "flex overflow-hidden ease-in-out duration-500"
        }`}
        sizes="(max-width: 1028px) 85vw, 896px"
      />
      <div className="flex flex-col items-start space-y-4 px-6 md:px-0">
        <div className="flex space-x-4 items-center">
          <h2 className="text-h5 dark:text-white md:text-h2 text-left">
            {props.title}
          </h2>
          {props.size == "large" && (props.path || props.link) ? (
            <ArrowRightIcon className="h-12 w-12 text-primary-500 dark:text-primary-400 group-hover:ml-6 transition-all duration-500" />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-row flex-wrap">
          {props.tags.map((tag) => (
            <p
              key={tag}
              className="text-button px-2 py-1 border rounded mr-2 my-1 whitespace-nowrap"
            >
              {tag}
            </p>
          ))}
        </div>
        <p
          className={`${
            props.size == "large"
              ? "text-subtitle2 max-w-4xl md:text-subtitle1 text-gray-600 dark:text-gray-300 text-left"
              : "text-subtitle2 max-w-4xl text-gray-600 dark:text-gray-300 text-left"
          }`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default Project;
