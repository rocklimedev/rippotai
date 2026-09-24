// @ts-nocheck
/* about page behaviour
 * Ported 1:1 from the static build. All window/document listeners, timers, rAF loops and
 * IntersectionObservers go through the scope `W`, so everything is torn down on route change. */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.getElementById("menu");
  /* reveals */
  let REV = [...document.querySelectorAll("[data-rev],.mem,#fdimg")];
  function revealCheck() {
    REV = REV.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) {
        el.classList.add("in");
        return false;
      }
      return true;
    });
  }
  W.on("scroll", revealCheck, { passive: true });
  W.every(revealCheck, 500);
  revealCheck();

  /* hero cube: idle spin + drag with inertia */
  (function () {
    const cw = document.getElementById("cw"),
      cube = document.getElementById("cube");
    let rx = -18,
      ry = 30,
      vx = 0,
      vy = 0.18,
      drag = false,
      lx = 0,
      ly = 0;
    cw.addEventListener("pointerdown", (e) => {
      drag = true;
      lx = e.clientX;
      ly = e.clientY;
      cw.setPointerCapture(e.pointerId);
    });
    cw.addEventListener("pointermove", (e) => {
      if (!drag) return;
      vy = (e.clientX - lx) * 0.35;
      vx = -(e.clientY - ly) * 0.35;
      ry += vy;
      rx += vx;
      lx = e.clientX;
      ly = e.clientY;
    });
    cw.addEventListener("pointerup", () => (drag = false));
    (function loop() {
      if (!drag) {
        vy += (0.18 - vy) * 0.03;
        vx *= 0.94;
        ry += vy;
        rx += vx;
        rx += (-18 - rx) * 0.01;
      }
      cube.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      W.raf(loop);
    })();
  })();

  /* statement: words ink in as it scrolls through */
  (function () {
    const ws = [...document.querySelectorAll("#stmt span")],
      p = document.getElementById("stmt");
    function f() {
      const r = p.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = Math.round(t * ws.length);
      ws.forEach((w, i) => w.classList.toggle("on", i < n));
    }
    W.on("scroll", f, { passive: true });
    f();
  })();

  /* unfold: cube spins, shrinks, then faces fly out into the grid */
  (function () {
    const sec = document.getElementById("unfold"),
      uc = document.getElementById("ucube"),
      vals = [...document.querySelectorAll(".val")],
      lbl = document.getElementById("ufs");
    const E = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      cl = (v, a, b) => Math.max(a, Math.min(b, v));
    function f() {
      if (innerWidth <= 900) return;
      const p = cl((scrollY - sec.offsetTop) / (sec.offsetHeight - innerHeight), 0, 1);
      const spin = E(cl(p / 0.45, 0, 1)),
        out = E(cl((p - 0.35) / 0.4, 0, 1));
      uc.style.transform = `scale(${1 - out * 0.85}) rotateX(${-20 + spin * -340}deg) rotateY(${30 + spin * 540}deg)`;
      uc.style.opacity = 1 - cl((p - 0.45) / 0.15, 0, 1);
      const g = document.getElementById("ufg").getBoundingClientRect(),
        cx = g.left + g.width / 2,
        cy = g.top + g.height / 2;
      vals.forEach((v, i) => {
        const local = E(cl((p - 0.4 - i * 0.04) / 0.3, 0, 1));
        const r = v.offsetLeft + v.offsetWidth / 2 - g.width / 2,
          s = v.offsetTop + v.offsetHeight / 2 - g.height / 2;
        v.style.opacity = local;
        v.style.transform = `translate(${-r * (1 - local)}px,${-s * (1 - local)}px) scale(${0.3 + 0.7 * local}) rotate(${(1 - local) * (i % 2 ? 14 : -14)}deg)`;
      });
      lbl.textContent = p < 0.4 ? "Scroll to unfold" : p < 0.8 ? "Unfolding…" : "Six faces, one practice";
    }
    W.on("scroll", f, { passive: true });
    W.on("resize", f);
    f();
  })();

  /* founder + at-work parallax */
  (function () {
    const a = document.querySelector(".fd-img img"),
      b = document.querySelector(".atwork .par");
    function f() {
      [
        [a, 0.08],
        [b, 0.12],
      ].forEach(([el, k]) => {
        if (!el || !el.isConnected || !el.parentElement) return;
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -k}px,0)`;
      });
    }
    W.on("scroll", f, { passive: true });
    f();
  })();

  /* team tiles: tilt toward cursor, tap-to-flip on touch */
  document.querySelectorAll(".mem").forEach((m) => {
    const fl = m.querySelector(".flip");
    m.addEventListener("mousemove", (e) => {
      if (m.matches(":hover")) {
        const r = m.getBoundingClientRect(),
          x = (e.clientX - r.left) / r.width - 0.5;
        fl.style.transform = `rotateY(${180 + x * -14}deg)`;
      }
    });
    m.addEventListener("mouseleave", () => {
      fl.style.transform = "";
    });
    m.addEventListener("click", () => {
      if (matchMedia("(hover:none)").matches) m.classList.toggle("on");
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (ev) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      ev.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY, behavior: "smooth" });
    }),
  );
}
