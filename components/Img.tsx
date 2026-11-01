import NextImage, { type ImageProps } from "next/image";

/**
 * `next/image` with a sane default quality.
 *
 * Next's built-in default is `quality={75}`, and almost nothing on this site
 * passed the prop — so every screenshot was delivered as a q75 AVIF no matter
 * how good the master was. On photographs q75 is fine; on the UI screenshots
 * that make up most of the case studies it softens hairlines and bands the
 * flat gradients.
 *
 * 90 is where the measured error curve flattens: going 75 -> 90 is a clear
 * improvement for roughly 1.6x the bytes, while 90 -> 95 costs another ~1.5x
 * for almost nothing. Any call site can still override it.
 *
 * Every allowed value must also be listed in `images.qualities` in
 * next.config.js — Next 15 warns on unlisted values and Next 16 will reject
 * them.
 */
export default function Img({ quality = 90, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />;
}
