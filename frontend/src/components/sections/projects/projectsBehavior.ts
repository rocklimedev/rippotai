// @ts-nocheck
/* projects page behaviour
 * Ported 1:1 from the static build. All window/document listeners, timers, rAF loops and
 * IntersectionObservers go through the scope `W`, so everything is torn down on route change. */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.getElementById("menu");
  /* reveals */
  let REV = [...document.querySelectorAll("[data-rev]")];
  function revealCheck() {
    REV = REV.filter((el) => {
      if (el.offsetParent === null) return true;
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0) {
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

  /* filter + view */
  const wrap = document.getElementById("pjwrap");
  const cards = [...document.querySelectorAll(".pj-card")],
    rows = [...document.querySelectorAll(".pj-row")],
    inters = [...document.querySelectorAll(".pj-inter")];
  document.getElementById("pjf").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll("#pjf button").forEach((x) => x.classList.toggle("on", x === b));
    const f = b.dataset.f;
    [...cards, ...rows].forEach((el) => el.classList.toggle("hide", !(f === "all" || el.dataset.c === f)));
    inters.forEach((el) => el.classList.toggle("hide", f !== "all"));
    document.getElementById("pjgrid").classList.toggle("filtered", f !== "all");
    cards.forEach((c) => {
      c.classList.remove("in");
    });
    REV = [...cards];
    W.after(revealCheck, 30);
    scrollTo({ top: wrap.offsetTop - 130, behavior: "smooth" });
  };
  document.getElementById("pjv").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    document.querySelectorAll("#pjv button").forEach((x) => x.classList.toggle("on", x === b));
    wrap.classList.toggle("works-list", b.dataset.v === "list");
    W.after(revealCheck, 30);
  };

  /* list hover preview */
  const peek = document.getElementById("pjpeek"),
    pimg = document.getElementById("pjpeekimg");
  rows.forEach((r) => {
    r.addEventListener("mouseenter", () => {
      pimg.src = r.dataset.img;
      peek.classList.add("on");
    });
    r.addEventListener("mouseleave", () => peek.classList.remove("on"));
  });
  let px = 0,
    py = 0,
    qx = 0,
    qy = 0;
  W.on("mousemove", (e) => {
    px = e.clientX + 180;
    py = e.clientY;
  });
  (function lp() {
    qx += (px - qx) * 0.14;
    qy += (py - qy) * 0.14;
    peek.style.left = qx + "px";
    peek.style.top = qy + "px";
    W.raf(lp);
  })();

  /* anchors */
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (ev) => {
      const id = a.getAttribute("href");
      if (id === "#") return ev.preventDefault();
      const t = document.querySelector(id);
      if (!t) return;
      ev.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY, behavior: "smooth" });
    }),
  );
}
