"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(listener: () => void): () => void {
  const list = window.matchMedia(QUERY);
  list.addEventListener("change", listener);
  return () => list.removeEventListener("change", listener);
}

/**
 * Not an axis — there is no "reduced motion" token block, because reduced
 * motion is a system preference rather than a design choice. It is exposed
 * here (rather than as a fifth `data-*` attribute) because only JS needs it;
 * CSS already has Tailwind's `motion-reduce:` variant. The phase 4 hero reads
 * this to decide between a `rAF` loop and a static gradient.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}
