// app/store/AuthProviderWrapper.jsx   (or wherever you prefer)

"use client";

import { AuthProvider } from "@/store/AuthContext";

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
