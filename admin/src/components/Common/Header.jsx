import React from "react";

const Header = () => {
  return (
    <header class="header">
      <div class="xl:py-4">
        <div class="flex items-center justify-between gap-4 flex-nowrap w-full">
          <div class="flex items-center gap-3 shrink-0">
            <button
              class="btn-icon customXl:hidden! opacity-100! flex! pointer-events-auto!"
              id="mobile-menu-toggle"
            >
              <i
                data-lucide="menu"
                class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              ></i>
            </button>
            <div class="hidden sm:flex flex-col leading-tight">
              <h2
                class="text-lg sm:text-xl md:text-2xl font-bold text-text truncate max-w-[120px] sm:max-w-40 capitalize"
                id="dynamicHeader"
              ></h2>
              <p class="text-xs sm:text-sm text-muted truncate max-w-[120px] sm:max-w-40]">
                Monitor finances
              </p>
            </div>
          </div>
          <div class="flex items-center gap-3 flex-nowrap ml-auto">
            <div class="relative hidden md:block">
              <input
                placeholder="Search..."
                class="w-64 pl-10 pr-4 py-3.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div class="absolute left-3 top-3.5 text-gray-400">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="relative">
              <input type="checkbox" id="notif-toggle" class="hidden peer" />
              <label
                for="notif-toggle"
                class="btn-icon relative shrink-0 hover:text-rose-500"
                id="notifications-btn"
              >
                <i
                  data-lucide="bell"
                  class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                ></i>
                <span class="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </label>
              <div class="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 mt-2 sm:w-80 bg-panel rounded-lg shadow-lg border border-border opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-200 z-50">
                <div class="p-3 sm:p-4 border-b border-border">
                  <h3 class="text-base sm:text-lg font-semibold text-muted">
                    Notifications
                  </h3>
                </div>
                <ul class="max-h-72 sm:max-h-96 overflow-y-auto">
                  <li class="p-3 sm:p-4 hover:bg-gray-50 border-b border-border flex items-start space-x-3 group">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-text group-hover:text-muted truncate">
                        New payment received
                      </p>
                      <p class="text-xs text-muted truncate">
                        +$1,250 from Acme Corp
                      </p>
                      <p class="text-xs text-gray-400 mt-1">2 minutes ago</p>
                    </div>
                  </li>
                  <li class="p-3 sm:p-4 hover:bg-gray-50 border-b border-border flex items-start space-x-3 group">
                    <div class="w-2 h-2 bg-green-500 rounded-full mt-2 shrink-0"></div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-text group-hover:text-muted truncate">
                        Invoice #1234 paid
                      </p>
                      <p class="text-xs text-muted truncate">
                        Client: Jane Doe
                      </p>
                      <p class="text-xs text-gray-400 mt-1">1 hour ago</p>
                    </div>
                  </li>
                  <li class="p-3 sm:p-4 hover:bg-gray-50 flex items-start space-x-3 group border-b border-border">
                    <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2 shrink-0"></div>
                    <div class="min-w-0">
                      <p class="text-sm font-medium text-text group-hover:text-muted truncate">
                        Low balance alert
                      </p>
                      <p class="text-xs text-muted truncate">
                        Account balance is below $500
                      </p>
                      <p class="text-xs text-gray-400 mt-1">3 hours ago</p>
                    </div>
                  </li>
                </ul>
                <div class="p-3 text-center">
                  <a href="#" class="text-sm text-blue-600 hover:underline">
                    View all notifications
                  </a>
                </div>
              </div>
            </div>
            <button class="btn-icon shrink-0" id="theme-toggle"></button>
            <div class="relative">
              <input type="checkbox" id="profile-toggle" class="hidden peer" />
              <label
                for="profile-toggle"
                class="flex items-center gap-2 rounded-xl sm:rounded-2xl bg-panel border border-border hover:border-primary transition-all"
                id="user-menu-btn"
              >
                <span class="profile-icon rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src="assets/images/author1.jpg"
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                </span>
              </label>
              <div class="absolute right-0 mt-2 w-56 bg-bg rounded-lg shadow-lg border border-border opacity-0 invisible peer-checked:opacity-100 peer-checked:visible transition-all duration-200 z-50">
                <div class="p-4 border-b border-border">
                  <p class="font-medium text-text">Rachel Green</p>
                  <p class="text-sm text-muted">rachel@example.com</p>
                </div>
                <ul class="py-2">
                  <li>
                    <a
                      href="setting.html"
                      class="block px-4 py-2 text-sm text-muted hover:bg-panel"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="billings.html"
                      class="block px-4 py-2 text-sm text-muted hover:bg-panel"
                    >
                      Billing
                    </a>
                  </li>
                  <li>
                    <hr class="my-1 border-border" />
                  </li>
                  <li>
                    <a
                      href="loginpage.html"
                      class="block px-4 py-2 text-sm text-muted hover:bg-panel"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
