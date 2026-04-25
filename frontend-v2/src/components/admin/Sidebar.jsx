'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', path: '/admin/' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Applications', path: '/admin/applications' },
  { name: 'Queries', path: '/admin/queries' },
  { name: 'Users', path: '/admin/users' },
];

export default function Sidebar({ open, setOpen, isDesktop }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {!isDesktop && open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#1a3c34] text-white 
          flex flex-col z-50 transition-all duration-300
          ${!isDesktop && !open ? '-translate-x-full' : 'translate-x-0'}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white hover:bg-white/10 lg:hidden"
          >
            <X size={24} />
          </Button>
        )}

        {/* Logo */}
        <div className="px-8 pt-10 pb-12">
          <Image
            src="/assets/logo_mono.png"
            alt="Rippotai"
            width={160}
            height={60}
            className="brightness-110"
            priority
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path === '/admin/' && pathname === '/admin');

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => !isDesktop && setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium
                    transition-all duration-200 group
                    ${
                      isActive
                        ? 'bg-white/10 text-white border-l-4 border-[#d9af61]'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span
                    className={isActive ? 'text-[#d9af61]' : 'text-white/50'}
                  >
                    •
                  </span>
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer / Version Info (Optional) */}
        <div className="p-6 mt-auto border-t border-white/10">
          <p className="text-xs text-white/40 text-center">
            Rippotai Admin • v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
