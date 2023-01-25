import React from "react";
import Project from "./Project";
import { Fade } from "react-awesome-reveal";
import projects from "../data/projects";

const Projects: React.FC = () => {
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className="my-24 space-y-32 xl:space-y-64">
      {featuredProjects.map((project) =>
        project.link ? (
          <a
            key={project.title}
            href={project.path ? "/works/" + project.path : project.link}
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
          <div key={project.title}>
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
          </div>
        )
      )}
    </section>
  );
};

export default Projects;
