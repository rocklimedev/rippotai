// @ts-nocheck
/* home page behaviour
 * Ported 1:1 from the static build. All window/document listeners, timers, rAF loops and
 * IntersectionObservers go through the scope `W`, so everything is torn down on route change. */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.getElementById("menu");
  /* hero slideshow */
  const CAPS = [
    ["Moksh Dham", "Institutional · Ongoing since 2025"],
    ["Vinay Khanna Law Chambers", "Commercial · New Delhi"],
    ["Tropical Home", "Residential · 2024"],
    ["The Inner House", "Residential · Sunder Vihar"],
  ];
  const figs = [...document.querySelectorAll("#slides figure")],
    dots = document.getElementById("dots"),
    hcap = document.getElementById("hcap");
  dots.innerHTML = "";
  figs.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = i ? "" : "on";
    b.onclick = () => go(i);
    dots.appendChild(b);
  });
  let ci = 0,
    timer;
  function go(i) {
    figs[ci].classList.remove("on");
    dots.children[ci].classList.remove("on");
    ci = i;
    figs[ci].classList.add("on");
    dots.children[ci].classList.add("on");
    hcap.innerHTML = "<b>" + CAPS[ci][0] + "</b>" + CAPS[ci][1];
    const im = figs[ci].querySelector("img");
    im.style.animation = "none";
    void im.offsetWidth;
    im.style.animation = "";
    clearInterval(timer);
    if (!rm) timer = W.every(() => go((ci + 1) % figs.length), 6500);
  }
  if (!rm) timer = W.every(() => go((ci + 1) % figs.length), 6500);

  /* reveals */
  const REV = [...document.querySelectorAll("[data-rev],.step,.quote")];
  REV.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.08 + "s";
  });
  function revealCheck() {
    for (let i = REV.length - 1; i >= 0; i--) {
      const r = REV[i].getBoundingClientRect();
      if (r.top < innerHeight * 0.92 && r.bottom > 0) {
        REV[i].classList.add("in");
        REV.splice(i, 1);
      }
    }
  }
  W.on("scroll", revealCheck, { passive: true });
  W.on("resize", revealCheck);
  revealCheck();
  W.every(revealCheck, 600);

  /* counters */
  const cio = W.io(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target,
            to = +el.dataset.to,
            suf = el.dataset.suf || "+";
          let n = 0;
          const t = W.every(() => {
            n += Math.ceil(to / 28);
            if (n >= to) {
              n = to;
              clearInterval(t);
            }
            el.textContent = n + suf;
          }, 34);
          cio.unobserve(el);
        }
      }),
    { threshold: 0.6 },
  );
  document.querySelectorAll(".num").forEach((el) => cio.observe(el));

  /* process number */
  const pnum = document.getElementById("pnum");
  const pio = W.io(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) pnum.textContent = e.target.dataset.n;
      }),
    { threshold: 0.55 },
  );
  document.querySelectorAll(".step").forEach((s) => pio.observe(s));

  /* full-bleed parallax */
  const pars = [...document.querySelectorAll(".bleed .par")];
  function par() {
    pars.forEach((el) => {
      if (!el.isConnected) return;
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -0.12}px,0)`;
    });
  }
  W.on("scroll", par, { passive: true });
  par();

  /* anchors */
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (ev) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      ev.preventDefault();
      W.after(
        () =>
          scrollTo({
            top: t.getBoundingClientRect().top + scrollY - (t.id === "top-anchor" ? 0 : 70),
            behavior: "smooth",
          }),
        menu.classList.contains("open") ? 0 : 0,
      );
    }),
  );
}
