import React from "react";

const Applications = () => {
  return (
    <>
      <div class="p-3 sm:p-5 lg:p-6">
        <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 lg:mb-6 md:mb-5 mb-3">
          <div class="stat-card">
            <div class="flex items-center justify-between mb-4">
              <div class="gradient-success w-12 h-12 rounded-[14px] flex items-center justify-center">
                <i data-lucide="check-circle" class="w-6 h-6 text-white"></i>
              </div>
              <span class="badge-success badge-modern">+12.5%</span>
            </div>
            <h3 class="text-[32px] font-extrabold text-text mb-1">$124,580</h3>
            <p class="text-muted text-[14px]">Paid Invoices</p>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-4">
              <div class="gradient-warning w-12 h-12 rounded-[14px] flex items-center justify-center">
                <i data-lucide="clock" class="w-6 h-6 text-white"></i>
              </div>
              <span class="badge-warning badge-modern">48 pending</span>
            </div>
            <h3 class="text-[32px] font-extrabold text-text mb-1">$48,320</h3>
            <p class="text-muted text-[14px]">Pending Amount</p>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-4">
              <div class="gradient-danger w-12 h-12 rounded-[14px] flex items-center justify-center">
                <i data-lucide="alert-circle" class="w-6 h-6 text-white"></i>
              </div>
              <span class="badge-danger badge-modern">12 overdue</span>
            </div>
            <h3 class="text-[32px] font-extrabold text-text mb-1">$12,450</h3>
            <p class="text-muted text-[14px]">Overdue Amount</p>
          </div>
          <div class="stat-card">
            <div class="flex items-center justify-between mb-4">
              <div class="gradient-purple w-12 h-12 rounded-[14px] flex items-center justify-center">
                <i data-lucide="file-text" class="w-6 h-6 text-white"></i>
              </div>
              <span class="badge-purple badge-modern">8 drafts</span>
            </div>
            <h3 class="text-[32px] font-extrabold text-text mb-1">$8,750</h3>
            <p class="text-muted text-[14px]">Draft Invoices</p>
          </div>
        </div>
        <div class="card-elevated p-6 mb-6">
          <div class="flex flex-col xl:flex-col! xxl:flex-row! md:gap-4 gap-0 xl:items-center! justify-between w-full">
            <div class="tab-container md:flex! hidden! flex-wrap gap-2 xl:w-full xxl:w-auto">
              <button class="tab-btn active" data-tab="all">
                All
              </button>
              <button class="tab-btn" data-tab="paid">
                Paid
              </button>
              <button class="tab-btn" data-tab="pending">
                Pending
              </button>
              <button class="tab-btn" data-tab="overdue">
                Overdue
              </button>
              <button class="tab-btn" data-tab="draft">
                Draft
              </button>
            </div>
            <div
              class="tab-dropdown-mobile-analytics w-full xl:hidden mb-0"
              id="tab-dropdown-mobile-analytics"
            >
              <button
                class="tab-dropdown-btn-analytics py-2.5! lg:py-3.5! w-full flex justify-between items-center"
                id="tab-dropdown-btn-analytics"
              >
                <span id="tab-dropdown-text-analytics">All</span>
                <i data-lucide="chevron-down" class="w-5 h-5"></i>
              </button>
              <div
                class="tab-dropdown-content-analytics"
                id="tab-dropdown-content-analytics"
              >
                <button
                  class="tab-dropdown-item-analytics active"
                  data-tab="All"
                >
                  <i data-lucide="layout-dashboard" class="w-4 h-4"></i> All
                </button>
                <button class="tab-dropdown-item-analytics" data-tab="paid">
                  <i data-lucide="trending-up" class="w-4 h-4"></i> Paid
                </button>
                <button class="tab-dropdown-item-analytics" data-tab="pending">
                  <i data-lucide="users" class="w-4 h-4"></i> Pending
                </button>
                <button class="tab-dropdown-item-analytics" data-tab="overdue">
                  <i data-lucide="bar-chart-3" class="w-4 h-4"></i> Overdue
                </button>
                <button class="tab-dropdown-item-analytics" data-tab="draft">
                  <i data-lucide="bar-chart-3" class="w-4 h-4"></i> Draft
                </button>
              </div>
            </div>
            <div class="flex flex-col md:flex-row gap-3 md:w-full w-full xl:w-full xxl:w-auto xl:justify-end xl:items-center">
              <div class="input-group md:w-auto w-full">
                <i data-lucide="search" class="input-icon"></i>
                <input
                  class="input w-full"
                  placeholder="Search invoices..."
                  id="invoice-search"
                />
              </div>
              <div class="dropdown bg-transparent! border-none! md:w-auto w-full flex md:block justify-center">
                <button
                  class="btn-secondary w-full md:w-auto flex justify-center items-center gap-2 h-[51px]"
                  onclick="toggleDropdown('filter-dropdown')"
                >
                  <i data-lucide="filter"></i> <span>Filter</span>
                </button>
                <div class="dropdown-menu" id="filter-dropdown">
                  <div class="filter-section-invoice">
                    <div class="filter-label">Status</div>
                    <div class="checkbox-group items-start!">
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-paid"
                          class="filter-checkbox"
                          data-filter="paid"
                          checked="checked"
                        />
                        <label for="status-paid">Paid</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-pending"
                          class="filter-checkbox"
                          data-filter="pending"
                          checked="checked"
                        />
                        <label for="status-pending">Pending</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-overdue"
                          class="filter-checkbox"
                          data-filter="overdue"
                          checked="checked"
                        />
                        <label for="status-overdue">Overdue</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="status-draft"
                          class="filter-checkbox"
                          data-filter="draft"
                          checked="checked"
                        />
                        <label for="status-draft">Draft</label>
                      </div>
                    </div>
                  </div>
                  <div class="filter-section-invoice">
                    <div class="filter-label">Amount Range</div>
                    <div class="checkbox-group items-start!">
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="amount-low"
                          class="filter-checkbox"
                          data-filter="0-1000"
                          checked="checked"
                        />
                        <label for="amount-low">$0 - $1,000</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="amount-medium"
                          class="filter-checkbox"
                          data-filter="1000-5000"
                          checked="checked"
                        />
                        <label for="amount-medium">$1,000 - $5,000</label>
                      </div>
                      <div class="checkbox-item">
                        <input
                          type="checkbox"
                          id="amount-high"
                          class="filter-checkbox"
                          data-filter="5000+"
                          checked="checked"
                        />
                        <label for="amount-high">$5,000+</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative w-full md:w-auto">
                <button
                  class="btn-secondary w-full md:w-auto flex justify-center"
                  id="export-btn"
                >
                  <i data-lucide="download" class="w-4.5 h-4.5"></i> Export
                </button>
                <div
                  class="export-menu absolute left-0 md:right-0 mt-2 w-full md:w-auto xl:w-[140%] xl:block"
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
          <div class="mt-5 pt-5 border-t border-border">
            <p class="text-muted text-[14px]">
              Showing
              <span id="showing-count1" class="font-semibold text-text">
                0
              </span>
              of
              <span id="total-count1" class="font-semibold text-text">
                0
              </span>
              invoices
            </p>
          </div>
        </div>
      </div>
      <div class="card-elevated p-3 sm:p-5 md:p-6 mb-3 sm:mb-5 md:mb-6">
        <div class="w-full overflow-x-auto">
          <table class="w-full min-w-[900px]">
            <thead class="hidden md:table-header-group bg-panel border-b border-border">
              <tr class="text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                <th class="px-4 py-4">
                  <input
                    type="checkbox"
                    id="select-all"
                    class="checkbox w-5 h-5 rounded border-border cursor-pointer focus:ring-2 focus:ring-blue-500"
                  />
                </th>
                <th class="px-4 py-4">Customer</th>
                <th class="px-4 py-4">Invoice ID</th>
                <th class="px-4 py-4">Amount</th>
                <th class="px-4 py-4">Date</th>
                <th class="px-4 py-4">Status</th>
                <th class="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody
              id="invoices-container"
              class="divide-y divide-gray-100"
            ></tbody>
          </table>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between mt-6 py-6 border-t border-border gap-5">
          <p class="text-sm text-muted text-center md:text-left whitespace-nowrap">
            Showing{" "}
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
    </>
  );
};

export default Applications;
