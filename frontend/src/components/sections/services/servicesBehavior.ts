// @ts-nocheck
/* services page behaviour
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

  /* scrollytelling: each service gets one screen — draw first, then the built photo wipes in */
  (function () {
    const sec = document.getElementById("svs"),
      steps = [...document.querySelectorAll(".sv-step")],
      boards = [...document.querySelectorAll(".board")],
      rail = [...document.querySelectorAll("#rail button")],
      svn = document.getElementById("svn"),
      N = steps.length;
    let cur = -1;
    function f() {
      if (innerWidth <= 900) return;
      const span = sec.offsetHeight - innerHeight,
        p = Math.max(0, Math.min(0.9999, (scrollY - sec.offsetTop) / span));
      const x = p * N,
        i = Math.floor(x),
        local = x - i;
      if (i !== cur) {
        cur = i;
        steps.forEach((s, k) => {
          s.classList.toggle("on", k === i);
          s.classList.toggle("past", k < i);
        });
        boards.forEach((b, k) => {
          b.classList.toggle("on", k === i);
          if (k !== i) b.classList.remove("built");
        });
        rail.forEach((r, k) => r.classList.toggle("on", k <= i));
        svn.textContent = String(i + 1).padStart(2, "0");
      }
      boards[i].classList.toggle("built", local > 0.5);
    }
    function jump(i) {
      const span = sec.offsetHeight - innerHeight;
      scrollTo({ top: sec.offsetTop + span * ((i + 0.3) / N), behavior: "smooth" });
    }
    rail.forEach((r, k) => (r.onclick = () => jump(k)));
    document.querySelectorAll(".sv-idx li").forEach((li) => (li.onclick = () => jump(+li.dataset.i)));
    W.on("scroll", f, { passive: true });
    W.on("resize", f);
    f();
  })();

  /* scope builder -> contact page with services pre-ticked */
  (function () {
    const picks = [...document.querySelectorAll(".pick")],
      txt = document.getElementById("scopeTxt"),
      go = document.getElementById("go");
    function upd() {
      const s = picks.filter((p) => p.classList.contains("on")).map((p) => p.dataset.s);
      if (!s.length) {
        txt.textContent = "Nothing picked yet — tap the services you’re interested in.";
        go.classList.add("off");
        go.href = "/contact";
        return;
      }
      const list =
        s.length === 1
          ? `<b>${s[0]}</b>`
          : s
              .slice(0, -1)
              .map((x) => `<b>${x}</b>`)
              .join(", ") + ` and <b>${s[s.length - 1]}</b>`;
      txt.innerHTML = `You’d work with us on ${list}. <em>${s.length} of 8.</em>`;
      go.classList.remove("off");
      go.href = "/contact?svc=" + encodeURIComponent(s.join("|"));
    }
    picks.forEach(
      (p) =>
        (p.onclick = () => {
          p.classList.toggle("on");
          upd();
        }),
    );
    upd();
  })();

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (ev) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      ev.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY, behavior: "smooth" });
    }),
  );
}
