"use client";

/**
 * `react-awesome-reveal` predates RSC and carries no `"use client"` of its
 * own, so re-exporting it from a module that does is what turns it into a
 * client reference. Server components can then render `<Fade>` directly and
 * their children stay on the server — only the wrapper crosses the boundary.
 *
 * Phase 4 deletes this along with the library, replacing it with CSS
 * animations driven by the motion tokens.
 */
export { Fade } from "react-awesome-reveal";
