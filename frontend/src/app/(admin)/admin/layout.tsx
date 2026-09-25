import type { ReactNode } from "react";

import AdminShell from "@/components/admin/AdminShell";
import StoreProvider from "@/store/StoreProvider";
import { AuthProvider } from "@/store/AuthContext";

import "@/styles/admin.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <AdminShell>{children}</AdminShell>
      </AuthProvider>
    </StoreProvider>
  );
}
