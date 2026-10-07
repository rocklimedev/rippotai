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
  let hoveredRow: HTMLElement | null = null;
  function syncPreviewHeight() {
    if (!hoveredRow) return;
    const bounds = hoveredRow.getBoundingClientRect();
    peek.style.height = `${bounds.height}px`;
    peek.style.top = `${bounds.top + bounds.height / 2}px`;
  }
  // Keep the preview aligned while an accordion row expands or collapses.
  function updatePreview() {
    syncPreviewHeight();
    W.raf(updatePreview);
  }
  W.raf(updatePreview);
  document.querySelectorAll(".srv-row").forEach((r) => {
    r.querySelector(".srv-top").onclick = () => {
      const o = r.classList.contains("open");
      document.querySelectorAll(".srv-row").forEach((x) => x.classList.remove("open"));
      if (!o) r.classList.add("open");
    };
    r.addEventListener("mouseenter", (e) => {
      hoveredRow = r;
      syncPreviewHeight();
      peek.style.left = `${e.clientX}px`;
      peekImg.src = r.dataset.peek;
      peek.classList.add("on");
    });
    r.addEventListener("mouseleave", () => {
      hoveredRow = null;
      peek.classList.remove("on");
    });
  });
  W.on("mousemove", (e) => {
    if (hoveredRow) peek.style.left = e.clientX + "px";
  });
}
