// @ts-nocheck
/* services accordion + floating image peek
 * Ported 1:1 from the static build. All window/document listeners, timers, rAF loops and
 * IntersectionObservers go through the scope `W`, so everything is torn down on route change. */
import type { Scope } from "@/lib/scope";

export default function init(W: Scope) {
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menu = document.getElementById("menu");
  /* services accordion + peek */
  const peek = document.getElementById("srvpeek"),
    peekImg = document.getElementById("srvpeekimg");
  document.querySelectorAll(".srv-row").forEach((r) => {
    r.querySelector(".srv-top").onclick = () => {
      const o = r.classList.contains("open");
      document.querySelectorAll(".srv-row").forEach((x) => x.classList.remove("open"));
      if (!o) r.classList.add("open");
    };
    r.addEventListener("mouseenter", () => {
      peekImg.src = r.dataset.peek;
      peek.classList.add("on");
    });
    r.addEventListener("mouseleave", () => peek.classList.remove("on"));
  });
  W.on("mousemove", (e) => {
    peek.style.left = e.clientX + "px";
    peek.style.top = e.clientY + "px";
  });
}
