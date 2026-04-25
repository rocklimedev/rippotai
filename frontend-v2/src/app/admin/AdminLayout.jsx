'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import { Navbar } from '@/components/admin/Navbar';
import { toast } from '@/hooks/use-toast';
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
      // ✅ SHOW TOAST BEFORE REDIRECT
      toast({
        title: 'Unauthorized',
        description: 'Please login to continue.',
        variant: 'destructive',
      });

      const redirectPath = encodeURIComponent(
        pathname + window.location.search,
      );

      setTimeout(() => {
        router.replace(`/login?redirect=${redirectPath}`);
      }, 800);
    } else {
      setIsAuthorized(true);
      setIsCheckingAuth(false);
    }
  }, [pathname, router]);

  // Loading screen
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
          showMenu={!isDesktop}
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
