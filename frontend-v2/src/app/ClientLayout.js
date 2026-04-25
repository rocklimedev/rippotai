// app/ClientLayout.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FloatingCTA } from '@/components/layouts/FloatingCTA';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Toaster } from '@/components/ui/sonner';
import { InteractiveGrid } from '@/components/layouts/InteractiveGrid';
import ScrollToTop from '@/hooks/scrollToTop';
export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Routes where layout should NOT appear
  const noLayoutRoutes = ['/login', '/403', '/500', '/admin'];

  const isNoLayoutPage = noLayoutRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
      }}
    >
      <ScrollToTop />

      {/* Show ONLY on public pages */}
      {!isNoLayoutPage && <Header />}
      {!isNoLayoutPage && <InteractiveGrid cellSize={60} />}

      <main>{children}</main>

      {!isNoLayoutPage && <Footer />}
      {!isNoLayoutPage && <FloatingCTA />}

      <Toaster position="top-right" />
    </div>
  );
}
