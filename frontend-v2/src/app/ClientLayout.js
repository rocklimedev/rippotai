// app/ClientLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import CTA from "@/components/Home/CTA";
export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/403", "/500", "/admin"];

  const isNoLayoutPage = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <>
      {!isNoLayoutPage && <Header />}
      <main>{children}</main>
      {!isNoLayoutPage && <CTA />}
      {!isNoLayoutPage && <Footer />}
    </>
  );
}
