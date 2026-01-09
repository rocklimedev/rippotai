import React from "react";

const Projects = () => {
  return (
    <div class="p-3 sm:p-5 lg:p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-8">
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
              <i data-lucide="users" class="w-6 h-6 text-white"></i>
            </div>
            <span class="badge-modern badge-success">+12%</span>
          </div>
          <p class="text-muted text-sm mb-1">Total Members</p>
          <h3 class="text-3xl font-bold text-text" id="total-members-count">
            24
          </h3>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 gradient-success rounded-2xl flex items-center justify-center">
              <i data-lucide="user-check" class="w-6 h-6 text-white"></i>
            </div>
            <span class="badge-modern badge-success">Active</span>
          </div>
          <p class="text-muted text-sm mb-1">Active Members</p>
          <h3 class="text-3xl font-bold text-text" id="active-members-count">
            20
          </h3>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 gradient-warning rounded-2xl flex items-center justify-center">
              <i data-lucide="user-x" class="w-6 h-6 text-white"></i>
            </div>
            <span class="badge-modern badge-warning">Pending</span>
          </div>
          <p class="text-muted text-sm mb-1">Pending Invites</p>
          <h3 class="text-3xl font-bold text-text" id="pending-members-count">
            3
          </h3>
        </div>
        <div class="stat-card">
          <div class="flex items-center justify-between mb-3">
            <div class="w-12 h-12 gradient-danger rounded-2xl flex items-center justify-center">
              <i data-lucide="user-minus" class="w-6 h-6 text-white"></i>
            </div>
            <span class="badge-modern badge-muted">Inactive</span>
          </div>
          <p class="text-muted text-sm mb-1">Inactive Members</p>
          <h3 class="text-3xl font-bold text-text" id="inactive-members-count">
            1
          </h3>
        </div>
      </div>
      <div class="card-elevated p-6 mb-6">
        <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div class="search-wrapper">
            <i data-lucide="search" class="search-icon w-5 h-5"></i>
            <input
              id="member-search"
              class="input py-2.5! lg:py-3.5!"
              placeholder="Search by name, email, or role..."
            />
          </div>
          <div class="flex items-center gap-3 flex-wrap md:w-auto w-full">
            <div class="view-toggle md:w-auto w-full">
              <button
                class="view-toggle-btn active md:w-auto w-full py-2.5! lg:py-3.5!"
                data-view="grid"
                onclick="switchView('grid')"
              >
                <i data-lucide="grid-3x3" class="w-4 h-4"></i>
                <span>Grid</span>
              </button>
              <button
                class="view-toggle-btn md:w-auto w-full py-2.5! lg:py-3.5!"
                data-view="list"
                onclick="switchView('list')"
              >
                <i data-lucide="list" class="w-4 h-4"></i> <span>List</span>
              </button>
            </div>
            <div
              class="dropdown bg-transparent! border-none! md:w-auto w-full"
              id="filter-dropdown"
            >
              <button
                class="btn-secondary md:w-auto w-full py-2.5! lg:py-3.5! flex justify-center"
                onclick="toggleDropdown('filter-dropdown')"
              >
                <i data-lucide="filter" class="w-5 h-5"></i> Filters
                <span
                  id="filter-count"
                  class="badge-modern badge-primary ml-2 hidden"
                >
                  0
                </span>
              </button>
              <div class="dropdown-content">
                <p class="font-bold text-text mb-3">Filter by Status</p>
                <div class="space-y-2 mb-4">
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="active"
                      checked="checked"
                    />
                    <span class="text-text">Active</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="pending"
                      checked="checked"
                    />
                    <span class="text-text">Pending</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="inactive"
                      checked="checked"
                    />
                    <span class="text-text">Inactive</span>
                  </label>
                </div>
                <p class="font-bold text-text mb-3">Filter by Role</p>
                <div class="space-y-2">
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="admin"
                      checked="checked"
                    />
                    <span class="text-text">Admin</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="manager"
                      checked="checked"
                    />
                    <span class="text-text">Manager</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="developer"
                      checked="checked"
                    />
                    <span class="text-text">Developer</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="designer"
                      checked="checked"
                    />
                    <span class="text-text">Designer</span>
                  </label>
                  <label class="checkbox-wrapper">
                    <input
                      type="checkbox"
                      class="checkbox-input filter-checkbox"
                      data-filter="support"
                      checked="checked"
                    />
                    <span class="text-text">Support</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="relative w-full md:w-auto">
              <button
                class="btn-secondary w-full md:w-auto flex justify-center py-2.5! lg:py-3.5!"
                id="export-btn"
              >
                <i data-lucide="download" class="w-4.5 h-4.5"></i> Export
              </button>
              <div
                class="export-menu absolute left-0 md:right-0 md:-left-7 mt-2 w-full md:w-auto xl:w-[140%] hidden xl:block"
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
        <div class="tab-dropdown-mobile-people" id="tab-dropdown-mobile-people">
          <button
            class="tab-dropdown-btn-people py-2.5! lg:py-3.5! flex justify-center"
            id="tab-dropdown-btn-people"
          >
            <span id="tab-dropdown-text-people">All Members</span>
            <i data-lucide="chevron-down" class="w-5 h-5"></i>
          </button>
          <div
            class="tab-dropdown-content-people"
            id="tab-dropdown-content-people"
          >
            <button class="tab-dropdown-item-people active" data-tab="all">
              <i data-lucide="users" class="w-4 h-4"></i>
              <span>All Members</span>
              <span
                class="badge-modern badge-muted ml-auto"
                id="tab-all-count-mobile"
              >
                24
              </span>
            </button>
            <button class="tab-dropdown-item-people" data-tab="active">
              <i data-lucide="user-check" class="w-4 h-4"></i>
              <span>Active</span>
              <span
                class="badge-modern badge-success ml-auto"
                id="tab-active-count-mobile"
              >
                20
              </span>
            </button>
            <button class="tab-dropdown-item-people" data-tab="pending">
              <i data-lucide="clock" class="w-4 h-4"></i>
              <span>Pending</span>
              <span
                class="badge-modern badge-warning ml-auto"
                id="tab-pending-count-mobile"
              >
                3
              </span>
            </button>
            <button class="tab-dropdown-item-people" data-tab="inactive">
              <i data-lucide="user-x" class="w-4 h-4"></i>
              <span>Inactive</span>
              <span
                class="badge-modern badge-muted ml-auto"
                id="tab-inactive-count-mobile"
              >
                1
              </span>
            </button>
          </div>
        </div>
        <div class="tabs-people">
          <button class="tab-btn-people active" data-tab="all">
            <i data-lucide="users" class="w-4 h-4"></i> All Members
            <span class="badge-modern badge-muted ml-2" id="tab-all-count">
              24
            </span>
          </button>
          <button class="tab-btn-people" data-tab="active">
            <i data-lucide="user-check" class="w-4 h-4"></i> Active
            <span class="badge-modern badge-success ml-2" id="tab-active-count">
              20
            </span>
          </button>
          <button class="tab-btn-people" data-tab="pending">
            <i data-lucide="clock" class="w-4 h-4"></i> Pending
            <span
              class="badge-modern badge-warning ml-2"
              id="tab-pending-count"
            >
              3
            </span>
          </button>
          <button class="tab-btn-people" data-tab="inactive">
            <i data-lucide="user-x" class="w-4 h-4"></i> Inactive
            <span class="badge-modern badge-muted ml-2" id="tab-inactive-count">
              1
            </span>
          </button>
        </div>
      </div>
      <div
        id="members-grid"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      ></div>
      <div id="members-list" class="mb-8" style="display: none"></div>
      <div class="flex flex-col md:flex-row items-center justify-between mt-6 py-6 border-t border-border gap-5">
        <p class="text-sm text-muted text-center md:text-left whitespace-nowrap">
          Showing{" "}
          <span id="showing-count" class="font-semibold">
            10
          </span>{" "}
          of
          <span id="total-count" class="font-semibold">
            248
          </span>{" "}
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
  );
};

export default Projects;
