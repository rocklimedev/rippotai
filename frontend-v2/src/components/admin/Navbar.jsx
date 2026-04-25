'use client';

import { useState, useRef, useEffect } from 'react';
import { Menu, User, LogOut, Home, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const Navbar = ({ onToggleSidebar, showMenu = true }) => {
  const router = useRouter();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('refreshToken');
    router.replace('/login');
  };

  // ✅ BACK TO WEBSITE
  const handleBackToSite = () => {
    router.push('/');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50 flex items-center px-6">
      {/* LEFT SIDE - Menu Toggle */}
      <div className="flex items-center gap-4">
        {showMenu && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu size={24} />
          </Button>
        )}

        {/* Optional: You can add logo or title here */}
        <div className="font-semibold text-xl tracking-tight text-gray-900 hidden sm:block">
          Admin Portal
        </div>
      </div>

      {/* RIGHT SIDE - Profile Dropdown */}
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-2 hover:bg-gray-100 rounded-full"
            >
              <Avatar className="h-9 w-9 border border-gray-200">
                <AvatarFallback className="bg-gray-100 text-gray-700">
                  <User size={18} />
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-900">Admin</span>
                <span className="text-xs text-gray-500 -mt-0.5">
                  Administrator
                </span>
              </div>
              <ChevronDown size={16} className="text-gray-400" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuItem
              onClick={handleBackToSite}
              className="cursor-pointer flex items-center gap-3 py-2.5"
            >
              <Home size={18} className="text-gray-500" />
              <span>Back to Website</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 py-2.5 text-red-600 focus:text-red-600"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
