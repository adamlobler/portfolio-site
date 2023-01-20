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
import DigidojoDesktop from "../images/digidojo_desktop.png";
import DigidojoMobile from "../images/digidojo_mobile.png";
import WiaDesktop from "../images/wia_desktop.png";
import WiaMobile from "../images/wia_mobile.png";
import CogitoDesktop from "../images/cogito_desktop.png";
import CogitoMobile from "../images/cogito_mobile.png";
import EvitaDesktop from "../images/evita_desktop.png";
import EvitaMobile from "../images/evita_mobile.png";
import { Fade } from "react-awesome-reveal";

const projects = [
  {
    title: "VIDDL - Last mile delivery startup",
    link: "https://viddl.hu",
    tags: ["Web application", "Mobile application", "Package tracking"],
    description:
      "ViddL provides last-mile delivery service for big delivery companies. The startup has an admin UI for offices where they can manage the parcels and couriers and a mobile app for delivery.",
    desktopImage: ViddlDesktop,
    mobileImage: ViddlMobile,
  },
  {
    title: "Hungarian startup university program",
    link: "https://hsup.nkfih.gov.hu",
    tags: ["Web application", "Mobile application", "Landing page"],
    description:
      "HSUP is an online education platform where students can learn about startups. It’s available on almost every hungarian university and used by thousands of students every semester.",
    desktopImage: HsupDesktop,
    mobileImage: HsupMobile,
  },
  {
    title: "Hereforyou - online platform for  psychologists",
    tags: ["Web application", "Landing page"],
    description:
      "Hereforyou is a web application for psychologists where they can manage their appointments and make tests and homeworks for their clients. (Development in progress...)",
    desktopImage: HereforyouDesktop,
    mobileImage: HereforyouMobile,
  },
  {
    title: "Dino Booking - Booking service for small businesses",
    tags: ["Web application", "Landing page"],
    description:
      "Dinobooking provides the most simple booking service for small businesses. The startup makes a booking website and a admin interface for subscribers where they can manage their business. (Development in progress...)",
    desktopImage: DinobookingDesktop,
    mobileImage: DinobookingMobile,
  },
  {
    title: "Digidojo - Hungary’s first gamer coaching platform",
    tags: ["Web application", "Landing page", "Admin UI"],
    description:
      "Digidojo is an online platform where gamers can book appointments to mentors who help them evolve their skills in gaming.",
    desktopImage: DigidojoDesktop,
    mobileImage: DigidojoMobile,
  },
  {
    title: "Wia electric yachts - Landing page for yacht company",
    link: "http://elektromosyacht.hu",
    tags: ["Landing page"],
    description:
      "Mobile friendly landing page UI design for luxury yacht manufacture company.",
    desktopImage: WiaDesktop,
    mobileImage: WiaMobile,
  },
  {
    title: "Cogito - Online e-learning platform for universities",
    tags: ["Web application"],
    description:
      "Cogito is an online learning platform for universities, where students can create, update and read notes together collaboratively.",
    desktopImage: CogitoDesktop,
    mobileImage: CogitoMobile,
  },
  {
    title: "Evita - Online platform for parents",
    tags: ["Web application", "landing page"],
    link: "https://evita.hu",
    description:
      "Evita is an online education platform for parents where they can learn about how to raise a child.",
    desktopImage: EvitaDesktop,
    mobileImage: EvitaMobile,
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
      <div className="flex flex-col max-w-2xl xl:max-w-7xl w-full  px-4 xl:px-16 py-8 ">
        <Fade triggerOnce>
          <div className="pt-16 pb-8 md:py-32 space-y-4">
            <h1 className="text-h3 md:text-h1 dark:text-white">Works</h1>
            <p className="text-subtitle2 md:text-subtitle1 text-gray-600 dark:text-gray-400">
              I have been able to assist startups and numerous businesses in
              achieving their goals!
            </p>
          </div>
        </Fade>
        <div className="grid xl:grid-cols-2 gap-16 xl:pb-48">
          {projects.map((project) => (
            <Fade triggerOnce key={project.title}>
              <Project
                title={project.title}
                link={project.link}
                tags={project.tags}
                description={project.description}
                desktopImage={project.mobileImage}
                mobileImage={project.mobileImage}
                size="small"
              />
            </Fade>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Works;
