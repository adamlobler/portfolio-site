import type { FC, SVGProps } from "react";

type Props = {
  icon: FC<SVGProps<SVGSVGElement>>;
  /** Names the destination, not the picture — this is a link, not an image. */
  label: string;
  url: string;
};

/**
 * One icon chip. The glyph is an inline `currentColor` SVG, so its colour is
 * whatever `.social` sets; it used to be a `next/image` pointing at a file with
 * `#522CED` baked in, which Next could not optimise anyway (SVG needs
 * `dangerouslyAllowSVG`) and which no theme could reach.
 */
export default function Social({ icon: Icon, label, url }: Props) {
  return (
    <a
      href={url}
      rel="noreferrer"
      target="_blank"
      aria-label={label}
      className="social"
    >
      <Icon aria-hidden="true" focusable="false" />
    </a>
  );
}
