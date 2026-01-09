import React from "react";

const Sidebar = () => {
  return (
    <aside
      class="sidebar fixed left-0 top-0 bottom-0 w-72 overflow-y-auto"
      id="sidebar"
    >
      <div class="p-6">
        <div class="flex justify-between items-center gap-3 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 relative overflow-hidden">
              <img
                src="assets/images/pagelogo.png"
                alt="pageLogo"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="flex flex-col">
              <a href="index.html" class="text-xl font-bold text-text">
                Fintrix
              </a>
              <p class="text-xs text-muted">Payment Dashboard</p>
            </div>
          </div>
          <div class="customXl:hidden">
            <button id="sidebarClose">
              <i data-lucide="x"></i>
            </button>
          </div>
        </div>
        <nav>
          <div class="nav-group-title">MAIN</div>
          <a href="index.html" class="nav-item sideNav-item active">
            <i data-lucide="layout-dashboard" class="w-5 h-5"></i>
            <span>Dashboard</span>{" "}
          </a>
          <a href="analytics.html" class="nav-item sideNav-item">
            <i data-lucide="bar-chart-3" class="w-5 h-5"></i>
            <span>Analytics</span>{" "}
          </a>
          <a href="transaction.html" class="nav-item sideNav-item">
            <i data-lucide="activity" class="w-5 h-5"></i>
            <span>Transactions</span>
          </a>
          <div class="nav-group-title">FINANCE</div>
          <a href="wallets.html" class="nav-item sideNav-item">
            <i data-lucide="wallet" class="w-5 h-5"></i>
            <span>Wallets</span>{" "}
          </a>
          <a href="exchange.html" class="nav-item sideNav-item">
            <i data-lucide="repeat" class="w-5 h-5"></i>
            <span>Exchange</span>{" "}
          </a>
          <a href="payments.html" class="nav-item sideNav-item">
            <i data-lucide="arrow-right-left" class="w-5 h-5"></i>
            <span>Payments</span>{" "}
          </a>
          <a href="paymentslink.html" class="nav-item sideNav-item">
            <i data-lucide="link" class="w-5 h-5"></i>
            <span>Payment Links</span>
          </a>
          <div class="nav-group-title">CUSTOMERS</div>
          <a href="customerlist.html" class="nav-item sideNav-item">
            <i data-lucide="users" class="w-5 h-5"></i>
            <span>Customer List</span>{" "}
          </a>
          <a href="newcustomer.html" class="nav-item sideNav-item">
            <i data-lucide="user-plus" class="w-5 h-5"></i>
            <span>New Customer List</span>
          </a>
          <div class="nav-group-title">ACCOUNT RECEIVABLES</div>
          <a href="invoice.html" class="nav-item sideNav-item">
            <i data-lucide="file-text" class="w-5 h-5"></i>
            <span>Invoices</span>{" "}
          </a>
          <a href="products.html" class="nav-item sideNav-item">
            <i data-lucide="package" class="w-5 h-5"></i>
            <span>Products</span>{" "}
          </a>
          <a href="billings.html" class="nav-item sideNav-item">
            <i data-lucide="receipt" class="w-5 h-5"></i>
            <span>Billings</span>
          </a>
          <div class="nav-group-title">OTHERS</div>
          <a href="connections.html" class="nav-item sideNav-item">
            <i data-lucide="globe" class="w-5 h-5"></i>
            <span>Connections</span>{" "}
          </a>
          <a href="people.html" class="nav-item sideNav-item">
            <i data-lucide="users-2" class="w-5 h-5"></i>
            <span>People</span>{" "}
          </a>
          <a href="setting.html" class="nav-item sideNav-item">
            <i data-lucide="settings" class="w-5 h-5"></i>
            <span>Settings</span>
          </a>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
