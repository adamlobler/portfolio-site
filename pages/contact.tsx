import type { NextPage } from "next";
import Head from "next/head";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import Background from "../public/img/gradient.jpg";
import Socials from "../components/Socials";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";

const Contact: NextPage = () => {
  return (
    <>
      <Head>
        <title>Adam Lobler | Contact</title>
        <meta
          name="description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
          key="desc"
        />
        <meta property="og:title" content="Adam Lobler | Contact" />

        <meta
          property="og:description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
        />
        <meta property="og:image" content="/img/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Fade>
        <main className="flex bg-[#341692] min-h-screen flex-col items-center justify-center ">
          <div className="flex bg-[#341692] min-h-screen relative overflow-hidden flex-col w-full items-center justify-center ">
            <Image
              className="absolute h-full top-0 w-screen bg-background"
              alt="bg"
              quality={100}
              width={480}
              height={284}
              loading="eager"
              src={Background}
              placeholder="blur"
            />
            <div className="flex max-w-4xl z-10 xl:max-w-7xl flex-col xl:flex-row w-full space-y-16 xl:items-center justify-between px-4 py-16 md:pb-32">
              <div className="flex flex-col items-start space-y-8 md:space-y-12">
                <h2 className="text-h2 md:text-h1 text-white drop-shadow-sm">
                  Looking for help with design?
                </h2>
                <p className="text-subtitle1 md:text-h5 text-white drop-shadow-md">
                  Send me an e-mail and discuss the details!
                </p>
                <a
                  href="mailto:adam.lobler@vallio.studio"
                  className="flex max-w-xs min-w-[180px] w-full md:w-auto hover:drop-shadow-2xl items-center justify-center bg-white text-button text-primary-500 py-4 px-6 rounded-sm transition-all duration-300"
                >
                  Contact me!
                </a>
              </div>
              <div className="flex flex-col space-y-4 xl:items-end w-fit">
                <p className="text-subtitle2 text-white pb-8 text-left uppercase">
                  Get in touch!
                </p>
                <a
                  href="mailto:adam.lobler@vallio.studio"
                  className="text-h6 text-white pb-8 text-left"
                >
                  adam.lobler@vallio.studio
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
    </>
  );
};

export default Contact;
