import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Project from "../components/Project";
import ViddlDesktop from "../images/viddl_desktop.png";
import ViddlMobile from "../images/viddl_mobile.png";
import HsupDesktop from "../images/hsup_desktop.png";
import HsupMobile from "../images/hsup_mobile.png";
import HereforyouDesktop from "../images/hereforyou_desktop.png";
import HereforyouMobile from "../images/hereforyou_mobile.png";
import DinobookingDesktop from "../images/dinobooking_desktop.png";
import DinobookingMobile from "../images/dinobooking_mobile.png";

const projects = [
  {
    title: "VIDDL - Last mile delivery startup",
    link: "https://viddl.hu",
    tags: ["Web application", "mobile application", "package tracking"],
    description:
      "ViddL provides last-mile delivery service for big delivery companies. The startup has an admin UI for offices where they can manage the parcels and couriers and a mobile app for delivery.",
    desktopImage: ViddlDesktop,
    mobileImage: ViddlMobile,
  },
  {
    title: "Hungarian startup university program",
    link: "https://hsup.nkfih.gov.hu",
    tags: ["Web application", "mobile application", "landing page"],
    description:
      "HSUP is an online education platform where students can learn about startups. It’s available on almost every hungarian university and used by thousands of students every semester.",
    desktopImage: HsupDesktop,
    mobileImage: HsupMobile,
  },
  {
    title: "Hereforyou - online platform for  psychologists",
    tags: ["Web application", "landing page"],
    description:
      "Hereforyou is a web application for psychologists where they can manage their appointments and make tests and homeworks for their clients. (Development in progress...)",
    desktopImage: HereforyouDesktop,
    mobileImage: HereforyouMobile,
  },
  {
    title: "Dino Booking - Booking service for small businesses",
    tags: ["Web application", "landing page"],
    description:
      "Dinobooking provides the most simple booking service for small businesses. The startup makes a booking website and a admin interface for subscribers where they can manage their business. (Development in progress...)",
    desktopImage: DinobookingDesktop,
    mobileImage: DinobookingMobile,
  },
];

const Works: NextPage = () => {
  return (
    <div className="flex min-h-screen dark:bg-black flex-col items-center justify-center ">
      <Head>
        <title>Adam Lobler | Works</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.2.x/dist/typography.min.css"
          rel="stylesheet"
        />
      </Head>
      <NavigationBar />
      <div className="flex flex-col max-w-2xl xl:max-w-7xl w-full px-4 py-8 ">
        <div className="py-32 space-y-4">
          <h1 className="text-h1 dark:text-white">Projects</h1>
          <p className="text-subtitle1 text-gray-600 dark:text-gray-400">
            I have been able to assist startups and numerous businesses in
            achieving their goals!
          </p>
        </div>
        <div className="grid xl:grid-cols-2 gap-16">
          {projects.map((project) => (
            <div key={project.title}>
              <Project
                title={project.title}
                link={project.link}
                tags={project.tags}
                description={project.description}
                desktopImage={project.mobileImage}
                mobileImage={project.mobileImage}
                size="small"
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Works;
