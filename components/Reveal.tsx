import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Accepted and ignored, both of them, so the four case studies' MDX did not
   * have to be rewritten in forty places. They were `react-awesome-reveal`'s
   * API: `triggerOnce` stopped it re-running, and `direction` chose an axis.
   * The CSS reveal is a rise either way, and it is tied to scroll position
   * rather than to a one-shot observer — see `.reveal` in styles/recipes.css.
   */
  triggerOnce?: boolean;
  direction?: "up" | "down" | "left" | "right";
};

/**
 * The scroll reveal, replacing `react-awesome-reveal`.
 *
 * That library cost three dependencies (it pulled `@emotion/react` as a peer),
 * a client boundary, and — the real problem — it serialised `style="opacity:0"`
 * into the SSR HTML and only cleared it after hydration *and* an
 * IntersectionObserver fire. Everything it wrapped was invisible in the static
 * markup, which is what kept the LCP headline out of the paint in phase 1 and
 * what made the `/works` band ship invisible in the band work.
 *
 * This is a server component: the content is in the HTML, visible, with no JS
 * involved at any point. The animation is a CSS scroll-driven one, guarded by
 * `@supports`, so a browser without it simply shows the content.
 *
 * One behavioural difference worth knowing: the library wrapped *each* child
 * in its own animated element, so a parent's `space-y-*` applied between them.
 * This wraps all children in one element. Give it the layout classes itself
 * (`className="flex flex-col space-y-12"`) when it holds more than one child.
 */
export function Fade({ children, className }: Props) {
  return (
    <div className={className ? `reveal ${className}` : "reveal"}>
      {children}
    </div>
  );
}

export default Fade;
