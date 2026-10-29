"use client";

/**
 * Which treatment the homepage hero runs, as a visitor-side preference.
 *
 * The same shape as the axis store in `lib/theme/store`, and for the same
 * reason: a cookie is the persistence, nothing server-side reads it, and so
 * every route stays statically generated. The hero canvas is client-only
 * anyway, so the choice is applied the moment it mounts — there is nothing
 * for the server to get wrong and no flash to avoid.
 *
 * `/lab` writes it, the homepage reads it, and `DEFAULT_TREATMENT_ID` is what
 * anyone who has never opened `/lab` gets. It imports `ids`, never the
 * registry: this module is in the homepage's first chunk and the treatments
 * must not be.
 */

import { useSyncExternalStore } from "react";

import { DEFAULT_TREATMENT_ID, isTreatmentId, type TreatmentId } from "./ids";

export const HERO_COOKIE = "al-hero";
const MAX_AGE = 60 * 60 * 24 * 365;

/** Same event for every subscriber, since a cookie fires nothing by itself. */
const EVENT = "al-hero-change";

let snapshot: TreatmentId = DEFAULT_TREATMENT_ID;

function read(): TreatmentId {
  const match = new RegExp(`(?:^|; )${HERO_COOKIE}=([^;]*)`).exec(
    document.cookie
  );
  const id = match ? decodeURIComponent(match[1]) : null;
  // Validated against the registry, so a cookie naming a treatment that has
  // since been deleted falls back instead of blanking the hero.
  return isTreatmentId(id) ? id : DEFAULT_TREATMENT_ID;
}

function subscribe(listener: () => void): () => void {
  const onChange = () => {
    snapshot = read();
    listener();
  };
  onChange();
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

export function setTreatmentChoice(id: string): void {
  if (!isTreatmentId(id)) return;
  document.cookie = `${HERO_COOKIE}=${id}; path=/; max-age=${MAX_AGE}; samesite=lax`;
  window.dispatchEvent(new Event(EVENT));
}

export function useTreatmentChoice(): TreatmentId {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => DEFAULT_TREATMENT_ID
  );
}
