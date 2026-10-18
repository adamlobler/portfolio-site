"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { GALLERIES } from "../data/galleries";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
  ssr: false,
});

/**
 * Used from MDX as `<Gallery slug="viddl" />`. The thumbnails are server
 * markup as far as the reader is concerned — they are in the HTML and need no
 * JS to be visible; only the lightbox is deferred, and only until a click.
 */
export default function Gallery({ slug }: { slug: string }) {
  const images = GALLERIES[slug];
  const [index, setIndex] = useState(-1);

  if (!images?.length) return null;

  return (
    <div className="flex w-full flex-col">
      {images.map((image, i) => (
        <button
          key={image.src}
          type="button"
          onClick={() => setIndex(i)}
          aria-label={`Open image ${i + 1} of ${images.length} full size`}
          className="flex pt-8"
        >
          <Image src={image} alt="" sizes="(max-width: 1028px) 92vw, 1000px" />
        </button>
      ))}
      {index >= 0 && (
        <GalleryLightbox
          slides={images.map((image) => ({
            src: image.src,
            width: image.width,
            height: image.height,
          }))}
          index={index}
          onClose={() => setIndex(-1)}
        />
      )}
    </div>
  );
}
