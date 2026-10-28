"use client";

import Img from "./Img";
import Lightbox, { type SlideImage } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  slides: SlideImage[];
  index: number;
  onClose: () => void;
};

/**
 * Split out of `Gallery` so `next/dynamic` has something to defer: the
 * library plus its stylesheet is a click-only UI and has no business in the
 * first load of a case study.
 */
export default function GalleryLightbox({ slides, index, onClose }: Props) {
  return (
    <Lightbox
      open
      index={index}
      close={onClose}
      slides={slides}
      render={{
        slide: ({ slide, rect }) => {
          if (!slide.width || !slide.height) return null;
          const scale = Math.min(
            rect.width / slide.width,
            rect.height / slide.height
          );
          const width = Math.round(slide.width * scale);
          const height = Math.round(slide.height * scale);

          return (
            <div style={{ position: "relative", width, height }}>
              <Img
                fill
                src={slide.src}
                alt={slide.alt ?? ""}
                loading="eager"
                /**
                 * `rect` is the lightbox viewport, measured by the library —
                 * so the hint is accurate without reading `window` during
                 * render the way the old `/works/[id]` renderer did.
                 */
                sizes={`${Math.ceil((width / rect.width) * 100)}vw`}
              />
            </div>
          );
        },
      }}
    />
  );
}
