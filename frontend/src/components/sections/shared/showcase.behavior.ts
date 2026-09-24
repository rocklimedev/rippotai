// @ts-nocheck
/* motion-poster showcase: autoplay loop, zig-zag slivers
 * Ported 1:1 from the static build.
 * All window/document listeners, timers, rAF loops and IntersectionObservers
 * go through the scope `W`, so everything is torn down on route change.
 */

import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const menu = document.getElementById("menu");

  /* ---------- WORKS: motion-poster showcase ---------- */

  const sec = document.getElementById("works");
  const stage = document.getElementById("msstage");

  // Behavior can safely exit if the section isn't present.
  if (!sec || !stage) return;

  const cards = [...stage.querySelectorAll<HTMLElement>(".ms-card")];
  const N = cards.length;

  // Nothing to animate.
  if (!N) return;

  const mtype = document.getElementById("mstype");
  const cap = document.getElementById("mscap");
  const nm = document.getElementById("msname");
  const ty = document.getElementById("msty");
  const timer = document.getElementById("mstimer");

  // These are required by the showcase markup.
  if (!mtype || !cap || !nm || !ty || !timer) return;

  const HOLD = 3000;

  sec.style.setProperty("--hold", `${HOLD}ms`);

  let cur = 0;
  let G: Record<string, any> = {};

  let tmo: ReturnType<typeof setTimeout> | undefined;
  let auto: ReturnType<typeof setInterval> | undefined;

  let visible = false;

  function clearAuto() {
    if (auto !== undefined) {
      clearInterval(auto);
      auto = undefined;
    }
  }

  function geom() {
    const vw = stage.clientWidth;
    const vh = stage.clientHeight;

    const mob = vw < 700;

    let W;
    let H;

    if (mob) {
      W = vw * 0.8;
      H = Math.min(vh * 0.56, W * 1.3);
    } else {
      W = Math.min(vw * 0.8, (vh * 0.62) / 0.58);
      H = W * 0.58;
    }

    const cx = vw / 2;
    const cy = vh * 0.5;

    G = {
      A: {
        l: cx - W / 2,
        t: cy - H / 2,
        w: W,
        h: H,
      },

      g: mob ? vw * 0.03 : Math.max(12, vw * 0.011),

      sw: W * 0.34,
      sh: H * 0.46,
    };

    cap.style.top = `${cy + H / 2 + 18}px`;
  }

  function slot(d: number) {
    const { A, g, sw, sh } = G;

    const even = cur % 2 === 0;
    const up = d > 0 ? even : !even;

    if (d === 0) {
      return {
        l: A.l,
        t: A.t,
        w: A.w,
        h: A.h,
        o: 1,
        z: 3,
      };
    }

    const t = up ? A.t : A.t + A.h - sh;

    if (d === -1) {
      return {
        l: A.l - g - sw,
        t,
        w: sw,
        h: sh,
        o: 1,
        z: 2,
      };
    }

    if (d === 1) {
      return {
        l: A.l + A.w + g,
        t,
        w: sw,
        h: sh,
        o: 1,
        z: 2,
      };
    }

    if (d < 0) {
      return {
        l: A.l - 2 * (g + sw),
        t,
        w: sw,
        h: sh,
        o: 0,
        z: 1,
      };
    }

    return {
      l: A.l + A.w + g * 2 + sw,
      t,
      w: sw,
      h: sh,
      o: 0,
      z: 1,
    };
  }

  function render(instant = false) {
    cards.forEach((card, k) => {
      let d = (((k - cur) % N) + N) % N;

      if (d > N / 2) {
        d -= N;
      }

      const previousD = card.dataset.d === undefined ? d : Number(card.dataset.d);

      if (instant || Math.abs(d - previousD) > 2) {
        card.classList.add("jump");

        W.raf(() => {
          W.raf(() => {
            card.classList.remove("jump");
          });
        });
      }

      card.dataset.d = String(d);

      const s = slot(d);

      card.style.left = `${s.l}px`;
      card.style.top = `${s.t}px`;
      card.style.width = `${s.w}px`;
      card.style.height = `${s.h}px`;
      card.style.opacity = String(s.o);
      card.style.zIndex = String(s.z);

      card.classList.toggle("active", d === 0);
    });

    const currentCard = cards[cur];

    if (!currentCard) return;

    const currentName = currentCard.dataset.name ?? "";
    const currentType = currentCard.dataset.type ?? "";

    cap.classList.add("swap");
    mtype.classList.add("swap");

    if (tmo !== undefined) {
      clearTimeout(tmo);
    }

    tmo = W.after(
      () => {
        nm.textContent = currentName;
        ty.textContent = currentType;
        mtype.textContent = currentType;

        cap.classList.remove("swap");
        mtype.classList.remove("swap");
      },
      instant ? 0 : 320,
    );

    timer.classList.remove("run");

    // Force reflow so the timer animation restarts.
    void timer.offsetWidth;

    if (visible && !rm) {
      timer.classList.add("run");
    }
  }

  function restart() {
    clearAuto();

    if (!visible || rm || N <= 1) return;

    auto = W.every(() => {
      cur = (cur + 1) % N;
      render();
    }, HOLD);
  }

  function go(i: number) {
    cur = (i + N) % N;

    render();
    restart();
  }

  /* ---------- Card click ---------- */

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const d = Number(card.dataset.d);

      if (d !== 0) {
        go(cur + d);
      }
    });
  });

  /* ---------- Swipe ---------- */

  let sx: number | null = null;

  stage.addEventListener("pointerdown", (e) => {
    sx = e.clientX;
  });

  W.on("pointerup", (e) => {
    if (sx === null) return;

    const dx = e.clientX - sx;

    sx = null;

    if (Math.abs(dx) > 50) {
      go(cur + (dx < 0 ? 1 : -1));
    }
  });

  /* ---------- Keyboard ---------- */

  W.on("keydown", (e) => {
    if (!visible) return;

    if (menu?.classList.contains("open")) {
      return;
    }

    if (e.key === "ArrowRight") {
      go(cur + 1);
    }

    if (e.key === "ArrowLeft") {
      go(cur - 1);
    }
  });

  /* ---------- Intersection Observer ---------- */

  W.io(
    (entries) => {
      entries.forEach((entry) => {
        visible = entry.isIntersecting;

        if (visible) {
          timer.classList.remove("run");

          if (!rm) {
            void timer.offsetWidth;
            timer.classList.add("run");
          }

          restart();
        } else {
          clearAuto();
          timer.classList.remove("run");
        }
      });
    },
    {
      threshold: 0.45,
    },
  ).observe(sec);

  /* ---------- Visibility ---------- */

  W.doc("visibilitychange", () => {
    if (document.hidden) {
      clearAuto();
    } else {
      restart();
    }
  });

  /* ---------- Resize ---------- */

  W.on("resize", () => {
    geom();
    render(true);
  });

  /* ---------- Initial render ---------- */

  geom();
  render(true);
}
