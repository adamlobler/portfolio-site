import type { StaticImageData } from "next/image";

import ViddlAdmin1 from "../public/img/viddl/Admin_1.webp";
import ViddlAdmin2 from "../public/img/viddl/Admin_2.webp";
import ViddlButtons from "../public/img/viddl/viddl_buttons.webp";
import ViddlCourier from "../public/img/viddl/viddl_courier.webp";
import ViddlParcelTracking from "../public/img/viddl/viddl_parceltracking.webp";

/**
 * Keyed by case-study slug (the `content/<slug>.mdx` filename). These used to
 * live on `data/projects.ts` as `Project.images`, read only by the deleted
 * `/works/[id]` route — which is how they stopped being reachable at all.
 *
 * Only viddl is here: hsup's three gallery images turned out to be the same
 * three its MDX already embeds inline, so carrying them twice would just
 * repeat the page.
 *
 * `StaticImageData` is src, dimensions and a blur hash — not pixels — so
 * importing these into a client component costs a few hundred bytes.
 */
export const GALLERIES: Record<string, readonly StaticImageData[]> = {
  viddl: [
    ViddlButtons,
    ViddlCourier,
    ViddlParcelTracking,
    ViddlAdmin1,
    ViddlAdmin2,
  ],
};
