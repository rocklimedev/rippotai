import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";
import "@/styles/admin.css";

/*
 * Root layout for the ADMIN CONSOLE route group (/admin/*).
 * This is the only place (with (landing)) where Tailwind + shadcn/ui + Radix are loaded.
 * Protected by src/middleware.ts (HTTP basic auth via ADMIN_USER / ADMIN_PASSWORD).
 */
export const metadata: Metadata = {
  title: { default: "Admin · Rippotai", template: "%s · Rippotai Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
