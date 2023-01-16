import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  image: StaticImageData;
  alt: string | "";
  url: string | "";
};

const Social: React.FC<Props> = (props) => {
  return (
    <a
      href={props.url}
      rel="noreferrer"
      target="_blank"
      className="flex w-fit hover:bg-primary-50 rounded-full"
    >
      <Image width={60} height={60} src={props.image} alt={props.alt} />
    </a>
  );
};

export default Social;
