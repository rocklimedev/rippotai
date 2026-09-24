import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";
import StoreProvider from "@/store/StoreProvider";
import "@/styles/admin.css";

/*

* Root layout for the ADMIN CONSOLE route group (/admin/*).
* Protected by src/middleware.ts (HTTP basic auth via
* ADMIN_USER / ADMIN_PASSWORD).
*
* Redux/RTK Query is provided here so all admin pages can access
* the shared API store.
  */
export const metadata: Metadata = {
  title: {
    default: "Admin · Rippotai",
    template: "%s · Rippotai Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}{" "}
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <StoreProvider>
          <AdminShell>{children}</AdminShell>
        </StoreProvider>
      </body>
    </html>
  );
}
