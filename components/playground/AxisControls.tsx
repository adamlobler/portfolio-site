"use client";

import { AXES, AXIS_NAMES } from "../../lib/theme/axes";
import { resetAxes, setAxis, useAxes } from "../../lib/theme/store";
import { THEMES } from "../../tokens/generated/tokens";
import Button from "../ui/Button";

const THEME_DESCRIPTIONS = Object.fromEntries(
  THEMES.map((theme) => [theme.id, theme.description])
);

/**
 * The four-axis control.
 *
 * It hard-codes nothing: the axes, their values and their descriptions all
 * come from the generated manifest, so a fifth axis or a seventh theme appears
 * here with no edit to this file. That is the same manifest the CSS selectors
 * and the bootstrap script are emitted from, which is what makes "the control
 * cannot drift from the stylesheet" a structural claim rather than a promise.
 */
export default function AxisControls() {
  const axes = useAxes();

  return (
    <section
      className="flex w-full flex-col gap-stack-lg"
      aria-label="Theme axes"
    >
      {AXIS_NAMES.map((name) => {
        const axis = AXES[name];
        return (
          <fieldset key={name} className="flex flex-col gap-stack-sm">
            <legend className="flex flex-col gap-stack-xs">
              <span className="text-overline uppercase text-content-muted">
                {name}
                <span className="ml-inline-xs font-mono normal-case">
                  {axis.attribute}
                </span>
              </span>
              <span className="text-body2 text-content-secondary">
                {axis.description}
              </span>
            </legend>

            <div
              role="radiogroup"
              aria-label={name}
              className="flex flex-wrap gap-inline-xs"
            >
              {axis.values.map((value) => {
                const active = axes[name] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setAxis(name, value)}
                    title={THEME_DESCRIPTIONS[value]}
                    /**
                     * The control is itself token-driven — it has to be, or
                     * the one component on the page nobody would think to
                     * check would be the one that stops responding.
                     */
                    className={
                      active
                        ? "tag tag--solid cursor-pointer"
                        : "tag tag--outline cursor-pointer hover:border-border-strong"
                    }
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      <div className="flex flex-wrap items-center gap-inline-sm">
        <Button variant="secondary" size="sm" onClick={resetAxes}>
          Reset to system
        </Button>
        <code className="text-caption text-content-muted">
          {AXIS_NAMES.map(
            (name) => `${AXES[name].attribute}="${axes[name]}"`
          ).join(" ")}
        </code>
      </div>
    </section>
  );
}
