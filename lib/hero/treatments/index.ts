/**
 * The three candidate hero treatments, and which one the homepage ships.
 *
 * `/lab` renders all of them side by side with an FPS readout; the homepage
 * imports `DEFAULT_TREATMENT`. Swapping the hero is a one-word change here,
 * which is the point of building the bench before picking.
 */
import { aurora } from "./aurora";
import { drift } from "./drift";
import { lattice } from "./lattice";
import type { Treatment } from "../types";

export const TREATMENTS: readonly Treatment[] = [aurora, drift, lattice];

export const DEFAULT_TREATMENT: Treatment = aurora;

export function treatmentById(id: string): Treatment | undefined {
  return TREATMENTS.find((treatment) => treatment.id === id);
}

export { aurora, drift, lattice };
