import React from "react";
import ViddlDesktop from "../images/viddl_desktop.png";
import ViddlMobile from "../images/viddl_mobile.png";
import HsupDesktop from "../images/hsup_desktop.png";
import HsupMobile from "../images/hsup_mobile.png";
import HereforyouDesktop from "../images/hereforyou_desktop.png";
import HereforyouMobile from "../images/hereforyou_mobile.png";
import Project from "./Project";

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
];

const Projects: React.FC = () => {
  return (
    <section className="my-24 space-y-64">
      {projects.map((project) => (
        <div key={project.title}>
          <Project
            title={project.title}
            link={project.link}
            tags={project.tags}
            description={project.description}
            desktopImage={project.desktopImage}
            mobileImage={project.mobileImage}
          />
        </div>
      ))}
    </section>
  );
};

export default Projects;
