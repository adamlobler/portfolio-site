import type { Metadata } from "next";
import Image from "next/image";

import Socials from "../../../components/Socials";
import { Fade } from "../../../components/client/Reveal";
import Background from "../../../public/img/gradient.jpg";

export const metadata: Metadata = {
  title: "Contact",
  openGraph: {
    title: "Adam Lobler | Contact",
    description:
      "I'm Adam, product designer. I’m passionate to make the best digital solution for businesses.",
    images: ["/img/og_image.png"],
  },
};

export default function ContactPage() {
  return (
    <Fade>
      <main className="flex bg-[#341692] min-h-screen flex-col items-center justify-center">
        <div className="flex bg-[#341692] min-h-screen relative overflow-hidden flex-col w-full items-center justify-center">
          <Image
            className="absolute h-full top-0 w-screen bg-background"
            alt=""
            quality={100}
            width={480}
            height={284}
            loading="eager"
            src={Background}
            placeholder="blur"
          />
          <div className="flex max-w-4xl z-10 xl:max-w-7xl flex-col xl:flex-row w-full space-y-16 xl:items-center justify-between px-4 py-16 md:pb-32">
            <div className="flex flex-col items-start space-y-8 md:space-y-12">
              <h1 className="text-h2 md:text-h1 text-white drop-shadow-xs">
                Looking for help with design?
              </h1>
              <p className="text-subtitle1 md:text-h5 text-white drop-shadow-md">
                Send me an e-mail and discuss the details!
              </p>
              <a
                href="mailto:contact@adamlobler.com"
                className="flex max-w-xs min-w-[180px] w-full md:w-auto hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-xs transition-all duration-300"
              >
                Contact me!
              </a>
            </div>
            <div className="flex flex-col space-y-4 xl:items-end w-fit">
              <p className="text-subtitle2 text-white pb-8 text-left uppercase">
                Get in touch!
              </p>
              <a
                href="mailto:contact@adamlobler.com"
                className="text-h6 text-white pb-8 text-left"
              >
                contact@adamlobler.com
              </a>
              <Socials />
            </div>
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
      </main>
    </Fade>
  );
}
