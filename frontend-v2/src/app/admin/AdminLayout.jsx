// components/admin/AdminLayout.jsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { Navbar } from '@/components/admin/Navbar';
export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  useEffect(() => {
    // Skip auth check for non-admin routes
    if (!pathname.startsWith('/admin')) {
      setIsAuthorized(true);
      setIsCheckingAuth(false);
      return;
    }

    const token = localStorage.getItem('adminToken');

    if (!token) {
      // Redirect to login and preserve the current path
      const redirectPath = encodeURIComponent(
        pathname + window.location.search,
      );
      router.replace(`/login?redirect=${redirectPath}`);
    } else {
      // Token exists → assume authorized (you can add optional verification later)
      setIsAuthorized(true);
      setIsCheckingAuth(false);
    }
  }, [pathname, router]);

  // Show full-screen loading while checking
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // If not authorized → don't render anything (redirect already happened)
  if (!isAuthorized) return null;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        isDesktop={isDesktop}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          showMenu={!isDesktop} // 👈 show only on mobile/tablet
          onToggleSidebar={() => setSidebarOpen(true)}
        />

        <main
          className="flex-1 overflow-y-auto p-6 md:p-10 lg:p-12"
          style={{ background: '#f5f1eb' }}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
