import React from "react";

const UserList = () => {
  return (
    <div class="p-3 sm:p-5 lg:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3 sm:mb-4">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-primary/15 rounded-xl flex items-center justify-center">
              <i
                data-lucide="users"
                class="w-5 h-5 sm:w-6 sm:h-6 text-primary"
              ></i>
            </div>
            <span class="badge-modern badge-success text-xs sm:text-sm">
              +12.5%
            </span>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-text mb-1">2,847</h3>
          <p class="text-xs sm:text-sm text-muted">Total Customers</p>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-success/15 rounded-lg flex items-center justify-center">
              <i data-lucide="user-check" class="w-6 h-6 text-success"></i>
            </div>
            <span class="badge-modern badge-success">+8.2%</span>
          </div>
          <h3 class="text-3xl font-bold text-text mb-1">2,541</h3>
          <p class="text-sm text-muted">Active Customers</p>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-warning/15 rounded-lg flex items-center justify-center">
              <i data-lucide="user-plus" class="w-6 h-6 text-warning"></i>
            </div>
            <span class="badge-modern badge-warning">+15.3%</span>
          </div>
          <h3 class="text-3xl font-bold text-text mb-1">356</h3>
          <p class="text-sm text-muted">New This Month</p>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-danger/15 rounded-lg flex items-center justify-center">
              <i data-lucide="user-minus" class="w-6 h-6 text-danger"></i>
            </div>
            <span class="badge-modern badge-danger">-2.1%</span>
          </div>
          <h3 class="text-3xl font-bold text-text mb-1">306</h3>
          <p class="text-sm text-muted">Inactive Customers</p>
        </div>
      </div>
      <div class="card-elevated">
        <div class="p-4 sm:p-6 border-b border-border">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-0 md:gap-4 mb-4 sm:mb-5">
            <div
              class="tab-dropdown-mobile-customerlist sm:w-auto!"
              id="tab-dropdown-mobile-customerlist"
            >
              <button
                class="tab-dropdown-btn-customerlist py-2.5! lg:py-3.5!"
                id="tab-dropdown-btn-customerlist"
              >
                <span id="tab-dropdown-text-customerlist">All Customers</span>
                <i data-lucide="chevron-down" class="w-5 h-5"></i>
              </button>
              <div
                class="tab-dropdown-content-customerlist sm:w-[160%]"
                id="tab-dropdown-content-customerlist"
              >
                <button
                  class="tab-dropdown-item-customerlist active"
                  data-tab="all"
                >
                  <i data-lucide="users" class="w-4 h-4"></i>
                  <span>All Customers</span>
                  <span class="badge-modern badge-info ml-auto">2,847</span>
                </button>
                <button
                  class="tab-dropdown-item-customerlist"
                  data-tab="active"
                >
                  <i data-lucide="user-check" class="w-4 h-4"></i>
                  <span>Active</span>
                  <span class="badge-modern badge-success ml-auto">2,541</span>
                </button>
                <button
                  class="tab-dropdown-item-customerlist"
                  data-tab="inactive"
                >
                  <i data-lucide="user-minus" class="w-4 h-4"></i>
                  <span>Inactive</span>
                  <span class="badge-modern badge-danger ml-auto">306</span>
                </button>
                <button class="tab-dropdown-item-customerlist" data-tab="vip">
                  <i data-lucide="crown" class="w-4 h-4"></i>
                  <span>VIP</span>
                  <span class="badge-modern badge-purple ml-auto">124</span>
                </button>
              </div>
            </div>
            <div class="tab-buttons overflow-x-auto w-full sm:w-auto scrollbar-hide">
              <button
                class="tab-btn active text-xs sm:text-sm whitespace-nowrap"
                data-tab="all"
              >
                <i data-lucide="users" class="w-3 h-3 sm:w-4 sm:h-4"></i>
                <span class="hidden sm:inline">All Customers</span>
                <span class="sm:hidden">All</span>
                <span class="badge-modern badge-info text-xs ml-1">2,847</span>
              </button>
              <button
                class="tab-btn text-xs sm:text-sm whitespace-nowrap"
                data-tab="active"
              >
                <i data-lucide="user-check" class="w-3 h-3 sm:w-4 sm:h-4"></i>
                Active
                <span class="badge-modern badge-success text-xs ml-1">
                  2,541
                </span>
              </button>
              <button
                class="tab-btn text-xs sm:text-sm whitespace-nowrap"
                data-tab="inactive"
              >
                <i data-lucide="user-minus" class="w-3 h-3 sm:w-4 sm:h-4"></i>
                Inactive
                <span class="badge-modern badge-danger text-xs ml-1">306</span>
              </button>
              <button
                class="tab-btn text-xs sm:text-sm whitespace-nowrap"
                data-tab="vip"
              >
                <i data-lucide="crown" class="w-3 h-3 sm:w-4 sm:h-4"></i> VIP
                <span class="badge-modern badge-purple text-xs ml-1">124</span>
              </button>
            </div>
            <button
              class="btn-primary w-full sm:w-auto text-sm sm:text-base flex justify-center py-2.5! lg:py-3.5!"
              onclick="openModal('add-customer-modal')"
            >
              <i data-lucide="user-plus" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              <span class="sm:inline">Add Customer</span>
            </button>
          </div>
          <div class="flex flex-col md:flex-row items-stretch sm:items-center gap-3">
            <div class="customerlistSearchBox search-box flex-1 w-full sm:min-w-[280px]">
              <input
                placeholder="Search by name, email, ID..."
                id="customer-search"
                class="text-sm sm:text-base"
              />
            </div>
            <div class="dropdown bg-transparent! border-none! md:ml-auto md:w-auto w-full">
              <button
                class="btn-secondary w-full md:w-auto text-sm sm:text-base flex justify-center py-2.5! lg:py-3.5!"
                id="filter-btn-customerlist"
              >
                <i data-lucide="filter" class="w-4 h-4 sm:w-5 sm:h-5"></i>
                <span class="hidden sm:inline">Filters</span>
                <span class="sm:hidden">Filter</span>
                <span
                  class="badge-modern badge-info text-xs hidden"
                  id="filter-count"
                >
                  0
                </span>
              </button>
              <div class="dropdown-menu min-w-[320px]" id="filter-menu">
                <div class="filter-section">
                  <div class="filter-title">Status</div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'status', 'active')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Active</span>
                  </div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'status', 'inactive')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Inactive</span>
                  </div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'status', 'pending')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Pending</span>
                  </div>
                </div>
                <div class="filter-section">
                  <div class="filter-title">Customer Type</div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'type', 'individual')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Individual</span>
                  </div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'type', 'business')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Business</span>
                  </div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'type', 'vip')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">VIP</span>
                  </div>
                </div>
                <div class="filter-section">
                  <div class="filter-title">Verification</div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'verification', 'verified')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Verified</span>
                  </div>
                  <div
                    class="filter-option"
                    onclick="toggleFilter(this, 'verification', 'unverified')"
                  >
                    <div class="filter-checkbox checked"></div>
                    <span class="text-xs sm:text-sm">Unverified</span>
                  </div>
                </div>
                <div class="p-3 sm:p-4 flex flex-col gap-2">
                  <button
                    class="btn-secondary flex-1 justify-center py-2.5! lg:py-3.5! text-sm sm:text-base"
                    onclick="clearFilters()"
                  >
                    Clear All
                  </button>
                  <button
                    class="btn-primary flex-1 justify-center py-2.5! lg:py-3.5! text-sm sm:text-base"
                    onclick="applyFilters()"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div class="relative w-full md:w-auto">
              <button
                class="btn-secondary flex justify-center py-2.5! lg:py-3.5! w-full md:w-auto"
                id="export-btn"
              >
                <i data-lucide="download" class="w-[18px] h-[18px]"></i>
                Export
              </button>
              <div
                class="export-menu absolute left-0 md:right-0 mt-2 w-full md:w-auto xl:w-[140%] hidden xl:block"
                id="export-menu"
              >
                <div class="export-option" onclick="exportReport('csv')">
                  <i data-lucide="file-text" class="export-icon"></i>
                  <span class="export-label">Export as CSV</span>
                </div>
                <div class="export-option" onclick="exportReport('pdf')">
                  <i data-lucide="file" class="export-icon"></i>
                  <span class="export-label">Export as PDF</span>
                </div>
                <div class="export-option" onclick="exportReport('excel')">
                  <i data-lucide="file-spreadsheet" class="export-icon"></i>
                  <span class="export-label">Export as Excel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[1000px]">
            <thead class="bg-bg border-b border-border">
              <tr>
                <th class="p-4 sm:px-6 text-left w-14">
                  <div
                    class="checkbox-custom"
                    id="select-all"
                    onclick="toggleSelectAll()"
                  ></div>
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Customer
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Email
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Type
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Status
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Total Spent
                </th>
                <th class="p-4 sm:px-6 text-left text-xs font-bold uppercase text-muted">
                  Joined Date
                </th>
                <th class="p-4 sm:px-6 text-left w-14"></th>
              </tr>
            </thead>
            <tbody
              id="customers-container"
              class="divide-y divide-(--border)"
            ></tbody>
          </table>
        </div>
        <div class="p-4 sm:p-5 sm:px-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs sm:text-sm text-muted text-center sm:text-left whitespace-nowrap">
            Showing
            <span id="showing-count1" class="font-bold text-text">
              0
            </span>{" "}
            of
            <span id="total-count1" class="font-bold text-text">
              0
            </span>
            customers
          </p>
          <div class="flex flex-col md:flex-row items-center justify-between mt-6 py-6 border-t border-border gap-5">
            <p class="text-sm text-muted text-center md:text-left whitespace-nowrap">
              Showing
              <span id="showing-count2" class="font-semibold">
                10
              </span>{" "}
              of
              <span id="total-count2" class="font-semibold">
                248
              </span>
              transactions
            </p>
            <div class="flex items-center justify-center md:justify-end gap-1.5 sm:gap-2">
              <button
                id="prev-page-index"
                class="group rounded-lg border border-border bg-panel transition-all duration-200 hover:bg-bg disabled:opacity-50 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center"
                onclick="changePage('prev')"
              >
                <i
                  data-lucide="chevron-left"
                  class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 text-muted group-hover:text-gray-700 transition-colors"
                ></i>
              </button>
              <button
                id="page-1-index"
                class="page-btn-index rounded-lg border border-border bg-primary text-white font-medium transition-all duration-200 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center text-xs sm:text-sm md:text-base"
                onclick="changePage(1)"
              >
                1
              </button>
              <button
                id="page-2-index"
                class="page-btn-index rounded-lg border border-border bg-panel text-muted hover:bg-bg font-medium transition-all duration-200 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center text-xs sm:text-sm md:text-base"
                onclick="changePage(2)"
              >
                2
              </button>
              <button
                id="page-3-index"
                class="page-btn-index rounded-lg border border-border bg-panel text-muted hover:bg-bg font-medium transition-all duration-200 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center text-xs sm:text-sm md:text-base"
                onclick="changePage(3)"
              >
                3
              </button>
              <button
                id="next-page-index"
                class="group rounded-lg border border-border bg-panel transition-all duration-200 hover:bg-bg disabled:opacity-50 w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 flex items-center justify-center"
                onclick="changePage('next')"
              >
                <i
                  data-lucide="chevron-right"
                  class="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-5.5 lg:h-5.5 text-muted group-hover:text-muted transition-colors"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
