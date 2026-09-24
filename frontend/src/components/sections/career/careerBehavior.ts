// @ts-nocheck
/* career page behaviour
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

  /* values panels: hover/focus expands; auto-advance until touched */
  (function () {
    const ps = [...document.querySelectorAll(".vp")];
    let i = 0,
      t,
      touched = false;
    const set = (k) => {
      i = k;
      ps.forEach((p, j) => p.classList.toggle("on", j === k));
    };
    ps.forEach((p, k) => {
      p.addEventListener("mouseenter", () => {
        touched = true;
        set(k);
      });
      p.addEventListener("focus", () => set(k));
      p.addEventListener("click", () => {
        touched = true;
        set(k);
      });
    });
    t = W.every(() => {
      if (!touched) set((i + 1) % ps.length);
    }, 3600);
  })();

  /* wizard */
  (function () {
    const f = document.getElementById("wz"),
      panes = [...f.querySelectorAll(".pane")],
      steps = [...document.querySelectorAll("#wzs li")],
      bar = document.getElementById("wzb");
    const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    let cur = 0;
    function show(n) {
      const back = n < cur;
      cur = n;
      panes.forEach((p, k) => {
        p.classList.toggle("on", k === n);
        p.classList.toggle("back", back);
      });
      steps.forEach((s, k) => {
        s.classList.toggle("on", k === Math.min(n, 2));
        s.classList.toggle("done", k < n);
      });
      bar.style.width = (Math.min(n + 1, 3) / 3) * 100 + "%";
      if (n === 2) summ();
    }
    function valid0() {
      let ok = true;
      [
        ["name", (v) => !!v.trim()],
        ["email", (v) => emailOK(v.trim())],
      ].forEach(([k, fn]) => {
        const el = f.elements[k];
        const good = fn(el.value);
        el.parentElement.classList.toggle("bad", !good);
        if (!good) {
          ok = false;
          el.parentElement.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-8px)" },
              { transform: "translateX(8px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 360 },
          );
        }
      });
      if (!ok) (f.elements.name.value.trim() ? f.elements.email : f.elements.name).focus();
      return ok;
    }
    function summ() {
      const E = f.elements;
      document.getElementById("sum").innerHTML =
        `<b>${E.name.value.trim()}</b>${E.designation.value.trim() ? ", " + E.designation.value.trim() : ""} · applying for <b>${E.interest.value}</b><br>${E.email.value.trim()}${E.phone.value.trim() ? " · " + E.phone.value.trim() : ""}`;
    }
    f.querySelectorAll("[data-go]").forEach((b) =>
      b.addEventListener("click", () => {
        const n = +b.dataset.go;
        if (cur === 0 && n === 1 && !valid0()) return;
        show(n);
      }),
    );
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!valid0()) {
        show(0);
        return;
      }
      const E = f.elements;
      const body = [
        `Hi, I'm ${E.name.value.trim()}${E.designation.value.trim() ? ", currently a " + E.designation.value.trim() : ""}, and I'd love to join Rippotai in ${E.interest.value}.`,
        E.note.value.trim() ? "\n" + E.note.value.trim() : "",
        `\nEmail: ${E.email.value.trim()}`,
        E.phone.value.trim() ? `Phone: ${E.phone.value.trim()}` : "",
        "\n[Portfolio / resume attached]",
      ]
        .filter(Boolean)
        .join("\n");
      location.href =
        "mailto:sagar@rippotai.in?subject=" +
        encodeURIComponent("Career application — " + E.name.value.trim() + " (" + E.interest.value + ")") +
        "&body=" +
        encodeURIComponent(body);
      document.getElementById("thx").textContent = E.name.value.trim().split(" ")[0];
      show(3);
    });
    /* file drop */
    const drop = document.getElementById("drop"),
      cv = document.getElementById("cv"),
      cvn = document.getElementById("cvn");
    const setF = (fl) => {
      cvn.textContent = fl
        ? fl.name + " — attach this in the email that opens"
        : "Drop your portfolio / resume here, or click to choose";
    };
    cv.addEventListener("change", () => setF(cv.files[0]));
    ["dragenter", "dragover"].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.add("over");
      }),
    );
    ["dragleave", "drop"].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.remove("over");
      }),
    );
    drop.addEventListener("drop", (e) => setF(e.dataTransfer.files[0]));
    /* department rows pre-select role and jump to the form */
    document.querySelectorAll(".dept").forEach((d) =>
      d.addEventListener("click", () => {
        const r = f.querySelector(`input[name=interest][value="${d.dataset.d}"]`);
        if (r) r.checked = true;
        scrollTo({ top: document.getElementById("apply").offsetTop - 40, behavior: "smooth" });
        W.after(() => f.elements.name.focus({ preventScroll: true }), 900);
      }),
    );
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
