import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  image: string | "";
  alt: string | "";
  url: string | "";
};

const Social: React.FC<Props> = (props) => {
  return (
    <a
      href={props.url}
      rel="noreferrer"
      target="_blank"
      className="w-[60px] h-[60px] bg-white flex justify-center items-center hover:bg-primary-100 hover:drop-shadow-2xl rounded-full transition-all duration-300"
    >
      <Image width={32} height={32} src={props.image} alt={props.alt} />
    </a>
  );
};

export default Social;
