import React from "react";

const Contact = () => {
  return (
    <>
      <div class="stats-grid p-3 sm:p-5 lg:p-6">
        <div class="stat-card space-y-2.5 sm:space-y-3.5 primary text-left!">
          <div class="stat-icon gradient-primary">
            <i data-lucide="receipt" class="w-7 h-7 text-white"></i>
          </div>
          <h2 class="stat-value">$284,560</h2>
          <p class="stat-label">Total Billed</p>
          <div class="stat-change up">
            <i data-lucide="trending-up" class="w-4 h-4"></i>
            <span>+12.5% from last month</span>
          </div>
        </div>
        <div class="stat-card space-y-2.5 sm:space-y-3.5 success text-left!">
          <div class="stat-icon gradient-success">
            <i data-lucide="check-circle" class="w-7 h-7 text-white"></i>
          </div>
          <h2 class="stat-value">$198,340</h2>
          <p class="stat-label">Collected</p>
          <div class="stat-change up">
            <i data-lucide="trending-up" class="w-4 h-4"></i>
            <span>+8.2% from last month</span>
          </div>
        </div>
        <div class="stat-card space-y-2.5 sm:space-y-3.5 warning text-left!">
          <div class="stat-icon gradient-warning">
            <i data-lucide="clock" class="w-7 h-7 text-white"></i>
          </div>
          <h2 class="stat-value">$86,220</h2>
          <p class="stat-label">Pending</p>
          <div class="stat-change down">
            <i data-lucide="trending-down" class="w-4 h-4"></i>
            <span>-3.8% from last month</span>
          </div>
        </div>
        <div class="stat-card space-y-2.5 sm:space-y-3.5 danger text-left!">
          <div class="stat-icon gradient-danger">
            <i data-lucide="alert-circle" class="w-7 h-7 text-white"></i>
          </div>
          <h2 class="stat-value">$127</h2>
          <p class="stat-label">Active Billings</p>
          <div class="stat-change up">
            <i data-lucide="trending-up" class="w-4 h-4"></i>
            <span>+15 new this week</span>
          </div>
        </div>
      </div>
      <div class="px-3 md:px-5 lg:px-6">
        <div
          class="tab-dropdown-mobile-billing"
          id="tab-dropdown-mobile-billing"
        >
          <button
            class="tab-dropdown-btn-billing"
            id="tab-dropdown-btn-billing"
          >
            <span id="tab-dropdown-text-billing">All Billings</span>
            <i data-lucide="chevron-down" class="w-5 h-5"></i>
          </button>
          <div
            class="tab-dropdown-content-billing"
            id="tab-dropdown-content-billing"
          >
            <button class="tab-dropdown-item-billing active" data-tab="all">
              <i data-lucide="file-text" class="w-4 h-4"></i> All Billings
            </button>
            <button class="tab-dropdown-item-billing" data-tab="recurring">
              <i data-lucide="repeat" class="w-4 h-4"></i> Recurring
            </button>
            <button class="tab-dropdown-item-billing" data-tab="one-time">
              <i data-lucide="zap" class="w-4 h-4"></i> One-Time
            </button>
            <button class="tab-dropdown-item-billing" data-tab="overdue">
              <i data-lucide="alert-circle" class="w-4 h-4"></i> Overdue
            </button>
          </div>
        </div>
        <div class="tabs">
          <button class="tab-btn-billing active" data-tab="all">
            All Billings
          </button>
          <button class="tab-btn-billing" data-tab="recurring">
            Recurring
          </button>
          <button class="tab-btn-billing" data-tab="one-time">
            One-Time
          </button>
          <button class="tab-btn-billing" data-tab="overdue">
            Overdue
          </button>
        </div>
      </div>
      <div class="px-3 md:px-5 lg:px-6">
        <div class="filter-bar flex md:flex-row">
          <div class="filter-group-billing flex md:flex-row flex-col md:w-auto w-full">
            <div
              class="filter-dropdown-billing md:w-auto w-full"
              id="status-filter"
            >
              <button class="filter-btn-billing xl:w-auto w-full">
                <i data-lucide="filter"></i> <span>Status</span>
                <i data-lucide="chevron-down" class="md:ml-0 ml-auto"></i>
              </button>
              <div class="filter-menu-billing">
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="active"
                    id="filter-active"
                    checked="checked"
                  />
                  <label class="filter-label" for="filter-active">
                    Active
                  </label>
                </div>
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="paid"
                    id="filter-paid"
                    checked="checked"
                  />
                  <label class="filter-label" for="filter-paid">
                    Paid
                  </label>
                </div>
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="pending"
                    id="filter-pending"
                    checked="checked"
                  />
                  <label class="filter-label" for="filter-pending">
                    Pending
                  </label>
                </div>
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="overdue"
                    id="filter-overdue"
                    checked="checked"
                  />
                  <label class="filter-label" for="filter-overdue">
                    Overdue
                  </label>
                </div>
                <div class="checkbox-wrapper">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="cancelled"
                    id="filter-cancelled"
                    checked="checked"
                  />
                  <label class="filter-label" for="filter-cancelled">
                    Cancelled
                  </label>
                </div>
              </div>
            </div>
            <div
              class="filter-dropdown-billing md:w-auto w-full"
              id="frequency-filter"
            >
              <button class="filter-btn-billing xl:w-auto w-full">
                <i data-lucide="calendar"></i> <span>Frequency</span>
                <i data-lucide="chevron-down" class="md:ml-0 ml-auto"></i>
              </button>
              <div class="filter-menu-billing">
                <label class="checkbox-wrapper cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="monthly"
                    id="filter-monthly"
                    checked="checked"
                  />
                  <span class="text-sm sm:text-base text-text">Monthly</span>
                </label>
                <label class="checkbox-wrapper cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="quarterly"
                    id="filter-quarterly"
                    checked="checked"
                  />
                  <span class="text-sm sm:text-base text-text">Quarterly</span>
                </label>
                <label class="checkbox-wrapper cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="annually"
                    id="filter-annually"
                    checked="checked"
                  />
                  <span class="text-sm sm:text-base text-text">Annually</span>
                </label>
                <label class="checkbox-wrapper cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    class="filter-checkbox-billing"
                    data-filter="one-time"
                    id="filter-one-time"
                    checked="checked"
                  />
                  <span class="text-sm sm:text-base text-text">One-Time</span>
                </label>
              </div>
            </div>
            <input type="date" class="filter-btn-billing md:w-auto w-full" />
          </div>
          <div class="relative w-full md:w-auto">
            <button
              class="btn-secondary w-full md:w-auto flex justify-center py-2.5! lg:py-3.5!"
              id="export-btn"
            >
              <i data-lucide="download" class="w-[18px] h-[18px]"></i> Export
            </button>
            <div
              class="export-menu absolute left-0 md:right-0 md:-left-8 mt-2 w-full md:w-auto xl:w-[140%] hidden xl:block"
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
      <div class="px-3 md:px-5 lg:px-6">
        <div class="billing-table">
          <div class="table-header">
            <div>
              <div class="table-title">Billing Records</div>
              <div class="table-count">
                Showing <span id="showing-count1">0</span> of
                <span id="total-count1">0</span> billings
              </div>
            </div>
          </div>
          <div class="table-content overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th class="whitespace-nowrap">Customer</th>
                  <th class="whitespace-nowrap">Billing ID</th>
                  <th class="whitespace-nowrap">Amount</th>
                  <th class="whitespace-nowrap">Frequency</th>
                  <th class="whitespace-nowrap">Status</th>
                  <th class="whitespace-nowrap">Next Due</th>
                  <th class="whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody id="billing-table-body"></tbody>
            </table>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-between mt-6 lg:p-6 md:p-5 p-3 border-t border-border gap-5">
            <p class="text-sm text-muted text-center md:text-left whitespace-nowrap">
              Showing Showing
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
    </>
  );
};

export default Contact;
