import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";

/**
 * No `metadata` export: the root layout's defaults are this page's metadata.
 * A server component, and so is everything it renders: the only client
 * module left on this page is the hero canvas inside `Hero`.
 *
 * The wrapper's `w-full` is load-bearing. It is a flex item of a column flex
 * container, so without it the div shrinks to its max-content width — which
 * the section below caps at `max-w-page` — and the full-bleed hero inside it
 * inherits that cap, letterboxed on any viewport wider than 1344px.
 */
export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      {/**
       * `Hero` is deliberately *not* wrapped in `<Fade>`. Everything
       * `react-awesome-reveal` touches ships as `opacity: 0` in the HTML and
       * waits on hydration, which would put the LCP headline right back
       * behind JS. The hero does its own entrance in CSS instead.
       */}
      <Hero />
      <div className="flex max-w-5xl xl:max-w-page w-full flex-1 flex-col items-center justify-center px-6 md:px-16 2xl:px-0 py-16 text-center">
        <About />
        <Projects />
      </div>
    </div>
  );
}
