"use client";

import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useAxis } from "../../lib/theme/store";

/**
 * The appearance axis only — the quick toggle people expect in a nav bar. The
 * full four-axis control lives at `/playground`.
 *
 * Both icons are always rendered and the `dark:` variant picks one, so the
 * markup does not depend on the current appearance. That is what lets this
 * drop `next-themes`' `mounted` gate (`ThemeSwitch.tsx:14` used to render a
 * blank 24px box until hydration): server HTML and first client render are
 * identical whatever the visitor chose, while the icon on screen is already
 * correct because CSS resolved it off the attribute the bootstrap script set.
 */
export default function ThemeSwitch() {
  const [appearance, setAppearance] = useAxis("appearance");

  return (
    <button
      type="button"
      id="theme-switcher"
      onClick={() => setAppearance(appearance === "dark" ? "light" : "dark")}
      className="m-4 inline-flex h-6 w-6 items-center justify-center text-content-secondary transition-colors hover:text-content-primary"
      title="Switch between light and dark"
      aria-label="Switch between light and dark"
    >
      <MoonIcon className="h-6 w-6 dark:hidden" />
      <SunIcon className="hidden h-6 w-6 dark:block" />
    </button>
  );
}
