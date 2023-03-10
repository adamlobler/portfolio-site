import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import Project from "../components/Project";
import { Fade } from "react-awesome-reveal";
import projects from "../data/projects";
import Layout from "../components/Layout";

const Works: NextPage = () => {
  return (
    <Layout>
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
        <meta property="og:image" content="https://i.imgur.com/5vJ6ZN7.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="flex max-w-5xl text-left xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-4 md:px-16 2xl:px-0 py-16">
        <Fade triggerOnce className="w-full">
          <div className="pt-16 pb-8 md:py-16 2xl:py-32 space-y-4">
            <h1 className="text-h3 md:text-h1 dark:text-white">Works</h1>
            <p className="text-subtitle2 md:text-subtitle1 text-gray-600 dark:text-gray-400">
              I have been able to assist startups and numerous businesses in
              achieving their goals!
            </p>
          </div>
        </Fade>
        <div className="grid w-full xl:grid-cols-2 gap-16 xl:pb-48">
          {projects.map((project) =>
            project.link ? (
              <a
                key={project.title}
                href={project.path ? "/works/" + project.path : project.link}
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
                    desktopImage={project.mobileImage}
                    mobileImage={project.mobileImage}
                    size="small"
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
                  desktopImage={project.mobileImage}
                  mobileImage={project.mobileImage}
                  size="small"
                />
              </Fade>
            )
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Works;
