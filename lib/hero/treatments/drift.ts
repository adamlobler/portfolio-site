/**
 * "Drift" — particles advected by a flow field.
 *
 * The field is three sine terms rather than a noise library: it is a dozen
 * floating-point ops per particle, it is deterministic, and it ships no
 * dependency. The slow `time` terms are what stop it from looking like a
 * fixed texture — the field itself drifts, so the streams reorganise.
 *
 * Trails are not drawn, they are *not erased*: each frame punches a low-alpha
 * `destination-out` rectangle over the whole canvas, so the previous frames
 * decay towards transparent. That is what keeps the canvas itself transparent
 * — the backdrop underneath is the CSS gradient in the server HTML, so there
 * is nothing to flash and nothing to repaint when the theme changes.
 */
import type { HeroFrame, Treatment } from "../types";

type Particle = {
  x: number;
  y: number;
  px: number;
  py: number;
  age: number;
  life: number;
  ink: number;
};

/** Particles per square pixel, and the range it is allowed to produce. */
const DENSITY = 1 / 7000;
const MIN_PARTICLES = 60;
const MAX_PARTICLES = 360;

const SPEED = 46; // CSS px per second
const FADE = 0.055; // how much of the previous frame is erased

function field(x: number, y: number, t: number): number {
  return (
    (Math.sin(x * 0.0016 + t * 0.11) +
      Math.cos(y * 0.0021 - t * 0.09) +
      Math.sin((x + y) * 0.0009 + t * 0.05)) *
    Math.PI
  );
}

export const drift: Treatment = {
  id: "drift",
  label: "Drift",
  blurb:
    "Particles advected by a sine flow field, leaving decaying trails. Three ink tokens, one hairline each.",

  create() {
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const spawn = (p: Particle, index: number) => {
      p.x = Math.random() * width;
      p.y = Math.random() * height;
      p.px = p.x;
      p.py = p.y;
      p.age = 0;
      p.life = 3 + Math.random() * 7;
      p.ink = index % 3;
    };

    return {
      resize(w, h) {
        width = w;
        height = h;
        const target = Math.round(
          Math.min(MAX_PARTICLES, Math.max(MIN_PARTICLES, w * h * DENSITY))
        );
        particles = Array.from({ length: target }, (_, i) => {
          const p = { x: 0, y: 0, px: 0, py: 0, age: 0, life: 0, ink: 0 };
          spawn(p, i);
          // Stagger the first generation so they do not all expire together.
          p.age = Math.random() * p.life;
          return p;
        });
      },

      draw({ ctx, width: w, height: h, time, dt, palette }: HeroFrame) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0, 0, 0, ${FADE})`;
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "source-over";
        ctx.lineCap = "round";
        ctx.lineWidth = palette.strokeWidth;

        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          const angle = field(p.x, p.y, time);
          p.px = p.x;
          p.py = p.y;
          p.x += Math.cos(angle) * SPEED * dt;
          p.y += Math.sin(angle) * SPEED * dt;
          p.age += dt;

          const offscreen =
            p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20;
          if (offscreen || p.age > p.life) {
            spawn(p, i);
            continue;
          }

          /** Fade in and out, so nothing pops into or out of existence. */
          const t = p.age / p.life;
          ctx.globalAlpha = Math.min(1, Math.min(t, 1 - t) * 6) * 0.85;
          ctx.strokeStyle = palette.ink[p.ink];
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      },
    };
  },
};
