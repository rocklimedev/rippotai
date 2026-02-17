// components/admin/Navbar.jsx
"use client";

export default function Navbar() {
  return (
    <div style={styles.navbar}>
      <div>
        <div style={styles.label}>ADMIN PANEL</div>
        <div style={styles.title}>Control Dashboard</div>
      </div>

      <div style={styles.user}>Admin</div>
    </div>
  );
}

const styles = {
  navbar: {
    height: 90,
    background: "#ffffff",
    borderBottom: "1px solid rgba(26,60,52,0.08)",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  label: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 11,
    letterSpacing: 3,
    color: "#d9af61",
  },

  title: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 22,
    fontWeight: 300,
    color: "#1a3c34",
  },

  user: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    color: "#1a3c34",
  },
};
