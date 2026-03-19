"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", path: "/admin/" },
  { name: "Projects", path: "/admin/projects" },
  { name: "Applications", path: "/admin/applications" },
  { name: "Queries", path: "/admin/queries" },
  { name: "Users", path: "/admin/users" },
];

export default function Sidebar({ open, setOpen, isDesktop }) {
  const pathname = usePathname();

  const sidebarStyle = isDesktop
    ? {
        position: "sticky",
        top: 0,
        height: "100vh",
      }
    : {
        position: "fixed",
        left: open ? 0 : "-100%",
        top: 0,
        height: "100vh",
        zIndex: 1000,
        transition: "left 0.3s ease",
      };

  return (
    <>
      {/* Overlay for mobile */}
      {!isDesktop && open && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <aside style={{ ...styles.sidebar, ...sidebarStyle }}>
        {/* Close button on mobile */}
        {!isDesktop && (
          <button style={styles.closeBtn} onClick={() => setOpen(false)}>
            ✕
          </button>
        )}

        {/* Logo */}
        <div style={styles.logo}>
          <Image
            src="/assets/logo_mono.png"
            alt="Rippotai"
            width={160}
            height={60}
          />
        </div>

        {/* Nav */}
        <nav style={styles.nav}>
          {items.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  ...styles.link,
                  ...(active ? styles.active : {}),
                }}
                onClick={() => !isDesktop && setOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

const styles = {
  sidebar: {
    width: 260,
    background: "#1a3c34",
    color: "#fff",
    padding: "40px 28px",
    display: "flex",
    flexDirection: "column",
  },

  logo: { marginBottom: 60 },

  nav: { display: "flex", flexDirection: "column", gap: 18 },

  link: {
    fontSize: 14,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    paddingLeft: 10,
    borderLeft: "2px solid transparent",
  },

  active: {
    color: "#ffffff",
    borderLeft: "2px solid #d9af61",
  },

  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    fontSize: 24,
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 999,
  },
};
