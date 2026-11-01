import Link from "next/link";

import Project from "./Project";
import { Fade } from "./Reveal";
import type { Project as ProjectData } from "../data/projects";

/**
 * One card plus whatever it links to. The homepage and `/works` both used to
 * inline the same three-branch ternary, and both built the internal href as a
 * bare `"airtime"` — a relative URL that happened to resolve correctly from
 * `/` and `/works` and would have broken anywhere else.
 */
export default function ProjectCard({ project }: { project: ProjectData }) {
  const card = (
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
  );

  if (project.path) {
    return (
      <Fade triggerOnce>
        <Link href={`/${project.path}`} className="block">
          {card}
        </Link>
      </Fade>
    );
  }

  if (project.link) {
    return (
      <Fade triggerOnce>
        <a
          href={project.link}
          rel="noreferrer"
          target="_blank"
          className="block"
        >
          {card}
        </a>
      </Fade>
    );
  }

  return <Fade triggerOnce>{card}</Fade>;
}
