import type { Metadata } from "next";

import ProjectCard from "../../../components/ProjectCard";
import { Fade } from "../../../components/client/Reveal";
import projects from "../../../data/projects";

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
      {/**
       * The band is deliberately *outside* `<Fade>`. `react-awesome-reveal`
       * serialises `style="opacity:0"` into the SSR HTML, so a band inside it
       * would ship invisible and let the page background show through until
       * hydration — the same trap `globals.css` documents for `.hero-reveal`.
       * The two inner fades still carry the text in.
       */}
      <section className="band">
        <div className="band__inner items-start text-left">
          <Fade triggerOnce direction="up">
            <h1 className="text-h3 md:text-h1">Projects</h1>
          </Fade>
          <Fade triggerOnce direction="up">
            <p className="text-subtitle2 md:text-subtitle1">
              I have been able to assist numerous businesses in achieving their
              goals!
            </p>
          </Fade>
        </div>
      </section>
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
