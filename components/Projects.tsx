import React from "react";
import Project from "./Project";
import { Fade } from "react-awesome-reveal";
import projects from "../data/projects";

const Projects = () => {
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className="my-24 space-y-32 xl:space-y-64">
      {featuredProjects.map((project) =>
        project.link ? (
          <a
            key={project.title}
            href={project.path ? project.path : project.link}
            rel="noreferrer"
            target={project.path ? "" : "_blank"}
            className="block"
          >
            <Fade triggerOnce>
              <Project
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
    </section>
  );
};

export default Projects;
