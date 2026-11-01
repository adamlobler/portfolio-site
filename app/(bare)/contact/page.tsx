import type { Metadata } from "next";

import Socials from "../../../components/Socials";
import Button from "../../../components/ui/Button";

export const metadata: Metadata = {
  title: "Contact",
  openGraph: {
    title: "Adam Lobler | Contact",
    description:
      "I'm Adam, product designer. I’m passionate to make the best digital solution for businesses.",
    images: ["/img/og_image.png"],
  },
};

/**
 * The whole page is the band, which is why `.band` sits on `<main>` rather
 * than on an inner wrapper: the "designed and developed by" link lives outside
 * that wrapper, and on `surface.base` it would be `content.on-brand` on a page
 * surface — white on white in five of the six themes.
 *
 * The `<Fade>` that used to wrap everything is gone too. It serialises
 * `style="opacity:0"` into the SSR HTML, so it was fading in the entire
 * viewport, background included, after hydration.
 */
export default function ContactPage() {
  return (
    <main className="band flex min-h-screen flex-col items-center justify-center">
      <div className="band__inner">
        <div className="flex w-full flex-col justify-between gap-stack-xl xl:flex-row xl:items-center">
          <div className="flex flex-col items-start gap-stack-lg">
            <h1 className="text-h2 md:text-h1">
              Looking for help with design?
            </h1>
            <p className="text-subtitle1 md:text-h5">
              Send me an e-mail and discuss the details!
            </p>
            <Button
              variant="on-brand"
              href="mailto:contact@adamlobler.com"
              className="w-full max-w-xs md:w-auto"
            >
              Contact me!
            </Button>
          </div>

          <div className="flex w-fit flex-col gap-stack-lg xl:items-end">
            <p className="text-subtitle2 text-left uppercase">Get in touch!</p>
            <a
              href="mailto:contact@adamlobler.com"
              className="text-h6 text-left"
            >
              contact@adamlobler.com
            </a>
            <Socials />
          </div>
        </div>

        <a
          className="flex items-center justify-center text-caption uppercase"
          href="https://adamlobler.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed and developed by Adam Lobler
        </a>
      </div>
    </main>
  );
}
