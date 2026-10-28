"use client";

/**
 * The one headless primitive on the site.
 *
 * Phase 5 could have pulled in Radix or React Aria for this. It did not,
 * because exactly two things on the site need dialog behaviour — the mobile
 * nav sheet and (via its library) the gallery lightbox — and the behaviour
 * they need is focus containment, scroll locking, Escape, and focus
 * restoration. That is this file. A headless library would have been 30 kB to
 * avoid 120 lines, and every one of its components would then have needed
 * token-aware styling anyway.
 *
 * `yet-another-react-lightbox` already implements all four for the lightbox,
 * so the lightbox is left alone rather than wrapped twice; `useScrollLock` is
 * exported separately for anything that needs the lock without the trap.
 */

import { useCallback, useEffect, useRef } from "react";

/**
 * Body scroll lock, reference counted.
 *
 * The counter is what makes this safe to call from two components at once:
 * the nav sheet and a lightbox opened from underneath it would otherwise race,
 * and whichever unmounted first would hand the page back its scrollbar while
 * the other was still open. The original `NavigationBar` effect had a smaller
 * version of the same bug — it wrote `overflow: scroll` on the way out instead
 * of restoring what was there.
 */
let locks = 0;
let restore: { overflow: string; paddingRight: string } | null = null;

function lockScroll(): () => void {
  if (locks === 0) {
    const { body, documentElement: html } = document;
    restore = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    /**
     * Removing the scrollbar reflows the page a few pixels wider, which is
     * visible as a jump behind a translucent sheet. Pad by exactly the width
     * the scrollbar occupied — 0 on overlay-scrollbar platforms, where this is
     * a no-op rather than a wrong guess.
     */
    const gutter = window.innerWidth - html.clientWidth;
    body.style.overflow = "hidden";
    if (gutter > 0) body.style.paddingRight = `${gutter}px`;
  }
  locks += 1;

  return () => {
    locks -= 1;
    if (locks > 0 || !restore) return;
    document.body.style.overflow = restore.overflow;
    document.body.style.paddingRight = restore.paddingRight;
    restore = null;
  };
}

export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    return lockScroll();
  }, [active]);
}

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function focusableWithin(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (node) =>
      node.offsetWidth > 0 ||
      node.offsetHeight > 0 ||
      node === document.activeElement
  );
}

type DialogOptions = {
  open: boolean;
  onClose: () => void;
  /** Skip the initial focus move — for a sheet opened by a toggle that stays visible. */
  autoFocus?: boolean;
};

/**
 * Focus containment + Escape + focus restoration for an open overlay.
 *
 * Returns the ref to put on the overlay element. It is intentionally *not* a
 * component: a hook composes with whatever markup the overlay already has,
 * which is the difference between fixing the nav and rewriting it.
 */
export function useDialog({ open, onClose, autoFocus = true }: DialogOptions) {
  const ref = useRef<HTMLDivElement>(null);
  /** Kept in a ref so the effect does not re-run — and re-steal focus — when
   *  the parent re-renders with a fresh closure. */
  const close = useRef(onClose);
  close.current = onClose;

  useScrollLock(open);

  useEffect(() => {
    const container = ref.current;
    if (!open || !container) return;

    const returnTo = document.activeElement as HTMLElement | null;
    if (autoFocus) (focusableWithin(container)[0] ?? container).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close.current();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusableWithin(container);
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      // Wrap at both ends, and pull focus back in if it escaped the overlay.
      if (!container.contains(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      /** Only take focus back if it is still inside the overlay being closed —
       *  otherwise a click elsewhere would be yanked back to the trigger. */
      if (returnTo && container.contains(document.activeElement))
        returnTo.focus();
    };
  }, [open, autoFocus]);

  const onBackdropClick = useCallback((event: React.MouseEvent) => {
    if (event.target === event.currentTarget) close.current();
  }, []);

  return { ref, onBackdropClick };
}
