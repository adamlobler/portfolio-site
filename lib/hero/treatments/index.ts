/**
 * The three candidate hero treatments.
 *
 * `/lab` renders all of them side by side with an fps readout and writes the
 * visitor's pick to the preference in `lib/hero/choice`; the homepage reads
 * that and falls back to `DEFAULT_TREATMENT_ID`. The map is keyed by
 * `TreatmentId`, so adding an id in `lib/hero/ids.ts` without writing the
 * treatment behind it stops compiling.
 */
import { aurora } from "./aurora";
import { drift } from "./drift";
import { lattice } from "./lattice";
import { DEFAULT_TREATMENT_ID, TREATMENT_IDS, type TreatmentId } from "../ids";
import type { Treatment } from "../types";

const BY_ID: Record<TreatmentId, Treatment> = { aurora, drift, lattice };

/** In the order `/lab` shows them, which is the order the ids are declared. */
export const TREATMENTS: readonly Treatment[] = TREATMENT_IDS.map(
  (id) => BY_ID[id]
);

export const DEFAULT_TREATMENT: Treatment = BY_ID[DEFAULT_TREATMENT_ID];

export function treatmentById(id: string): Treatment | undefined {
  return (BY_ID as Record<string, Treatment>)[id];
}

export { aurora, drift, lattice };
