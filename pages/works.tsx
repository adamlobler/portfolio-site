import type { NextPage } from "next";
import Head from "next/head";
import Project from "../components/Project";
import { Fade } from "react-awesome-reveal";
import projects from "../data/projects";
import Image from "next/image";
import Background from "../public/img/gradient.png";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const Works: NextPage = () => {
  return (
    <>
      <Head>
        <title>Adam Lobler | Works</title>
        <meta
          name="description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
          key="desc"
        />
        <meta property="og:title" content="Adam Lobler | Works" />

        <meta
          property="og:description"
          content="I'm Adam, product designer. I’m passionate to make the best digital solution for businesses."
        />
        <meta property="og:image" content="/img/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fade triggerOnce className="w-full">
        <div className="relative flex items-center justify-center w-screen py-4 md:py-16 2xl:py-24">
          <Image
            src={Background}
            className="absolute top-0 left-0 w-screen h-full bg-background"
            alt="bg"
            priority
          />
          <div className="flex w-full space-y-2 max-w-5xl text-left xl:max-w-7xl flex-1 flex-col items-start justify-center px-4 md:px-16 2xl:px-0 py-8">
            <Fade triggerOnce direction="up">
              <h1 className="text-h3 md:text-h1 text-white drop-shadow-2xl  md:mb-4">
                Works
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
      <section className="flex max-w-5xl text-left xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-6 md:px-16 2xl:px-0 py-16">
          <div className="grid w-full xl:grid-cols-1 lg:gap-48 gap-16 xl:pb-48">
          {projects.map((project) =>
            project.link ? (
              <a
                key={project.title}
                href={project.path ? project.path : project.link}
                rel="noreferrer"
                target={project.path ? "" : "_blank"}
              >
                <Fade triggerOnce>
                  <Project
                    path={project.path}
                    title={project.title}
                    link={project.link}
                    tags={project.tags}
                    description={project.description}
                    desktopImage={project.desktopImage}
                    mobileImage={project.mobileImage}
                    size="large"
                  />
                </Fade>
              </a>
            ) : (
              <Fade triggerOnce key={project.title}>
                <Project
                  path={project.path}
                  title={project.title}
                  link={project.link}
                  tags={project.tags}
                  description={project.description}
                  desktopImage={project.desktopImage}
                  mobileImage={project.mobileImage}
                  size="large"
                />
              </Fade>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Works;
