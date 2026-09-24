// @ts-nocheck
/* contact page behaviour
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
      if (r.top < innerHeight * 0.92 && r.bottom > 0) {
        el.classList.add("in");
        return false;
      }
      return true;
    });
  }
  W.on("scroll", revealCheck, { passive: true });
  W.every(revealCheck, 500);
  revealCheck();

  /* live studio clock (IST) */
  const clk = document.getElementById("clk"),
    clkd = document.getElementById("clkd");
  function tick() {
    const d = new Date(),
      f = (o) => new Intl.DateTimeFormat("en-GB", Object.assign({ timeZone: "Asia/Kolkata" }, o)).format(d);
    const [h, m] = f({ hour: "2-digit", minute: "2-digit", hour12: false }).split(":");
    clk.innerHTML = `${h}<i>:</i>${m}`;
    clkd.textContent = f({ weekday: "long", day: "numeric", month: "long" });
  }
  tick();
  W.every(tick, 15000);

  /* auto-growing inline inputs */
  function grow(i) {
    const s = document.createElement("span");
    const cs = getComputedStyle(i);
    s.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font};letter-spacing:${cs.letterSpacing}`;
    s.textContent = i.value || i.placeholder;
    document.body.appendChild(s);
    i.style.width = s.offsetWidth + 8 + "px";
    s.remove();
  }
  function growSel(sel) {
    const s = document.createElement("span");
    const cs = getComputedStyle(sel);
    s.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:${cs.font}`;
    s.textContent = sel.options[sel.selectedIndex].text;
    document.body.appendChild(s);
    sel.style.width = s.offsetWidth + parseFloat(cs.fontSize) * 1.35 + 6 + "px";
    s.remove();
  }
  const ta = document.querySelectorAll("textarea");
  ta.forEach((t) =>
    t.addEventListener("input", () => {
      t.style.height = "auto";
      t.style.height = t.scrollHeight + "px";
    }),
  );

  /* validation + progress */
  const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  function wire(form, progId) {
    const inputs = [...form.querySelectorAll("input[data-auto]")],
      sels = [...form.querySelectorAll("select")];
    inputs.forEach((i) => {
      grow(i);
      i.addEventListener("input", () => {
        grow(i);
        check();
      });
    });
    sels.forEach((s) => {
      growSel(s);
      s.addEventListener("change", () => growSel(s));
    });
    const prog = document.getElementById(progId);
    function check() {
      const n = form.elements.name.value.trim(),
        e = form.elements.email.value.trim();
      form.elements.name.parentElement.classList.toggle("ok", !!n);
      form.elements.email.parentElement.classList.toggle("ok", emailOK(e));
      const c = (n ? 1 : 0) + (emailOK(e) ? 1 : 0);
      prog.innerHTML =
        c === 2
          ? "<b>All set.</b> Hit send when you're ready."
          : `<b>${c} of 2</b> required details filled — name and email.`;
      return c === 2;
    }
    form.check = check;
    check();
  }
  const fMain = document.getElementById("fMain"),
    fCareer = document.getElementById("fCareer"),
    done = document.getElementById("done");
  document.fonts &&
    document.fonts.ready.then(() => {
      wire(fMain, "prog");
      wire(fCareer, "prog2");
    });
  if (!document.fonts) {
    wire(fMain, "prog");
    wire(fCareer, "prog2");
  }

  /* intent chips */
  const VERB = { project: "start a project", consult: "book a design consultation for", hello: "say hello about" };
  let mode = "project";
  document.getElementById("chips").onclick = (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("on", c === b));
    mode = b.dataset.p;
    done.classList.remove("on");
    fMain.classList.toggle("on", mode !== "career");
    fCareer.classList.toggle("on", mode === "career");
    if (mode !== "career") {
      document.getElementById("verb").textContent = VERB[mode];
      document.getElementById("svcBox").style.display = mode === "hello" ? "none" : "";
    }
  };

  if (location.hash === "#career") {
    const c = document.querySelector(".chip[data-p=career]");
    c && c.click();
    W.after(() => scrollTo({ top: document.getElementById("talk").offsetTop - 80 }), 300);
  }
  (function () {
    const q = new URLSearchParams(location.search).get("svc");
    if (!q) return;
    const want = q.split("|");
    document.querySelectorAll("#svcBox input").forEach((i) => {
      if (want.includes(i.value)) i.checked = true;
    });
    W.after(() => scrollTo({ top: document.getElementById("talk").offsetTop - 80, behavior: "smooth" }), 900);
  })();
  /* submit -> mailto */
  function shake(el) {
    el.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(0)" },
      ],
      { duration: 380 },
    );
  }
  function submitTo(form, subject, lines) {
    if (!form.check()) {
      ["name", "email"].forEach((k) => {
        const f = form.elements[k];
        const ok = k === "email" ? emailOK(f.value.trim()) : !!f.value.trim();
        f.parentElement.classList.toggle("bad", !ok);
        if (!ok) shake(f.parentElement);
      });
      (form.elements.name.value.trim() ? form.elements.email : form.elements.name).focus();
      return;
    }
    const body = lines.filter(Boolean).join("\n");
    location.href =
      "mailto:sagar@rippotai.in?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    form.classList.remove("on");
    done.classList.add("on");
    done.querySelectorAll(".mono *").forEach((p) => {
      p.style.animation = "none";
      void p.offsetWidth;
      p.style.animation = "";
    });
    scrollTo({ top: document.getElementById("talk").offsetTop - 80, behavior: "smooth" });
  }
  fMain.addEventListener("submit", (e) => {
    e.preventDefault();
    const E = fMain.elements;
    const svc = [...fMain.querySelectorAll("input[name=svc]:checked")].map((i) => i.value);
    const subj =
      (mode === "consult" ? "Consultation request" : mode === "hello" ? "Hello" : "New project") +
      " — " +
      E.name.value.trim();
    submitTo(fMain, subj, [
      `Hi Rippotai, my name is ${E.name.value.trim()}, and I'd like to ${VERB[mode]} a ${E.kind.value}${E.where.value.trim() ? " in " + E.where.value.trim() : ""}.`,
      svc.length && mode !== "hello" ? "\nInterested in: " + svc.join(", ") : "",
      E.message.value.trim() ? "\n" + E.message.value.trim() : "",
      `\nEmail: ${E.email.value.trim()}`,
      E.phone.value.trim() ? `Phone: ${E.phone.value.trim()}` : "",
    ]);
  });
  fCareer.addEventListener("submit", (e) => {
    e.preventDefault();
    const E = fCareer.elements;
    submitTo(fCareer, "Career application — " + E.name.value.trim() + " (" + E.interest.value + ")", [
      `Hi, I'm ${E.name.value.trim()}${E.designation.value.trim() ? ", currently a " + E.designation.value.trim() : ""}, and I'd love to join Rippotai in ${E.interest.value}.`,
      `\nEmail: ${E.email.value.trim()}`,
      E.phone.value.trim() ? `Phone: ${E.phone.value.trim()}` : "",
      "\n[Portfolio / resume attached]",
    ]);
    document.getElementById("doneTxt").textContent =
      "Your email app should have opened with your application filled in — attach your portfolio and press send.";
  });
  document.getElementById("cv").addEventListener("change", (e) => {
    const f = e.target.files[0];
    document.getElementById("cvn").textContent = f
      ? f.name + " — attach this in the email"
      : "Choose portfolio / resume (PDF, ZIP)";
  });
  document.getElementById("again").onclick = () => {
    done.classList.remove("on");
    (mode === "career" ? fCareer : fMain).classList.add("on");
  };

  /* copy email */
  const cm = document.getElementById("copyMail");
  cm.onclick = () => {
    const t = "sagar@rippotai.in";
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject())
      .catch(() => {
        const x = document.createElement("textarea");
        x.value = t;
        document.body.appendChild(x);
        x.select();
        document.execCommand("copy");
        x.remove();
      })
      .finally(() => {
        cm.classList.add("copied");
        W.after(() => cm.classList.remove("copied"), 1800);
      });
  };

  /* magnetic send buttons */
  document.querySelectorAll(".send").forEach((b) => {
    b.addEventListener("mousemove", (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
    });
    b.addEventListener("mouseleave", () => (b.style.transform = ""));
  });

  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener("click", (ev) => {
      const t = document.querySelector(a.getAttribute("href"));
      if (!t) return;
      ev.preventDefault();
      scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" });
    }),
  );
}
