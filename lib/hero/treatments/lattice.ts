/**
 * "Lattice" — a dot grid rippled by two travelling waves.
 *
 * The most structural of the three, and the one that shows the *expression*
 * axis as much as the colour one: the grid is drawn with
 * `--cmp-hero-stroke-width`, which is a hairline in `violet` and three times
 * that in `brutalist`, so the same geometry reads soft or hard depending on
 * nothing but the theme.
 *
 * Cleared and redrawn every frame — no trails — which keeps it cheap: the
 * whole treatment is a double loop over at most a few hundred nodes.
 */
import type { HeroFrame, Treatment } from "../types";

const SPACING = 54; // CSS px between nodes
const AMPLITUDE = 11; // how far a node may be pushed from its cell

export const lattice: Treatment = {
  id: "lattice",
  label: "Lattice",
  blurb:
    "A dot grid displaced by two travelling waves, linked with the theme's own stroke width.",

  create() {
    return {
      draw({ ctx, width, height, time, palette }: HeroFrame) {
        ctx.clearRect(0, 0, width, height);

        const cols = Math.ceil(width / SPACING) + 1;
        const rows = Math.ceil(height / SPACING) + 1;
        const offsetX = (width - (cols - 1) * SPACING) / 2;
        const offsetY = (height - (rows - 1) * SPACING) / 2;

        ctx.lineWidth = palette.strokeWidth;
        ctx.lineCap = "round";

        /** Row by row, so each row's links can be a single path. */
        for (let row = 0; row < rows; row += 1) {
          let previous: { x: number; y: number; a: number } | null = null;

          for (let col = 0; col < cols; col += 1) {
            const baseX = offsetX + col * SPACING;
            const baseY = offsetY + row * SPACING;

            // Two waves at different speeds and angles: where they agree the
            // grid bulges, where they cancel it sits still.
            const a =
              Math.sin(baseX * 0.012 + time * 0.9) *
              Math.cos(baseY * 0.014 - time * 0.6);
            const b = Math.sin((baseX + baseY) * 0.006 + time * 0.35);
            const amount = (a + b) / 2;

            const x = baseX + amount * AMPLITUDE;
            const y = baseY + b * AMPLITUDE;
            const strength = Math.abs(amount);

            if (previous) {
              ctx.globalAlpha = 0.18 + strength * 0.35;
              ctx.strokeStyle = palette.grid;
              ctx.beginPath();
              ctx.moveTo(previous.x, previous.y);
              ctx.lineTo(x, y);
              ctx.stroke();
            }

            ctx.globalAlpha = 0.35 + strength * 0.65;
            // The third ink only appears on the crests, so the accent reads as
            // an event rather than as a colour the grid is painted in.
            ctx.fillStyle =
              strength > 0.72
                ? palette.ink[2]
                : palette.ink[(row + col) % 2 === 0 ? 0 : 1];
            ctx.beginPath();
            ctx.arc(x, y, 1 + strength * 2.4, 0, Math.PI * 2);
            ctx.fill();

            previous = { x, y, a: amount };
          }
        }

        ctx.globalAlpha = 1;
      },
    };
  },
};
