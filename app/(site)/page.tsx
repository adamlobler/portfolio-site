import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";
import { Fade } from "../../components/client/Reveal";

/**
 * No `metadata` export: the root layout's defaults are this page's metadata.
 * A server component now — `Hero` is the only part of it that reaches the
 * client, and `About`/`Projects` render through to HTML.
 */
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Fade triggerOnce className="w-full">
        <Hero />
      </Fade>
      <div className="flex max-w-5xl xl:max-w-7xl w-full flex-1 flex-col items-center justify-center px-6 md:px-16 2xl:px-0 py-16 text-center">
        <About />
        <Projects />
      </div>
    </div>
  );
}
