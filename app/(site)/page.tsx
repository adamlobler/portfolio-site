import Hero from "../../components/Hero";
import About from "../../components/About";
import Projects from "../../components/Projects";

/**
 * No `metadata` export: the root layout's defaults are this page's metadata.
 * A server component, and so is everything it renders: the only client
 * module left on this page is the Spline canvas inside `Hero`.
 */
export default function Home() {
  return (
    <div className="flex flex-col items-center">
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
