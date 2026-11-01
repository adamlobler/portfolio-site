import HeroBackdrop from "./hero/HeroBackdrop";
import Button from "./ui/Button";

/**
 * A server component. The headline, the CTAs and the backdrop gradient are
 * plain HTML in the statically generated page; the only thing that crosses to
 * the client is the canvas, and it crosses late.
 *
 * What this replaced: a hosted Spline scene — a three.js runtime, a WASM
 * module and a remote `.splinecode` — that painted on a *transparent* canvas,
 * so the hero needed a dark placeholder underneath and a `text-white`
 * headline on top of it, in every theme. The canvas here is transparent too,
 * but it sits on `--cmp-hero-bg`, which is a real surface token: the hero is
 * finally light in the light themes, and its text is `content.primary` like
 * every other heading on the site.
 */
const Hero = () => {
  return (
    <section className="hero">
      {/**
       * Order matters: the gradient is first and is never conditional, so it
       * is what paints on the first frame, what a reduced-motion visitor
       * keeps, and what is there with JS off. The canvas fades in over it.
       */}
      <div className="hero__backdrop" aria-hidden="true" />
      <HeroBackdrop />

      <div className="hero__content">
        <h1 className="hero-reveal hero__title">
          Reshape digital products together!
        </h1>

        <div className="hero-reveal hero-reveal--late hero__actions">
          <Button href="/contact">Get in touch!</Button>
          <Button href="/works" variant="secondary">
            Discover projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
