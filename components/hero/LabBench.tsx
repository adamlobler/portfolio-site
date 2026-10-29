"use client";

import { useState } from "react";

import HeroCanvas from "./HeroCanvas";
import type { EngineStats } from "../../lib/hero/engine";
import { DEFAULT_TREATMENT, TREATMENTS } from "../../lib/hero/treatments";
import AxisControls from "../playground/AxisControls";

/**
 * The bench: every candidate hero treatment, running at once, over the same
 * axis controls the playground uses.
 *
 * Running them simultaneously is the point — three independent engines on one
 * page is a harsher test than the homepage will ever be, so a treatment that
 * holds 60fps here holds it there. Each canvas keeps its own `IntersectionObserver`,
 * so scrolling one out of view stops its loop and the others speed up, which
 * is itself worth watching.
 */
export default function LabBench({
  sizes,
}: {
  /** Source bytes per treatment, measured at build time by the page. */
  sizes: Record<string, number>;
}) {
  const [stats, setStats] = useState<Record<string, EngineStats>>({});

  return (
    <div className="flex flex-col gap-section">
      <AxisControls />

      <div className="grid gap-stack-lg lg:grid-cols-2">
        {TREATMENTS.map((treatment) => {
          const measured = stats[treatment.id];
          const shipped = treatment.id === DEFAULT_TREATMENT.id;

          return (
            <article key={treatment.id} className="card gap-stack-sm">
              <header className="flex items-baseline justify-between gap-inline-sm">
                <h2 className="text-h6 text-content-primary">
                  {treatment.label}
                </h2>
                {shipped ? (
                  <span className="tag tag--solid">on the homepage</span>
                ) : null}
              </header>

              <p className="text-body2 text-content-muted">{treatment.blurb}</p>

              {/* The hero's own backdrop, so each candidate is judged against
                  the gradient it will actually composite onto. */}
              <div className="relative h-72 overflow-hidden rounded-card">
                <div className="hero__backdrop" aria-hidden="true" />
                <HeroCanvas
                  treatmentId={treatment.id}
                  onStats={(next) =>
                    setStats((previous) => ({
                      ...previous,
                      [treatment.id]: next,
                    }))
                  }
                />
              </div>

              <dl className="grid grid-cols-3 gap-inline-sm font-mono text-caption text-content-secondary">
                <div>
                  <dt className="text-content-muted">fps</dt>
                  <dd>{measured ? measured.fps.toFixed(0) : "—"}</dd>
                </div>
                <div>
                  <dt className="text-content-muted">draw</dt>
                  <dd>
                    {measured ? `${measured.frameMs.toFixed(2)} ms` : "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-content-muted">source</dt>
                  <dd>{(sizes[treatment.id] / 1024).toFixed(1)} kB</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
