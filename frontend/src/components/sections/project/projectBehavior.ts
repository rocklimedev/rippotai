// @ts-nocheck
/* project page behaviour — reveals, full-bleed parallax, lightbox.
 * All global listeners/timers go through the scope `W` (torn down on route change). */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  /* reveals */
  let REV = [...document.querySelectorAll("[data-rev]")];
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
  W.on("resize", revealCheck);
  W.every(revealCheck, 500);
  revealCheck();

  /* full-bleed parallax */
  const pars = [...document.querySelectorAll(".pd-full .par")];
  function par() {
    pars.forEach((el) => {
      if (!el.isConnected) return;
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -0.08}px,0)`;
    });
  }
  W.on("scroll", par, { passive: true });
  par();

  /* lightbox */
  const lb = document.getElementById("lb");
  if (!lb) return;
  const imgs = JSON.parse(lb.dataset.images || "[]");
  const im = document.getElementById("lbimg");
  const num = document.getElementById("lbn");
  const N = imgs.length;
  let cur = 0;
  const show = (i) => {
    cur = (i + N) % N;
    im.classList.add("swap");
    W.after(() => {
      im.src = imgs[cur];
      num.textContent = String(cur + 1).padStart(2, "0");
      im.onload = () => im.classList.remove("swap");
      if (im.complete) im.classList.remove("swap");
    }, 180);
    // warm the neighbours
    [cur + 1, cur - 1].forEach((k) => {
      const p = new Image();
      p.src = imgs[(k + N) % N];
    });
  };
  const open = (i) => {
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
  document.querySelectorAll(".pd-shot").forEach((b) => b.addEventListener("click", () => open(+b.dataset.i)));
  document.getElementById("lbprev").onclick = () => show(cur - 1);
  document.getElementById("lbnext").onclick = () => show(cur + 1);
  document.getElementById("lbclose").onclick = close;
  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  W.on("keydown", (e) => {
    if (!lb.classList.contains("on")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(cur + 1);
    if (e.key === "ArrowLeft") show(cur - 1);
  });
  let sx = null;
  lb.addEventListener("pointerdown", (e) => (sx = e.clientX));
  lb.addEventListener("pointerup", (e) => {
    if (sx === null) return;
    const dx = e.clientX - sx;
    sx = null;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
  });
  // unlock scroll if we navigate away with the viewer open
  W.on("pagehide", close);
  return;
}
