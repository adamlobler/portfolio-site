import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import LabBench from "../../../components/hero/LabBench";
import { TREATMENTS } from "../../../lib/hero/treatments";

export const metadata: Metadata = {
  title: "Hero lab",
  description:
    "Three candidate hero treatments running side by side, with frame cost and the theme axes wired up — the bench the homepage hero was picked on.",
};

/**
 * Measured here rather than written down, at build time, so the numbers in
 * the readout cannot drift from the files. Source bytes are not bundle bytes
 * — all three treatments are in one lazy chunk and only one of them runs on
 * the homepage — but they are the honest comparison between candidates, and
 * they are the number that moved when a treatment grew.
 */
const sizes = Object.fromEntries(
  TREATMENTS.map((treatment) => [
    treatment.id,
    readFileSync(
      path.join(process.cwd(), "lib/hero/treatments", `${treatment.id}.ts`)
    ).byteLength,
  ])
);

export default function LabPage() {
  return (
    <div className="flex w-full max-w-page flex-col gap-section px-gutter py-16 md:px-16">
      <header className="flex flex-col gap-stack-md">
        <p className="text-overline uppercase text-content-muted">Hero lab</p>
        <h1 className="text-h3 text-content-primary md:text-h2">
          Three candidate heroes
        </h1>
        <p className="text-body1 max-w-prose text-content-secondary">
          The homepage used to run a hosted Spline scene: a three.js runtime, a
          WASM module and a remote scene file, all of it on the critical path
          and none of it aware of the theme. These are its replacements — 2D
          canvas, no dependencies, and every colour read live from{" "}
          <code>--cmp-hero-*</code>. Change any axis below and all three repaint
          mid-animation, because the palette is pushed into the running loop
          rather than the loop being restarted.
        </p>
        <p className="text-body2 max-w-prose text-content-muted">
          All three share one engine: device pixel ratio capped at 1.5, a single{" "}
          <code>requestAnimationFrame</code> loop each, paused by an{" "}
          <code>IntersectionObserver</code> when off screen and by{" "}
          <code>visibilitychange</code> when the tab is hidden. Under{" "}
          <code>prefers-reduced-motion</code> none of them is loaded at all and
          the hero is its static gradient, which is the same two tokens.
        </p>
      </header>

      <LabBench sizes={sizes} />
    </div>
  );
}
