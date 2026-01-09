import React from "react";

const Dashboard = () => {
  return (
    <div class="p-3 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 lg:space-y-6">
      <div class="grid 2xl:grid-cols-3 grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
        <div class="2xl:col-span-2 col-span-1">
          <div class="wallet-card-primary fade-in h-full relative">
            <div class="flex flex-col gap-y-6 customXl2::gap-y-10 relative z-10 h-full customXl2:justify-between">
              <div class="flex sm:flex-row flex-col customXl2:items-start sm:items-center items-start customXl2:gap-x-0 gap-x-2.5 justify-between customXl2:mb-8">
                <div class="relative w-full sm:w-auto">
                  <p class="text-white/80 text-xs sm:text-sm md:text-base font-semibold mb-1 sm:mb-2">
                    Primary Wallet
                  </p>
                  <h2 class="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-white mb-2">
                    $124,567.89
                  </h2>
                  <div class="flex items-center gap-1 sm:gap-2">
                    <span class="badge-modern bg-white/20 text-white border-white/30 text-xs sm:text-sm md:text-base px-2 py-1 rounded">
                      <i
                        data-lucide="trending-up"
                        class="w-3 h-3 sm:w-4 sm:h-4"
                      ></i>
                      +12.5% this month
                    </span>
                  </div>
                  <span
                    class="absolute h-full w-full top-0 left-0 bg-[rgba(255,255,255,0.2)] rounded-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[9.9px] hidden"
                    id="amountHide"
                  ></span>
                </div>
                <div class="flex flex-row-reverse gap-x-3 sm:gap-x-4 md:gap-x-5 mt-4 sm:mt-0 relative">
                  <button
                    class="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all"
                    onclick="primaryWalletMenu()"
                  >
                    <i
                      data-lucide="more-vertical"
                      class="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    ></i>
                  </button>
                  <div
                    class="absolute flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-5 bg-panel backdrop-blur-[20px] py-2 px-1.5 rounded-lg top-[120%] right-0 sm:right-5 z-40 w-full max-w-[200px] md:max-w-[250px] transition-all duration-200 ease-linear opacity-0 pointer-events-none max-h-[300px] overflow-y-auto"
                    id="primaryWalletMenu"
                  >
                    <button class="flex flex-row justify-center gap-x-2.5 text-muted transition-all duration-150 ease-linear hover:text-text">
                      <span>
                        <i data-lucide="hat-glasses"></i>
                      </span>{" "}
                      option 1
                    </button>
                    <button class="flex flex-row justify-center gap-x-2.5 text-muted transition-all duration-150 ease-linear hover:text-text">
                      <span>
                        <i data-lucide="hat-glasses"></i>
                      </span>{" "}
                      option 2
                    </button>
                    <button class="flex flex-row justify-center gap-x-2.5 text-muted transition-all duration-150 ease-linear hover:text-text">
                      <span>
                        <i data-lucide="hat-glasses"></i>
                      </span>{" "}
                      option 3
                    </button>
                    <button class="flex flex-row justify-center gap-x-2.5 text-muted transition-all duration-150 ease-linear hover:text-text">
                      <span>
                        <i data-lucide="hat-glasses"></i>
                      </span>{" "}
                      option 4
                    </button>
                  </div>
                  <button
                    class="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all"
                    id="walletEyeIcon"
                    onclick="walletAmountHide()"
                  >
                    <i
                      data-lucide="eye"
                      class="w-5 sm:w-6 h-5 sm:h-6 text-white"
                    ></i>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
                <button
                  class="quick-action-btn"
                  onclick="openModal('send-modal')"
                >
                  <i data-lucide="send" class="w-4 sm:w-5 h-4 sm:h-5"></i>
                  <span class="hidden sm:inline">Send</span>
                </button>
                <button
                  class="quick-action-btn"
                  onclick="openModal('receive-modal')"
                >
                  <i data-lucide="download" class="w-4 sm:w-5 h-4 sm:h-5"></i>
                  <span class="hidden sm:inline">Receive</span>
                </button>
                <a class="quick-action-btn" href="invoice.html">
                  <i data-lucide="file-text" class="w-4 sm:w-5 h-4 sm:h-5"></i>
                  <span class="hidden sm:inline">Invoice</span>{" "}
                </a>
                <a class="quick-action-btn" href="activecards.html">
                  <i
                    data-lucide="credit-card"
                    class="w-4 sm:w-5 h-4 sm:h-5"
                  ></i>
                  <span class="hidden sm:inline">Card</span>
                </a>
              </div>
              <div
                class="flex flex-row flex-wrap gap-x-3 gap-y-4 sm:gap-x-5 sm:gap-y-5"
                id="renderUserList"
              ></div>
            </div>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="converter-card h-full fade-in p-4! sm:p-5! lg:p-6!">
            <div class="flex items-center justify-between mb-6">
              <h3 class="xl:text-lg sm:text-lg text-base font-bold text-text">
                FX Quick Convert
              </h3>
              <span class="badge-modern badge-success">
                <span class="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                Live
              </span>
            </div>
            <div class="currency-input-group p-2.5">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-muted uppercase">
                  From
                </label>
                <div
                  class="currency-select py-1! px-2! md:py-2! md:px-3!"
                  id="currency-from-modal"
                  onclick="openModal('currency-from-modal')"
                ></div>
              </div>
              <input
                type="number"
                class="currency-input text-sm! md:text-base! lg:text-2xl!"
                value="1000"
                id="from-amount"
              />
            </div>
            <div class="flex justify-center -my-2 relative z-10">
              <button
                class="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center hover:rotate-90 transition-transform shadow-lg"
                onclick="swapCurrencies()"
              >
                <i data-lucide="repeat" class="w-6 h-6 text-white"></i>
              </button>
            </div>
            <div class="currency-input-group p-2.5 mb-4">
              <div class="flex items-center justify-between mb-3">
                <label class="text-xs font-semibold text-muted uppercase">
                  To
                </label>
                <div
                  class="currency-select py-1! px-2! md:py-2! md:px-3!"
                  id="currency-to-modal"
                  onclick="openModal('currency-to-modal')"
                >
                  <span class="text-2xl">🇪🇺</span>
                  <span class="font-bold">EUR</span>
                  <i data-lucide="chevron-down" class="w-4 h-4"></i>
                </div>
              </div>
              <input
                type="number"
                class="currency-input text-sm! md:text-base! lg:text-2xl!"
                value="920.50"
                id="to-amount"
              />
            </div>
            <div class="exchange-rate-badge mb-4">
              <i data-lucide="trending-up" class="w-4 h-4 text-primary"></i>
              <div>
                <p class="text-xs text-muted">Exchange Rate</p>
                <p class="font-bold text-text">1 USD = 0.9205 EUR</p>
              </div>
            </div>
            <button
              class="btn-primary w-full flex justify-center px-5! py-2.5! md:px-6! md:py-3! lg:py-3.5! lg:px-7!"
              onclick="startConversion()"
            >
              <i data-lucide="arrow-right-left" class="w-5 h-5"></i>
              <span>Convert Now</span>
            </button>
          </div>
        </div>
      </div>
      <div class="grid xxl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
        <div class="stat-card slide-up flex flex-col xl:items-start items-center xl:text-left gap-2 lg:gap-4">
          <div class="stat-icon gradient-success h-10! w-10! lg:size-14! rounded-lg lg:rounded-2xl!">
            <i
              data-lucide="trending-up"
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            ></i>
          </div>
          <p class="text-xs sm:text-sm md:text-sm text-muted mb-1 sm:mb-2">
            Total Revenue
          </p>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-1 sm:mb-2">
            $86,432
          </h3>
          <div class="flex items-center gap-1 sm:gap-2 text-success text-xs sm:text-sm font-semibold">
            <i
              data-lucide="arrow-up"
              class="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4"
            ></i>
            <span>+18.2%</span> <span class="text-muted">vs last month</span>
          </div>
        </div>
        <div class="stat-card slide-up flex flex-col xl:items-start items-center xl:text-left gap-2 lg:gap-4">
          <div class="stat-icon gradient-primary h-10! w-10! lg:size-14! rounded-lg! lg:rounded-2xl!">
            <i
              data-lucide="credit-card"
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            ></i>
          </div>
          <p class="text-xs sm:text-sm md:text-sm text-muted mb-1 sm:mb-2">
            Total Payments
          </p>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-1 sm:mb-2">
            1,248
          </h3>
          <div class="flex items-center gap-1 sm:gap-2 text-success text-xs sm:text-sm font-semibold">
            <i
              data-lucide="arrow-up"
              class="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4"
            ></i>
            <span>+12.5%</span> <span class="text-muted">vs last month</span>
          </div>
        </div>
        <div class="stat-card slide-up flex flex-col xl:items-start items-center xl:text-left gap-2 lg:gap-4">
          <div class="stat-icon gradient-warning h-10! w-10! lg:size-14! rounded-lg! lg:rounded-2xl!">
            <i
              data-lucide="users"
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            ></i>
          </div>
          <p class="text-xs sm:text-sm md:text-sm text-muted mb-1 sm:mb-2">
            Active Customers
          </p>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-1 sm:mb-2">
            3,842
          </h3>
          <div class="flex items-center gap-1 sm:gap-2 text-success text-xs sm:text-sm font-semibold">
            <i
              data-lucide="arrow-up"
              class="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4"
            ></i>
            <span>+8.1%</span> <span class="text-muted">vs last month</span>
          </div>
        </div>
        <div class="stat-card slide-up flex flex-col xl:items-start items-center xl:text-left gap-2 lg:gap-4">
          <div class="stat-icon gradient-danger h-10! w-10! lg:size-14! rounded-lg! lg:rounded-2xl!">
            <i
              data-lucide="file-text"
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
            ></i>
          </div>
          <p class="text-xs sm:text-sm md:text-sm text-muted mb-1 sm:mb-2">
            Pending Invoices
          </p>
          <h3 class="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-1 sm:mb-2">
            $24,890
          </h3>
          <div class="flex items-center gap-1 sm:gap-2 text-danger text-xs sm:text-sm font-semibold">
            <i
              data-lucide="arrow-down"
              class="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4"
            ></i>
            <span>-3.2%</span> <span class="text-muted">vs last month</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 xxl:grid-cols-3 gap-4">
        <div class="xxl:col-span-2">
          <div class="card-elevated p-4 sm:p-5 lg:p-6 h-full border border-border rounded-3xl">
            <div class="flex flex-col xl:flex-row items-center justify-between mb-4 sm:mb-6 xl:gap-0 gap-4">
              <div class="text-center xl:text-left">
                <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-text">
                  Revenue Analytics
                </h3>
                <p class="text-xs sm:text-sm md:text-sm text-muted mt-1">
                  Monthly performance overview
                </p>
              </div>
              <div class="tab-list flex gap-2 sm:gap-3 mt-3 xl:mt-0">
                <button
                  class="tab-btn active text-xs sm:text-sm md:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded"
                  data-period="week"
                >
                  Week
                </button>
                <button
                  class="tab-btn text-xs sm:text-sm md:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded"
                  data-period="month"
                >
                  Month
                </button>
                <button
                  class="tab-btn text-xs sm:text-sm md:text-sm px-3 py-1 sm:px-4 sm:py-2 rounded"
                  data-period="year"
                >
                  Year
                </button>
              </div>
            </div>
            <div class="chart-container w-full h-64 sm:h-72 md:h-80 lg:h-96">
              <canvas id="revenue-chart"></canvas>
            </div>
          </div>
        </div>
        <div class="xxl:col-span-1">
          <div class="card-elevated p-4 sm:p-5 lg:p-6 rounded-3xl border border-border">
            <div class="flex flex-row items-start sm:items-center justify-between mb-4 sm:mb-5 lg:mb-6">
              <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-text">
                Multi-Currency
              </h3>
              <a
                href="wallets.html"
                class="text-primary text-xs sm:text-sm md:text-sm font-semibold hover:underline mt-2 sm:mt-0"
              >
                View All
              </a>
            </div>
            <div class="space-y-3">
              <div class="grid gap-4 sm:gap-5 lg:gap-6">
                <div class="wallet-item sm:p-5 p-2.5! bg-card rounded-2xl hover:shadow-lg transition-shadow">
                  <div class="flex flex-row flex-wrap justify-between items-center gap-4">
                    <div class="flex sm:flex-row flex-row items-center gap-3 sm:gap-4">
                      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                        <img
                          src="assets/images/usflag.png"
                          alt="usFlag"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <div class="text-left">
                        <p class="font-bold text-text text-sm sm:text-lg">
                          US Dollar
                        </p>
                        <p class="text-xs sm:text-sm text-muted text-start">
                          USD
                        </p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-text text-sm sm:text-lg">
                        $54,231
                      </p>
                      <p class="text-sm font-medium text-success sm:text-start text-center">
                        +2.4%
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wallet-item sm:p-5 p-2.5! bg-card rounded-2xl hover:shadow-lg transition-shadow">
                  <div class="flex flex-row flex-wrap justify-between items-center gap-4">
                    <div class="flex sm:flex-row flex-row items-center gap-3 sm:gap-4">
                      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                        <img
                          src="assets/images/euro.png"
                          alt="euFlag"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <div class="text-left">
                        <p class="font-bold text-text text-sm sm:text-lg">
                          Euro
                        </p>
                        <p class="text-xs sm:text-sm text-muted text-start">
                          EUR
                        </p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-text text-sm sm:text-lg">
                        €38,942
                      </p>
                      <p class="text-sm font-medium text-success sm:text-start text-center">
                        +1.8%
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wallet-item sm:p-5 p-2.5! bg-card rounded-2xl hover:shadow-lg transition-shadow">
                  <div class="flex flex-row flex-wrap justify-between items-center gap-4">
                    <div class="flex sm:flex-row flex-row items-center gap-3 sm:gap-4">
                      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                        <img
                          src="assets/images/british.png"
                          alt="gbpFlag"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <div class="text-left">
                        <p class="font-bold text-text sm:text-lg text-sm">
                          British Pound
                        </p>
                        <p class="text-xs sm:text-sm text-muted text-start">
                          GBP
                        </p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-text text-sm sm:text-lg">
                        £22,186
                      </p>
                      <p class="text-sm font-medium text-danger sm:text-start">
                        -0.5%
                      </p>
                    </div>
                  </div>
                </div>
                <div class="wallet-item sm:p-5 p-2.5! bg-card rounded-2xl hover:shadow-lg transition-shadow">
                  <div class="flex flex-row flex-wrap justify-between items-center gap-4">
                    <div class="flex sm:flex-row flex-row items-center gap-3 sm:gap-4">
                      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                        <img
                          src="assets/images/japan.png"
                          alt="jpyFlag"
                          class="w-full h-full object-contain"
                        />
                      </div>
                      <div class="text-left">
                        <p class="font-bold text-text text-sm sm:text-lg">
                          Japanese Yen
                        </p>
                        <p class="text-xs sm:text-sm text-muted text-start">
                          JPY
                        </p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-text text-sm sm:text-lg">
                        ¥5,208
                      </p>
                      <p class="text-sm font-medium text-success sm:text-start text-center">
                        +3.2%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-elevated p-2 sm:p-4 lg:p-6 border border-border rounded-3xl"
        id="recentTransactionCard"
      >
        <div class="grid md:grid-cols-2 md:items-center mb-6 gap-6">
          <div class="text-center md:text-start">
            <h3 class="text-xl font-bold text-text">Recent Transactions</h3>
            <p class="text-sm text-muted mt-1">Latest payment activities</p>
          </div>
          <div class="flex flex-col lg:flex-row gap-4 justify-end w-full">
            <div class="relative w-full">
              <input
                placeholder="Search..."
                class="search-input-index w-full min-w-[200px] py-2.5! lg:py-3.5!"
                id="transaction-search"
              />
              <i
                data-lucide="search"
                class="w-5 h-5 text-muted absolute right-4 top-[30%]"
              ></i>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 w-full">
              <div class="dropdown w-full relative bg-transparent! border-none!">
                <button
                  class="btn-secondary w-full flex justify-center py-2.5! lg:py-3.5!"
                  id="filter-btn"
                >
                  <i data-lucide="filter" class="w-5 h-5"></i>
                  <span>Filter</span>
                </button>
                <div
                  class="dropdown-menu md:right-0 right-0 left-0 max-h-[350px] overflow-y-auto mt-2 min-w-[250px]"
                  id="filter-menu"
                >
                  <div class="p-3 border-b border-border">
                    <p class="font-bold text-text mb-3">Filter By Status</p>
                    <div class="space-y-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="completed"
                          checked="checked"
                        />
                        <span class="text-sm">Completed</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="pending"
                          checked="checked"
                        />
                        <span class="text-sm">Pending</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="failed"
                          checked="checked"
                        />
                        <span class="text-sm">Failed</span>
                      </label>
                    </div>
                  </div>
                  <div class="p-3 border-b border-border">
                    <p class="font-bold text-text mb-3">Filter By Type</p>
                    <div class="space-y-2">
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="send"
                          checked="checked"
                        />
                        <span class="text-sm">Send</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="receive"
                          checked="checked"
                        />
                        <span class="text-sm">Receive</span>
                      </label>
                      <label class="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          class="filter-checkbox"
                          data-filter="exchange"
                          checked="checked"
                        />
                        <span class="text-sm">Exchange</span>
                      </label>
                    </div>
                  </div>
                  <div class="p-3">
                    <p class="font-bold text-text mb-3">
                      Filter By Transaction
                    </p>
                    <div class="flex flex-wrap gap-2">
                      <button
                        type="button"
                        class="transaction-tab px-3 py-1 rounded-full border border-border text-sm cursor-pointer bg-panel"
                        data-tab="all"
                      >
                        All
                      </button>
                      <button
                        type="button"
                        class="transaction-tab px-3 py-1 rounded-full border border-border text-sm cursor-pointer bg-panel"
                        data-tab="payments"
                      >
                        Payments
                      </button>
                      <button
                        type="button"
                        class="transaction-tab px-3 py-1 rounded-full border border-border text-sm cursor-pointer bg-panel"
                        data-tab="transfers"
                      >
                        Transfers
                      </button>
                      <button
                        type="button"
                        class="transaction-tab px-3 py-1 rounded-full border border-border text-sm cursor-pointer bg-panel"
                        data-tab="exchanges"
                      >
                        Exchange
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative w-full">
                <button
                  class="btn-secondary w-full flex justify-center py-2.5! lg:py-3.5!"
                  id="export-btn"
                >
                  <i data-lucide="download" class="w-[18px] h-[18px]"></i>
                  Export
                </button>
                <div
                  class="export-menu absolute left-0 md:right-0 md:-left-3 mt-2 w-full md:w-auto xl:w-[140%]"
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
        </div>
        <div class="space-y-3" id="transactions-container"></div>
        <div class="flex flex-col md:flex-row items-center justify-between mt-6 py-6 border-t border-border gap-5">
          <p class="text-sm text-muted text-center md:text-left whitespace-nowrap">
            Showing
            <span id="showing-count" class="font-semibold">
              10
            </span>{" "}
            of
            <span id="total-count" class="font-semibold">
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
  );
};

export default Dashboard;
