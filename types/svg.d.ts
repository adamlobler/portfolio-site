/**
 * SVGs imported from a TS/TSX module are React components (see the
 * @svgr/webpack rule in next.config.js); `?url` opts back out to a plain URL,
 * which is what next/image, `<link>` and CSS need.
 *
 * `next-env.d.ts` pulls in `next/image-types/global`, which also declares
 * `*.svg` — as `StaticImageData`. The two merge, and the declaration below is
 * the one that matches how this repo actually imports them.
 */
declare module "*.svg" {
  import type { FC, SVGProps } from "react";

  const ReactComponent: FC<SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}

declare module "*.svg?url" {
  const src: string;
  export default src;
}
