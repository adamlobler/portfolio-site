import React from "react";

import Socials from "./Socials";
import Button from "./ui/Button";

/**
 * The site footer, and the clearest case for `surface.brand`: it used to be a
 * fixed gradient JPEG with `bg-[#341692]` behind it — and, in dark mode, no
 * brand colour at all, just `surface.base`. Now it is one band that follows
 * theme × appearance × density × contrast like everything else, and the
 * `text-white` + `drop-shadow-*` that existed to rescue text off a photograph
 * are gone with it: `.band` sets `color`, and both of its stops are scored
 * against that colour by the contrast gate.
 */
const Footer = () => {
  return (
    <footer className="band">
      <div className="band__inner">
        <div className="flex w-full flex-col justify-between gap-stack-xl xl:flex-row xl:items-center">
          <div className="flex flex-col items-start gap-stack-lg">
            <h2 className="text-h2 xl:text-h1">
              Looking for help with design?
            </h2>
            <p className="text-subtitle1">
              Send me an e-mail and discuss the details!
            </p>
            <Button variant="on-brand" href="mailto:contact@adamlobler.com">
              Get in touch!
            </Button>
          </div>

          <div className="flex w-fit flex-col gap-stack-lg xl:items-end">
            <p className="text-caption uppercase">contact information</p>
            <a
              href="mailto:contact@adamlobler.com"
              className="text-subtitle1 text-left"
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
    </footer>
  );
};

export default Footer;
