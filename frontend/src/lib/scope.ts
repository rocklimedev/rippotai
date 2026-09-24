"use client";

import { useEffect } from "react";

/**
 * A disposable bag for imperative behaviour.
 *
 * The site's motion (showcase, scrollytelling, wizards…) was written as vanilla JS.
 * Each behaviour module receives a Scope and registers every global listener, timer,
 * animation frame and observer through it, so a client-side route change tears the
 * whole thing down cleanly. Listeners on the page's own elements need no tracking —
 * those elements are removed with the page.
 */
export interface Scope {
  on: (type: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions | boolean) => void;
  doc: (type: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions | boolean) => void;
  every: (fn: () => void, ms?: number) => number;
  after: (fn: () => void, ms?: number) => number;
  raf: (fn: FrameRequestCallback) => number;
  io: (cb: IntersectionObserverCallback, opts?: IntersectionObserverInit) => IntersectionObserver;
  dispose: () => void;
  readonly dead: boolean;
}

export function createScope(): Scope {
  let dead = false;
  const offs: Array<() => void> = [];
  const intervals = new Set<number>();
  const timeouts = new Set<number>();
  const frames = new Set<number>();

  return {
    get dead() {
      return dead;
    },
    on(type, fn, opts) {
      window.addEventListener(type, fn, opts);
      offs.push(() => window.removeEventListener(type, fn, opts));
    },
    doc(type, fn, opts) {
      document.addEventListener(type, fn, opts);
      offs.push(() => document.removeEventListener(type, fn, opts));
    },
    every(fn, ms) {
      const id = window.setInterval(() => !dead && fn(), ms);
      intervals.add(id);
      return id;
    },
    after(fn, ms) {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        if (!dead) fn();
      }, ms);
      timeouts.add(id);
      return id;
    },
    raf(fn) {
      if (dead) return 0;
      const id = requestAnimationFrame((t) => {
        frames.delete(id);
        if (!dead) fn(t);
      });
      frames.add(id);
      return id;
    },
    io(cb, opts) {
      const o = new IntersectionObserver(cb, opts);
      offs.push(() => o.disconnect());
      return o;
    },
    dispose() {
      dead = true;
      offs.splice(0).forEach((f) => f());
      intervals.forEach((id) => clearInterval(id));
      timeouts.forEach((id) => clearTimeout(id));
      frames.forEach((id) => cancelAnimationFrame(id));
      intervals.clear();
      timeouts.clear();
      frames.clear();
    },
  };
}

/** Remove remote images that fail to load (CSS then shows the initials / fallback art). */
export function wireImageFallbacks(root: ParentNode = document) {
  root.querySelectorAll<HTMLImageElement>('img[data-fallback="remove"]').forEach((im) => {
    if (im.complete && im.naturalWidth === 0) im.remove();
    else im.addEventListener("error", () => im.remove(), { once: true });
  });
}

/** Run a behaviour module for the lifetime of the calling component. */
export function useScopedBehavior(init: (W: Scope) => void) {
  useEffect(() => {
    const W = createScope();
    wireImageFallbacks();
    try {
      init(W);
    } catch (err) {
      console.error("[rippotai] behaviour failed", err);
    }
    return () => W.dispose();
  }, [init]);
}
