"use client";

/**
 * The theme "provider", without a provider.
 *
 * `<html>`'s `data-*` attributes ARE the store. The bootstrap script in
 * `ThemeScript` writes them before first paint, CSS reads them directly, and
 * this module just subscribes to them with `useSyncExternalStore`. Three things
 * fall out of that choice:
 *
 *   - No context wrapper, so no client component has to sit above the tree and
 *     no server component below it gets pulled across the boundary.
 *   - No `mounted` gate and no hydration mismatch: the server snapshot is the
 *     manifest default, the client snapshot is whatever the script already put
 *     on `<html>`, and React is designed to swap between exactly those two.
 *   - Anything that changes the attributes — this hook, the future playground,
 *     a devtools poke — is observed, because the `MutationObserver` watches the
 *     attributes rather than trusting React state to be the only writer.
 *
 * The cookie is persistence only; it is never read to decide what to render,
 * which is what keeps every route statically generated.
 */

import { useCallback, useSyncExternalStore } from "react";
import {
  AXES,
  AXIS_COOKIE,
  AXIS_COOKIE_MAX_AGE,
  AXIS_DEFAULTS,
  AXIS_NAMES,
  DEFAULT_SELECTION,
  SYSTEM_PREFERENCE,
  encodeSelection,
  isAxisValue,
  type AxisName,
  type AxisSelection,
} from "./axes";

let snapshot: AxisSelection = DEFAULT_SELECTION;
const listeners = new Set<() => void>();

function readDom(): AxisSelection {
  const root = document.documentElement;
  const next = {} as Record<AxisName, string>;
  for (const axis of AXIS_NAMES) {
    const value = root.getAttribute(AXES[axis].attribute);
    next[axis] = isAxisValue(axis, value)
      ? (value as string)
      : (AXIS_DEFAULTS[axis] as string);
  }
  return next as AxisSelection;
}

/** Re-read the DOM, and only publish if something actually differs. */
function refresh() {
  const next = readDom();
  if (AXIS_NAMES.every((axis) => next[axis] === snapshot[axis])) return;
  snapshot = next;
  for (const listener of listeners) listener();
}

function hasStoredChoice(): boolean {
  return new RegExp(`(?:^|; )${AXIS_COOKIE}=`).test(document.cookie);
}

function persist(selection: AxisSelection) {
  document.cookie =
    `${AXIS_COOKIE}=${encodeSelection(selection)}` +
    `; path=/; max-age=${AXIS_COOKIE_MAX_AGE}; samesite=lax`;
}

let teardown: (() => void) | null = null;

function connect(): () => void {
  const root = document.documentElement;

  const observer = new MutationObserver(refresh);
  observer.observe(root, {
    attributeFilter: AXIS_NAMES.map((axis) => AXES[axis].attribute),
  });

  /**
   * Until the visitor picks for themselves, the OS keeps the casting vote:
   * flipping macOS to dark flips the site live. The moment they choose, a
   * cookie exists and these stop writing.
   */
  const media = AXIS_NAMES.flatMap((axis) => {
    const preference = SYSTEM_PREFERENCE[axis];
    if (!preference) return [];
    const list = window.matchMedia(preference.query);
    const onChange = () => {
      if (hasStoredChoice()) return;
      root.setAttribute(
        AXES[axis].attribute,
        list.matches ? preference.value : (AXIS_DEFAULTS[axis] as string)
      );
    };
    list.addEventListener("change", onChange);
    return [() => list.removeEventListener("change", onChange)];
  });

  return () => {
    observer.disconnect();
    for (const off of media) off();
  };
}

function subscribe(listener: () => void): () => void {
  if (listeners.size === 0) {
    snapshot = readDom();
    teardown = connect();
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      teardown?.();
      teardown = null;
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => DEFAULT_SELECTION;

/** Write one axis: DOM first (CSS reacts immediately), cookie second. */
export function setAxis<A extends AxisName>(
  axis: A,
  value: AxisSelection[A]
): void {
  if (!isAxisValue(axis, value)) return;
  document.documentElement.setAttribute(AXES[axis].attribute, value);
  refresh();
  persist(snapshot);
}

/** Forget the stored choice and hand control back to the system defaults. */
export function resetAxes(): void {
  document.cookie = `${AXIS_COOKIE}=; path=/; max-age=0; samesite=lax`;
  const root = document.documentElement;
  for (const axis of AXIS_NAMES) {
    const preference = SYSTEM_PREFERENCE[axis];
    const value =
      preference && window.matchMedia(preference.query).matches
        ? preference.value
        : (AXIS_DEFAULTS[axis] as string);
    root.setAttribute(AXES[axis].attribute, value);
  }
  refresh();
}

export function useAxes(): AxisSelection {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** `[value, setValue]` for a single axis, for controls that only own one. */
export function useAxis<A extends AxisName>(
  axis: A
): [AxisSelection[A], (value: AxisSelection[A]) => void] {
  const axes = useAxes();
  const set = useCallback(
    (value: AxisSelection[A]) => setAxis(axis, value),
    [axis]
  );
  return [axes[axis], set];
}
