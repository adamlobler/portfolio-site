/**
 * Static image imports (`import shot from "../public/img/x.webp"`) are typed by
 * `next/image-types/global`, which Next references from the generated
 * `next-env.d.ts` — and that file is gitignored, so it does not exist in CI
 * until something runs `next build`. CI typechecks before it builds, so the
 * reference is repeated here, tracked, where tsc can always see it.
 *
 * It declares `*.svg` as `StaticImageData` too; see the merge note in svg.d.ts.
 */
/// <reference types="next/image-types/global" />
