import React from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

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
      <div className="flex flex-col xl:w-full space-y-12 justify-start xl:mr-48">
        <Fade triggerOnce>
          <Image
            src={"/img/adam_lobler.jpg"}
            className=" w-56 xl:w-[300px] rounded"
            width={300}
            height={300}
            sizes="(max-width: 1280px) 160px,228px,"
            alt="adam_lobler"
          />
          <h2 className="text-h3 dark:text-white md:text-h2 text-left">
            About me
          </h2>
          <p className="text-body1 md:text-body1 w-full text-gray-600 dark:text-gray-300 text-left">
            I'm a product designer with 5+ years of experience, specializing in
            design systems. Currently, I am working as a freelancer and seeking
            new opportunities to help companies in creating human-centric
            digital solutions. I enjoy working with agencies and startups who
            want to solve meaningful problems through digital products.
          </p>
          <div className="flex flex-row">
            <div className="flex flex-col space-y-2 w-1/2">
              <p className="text-caption dark:text-white uppercase text-start">
                years of experience
              </p>
              <p className="text-h2 uppercase text-primary-400 w-5">5+</p>
            </div>
            <div className="flex flex-col space-y-2 w-1/2">
              <p className="text-caption dark:text-white text-start uppercase">
                clients served
              </p>
              <p className="text-h2 uppercase text-primary-400 w-5">30+</p>
            </div>
            <div className="pr-6 pb-4 lg:pb-0" />
          </div>
          {/*
          <div className="flex justify-start">
            <button className="btn-secondary w-full md:w-auto">
              Find out more
            </button>
           </div>
           */}
        </Fade>
      </div>
      <div className="hidden xl:flex w-full flex-col space-y-6 justify-start">
        {process.map((step) => (
          <Fade triggerOnce key={step.title}>
            <div className="bg-gray-50 dark:bg-gray-900 space-y-2 px-8 py-8">
              <h3 className="text-subtitle1 dark:text-white max-w-2xl text-left">
                {step.title}
              </h3>
              <p className="text-body1 md:text-body1 text-gray-700 dark:text-gray-300 xl:max-w-lg text-left">
                {step.body}
              </p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default About;
