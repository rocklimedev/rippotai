// app/ClientLayout.tsx
'use client';

import { usePathname } from 'next/navigation';
import { FloatingCTA } from '@/components/layouts/FloatingCTA';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/hooks/scrollToTop';

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = [
    '/login',
    '/403',
    '/500',
    '/admin',
    '/discover',
    '/discover/*',
  ];

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

      {!isNoLayoutPage && <Header />}

      <main>{children}</main>

      {!isNoLayoutPage && <Footer />}
      {!isNoLayoutPage && <FloatingCTA />}

      <Toaster position="top-right" />
    </div>
  );
}
