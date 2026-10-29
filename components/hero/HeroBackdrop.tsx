"use client";

import dynamic from "next/dynamic";

import { useTreatmentChoice } from "../../lib/hero/choice";
import { usePrefersReducedMotion } from "../../lib/theme/motion";

/**
 * The client boundary around the hero animation — small on purpose.
 *
 * `ssr: false` keeps the engine, the treatments and the palette reader out of
 * the homepage's first chunk entirely; they arrive after hydration, over the
 * gradient that is already on screen. This file is all that ships eagerly,
 * and all it does is answer one question: does this visitor want motion?
 *
 * It also answers the second: which treatment, read from the preference
 * `/lab` writes. The default is `DEFAULT_TREATMENT` until someone picks.
 *
 * Reduced motion gets no canvas at all. Not a paused one, not a single static
 * frame — nothing is mounted, nothing is fetched, and the static gradient in
 * `Hero`'s server markup is the hero. That is the honest reading of the
 * preference and it is also the cheapest one.
 */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroBackdrop() {
  const reduced = usePrefersReducedMotion();
  const treatmentId = useTreatmentChoice();
  if (reduced) return null;
  return <HeroCanvas treatmentId={treatmentId} />;
}
