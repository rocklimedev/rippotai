// @ts-nocheck
/* motion-poster showcase: autoplay loop, zig-zag slivers
 * Ported 1:1 from the static build. All window/document listeners, timers, rAF loops and
 * IntersectionObservers go through the scope `W`, so everything is torn down on route change. */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.getElementById("menu");
  /* ---------- WORKS: motion-poster showcase — autoplay loop, zig-zag slivers ---------- */
  (function () {
    const sec = document.getElementById("works"),
      stage = document.getElementById("msstage");
    const cards = [...stage.querySelectorAll(".ms-card")],
      N = cards.length;
    const msn = document.getElementById("msn"),
      mst = document.getElementById("mst"),
      mtype = document.getElementById("mstype"),
      cap = document.getElementById("mscap"),
      nm = document.getElementById("msname"),
      ty = document.getElementById("msty"),
      timer = document.getElementById("mstimer");
    const HOLD = 3000;
    sec.style.setProperty("--hold", HOLD + "ms");
    mst.textContent = String(N).padStart(2, "0");
    let cur = 0,
      G = {},
      tmo,
      auto,
      visible = false;
    function geom() {
      const vw = stage.clientWidth,
        vh = stage.clientHeight,
        mob = vw < 700;
      let W, H;
      if (mob) {
        W = vw * 0.8;
        H = Math.min(vh * 0.56, W * 1.3);
      } else {
        W = Math.min(vw * 0.8, (vh * 0.62) / 0.58);
        H = W * 0.58;
      }
      const cx = vw / 2,
        cy = vh * 0.5;
      G = {
        A: { l: cx - W / 2, t: cy - H / 2, w: W, h: H },
        g: mob ? vw * 0.03 : Math.max(12, vw * 0.011),
        sw: W * 0.34,
        sh: H * 0.46,
      };
      cap.style.top = cy + H / 2 + 18 + "px";
    }
    function slot(d, k) {
      /* zig-zag: when cur is even, next sits top-right & prev bottom-left; odd flips */
      const { A, g, sw, sh } = G,
        even = cur % 2 === 0,
        up = d > 0 ? even : !even;
      if (d === 0) return { l: A.l, t: A.t, w: A.w, h: A.h, o: 1, z: 3 };
      const t = up ? A.t : A.t + A.h - sh;
      if (d === -1) return { l: A.l - g - sw, t, w: sw, h: sh, o: 1, z: 2 };
      if (d === 1) return { l: A.l + A.w + g, t, w: sw, h: sh, o: 1, z: 2 };
      if (d < 0) return { l: A.l - 2 * (g + sw), t, w: sw, h: sh, o: 0, z: 1 };
      return { l: A.l + A.w + g * 2 + sw, t, w: sw, h: sh, o: 0, z: 1 };
    }
    function render(instant) {
      cards.forEach((c, k) => {
        let d = (((k - cur) % N) + N) % N;
        if (d > N / 2) d -= N;
        const pd = c.dataset.d === undefined ? d : +c.dataset.d;
        if (instant || Math.abs(d - pd) > 2) {
          c.classList.add("jump");
          W.raf(() => W.raf(() => c.classList.remove("jump")));
        }
        c.dataset.d = d;
        const s = slot(d, k);
        c.style.left = s.l + "px";
        c.style.top = s.t + "px";
        c.style.width = s.w + "px";
        c.style.height = s.h + "px";
        c.style.opacity = s.o;
        c.style.zIndex = s.z;
        c.classList.toggle("active", d === 0);
      });
      msn.textContent = String(cur + 1).padStart(2, "0");
      cap.classList.add("swap");
      mtype.classList.add("swap");
      clearTimeout(tmo);
      tmo = W.after(
        () => {
          nm.innerHTML = cards[cur].dataset.name;
          ty.textContent = cards[cur].dataset.type;
          mtype.textContent = cards[cur].dataset.type;
          cap.classList.remove("swap");
          mtype.classList.remove("swap");
        },
        instant ? 0 : 320,
      );
      timer.classList.remove("run");
      void timer.offsetWidth;
      if (visible) timer.classList.add("run");
    }
    function restart() {
      clearInterval(auto);
      if (visible)
        auto = W.every(() => {
          cur = (cur + 1) % N;
          render();
        }, HOLD);
    }
    function go(i) {
      cur = (i + N) % N;
      render();
      restart();
    }
    cards.forEach((c) =>
      c.addEventListener("click", () => {
        const d = +c.dataset.d;
        if (d !== 0) go(cur + d);
      }),
    );
    let sx = null;
    stage.addEventListener("pointerdown", (e) => {
      sx = e.clientX;
    });
    W.on("pointerup", (e) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
    });
    W.on("keydown", (e) => {
      if (!visible || menu.classList.contains("open")) return;
      if (e.key === "ArrowRight") go(cur + 1);
      if (e.key === "ArrowLeft") go(cur - 1);
    });
    W.io(
      (es) =>
        es.forEach((e) => {
          visible = e.isIntersecting;
          if (visible) {
            timer.classList.remove("run");
            void timer.offsetWidth;
            timer.classList.add("run");
            restart();
          } else {
            clearInterval(auto);
            timer.classList.remove("run");
          }
        }),
      { threshold: 0.45 },
    ).observe(sec);
    W.doc("visibilitychange", () => {
      if (document.hidden) clearInterval(auto);
      else restart();
    });
    W.on("resize", () => {
      geom();
      render(true);
    });
    geom();
    render(true);
  })();
}
