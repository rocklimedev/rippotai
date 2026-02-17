// app/ClientLayout.tsx
"use client";
import { useEffect } from "react";

import { usePathname } from "next/navigation";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { InteractiveGrid } from "@/components/InteractiveGrid";
function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/403", "/500", "/admin"];

  const isNoLayoutPage = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Header />
      <InteractiveGrid cellSize={60} />
      <ScrollToTop />
      <main>{children}</main>
      <Footer />
      <FloatingCTA />

      <Toaster position="top-right" />
    </div>
  );
}
