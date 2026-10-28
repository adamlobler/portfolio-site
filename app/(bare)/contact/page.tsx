import type { Metadata } from "next";
import Img from "../../../components/Img";

import Socials from "../../../components/Socials";
import { Fade } from "../../../components/client/Reveal";
import Background from "../../../public/img/gradient.webp";
import Button from "../../../components/ui/Button";

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
          <Img
            className="absolute h-full top-0 w-screen bg-background"
            alt=""
            quality={100}
            width={480}
            height={284}
            loading="eager"
            src={Background}
            placeholder="blur"
          />
          <div className="flex max-w-4xl z-10 xl:max-w-page flex-col xl:flex-row w-full space-y-16 xl:items-center justify-between px-4 py-16 md:pb-32">
            <div className="flex flex-col items-start space-y-8 md:space-y-12">
              <h1 className="text-h2 md:text-h1 text-white drop-shadow-xs">
                Looking for help with design?
              </h1>
              <p className="text-subtitle1 md:text-h5 text-white drop-shadow-md">
                Send me an e-mail and discuss the details!
              </p>
              <Button
                href="mailto:contact@adamlobler.com"
                className="max-w-xs min-w-[180px] w-full md:w-auto"
              >
                Contact me!
              </Button>
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
