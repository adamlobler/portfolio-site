import React from "react";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

const Projects = () => {
  const featuredProjects = projects.slice(0, 4);
  return (
    <section className="my-24 space-y-32 xl:space-y-64">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </section>
  );
};

export default Projects;
