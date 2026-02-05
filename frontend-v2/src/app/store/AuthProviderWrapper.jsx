// app/store/AuthProviderWrapper.jsx   (or wherever you prefer)

"use client";

import { AuthProvider } from "@/app/store/AuthContext";

export default function AuthProviderWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
