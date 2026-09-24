"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import Monogram from "./Monogram";
import type { NavItem, SiteInfo } from "@/content/types";

interface Props {
  nav: NavItem[];
  services: string[];
  site: Pick<SiteInfo, "email" | "phone" | "wordmark">;
}

const ARROW = (
  <svg className="ar" viewBox="0 0 24 24">
    <path d="M3 12h17M14 5l7 7-7 7" />
  </svg>
);

/**
 * Everything that persists across pages: preloader, cursor, scroll progress, header
 * (monogram + "WE DO" rotator), the rolling-wheel menu and back-to-top.
 * Lives in the (site) layout, so it is mounted once and survives client navigation.
 */
export default function SiteChrome({ nav, services, site }: Props) {
  const pathname = usePathname();
  const api = useRef<{ route: () => void; close: () => void; setActive: (i: number) => void } | null>(null);
  const first = useRef(true);
  const activeIndex = Math.max(
    0,
    nav.findIndex((n) => n.href === pathname || (n.href !== "/" && pathname.startsWith(n.href))),
  );

  // ---- one-time wiring (ported from the static build) ----
  useEffect(() => {
    const body = document.body;
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const offs: Array<() => void> = [];
    const on = (t: EventTarget, type: string, fn: EventListener, o?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, o);
      offs.push(() => t.removeEventListener(type, fn, o));
    };

    /* preloader: let the monogram assemble, then lift */
    const loader = document.getElementById("loader")!;
    timers.push(
      window.setTimeout(
        () => {
          loader.classList.add("done");
          body.classList.add("ready");
        },
        rm ? 100 : window.location.pathname === "/" ? 2100 : 1600,
      ),
    );

    /* cursor (delegated hover so it works for every page) */
    const cur = document.getElementById("cursor")!;
    const dot = document.getElementById("cursor-dot")!;
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0,
      raf = 0;
    on(window, "mousemove", ((e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx - 2}px,${ty - 2}px)`;
    }) as EventListener);
    const loop = () => {
      cx += (tx - cx) * 0.16;
      cy += (ty - cy) * 0.16;
      cur.style.transform = `translate(${cx - 16}px,${cy - 16}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const HOT = "a,button,[data-m]";
    on(document, "mouseover", ((e: MouseEvent) => {
      if ((e.target as Element).closest?.(HOT)) cur.classList.add("grow");
    }) as EventListener);
    on(document, "mouseout", ((e: MouseEvent) => {
      const from = (e.target as Element).closest?.(HOT);
      const to = (e.relatedTarget as Element | null)?.closest?.(HOT);
      if (from && from !== to) cur.classList.remove("grow");
    }) as EventListener);

    /* WE DO — rotating services in the header */
    const ul = document.getElementById("rot")!;
    const n = ul.children.length - 1;
    let ri = 0;
    timers.push(
      window.setInterval(() => {
        ri++;
        ul.style.transition = "transform .8s cubic-bezier(.16,1,.3,1)";
        ul.style.transform = `translateY(-${ri * 1.3}em)`;
        if (ri === n) {
          window.setTimeout(() => {
            ul.style.transition = "none";
            ul.style.transform = "translateY(0)";
            ri = 0;
          }, 850);
        }
      }, 2200),
    );

    /* MENU: rolling wheel with live preview */
    const menu = document.getElementById("menu")!;
    const burger = document.getElementById("burger")!;
    const hdr = document.getElementById("hdr")!;
    const wheel = document.getElementById("wheel")!;
    const items = [...wheel.querySelectorAll<HTMLAnchorElement>("a")];
    const MN = items.length;
    const pimgs = [...document.querySelectorAll<HTMLImageElement>("#mprev img")];
    let mi = 0,
      userTook = false,
      wheelTimer = 0;
    function place() {
      items.forEach((a, k) => {
        let d = (((k - mi) % MN) + MN) % MN;
        if (d > MN / 2) d -= MN;
        const pd = a.dataset.d === undefined ? d : +a.dataset.d;
        if (Math.abs(d - pd) > 1) {
          a.classList.add("jump");
          requestAnimationFrame(() => requestAnimationFrame(() => a.classList.remove("jump")));
        }
        a.dataset.d = String(d);
        a.style.transform = `translateY(calc(-50% + ${d * 1.3}em))`;
        a.style.opacity = String(d === 0 ? 1 : Math.abs(d) === 1 ? 0.3 : Math.abs(d) === 2 ? 0.1 : 0);
        a.style.pointerEvents = Math.abs(d) <= 2 ? "auto" : "none";
        a.classList.toggle("on", d === 0);
      });
      pimgs.forEach((im, k) => im.classList.toggle("on", k === mi));
    }
    const stopAuto = () => {
      userTook = true;
      clearInterval(wheelTimer);
    };
    function openMenu(o: boolean) {
      menu.classList.toggle("open", o);
      burger.classList.toggle("open", o);
      body.classList.toggle("is-locked", o);
      body.classList.toggle("menu-on", o);
      hdr.classList.toggle("menu-open", o);
      const lbl = burger.querySelector("span");
      if (lbl) lbl.textContent = o ? "Close" : "Menu";
      menu.setAttribute("aria-hidden", String(!o));
      clearInterval(wheelTimer);
      if (o) {
        userTook = false;
        place();
        wheelTimer = window.setInterval(() => {
          if (!userTook) {
            mi = (mi + 1) % MN;
            place();
          }
        }, 1900);
      }
    }
    burger.onclick = () => openMenu(!menu.classList.contains("open"));
    items.forEach((a, k) => {
      a.addEventListener("mouseenter", () => {
        stopAuto();
        if (mi !== k) {
          mi = k;
          place();
        }
      });
      a.addEventListener("click", () => openMenu(false));
    });
    let wl = 0;
    on(
      wheel,
      "wheel",
      ((e: WheelEvent) => {
        e.preventDefault();
        stopAuto();
        const now = Date.now();
        if (now - wl < 420) return;
        wl = now;
        mi = (mi + (e.deltaY > 0 ? 1 : -1) + MN) % MN;
        place();
      }) as EventListener,
      { passive: false },
    );
    on(window, "keydown", ((e: KeyboardEvent) => {
      if (!menu.classList.contains("open")) return;
      if (e.key === "Escape") openMenu(false);
      if (e.key === "ArrowDown") {
        stopAuto();
        mi = (mi + 1) % MN;
        place();
      }
      if (e.key === "ArrowUp") {
        stopAuto();
        mi = (mi - 1 + MN) % MN;
        place();
      }
      if (e.key === "Enter") items[mi].click();
    }) as EventListener);
    place();

    /* header state / progress / banner parallax / back-to-top — unified for all pages:
       transparent + white over the first image (hero or page banner) and over the end zone,
       solid white glass everywhere in between. */
    const prog = document.getElementById("progress")!;
    const topBtn = document.getElementById("top")!;
    let last = 0;
    function onScroll() {
      const y = scrollY;
      const h = document.body.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
      const lead = document.querySelector<HTMLElement>(".hero, .pg-banner");
      const endz = document.querySelector<HTMLElement>(".endzone");
      const overImage = (!!lead && y < lead.offsetHeight - 80) || (!!endz && y + 80 > endz.offsetTop);
      hdr.classList.toggle("solid", !overImage);
      hdr.classList.toggle("hide", y > last && y > innerHeight * 1.2 && !menu.classList.contains("open"));
      topBtn.classList.toggle("on", y > innerHeight * 1.5);
      last = y;
      const bi = lead?.classList.contains("pg-banner") ? lead.querySelector<HTMLElement>(".bimg") : null;
      if (bi && y < lead!.offsetHeight) bi.style.transform = `translate3d(0,${y * 0.28}px,0)`;
    }
    on(window, "scroll", onScroll as EventListener, { passive: true });
    on(window, "resize", onScroll as EventListener);
    onScroll();
    topBtn.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

    api.current = {
      route: () => requestAnimationFrame(onScroll),
      close: () => menu.classList.contains("open") && openMenu(false),
      setActive: (i: number) => {
        mi = i;
        place();
      },
    };
    api.current.setActive(activeIndex);

    return () => {
      timers.forEach((t) => {
        clearTimeout(t);
        clearInterval(t);
      });
      clearInterval(wheelTimer);
      cancelAnimationFrame(raf);
      offs.forEach((f) => f());
      api.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- every client-side navigation: replay the entrance, reset header ----
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const body = document.body;
    api.current?.close();
    api.current?.setActive(activeIndex);
    document.getElementById("hdr")?.classList.remove("hide");
    body.classList.remove("ready");
    void body.offsetWidth;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("ready")));
    api.current?.route();
    return () => cancelAnimationFrame(id);
  }, [pathname, activeIndex]);

  const rot = [...services, services[0]];

  return (
    <>
      <div id="loader">
        <div>
          <Monogram />
          <div className="load-word">{site.wordmark}</div>
        </div>
      </div>
      <div id="cursor" />
      <div id="cursor-dot" />
      <div id="progress" />

      <header id="hdr">
        <div className="wrap nav">
          <Link href="/" className="brand" data-m="" aria-label="Rippotai home">
            <Monogram />
            <span className="wedo">
              <small>We do</small>
              <span className="rot">
                <ul id="rot">
                  {rot.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </span>
            </span>
          </Link>
          <div className="nav-r">
            <Link className="lnk" href="/projects" data-m="">
              Projects
            </Link>
            <Link className="lnk" href="/contact" data-m="">
              Contact
            </Link>
            <button className="burger" id="burger" aria-label="Menu">
              <span>Menu</span>
              <i>
                <b />
                <b />
              </i>
            </button>
          </div>
        </div>
      </header>

      <div id="menu" aria-hidden="true">
        <div className="menu-grid wrap">
          <nav className="wheel" id="wheel">
            {nav.map((item, k) => (
              <Link key={item.href} href={item.href} data-k={k}>
                <i className="n">{String(k + 1).padStart(2, "0")}</i>
                <span className="t">{item.label}</span>
                {ARROW}
              </Link>
            ))}
          </nav>
          <div className="menu-right">
            <figure className="mprev" id="mprev">
              {nav.map((item, k) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={item.href} src={item.preview} alt="" className={k === 0 ? "on" : undefined} />
              ))}
            </figure>
            <div className="menu-info">
              <div>
                <small>Studio</small>Peeragarhi, New Delhi
              </div>
              <div>
                <small>Write</small>
                {site.email}
              </div>
              <div>
                <small>Call</small>
                {site.phone}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button id="top" aria-label="Back to top">
        ↑
      </button>
    </>
  );
}
