import type { ReactNode } from "react";

import StoreProvider from "@/store/StoreProvider";
import { AuthProvider } from "@/store/AuthContext";

import "@/styles/admin.css";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreProvider>
  );
}
