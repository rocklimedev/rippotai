"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User, LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = ({ onToggleSidebar, showMenu }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("refreshToken");
    setProfileOpen(false);
    router.replace("/login");
  };

  // ✅ BACK TO WEBSITE FUNCTION
  const handleBackToSite = () => {
    router.push("/"); // change if needed
    setProfileOpen(false);
  };

  return (
    <header style={styles.header}>
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {showMenu && (
          <button onClick={onToggleSidebar} style={styles.menuBtn}>
            <Menu size={22} />
          </button>
        )}
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            style={styles.profileBtn}
          >
            <div style={styles.avatar}>
              <User size={18} />
            </div>
          </button>

          {profileOpen && (
            <div style={styles.dropdown}>
              <DropdownItem
                icon={<Home size={16} />}
                text="Back to Website"
                onClick={handleBackToSite}
              />

              <DropdownItem
                icon={<LogOut size={16} />}
                text="Logout"
                danger
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon, text, danger, onClick }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        cursor: "pointer",
        fontSize: 14,
        color: danger ? "#ef4444" : "#374151",
        background: hover ? "#f9fafb" : "transparent",
        transition: "0.2s",
      }}
    >
      {icon}
      {text}
    </div>
  );
};

const styles = {
  header: {
    height: 64,
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },

  menuBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  profileBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: 48,
    width: 180,
    background: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },
};
