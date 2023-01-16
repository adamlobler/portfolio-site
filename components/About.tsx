import React from "react";
import Image from "next/image";

import Circle from "../images/circle.png";
import Cross from "../images/cross.png";
import Angled from "../images/angled.png";
import Rectangle from "../images/rectangle.png";
import Triangle from "../images/triangle.png";
import ProfilePicture from "../images/profile_picture.png";

const process = [
  {
    title: "Product strategy",
    body: "Before delving into specific product details, I ensure that the product goals are clearly defined and that we are developing the appropriate solution to address the right issues.",
  },
  {
    title: "UX/UI design",
    body: "When the business objectives are set, I create wireframes and early prototypes of the product to facilitate easy review during the initial phase of the project. Once the functionality is agreed upon, I then create high-fidelity designs in Figma, adhering to the provided branding guidelines.",
  },
  {
    title: "Development",
    body: "With my knowledge in coding, I am able to assist developers in understanding the product during the development phase. If additional assistance is required, my development partners are available to help bring your product to fruition.",
  },
];

const About: React.FC = () => {
  return (
    <section className="flex w-full xl:space-x-8 space-y flex-col justify-center xl:flex-row py-8 xl:py-16">
      <div className="flex flex-col xl:w-1/2 space-y-6 justify-start">
        <Image
          height={220}
          width={220}
          src={ProfilePicture}
          className=" w-40 xl:w-56"
          alt="adam_lobler"
        />
        <h2 className="text-h5 md:text-h3 text-left">About me</h2>
        <p className="text-body1 md:text-body1 w-full text-gray-500 text-left">
          I am a product designer with 5+ years of experience based in Budapest,
          Hungary. Presently, I am working as a freelancer and seeking new
          opportunities to assist companies in creating human-centric digital
          solutions. I utilize Figma to create interactive prototypes that make
          it easier for you to visualize the product. Additionally, I have
          coding experience and can assist with software development, or if
          necessary, I can bring on developer partners for more complex
          projects.
        </p>
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2">
            <p className="text-caption uppercase text-start">
              years of experience
            </p>
            <p className="text-h3 uppercase text-primary-500 w-5">5+</p>
          </div>
          <div className="flex flex-col w-1/2">
            <p className="text-caption text-start uppercase">clients served</p>
            <p className="text-h3 uppercase text-primary-500 w-5">30+</p>
          </div>
          <div className="pr-6 pb-4 lg:pb-0" />
        </div>
        <div className="flex justify-start">
          <button className="btn-secondary">Find out more</button>
        </div>
        <Image
          className="lg:absolute xl:block hidden none mt-96 ml-96"
          width={50}
          height={50}
          src={Angled}
          alt="angled square"
        />
      </div>
      <div className="hidden xl:flex flex-col xl:w-1/2 space-y-6 justify-start">
        {process.map((step) => (
          <div key={step.title} className="bg-gray-50 space-y-2 px-8 py-8">
            <h3 className="text-subtitle1 max-w-2xl text-left">{step.title}</h3>
            <p className="text-body1 md:text-body1 text-gray-500 xl:max-w-lg text-left">
              {step.body}
            </p>
          </div>
        ))}
      </div>
      <Image
        className="lg:absolute xl:block hidden none mt-96 -ml-8"
        width={30}
        height={30}
        src={Rectangle}
        alt="rectangle"
      />
      <div>
        <Image
          className="lg:absolute xl:block hidden none"
          width={50}
          height={50}
          src={Triangle}
          alt="triangle"
        />
      </div>
    </section>
  );
};

export default About;
