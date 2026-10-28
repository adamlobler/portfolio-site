import type { Metadata } from "next";
import Img from "../../../components/Img";

import ProjectCard from "../../../components/ProjectCard";
import { Fade } from "../../../components/client/Reveal";
import projects from "../../../data/projects";
import Background from "../../../public/img/gradient.webp";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    title: "Adam Lobler | Works",
    description:
      "I'm Adam, product designer. I’m passionate to make the best digital solution for businesses.",
    images: ["/img/og_image.png"],
  },
};

export default function WorksPage() {
  return (
    <>
      <Fade triggerOnce className="w-full">
        <div className="relative flex items-center justify-center w-screen py-4 md:py-16 2xl:py-24">
          <Img
            src={Background}
            className="absolute top-0 left-0 w-screen h-full bg-background"
            alt=""
            priority
          />
          <div className="flex w-full space-y-2 max-w-5xl text-left xl:max-w-page flex-1 flex-col items-start justify-center px-4 md:px-16 2xl:px-0 py-8">
            <Fade triggerOnce direction="up">
              <h1 className="text-h3 md:text-h1 text-white drop-shadow-2xl md:mb-4">
                Projects
              </h1>
            </Fade>
            <Fade triggerOnce direction="up">
              <p className="text-subtitle2 md:text-subtitle1 text-white drop-shadow-lg">
                I have been able to assist numerous businesses in achieving
                their goals!
              </p>
            </Fade>
          </div>
        </div>
      </Fade>
      <section className="flex max-w-5xl text-left xl:max-w-page w-full flex-1 flex-col items-center justify-center px-6 md:px-16 2xl:px-0 py-16">
        <div className="grid w-full xl:grid-cols-1 lg:gap-48 gap-16 xl:pb-48">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
