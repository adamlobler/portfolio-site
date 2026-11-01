"use client";

import { ParallaxProvider } from "react-scroll-parallax";

/**
 * Same boundary trick as `Reveal`: `react-scroll-parallax` has no
 * `"use client"`, so it is re-exported from here. `ParallaxBoundary` is a
 * component rather than a bare re-export because a provider has to own its
 * children, and children handed down from a server component stay server
 * rendered.
 */
export { Parallax } from "react-scroll-parallax";

export function ParallaxBoundary({ children }: { children: React.ReactNode }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
