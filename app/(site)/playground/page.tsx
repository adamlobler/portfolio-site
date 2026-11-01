import type { Metadata } from "next";

import AxisControls from "../../../components/playground/AxisControls";
import ComponentGallery from "../../../components/playground/ComponentGallery";
import TokenInspector from "../../../components/playground/TokenInspector";
import { AXES, AXIS_NAMES } from "../../../lib/theme/axes";
import { NODES, TOKEN_NAMES } from "../../../lib/theme/graph";

export const metadata: Metadata = {
  title: "Theme playground",
  description:
    "Four independent theme axes, every token, and the reference chain behind each one — the design system this site is built on, with the controls exposed.",
};

/** Counted here rather than written down, so the prose cannot go stale. */
const combinations = AXIS_NAMES.reduce(
  (total, axis) => total * AXES[axis].values.length,
  1
);

const layerCounts = TOKEN_NAMES.reduce<Record<string, number>>((out, name) => {
  const layer = NODES[name].layer;
  out[layer] = (out[layer] ?? 0) + 1;
  return out;
}, {});

export default function PlaygroundPage() {
  return (
    <div className="flex w-full max-w-page flex-col gap-section px-gutter py-16 md:px-16">
      <header className="flex flex-col gap-stack-md">
        <p className="text-overline uppercase text-content-muted">
          Design system
        </p>
        <h1 className="text-h3 text-content-primary md:text-h2">
          Theme playground
        </h1>
        <p className="text-body1 max-w-prose text-content-secondary">
          Four axes — theme, appearance, density, contrast — vary independently,
          so this site is {combinations} themes rather than a light and a dark
          one. Flip any of them below and every component on the page follows,
          including the controls themselves. Nothing re-renders on the server
          and nothing is stored in React: the axes are <code>data-*</code>{" "}
          attributes on <code>&lt;html&gt;</code>, CSS reads them directly, and
          a cookie remembers the choice.
        </p>
        <p className="text-body2 max-w-prose text-content-muted">
          {layerCounts.primitive} primitive, {layerCounts.semantic} semantic and{" "}
          {layerCounts.component} component tokens, generated from JSON by{" "}
          <code>yarn tokens</code>. A component token may only reference a
          semantic one and a semantic token may only reference a primitive — the
          build fails otherwise, and the inspector at the bottom shows the chain
          for every token so you can check.
        </p>
      </header>

      <AxisControls />
      <ComponentGallery />

      <section className="flex flex-col gap-stack-md">
        <h2 className="text-h5 text-content-primary">Token inspector</h2>
        <p className="text-body2 max-w-prose text-content-muted">
          Every custom property the page has, with the value the browser
          computed under the current selection. Expand a row for its reference
          chain: component → semantic → primitive, with the axis slice each
          value came from.
        </p>
        <TokenInspector />
      </section>
    </div>
  );
}
