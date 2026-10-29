import React from "react";
import Img from "./Img";
import { Fade } from "./Reveal";
import Card from "./ui/Card";

const process = [
  {
    title: "Product strategy",
    body: "Before diving into specific product details, I ensure that the product goals are clearly defined and that we are developing the appropriate solution to address the right issues.",
  },
  {
    title: "UX/UI design",
    body: "When the business objectives are set, I create wireframes and early prototypes of the product to facilitate easy review during the initial phase of the project. Once the functionality is agreed upon, I then create high-fidelity designs in Figma, adhering to the branding guidelines.",
  },
  {
    title: "Development",
    body: "With my knowledge in coding, I am able to assist developers in understanding the product during the development phase. If additional assistance is required, my development partners are available to help bring your product to life.",
  },
];

const About = () => {
  return (
    <section className="flex w-full xl:h-screen space-y flex-col items-center justify-center xl:flex-row py-4 xl:py-32">
      <div className="flex flex-col xl:w-full justify-start xl:mr-48">
        {/**
         * The `space-y-12` lives on the reveal wrapper, not on this column.
         * `react-awesome-reveal` wrapped *each* child in its own animated
         * div, so the column had four children to space apart; the CSS
         * reveal is one element around all four, and the spacing has to be
         * inside it.
         */}
        <Fade triggerOnce className="flex flex-col space-y-12">
          <Img
            src={"/img/adam_lobler.webp"}
            className=" w-56 xl:w-[300px] rounded-sm"
            width={300}
            height={300}
            sizes="(max-width: 1280px) 160px, 228px"
            alt="adam_lobler"
          />
          <h2 className="text-h3 text-content-primary md:text-h2 text-left">
            About me
          </h2>
          <p className="text-body1 md:text-body1 w-full text-content-muted text-left">
            I&apos;m a product designer with 5+ years of experience,
            specializing in design systems. Currently, I am working as a
            freelancer and seeking new opportunities to help companies in
            creating human-centric digital solutions. I enjoy working with
            agencies and startups who want to solve meaningful problems through
            digital products.
          </p>
          <div className="flex flex-row">
            <div className="flex flex-col space-y-2 w-1/2">
              <p className="text-caption text-content-primary uppercase text-start">
                years of experience
              </p>
              <p className="text-h2 uppercase text-accent-default w-5">5+</p>
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <p className="text-caption text-content-primary text-start uppercase">
                clients served
              </p>
              <p className="text-h2 uppercase text-accent-default w-5">30+</p>
            </div>
            <div className="pr-6 pb-4 lg:pb-0" />
          </div>
          {/*
          <div className="flex justify-start">
            <Button variant="secondary" block className="md:w-auto">
              Find out more
            </Button>
           </div>
           */}
        </Fade>
      </div>
      <div className="hidden xl:flex w-full flex-col space-y-6 justify-start">
        {process.map((step) => (
          <Fade triggerOnce key={step.title}>
            <Card as="article">
              <h3 className="text-subtitle1 text-content-primary max-w-2xl text-left">
                {step.title}
              </h3>
              <p className="text-body1 md:text-body1 text-content-secondary xl:max-w-lg text-left">
                {step.body}
              </p>
            </Card>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default About;
