/**
 * The treatment ids, and nothing else.
 *
 * Split out so the eagerly-loaded half of the hero — the preference store and
 * the client boundary that reads it — can name a treatment without importing
 * one. Pulling the registry in here would drag all three treatments into the
 * homepage's first chunk and undo the lazy split (measured: +2 kB on First
 * Load JS). The registry is typed against this list, so an id that exists
 * here with no treatment behind it fails `tsc`.
 */
export const TREATMENT_IDS = ["aurora", "drift", "lattice"] as const;

export type TreatmentId = (typeof TREATMENT_IDS)[number];

export const DEFAULT_TREATMENT_ID: TreatmentId = "aurora";

export function isTreatmentId(value: unknown): value is TreatmentId {
  return (TREATMENT_IDS as readonly string[]).includes(value as string);
}
