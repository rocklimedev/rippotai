// @ts-nocheck

/*
 * Projects page behaviour
 *
 * Ported 1:1 from the static build.
 *
 * All window/document listeners, timers, rAF loops and observers
 * go through the scope `W`, so everything is torn down on route change.
 */

import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menu = document.getElementById("menu");

  /* =========================================================
   * REVEALS
   * ======================================================= */

  let REV = [...document.querySelectorAll<HTMLElement>("[data-rev]")];

  function revealCheck() {
    REV = REV.filter((el) => {
      /*
       * Keep hidden/display:none elements in the queue.
       * They may become visible later through filtering/view changes.
       */
      if (el.offsetParent === null) {
        return true;
      }

      const r = el.getBoundingClientRect();

      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) {
        el.classList.add("in");
        return false;
      }

      return true;
    });
  }

  W.on("scroll", revealCheck, { passive: true });
  W.on("resize", revealCheck);
  W.every(revealCheck, 500);

  revealCheck();

  /* =========================================================
   * PROJECT ELEMENTS
   * ======================================================= */

  const wrap = document.getElementById("pjwrap");
  const grid = document.getElementById("pjgrid");
  const filter = document.getElementById("pjf");
  const view = document.getElementById("pjv");

  const cards = [...document.querySelectorAll<HTMLElement>(".pj-card")];

  const rows = [...document.querySelectorAll<HTMLElement>(".pj-row")];

  const inters = [...document.querySelectorAll<HTMLElement>(".pj-inter")];

  /*
   * The projects page may be rendered before/without the controls
   * during route transitions. Do not let behaviour initialization
   * crash in those cases.
   */
  if (!wrap || !grid) {
    return;
  }

  /* =========================================================
   * FILTER
   * ======================================================= */

  if (filter) {
    W.on("click", (e) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      const b = target.closest<HTMLButtonElement>("button");

      if (!b || !filter.contains(b)) {
        return;
      }

      const f = b.dataset.f || "all";

      /*
       * Toggle active filter button.
       */
      filter.querySelectorAll<HTMLButtonElement>("button").forEach((x) => {
        x.classList.toggle("on", x === b);
      });

      /*
       * Hide/show both grid cards and list rows.
       */
      [...cards, ...rows].forEach((el) => {
        const category = el.dataset.c || "";

        el.classList.toggle("hide", !(f === "all" || category === f));
      });

      /*
       * Editorial interludes only appear in the unfiltered grid.
       */
      inters.forEach((el) => {
        el.classList.toggle("hide", f !== "all");
      });

      /*
       * Existing CSS uses this class to adjust the filtered grid.
       */
      grid.classList.toggle("filtered", f !== "all");

      /*
       * Re-run card reveals after filtering.
       */
      cards.forEach((card) => {
        card.classList.remove("in");
      });

      REV = [...cards];

      W.after(revealCheck, 30);

      /*
       * Scroll back to the projects section.
       */
      if (rm) {
        window.scrollTo({
          top: wrap.offsetTop - 130,
        });
      } else {
        window.scrollTo({
          top: wrap.offsetTop - 130,
          behavior: "smooth",
        });
      }
    });
  }

  /* =========================================================
   * GRID / LIST VIEW
   * ======================================================= */

  if (view) {
    W.on("click", (e) => {
      const target = e.target as HTMLElement | null;

      if (!target) return;

      const b = target.closest<HTMLButtonElement>("button");

      if (!b || !view.contains(b)) {
        return;
      }

      view.querySelectorAll<HTMLButtonElement>("button").forEach((x) => {
        x.classList.toggle("on", x === b);
      });

      wrap.classList.toggle("works-list", b.dataset.v === "list");

      W.after(revealCheck, 30);
    });
  }

  /* =========================================================
   * LIST HOVER PREVIEW
   * ======================================================= */

  const peek = document.getElementById("pjpeek");
  const pimg = document.getElementById("pjpeekimg") as HTMLImageElement | null;

  if (peek && pimg) {
    rows.forEach((row) => {
      W.on(
        "mouseenter",
        () => {
          const image = row.dataset.img;

          if (!image) {
            return;
          }

          pimg.src = image;
          peek.classList.add("on");
        },
        row,
      );

      W.on(
        "mouseleave",
        () => {
          peek.classList.remove("on");
        },
        row,
      );
    });

    /* =======================================================
     * PREVIEW CURSOR POSITION
     * ===================================================== */

    let px = 0;
    let py = 0;

    let qx = 0;
    let qy = 0;

    W.on("mousemove", (e) => {
      px = e.clientX + 180;
      py = e.clientY;
    });

    (function lp() {
      qx += (px - qx) * 0.14;
      qy += (py - qy) * 0.14;

      peek.style.left = `${qx}px`;
      peek.style.top = `${qy}px`;

      W.raf(lp);
    })();
  }

  /* =========================================================
   * ANCHORS
   * ======================================================= */

  W.on("click", (e) => {
    const target = e.target as HTMLElement | null;

    if (!target) return;

    const a = target.closest<HTMLAnchorElement>('a[href^="#"]');

    if (!a) return;

    const id = a.getAttribute("href");

    /*
     * Preserve original "#" behaviour.
     */
    if (!id || id === "#") {
      e.preventDefault();
      return;
    }

    const targetElement = document.querySelector(id);

    if (!targetElement) {
      return;
    }

    e.preventDefault();

    if (rm) {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
      });
    } else {
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  });
}
