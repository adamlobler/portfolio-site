"use client";

import { useEffect, useMemo, useState } from "react";

import { useAxes } from "../../lib/theme/store";
import {
  LAYERS,
  NODES,
  TOKEN_NAMES,
  chainFor,
  describeSlice,
  type Layer,
} from "../../lib/theme/graph";

const COLOR_TYPES = new Set(["color"]);

/** `--sem-surface-base` as the browser computed it, right now. */
function readComputed(names: string[]): Record<string, string> {
  const style = getComputedStyle(document.documentElement);
  const out: Record<string, string> = {};
  for (const name of names)
    out[name] = style.getPropertyValue(`--${name}`).trim();
  return out;
}

function Swatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 shrink-0 rounded-control border border-border-default align-middle"
      style={{ background: value }}
    />
  );
}

/**
 * Every token, its resolved value, and its reference chain.
 *
 * The resolved column is read from `getComputedStyle(document.documentElement)`
 * rather than from the generated JSON on purpose: it shows what the *browser*
 * ended up with after the cascade, so if a selector in the emitted CSS were
 * wrong, this page would show it instead of hiding it behind the build's own
 * idea of the answer. The chain beside it is the authored JSON, so the two
 * columns are independent accounts of the same token.
 */
export default function TokenInspector() {
  const axes = useAxes();
  const [query, setQuery] = useState("");
  const [layer, setLayer] = useState<Layer | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [resolved, setResolved] = useState<Record<string, string>>({});

  /**
   * Re-read on every axis change. The attributes are already on `<html>` by
   * the time this runs — `useAxes` is a `useSyncExternalStore` over those very
   * attributes — so the computed values are the post-flip ones.
   */
  useEffect(() => {
    setResolved(readComputed(TOKEN_NAMES));
  }, [axes]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return TOKEN_NAMES.filter((name) => {
      const node = NODES[name];
      if (layer !== "all" && node.layer !== layer) return false;
      if (!needle) return true;
      return name.includes(needle) || (node.group ?? "").includes(needle);
    });
  }, [query, layer]);

  const counts = useMemo(() => {
    const out = { all: TOKEN_NAMES.length } as Record<string, number>;
    for (const name of TOKEN_NAMES) {
      const key = NODES[name].layer;
      out[key] = (out[key] ?? 0) + 1;
    }
    return out;
  }, []);

  return (
    <section
      className="flex w-full flex-col gap-stack-md"
      aria-label="Token inspector"
    >
      <div className="flex flex-wrap items-center gap-inline-sm">
        <label className="flex flex-col gap-stack-xs">
          <span className="text-overline uppercase text-content-muted">
            Filter
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="surface, button, radius…"
            className="min-h-[var(--cmp-input-min-height)] rounded-control border border-border-default bg-surface-raised px-control-pad-x text-body2 text-content-primary placeholder:text-content-muted"
          />
        </label>

        <div
          role="radiogroup"
          aria-label="Layer"
          className="flex flex-wrap gap-inline-xs pt-6"
        >
          {(["all", ...LAYERS] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={layer === value}
              onClick={() => setLayer(value)}
              className={
                layer === value
                  ? "tag tag--solid cursor-pointer"
                  : "tag tag--outline cursor-pointer"
              }
            >
              {value}{" "}
              <span className="text-content-muted">{counts[value] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-caption text-content-muted">
        {rows.length} of {TOKEN_NAMES.length} tokens · values read from the live
        cascade, chains from the authored JSON
      </p>

      <ul className="flex w-full flex-col divide-y divide-border-subtle border-y border-border-subtle">
        {rows.map((name) => {
          const node = NODES[name];
          const value = resolved[name] ?? "";
          const isOpen = expanded === name;
          const chain = isOpen ? chainFor(name, axes) : [];

          return (
            <li key={name} className="py-stack-sm">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : name)}
                aria-expanded={isOpen}
                className="flex w-full flex-wrap items-center gap-inline-sm text-left"
              >
                <code className="text-body2 text-content-primary">
                  --{name}
                </code>

                <span className="text-caption uppercase text-content-muted">
                  {node.layer}
                </span>

                {node.varies.length > 0 ? (
                  <span className="text-caption text-content-muted">
                    varies on {node.varies.join(" × ")}
                  </span>
                ) : (
                  <span className="text-caption text-content-muted">
                    axis-free
                  </span>
                )}

                <span className="ml-auto flex items-center gap-inline-xs">
                  {COLOR_TYPES.has(node.type ?? "") && value ? (
                    <Swatch value={value} />
                  ) : null}
                  <code className="text-caption text-content-secondary">
                    {value || "—"}
                  </code>
                </span>
              </button>

              {isOpen ? (
                <div className="mt-stack-sm flex flex-col gap-stack-xs pl-inline-sm">
                  {node.tailwind ? (
                    <p className="text-caption text-content-muted">
                      Tailwind theme variable <code>{node.tailwind}</code> — so
                      the utility built from this token is named after it.
                    </p>
                  ) : null}

                  <ol className="flex flex-col gap-stack-xs">
                    {chain.map((step, index) => (
                      <li
                        key={step.name}
                        className="flex flex-wrap items-center gap-inline-xs text-caption"
                      >
                        <span className="text-content-muted">
                          {"→".repeat(index === 0 ? 0 : 1)}
                        </span>
                        <span className="tag tag--outline">
                          {step.node.layer}
                        </span>
                        <code className="text-content-primary">
                          --{step.name}
                        </code>
                        <code className="text-content-secondary">
                          {step.authored}
                        </code>
                        <span className="text-content-muted">
                          ({describeSlice(step.node, step.slice)})
                        </span>
                        {COLOR_TYPES.has(step.node.type ?? "") &&
                        resolved[step.name] ? (
                          <Swatch value={resolved[step.name]} />
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
