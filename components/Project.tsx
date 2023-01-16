import Image, { StaticImageData } from "next/image";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

type Props = {
  title: string;
  link?: string;
  tags: string[];
  description: string;
  desktopImage: StaticImageData;
  mobileImage: StaticImageData;
};

const Project: React.FC<Props> = (props) => {
  return (
    <a className="space-y-8" href={props.link} rel="noreferrer" target="_blank">
      <Image
        src={props.desktopImage}
        alt="desktop_image"
        className="hidden xl:flex"
      />
      <Image
        src={props.mobileImage}
        alt="mobile_image"
        className="flex xl:hidden"
      />
      <div className="flex flex-col items-start space-y-4">
        <div className="flex space-x-4 items-center">
          <h2 className="text-h5 md:text-h3 text-left">{props.title}</h2>
          <ArrowRightIcon className="h-12 w-12 text-primary-500" />
        </div>
        <div className="flex flex-wrap">
          {props.tags.map((tag) => (
            <p
              key={tag}
              className="text-caption uppercase text-start mr-2 text-gray-400"
            >
              {tag}
            </p>
          ))}
        </div>
        <p className="text-subtitle2 md:text-subtitle1 text-gray-600 text-left">
          {props.description}
        </p>
      </div>
    </a>
  );
};

export default Project;
