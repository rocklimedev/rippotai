// components/admin/Sidebar.jsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Projects", path: "/admin/projects" },
  { name: "Applications", path: "/admin/applications" },
  { name: "Jobs", path: "/admin/jobs" },
  { name: "Roles", path: "/admin/roles" },
  { name: "Users", path: "/admin/users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>RIPPOTAI</div>

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
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
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

  logo: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    letterSpacing: 4,
    marginBottom: 60,
    color: "#d9af61",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  link: {
    fontFamily: "'Lato', sans-serif",
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
};
