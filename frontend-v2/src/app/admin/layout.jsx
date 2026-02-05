// src/app/(admin)/layout.jsx

"use client";

import { AuthProvider } from "@/app/store/AuthContext"; // adjust the path if needed

export default function AdminLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
