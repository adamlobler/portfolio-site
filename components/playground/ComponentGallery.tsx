import Button from "../ui/Button";
import Card from "../ui/Card";
import Tag from "../ui/Tag";

/**
 * Written out rather than interpolated, because Tailwind's scanner reads
 * source *text*: `text-${step}` generates nothing, and with
 * `source(none)` there is no safelist to fall back on. One literal per row.
 */
const TYPE_RAMP = [
  ["text-h1", "text-h1"],
  ["text-h2", "text-h2"],
  ["text-h3", "text-h3"],
  ["text-h4", "text-h4"],
  ["text-h5", "text-h5"],
  ["text-h6", "text-h6"],
  ["text-subtitle1", "text-subtitle1"],
  ["text-subtitle2", "text-subtitle2"],
  ["text-body1", "text-body1"],
  ["text-body2", "text-body2"],
  ["text-button", "text-button"],
  ["text-caption", "text-caption"],
  ["text-overline", "text-overline"],
] as const;

const SURFACES = [
  ["base", "bg-surface-base", "text-content-secondary"],
  ["raised", "bg-surface-raised", "text-content-secondary"],
  ["sunken", "bg-surface-sunken", "text-content-secondary"],
  ["overlay", "bg-surface-overlay", "text-content-secondary"],
  ["inverse", "bg-surface-inverse", "text-content-inverse"],
] as const;

/**
 * Every component the site has, on one page, under whatever the four axes
 * currently say.
 *
 * This is the actual test of the architecture, and it is a server component on
 * purpose: nothing here subscribes to the axes, reads an attribute or receives
 * a theme prop. It is static HTML whose appearance is decided entirely by
 * custom properties on `<html>`, which is the claim the whole token pipeline
 * is making.
 */
export default function ComponentGallery() {
  return (
    <div className="flex w-full flex-col gap-section">
      <section className="flex flex-col gap-stack-md" aria-label="Buttons">
        <h3 className="text-h6 text-content-primary">Buttons</h3>
        <div className="flex flex-wrap items-center gap-inline-sm">
          <Button>Primary lg</Button>
          <Button size="md">Primary md</Button>
          <Button size="sm">Primary sm</Button>
          <Button variant="secondary">Secondary lg</Button>
          <Button variant="secondary" size="md">
            Secondary md
          </Button>
          <Button variant="secondary" size="sm">
            Secondary sm
          </Button>
          <Button disabled>Disabled</Button>
        </div>
        <p className="text-caption text-content-muted">
          Two variants × three sizes, from one <code>cva()</code> table of class
          names. Colour comes off theme × appearance × contrast, padding off
          density, radius and shadow off theme.
        </p>
      </section>

      <section className="flex flex-col gap-stack-md" aria-label="Tags">
        <h3 className="text-h6 text-content-primary">Tags</h3>
        <div className="flex flex-wrap items-center gap-inline-xs">
          <Tag>Design systems</Tag>
          <Tag>UX research</Tag>
          <Tag variant="solid">Tokens</Tag>
          <Tag variant="solid">Theming</Tag>
        </div>
      </section>

      <section className="flex flex-col gap-stack-md" aria-label="Cards">
        <h3 className="text-h6 text-content-primary">Cards</h3>
        <div className="grid gap-inline-md md:grid-cols-3">
          <Card>
            <h4 className="text-subtitle1 text-content-primary">Raised</h4>
            <p className="text-body2 text-content-secondary">
              <code>--cmp-card-bg</code> is a semantic surface, which is how the
              glass theme turns every card translucent without this file
              knowing.
            </p>
          </Card>
          <Card interactive>
            <h4 className="text-subtitle1 text-content-primary">Interactive</h4>
            <p className="text-body2 text-content-secondary">
              Hover or focus me — the response is{" "}
              <code>--cmp-card-shadow-hover</code>.
            </p>
            <Button size="sm" variant="secondary">
              Action
            </Button>
          </Card>
          <Card tone="quiet">
            <h4 className="text-subtitle1 text-content-primary">Quiet</h4>
            <p className="text-body2 text-content-secondary">
              Same geometry, no fill. Replaces the old{" "}
              <code>bg-gray-50 dark:bg-gray-900</code>.
            </p>
          </Card>
        </div>
      </section>

      <section className="flex flex-col gap-stack-md" aria-label="Surfaces">
        <h3 className="text-h6 text-content-primary">Surfaces</h3>
        <div className="grid gap-inline-xs sm:grid-cols-5">
          {SURFACES.map(([surface, background, foreground]) => (
            <div
              key={surface}
              className={`flex min-h-20 items-end rounded-card border border-border-subtle p-stack-sm ${background}`}
            >
              <code className={`text-caption ${foreground}`}>{surface}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-stack-md" aria-label="Type ramp">
        <h3 className="text-h6 text-content-primary">Type ramp</h3>
        <div className="flex flex-col gap-stack-xs">
          {TYPE_RAMP.map(([label, className]) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline gap-inline-sm"
            >
              <code className="w-24 shrink-0 text-caption text-content-muted">
                {label}
              </code>
              <span className={`${className} text-content-primary`}>
                Reshape digital products together
              </span>
            </div>
          ))}
        </div>
        <p className="text-caption text-content-muted">
          One utility per ramp step, each carrying size, leading, weight and
          tracking — so the slate theme renders this in a serif and terminal in
          mono with no class changing.
        </p>
      </section>
    </div>
  );
}
