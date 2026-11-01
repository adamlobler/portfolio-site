/**
 * The canvas engine: one rAF loop, one canvas, one treatment.
 *
 * Everything the hero promises about cost lives here rather than in the three
 * treatments, so a new treatment cannot forget any of it:
 *
 *   - **DPR capped at 1.5.** A 3x backing store on a phone is nine times the
 *     fill rate for a blurred gradient nobody inspects.
 *   - **Paused off-screen.** An `IntersectionObserver` cancels the loop when
 *     the hero scrolls away and restarts it (with the clock rebased, so
 *     nothing jumps) when it comes back.
 *   - **Paused when the tab is hidden**, which `requestAnimationFrame` mostly
 *     does on its own but not on every engine.
 *   - **One loop.** `/lab` runs three treatments at once by giving each its
 *     own engine; the homepage runs exactly one.
 *
 * `dt` is clamped to 50ms: after a pause, a treatment integrating velocity
 * would otherwise advance a full second in a single step.
 */
import type { HeroPalette, Treatment } from "./types";

const MAX_DPR = 1.5;
const MAX_DT = 0.05;

export type EngineStats = {
  /** Smoothed frames per second. */
  fps: number;
  /** Smoothed milliseconds spent inside `draw`, i.e. our share of the frame. */
  frameMs: number;
};

export type Engine = {
  /** Swap the palette in without restarting the treatment. */
  setPalette(palette: HeroPalette): void;
  destroy(): void;
};

export type EngineOptions = {
  canvas: HTMLCanvasElement;
  treatment: Treatment;
  palette: HeroPalette;
  /** Called once, after the first frame has been painted. */
  onFirstFrame?: () => void;
  /** Called roughly twice a second, for `/lab`'s readout. */
  onStats?: (stats: EngineStats) => void;
};

export function createEngine({
  canvas,
  treatment,
  palette,
  onFirstFrame,
  onStats,
}: EngineOptions): Engine {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return { setPalette: () => {}, destroy: () => {} };

  const renderer = treatment.create();
  let current = palette;
  let width = 0;
  let height = 0;
  let frame = 0;
  let running = false;
  let destroyed = false;
  let visible = false;
  let start = 0;
  let last = 0;
  let fps = 0;
  let frameMs = 0;
  let statsAt = 0;
  let painted = false;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const next = {
      w: Math.max(1, Math.round(rect.width)),
      h: Math.max(1, Math.round(rect.height)),
    };
    if (next.w === width && next.h === height) return;
    width = next.w;
    height = next.h;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    // Treatments draw in CSS pixels and never see the ratio.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    renderer.resize?.(width, height);
  };

  const paint = (now: number) => {
    const dt = last === 0 ? 1 / 60 : Math.min((now - last) / 1000, MAX_DT);
    last = now;
    const began = performance.now();
    renderer.draw({
      ctx,
      width,
      height,
      time: (now - start) / 1000,
      dt,
      palette: current,
    });
    const cost = performance.now() - began;

    // Exponential smoothing: a readout that twitches is unreadable.
    frameMs = frameMs === 0 ? cost : frameMs * 0.9 + cost * 0.1;
    if (dt > 0) fps = fps === 0 ? 1 / dt : fps * 0.9 + (1 / dt) * 0.1;
    if (onStats && now - statsAt > 500) {
      statsAt = now;
      onStats({ fps, frameMs });
    }

    if (!painted) {
      painted = true;
      onFirstFrame?.();
    }
  };

  const loop = (now: number) => {
    if (!running) return;
    paint(now);
    frame = requestAnimationFrame(loop);
  };

  const run = () => {
    if (running || destroyed) return;
    running = true;
    // Rebase the clock so a treatment resumes where it paused.
    const now = performance.now();
    start = start === 0 ? now : now - (last - start);
    last = 0;
    frame = requestAnimationFrame(loop);
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  const sync = () => {
    if (visible && !document.hidden) run();
    else stop();
  };

  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { rootMargin: "100px" }
  );
  intersectionObserver.observe(canvas);

  document.addEventListener("visibilitychange", sync);

  sync();

  return {
    setPalette(next) {
      current = next;
    },
    destroy() {
      destroyed = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    },
  };
}
