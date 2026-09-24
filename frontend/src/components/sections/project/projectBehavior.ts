// @ts-nocheck
/*
 * Project page behaviour — reveals, full-bleed parallax, lightbox.
 *
 * All global listeners/timers go through the scope `W`
 * so everything is torn down correctly on route changes.
 */

import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  /* ---------------------------------------------------------
   * REVEALS
   * --------------------------------------------------------- */

  let REV = [...document.querySelectorAll<HTMLElement>("[data-rev]")];

  function revealCheck() {
    REV = REV.filter((el) => {
      if (!el.isConnected) return false;

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

  /* ---------------------------------------------------------
   * FULL-BLEED PARALLAX
   * --------------------------------------------------------- */

  const pars = [...document.querySelectorAll<HTMLElement>(".pd-full .par")];

  function par() {
    pars.forEach((el) => {
      if (!el.isConnected || !el.parentElement) return;

      const r = el.parentElement.getBoundingClientRect();

      if (r.bottom < 0 || r.top > window.innerHeight) return;

      const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -0.08;

      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  }

  W.on("scroll", par, { passive: true });
  W.on("resize", par);

  par();

  /* ---------------------------------------------------------
   * LIGHTBOX
   * --------------------------------------------------------- */

  const lb = document.getElementById("lb");

  if (!lb) return;

  let imgs: string[] = [];

  try {
    const parsed = JSON.parse(lb.dataset.images || "[]");

    if (Array.isArray(parsed)) {
      imgs = parsed.filter((src): src is string => typeof src === "string" && src.trim().length > 0);
    }
  } catch {
    imgs = [];
  }

  const im = document.getElementById("lbimg") as HTMLImageElement | null;
  const num = document.getElementById("lbn");

  const prevBtn = document.getElementById("lbprev");
  const nextBtn = document.getElementById("lbnext");
  const closeBtn = document.getElementById("lbclose");

  /*
   * If the project has no gallery images, keep the lightbox
   * completely inactive rather than allowing modulo-by-zero
   * behaviour.
   */
  if (!im || !num || imgs.length === 0) {
    return;
  }

  const N = imgs.length;

  let cur = 0;
  let sx: number | null = null;

  /* ---------------------------------------------------------
   * SHOW IMAGE
   * --------------------------------------------------------- */

  const show = (i: number) => {
    if (!N) return;

    cur = (i + N) % N;

    im.classList.add("swap");

    W.after(() => {
      if (!im.isConnected || !num.isConnected) return;

      im.src = imgs[cur];
      num.textContent = String(cur + 1).padStart(2, "0");

      const removeSwap = () => {
        im.classList.remove("swap");
      };

      im.onload = removeSwap;

      if (im.complete) {
        removeSwap();
      }
    }, 180);

    /*
     * Warm neighbouring images so previous/next transitions
     * feel immediate.
     */
    [cur + 1, cur - 1].forEach((k) => {
      const src = imgs[(k + N) % N];

      if (!src) return;

      const preload = new Image();
      preload.src = src;
    });
  };

  /* ---------------------------------------------------------
   * OPEN / CLOSE
   * --------------------------------------------------------- */

  const open = (i: number) => {
    show(i);

    lb.classList.add("on");
    lb.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
  };

  const close = () => {
    lb.classList.remove("on");
    lb.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
  };

  /* ---------------------------------------------------------
   * GALLERY THUMBNAILS
   * --------------------------------------------------------- */

  document.querySelectorAll<HTMLElement>(".pd-shot").forEach((button) => {
    W.on(
      "click",
      () => {
        const index = Number(button.dataset.i);

        if (!Number.isFinite(index)) return;

        open(index);
      },
      button,
    );
  });

  /* ---------------------------------------------------------
   * LIGHTBOX CONTROLS
   * --------------------------------------------------------- */

  if (prevBtn) {
    W.on(
      "click",
      () => {
        show(cur - 1);
      },
      prevBtn,
    );
  }

  if (nextBtn) {
    W.on(
      "click",
      () => {
        show(cur + 1);
      },
      nextBtn,
    );
  }

  if (closeBtn) {
    W.on("click", close, closeBtn);
  }

  /* ---------------------------------------------------------
   * CLICK OUTSIDE IMAGE
   * --------------------------------------------------------- */

  W.on(
    "click",
    (e) => {
      if (e.target === lb) {
        close();
      }
    },
    lb,
  );

  /* ---------------------------------------------------------
   * KEYBOARD
   * --------------------------------------------------------- */

  W.on("keydown", (e) => {
    if (!lb.classList.contains("on")) return;

    if (e.key === "Escape") {
      close();
      return;
    }

    if (e.key === "ArrowRight") {
      show(cur + 1);
      return;
    }

    if (e.key === "ArrowLeft") {
      show(cur - 1);
    }
  });

  /* ---------------------------------------------------------
   * TOUCH / POINTER SWIPE
   * --------------------------------------------------------- */

  W.on(
    "pointerdown",
    (e) => {
      sx = e.clientX;
    },
    lb,
  );

  W.on(
    "pointerup",
    (e) => {
      if (sx === null) return;

      const dx = e.clientX - sx;

      sx = null;

      if (Math.abs(dx) <= 50) return;

      show(cur + (dx < 0 ? 1 : -1));
    },
    lb,
  );

  /* ---------------------------------------------------------
   * ROUTE CHANGE / PAGE HIDE
   * --------------------------------------------------------- */

  W.on("pagehide", close);

  return;
}
