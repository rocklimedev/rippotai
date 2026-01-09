import React from "react";

const AddNewJob = () => {
  return (
    <>
      <div class="p-3 sm:p-5 lg:p-6">
        <div class="flex justify-between flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6 lg:mb-8">
          <div class="">
            <div class="flex items-center gap-3 sm:gap-5 lg:gap-6 mb-3 sm:mb-4 lg:mb-8">
              <button onclick="window.history.back()" class="btn-icon">
                <i data-lucide="arrow-left" class="w-5 h-5"></i>
              </button>
              <div>
                <h1 class="text-xl sm:text-2xl font-bold text-text">
                  Add New Customer
                </h1>
                <p class="text-sm text-muted">
                  Create a new customer profile and manage their information
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-3 sm:gap-5 lg:gap-6 w-full sm:w-auto">
            <button class="btn-secondary w-full sm:w-auto justify-center py-2.5! lg:py-3.5!">
              <i data-lucide="x" class="w-5 h-5"></i> Cancel
            </button>
            <button
              class="btn-primary w-full sm:w-auto justify-center py-2.5! lg:py-3.5!"
              onclick="saveCustomer()"
            >
              <i data-lucide="check" class="w-5 h-5"></i> Save Customer
            </button>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
        </div>
      </div>
      <div class="p-3 sm:p-5 lg:p-6 grid grid-cols-1 3xl:grid-cols-[1fr_380px] gap-4 sm:gap-6">
        <div>
          <div class="tabs overflow-x-auto scrollbar-hide mb-4 sm:mb-8">
            <button
              class="tab-button active text-xs sm:text-sm whitespace-nowrap"
              data-tab="basic-info"
              onclick="switchTabNewCustomer('basic-info')"
            >
              <i
                data-lucide="user"
                class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-1.5"
              ></i>
              <span class="hidden sm:inline">Basic Information</span>
              <span class="sm:hidden">Basic</span>
            </button>
            <button
              class="tab-button text-xs sm:text-sm whitespace-nowrap"
              data-tab="business-info"
              onclick="switchTabNewCustomer('business-info')"
            >
              <i
                data-lucide="briefcase"
                class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-1.5"
              ></i>
              <span class="hidden sm:inline">Business Details</span>
              <span class="sm:hidden">Business</span>
            </button>
            <button
              class="tab-button text-xs sm:text-sm whitespace-nowrap"
              data-tab="billing-info"
              onclick="switchTabNewCustomer('billing-info')"
            >
              <i
                data-lucide="credit-card"
                class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-1.5"
              ></i>
              <span class="hidden sm:inline">Billing & Payment</span>
              <span class="sm:hidden">Billing</span>
            </button>
            <button
              class="tab-button text-xs sm:text-sm whitespace-nowrap"
              data-tab="settings"
              onclick="switchTabNewCustomer('settings')"
            >
              <i
                data-lucide="settings"
                class="w-3 h-3 sm:w-4 sm:h-4 inline mr-1.5 sm:mr-1.5"
              ></i>
              Settings
            </button>
          </div>
          <div
            class="tab-dropdown-mobile-analytics"
            id="tab-dropdown-mobile-analytics"
          >
            <button
              class="tab-dropdown-btn-analytics py-2.5! lg:py-3.5!"
              id="tab-dropdown-btn-analytics"
            >
              <span id="tab-dropdown-text-analytics">Basic Information</span>
              <i data-lucide="chevron-down" class="w-5 h-5"></i>
            </button>
            <div
              class="tab-dropdown-content-analytics"
              id="tab-dropdown-content-analytics"
            >
              <button
                class="tab-dropdown-item-analytics active py-2.5! lg:py-3.5!"
                data-tab="basic-info"
                onclick="switchTabNewCustomer('basic-info')"
              >
                <i data-lucide="layout-dashboard" class="w-4 h-4"></i> Basic
                Information
              </button>
              <button
                class="tab-dropdown-item-analytics py-2.5! lg:py-3.5!"
                data-tab="business-info"
                onclick="switchTabNewCustomer('business-info')"
              >
                <i data-lucide="trending-up" class="w-4 h-4"></i> Business
                Details
              </button>
              <button
                class="tab-dropdown-item-analytics py-2.5! lg:py-3.5!"
                data-tab="billing-info"
                onclick="switchTabNewCustomer('billing-info')"
              >
                <i data-lucide="users" class="w-4 h-4"></i> Billing & Payment
              </button>
              <button
                class="tab-dropdown-item-analytics py-2.5! lg:py-3.5!"
                data-tab="settings"
                onclick="switchTabNewCustomer('settings')"
              >
                <i data-lucide="bar-chart-3" class="w-4 h-4"></i> Settings
              </button>
            </div>
          </div>
          <div class="tab-content active" id="basic-info">
            <div class="card-elevated p-3 sm:p-5 lg:p-6">
              <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                Personal Information
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    First Name <span class="required">*</span>
                  </label>
                  <input
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="first-name"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Last Name <span class="required">*</span>
                  </label>
                  <input
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="last-name"
                    placeholder="Enter last name"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Email Address <span class="required">*</span>
                  </label>
                  <input
                    type="email"
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="email"
                    placeholder="customer@example.com"
                    required
                  />
                  <p class="form-help text-xs">
                    We'll use this email for all communications
                  </p>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Phone Number <span class="required">*</span>
                  </label>
                  <input
                    type="tel"
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="phone"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="dob"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">Gender</label>
                  <div class="relative">
                    <select
                      id="gender"
                      class="appearance-none w-full px-4 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer py-2.5! lg:py-3.5!"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-say">Prefer not to say</option>
                    </select>
                    <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Contact Information
                </h3>
                <div class="grid gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Street Address <span class="required">*</span>
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="address"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">City</label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="city"
                        placeholder="New York"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        State / Province
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="state"
                        placeholder="NY"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        ZIP / Postal Code
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="zip"
                        placeholder="10001"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        Country
                      </label>
                      <div class="relative">
                        <select
                          id="country"
                          class="appearance-none w-full px-4 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer py-2.5! lg:py-3.5!"
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="CN">China</option>
                          <option value="IN">India</option>
                          <option value="BR">Brazil</option>
                        </select>
                        <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                          <svg
                            class="w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="business-info">
            <div class="card-elevated p-4 sm:p-6 lg:p-8">
              <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                Company Details
              </h3>
              <div class="grid gap-4 sm:gap-6">
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Company Name
                  </label>
                  <input
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="company-name"
                    placeholder="Enter company name"
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Company Registration Number
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="company-reg"
                      placeholder="REG-123456"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Industry
                    </label>
                    <div class="relative">
                      <select
                        id="industry"
                        class="appearance-none w-full px-4 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer py-2.5! lg:py-3.5!"
                      >
                        <option value="">Select industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="education">Education</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="other">Other</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Company Size
                    </label>
                    <div class="relative">
                      <select
                        id="company-size"
                        class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                      >
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Annual Revenue
                    </label>
                    <div class="relative">
                      <select
                        id="revenue"
                        class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                      >
                        <option value="0-100k">$0 - $100K</option>
                        <option value="100k-500k">$100K - $500K</option>
                        <option value="500k-1m">$500K - $1M</option>
                        <option value="1m-5m">$1M - $5M</option>
                        <option value="5m-10m">$5M - $10M</option>
                        <option value="10m+">$10M+</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Company Website
                  </label>
                  <input
                    type="url"
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="website"
                    placeholder="https://example.com/"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Tax ID / VAT Number
                  </label>
                  <input
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="tax-id"
                    placeholder="Enter tax identification number"
                  />
                  <p class="form-help text-xs">
                    Required for invoicing and tax purposes
                  </p>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Business Contact
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Contact Person Name
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="contact-person"
                      placeholder="Full name"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Position / Title
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="position"
                      placeholder="e.g., CEO, Finance Manager"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Business Email
                    </label>
                    <input
                      type="email"
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="business-email"
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="business-phone"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="billing-info">
            <div class="card-elevated p-4 sm:p-6 lg:p-8">
              <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                Payment Information
              </h3>
              <div class="grid gap-4 sm:gap-6">
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Preferred Currency
                  </label>
                  <div class="">
                    <select id="currency" class="form-select">
                      <option value="">Select currency</option>
                      <option value="USD">US Dollar</option>
                      <option value="EUR">Euro</option>
                      <option value="GBP">British Pound</option>
                      <option value="JPY">Japanese Yen</option>
                      <option value="CAD">Canadian Dollar</option>
                      <option value="AUD">Australian Dollar</option>
                      <option value="CHF">Swiss Franc</option>
                    </select>
                    <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Payment Terms
                    </label>
                    <div class="relative">
                      <select
                        id="payment-terms"
                        class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                      >
                        <option value="immediate">Immediate</option>
                        <option value="net-15">Net 15 days</option>
                        <option value="net-30">Net 30 days</option>
                        <option value="net-45">Net 45 days</option>
                        <option value="net-60">Net 60 days</option>
                        <option value="net-90">Net 90 days</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Credit Limit
                    </label>
                    <input
                      type="number"
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="credit-limit"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Preferred Payment Method
                  </label>
                  <div class="relative">
                    <select
                      id="payment-method"
                      class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                    >
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="check">Check</option>
                      <option value="cash">Cash</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </select>
                    <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Billing Address
                </h3>
                <div class="flex flex-row flex-wrap items-center gap-4 mb-4 sm:mb-6">
                  <input
                    type="checkbox"
                    class="checkbox"
                    id="same-as-contact"
                    onchange="toggleBillingAddress()"
                  />
                  <label
                    for="same-as-contact"
                    class="text-xs sm:text-sm text-text cursor-pointer"
                  >
                    Same as contact address
                  </label>
                </div>
                <div id="billing-address-fields" class="grid gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Billing Street Address
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="billing-address"
                      placeholder="123 Billing Street"
                    />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">City</label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="billing-city"
                        placeholder="City"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        State / Province
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="billing-state"
                        placeholder="State"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        ZIP / Postal Code
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="billing-zip"
                        placeholder="ZIP"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        Country
                      </label>
                      <div class="relative">
                        <select
                          id="billing-country"
                          class="appearance-none w-full px-4 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer py-2.5! lg:py-3.5!"
                        >
                          <option value="US">US - United States</option>
                          <option value="CA">CA - Canada</option>
                          <option value="GB">GB - United Kingdom</option>
                          <option value="AU">AU - Australia</option>
                          <option value="DE">DE - Germany</option>
                          <option value="FR">FR - France</option>
                        </select>
                        <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                          <svg
                            class="w-5 h-5 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Bank Account Details
                </h3>
                <div class="grid gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Bank Name
                    </label>
                    <input
                      class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                      id="bank-name"
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        Account Number
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="account-number"
                        placeholder="Enter account number"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        Routing Number
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="routing-number"
                        placeholder="Enter routing number"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">
                        SWIFT / BIC Code
                      </label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="swift-code"
                        placeholder="SWIFT/BIC"
                      />
                    </div>
                    <div class="form-group">
                      <label class="form-label text-xs sm:text-sm">IBAN</label>
                      <input
                        class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                        id="iban"
                        placeholder="IBAN number"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-content" id="settings">
            <div class="card-elevated p-4 sm:p-6 lg:p-8">
              <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                Customer Settings
              </h3>
              <div class="grid gap-4 sm:gap-6">
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Customer Type
                  </label>
                  <div class="relative">
                    <select
                      id="customer-type"
                      class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                    >
                      <option value="individual">Individual</option>
                      <option value="business">Business</option>
                      <option value="nonprofit">Non-profit</option>
                      <option value="government">Government</option>
                    </select>
                    <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Customer Status
                  </label>
                  <div class="relative">
                    <select
                      id="customer-status"
                      class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                    >
                      <option value="active">EUR - Euro</option>
                      <option value="inactive">USD - US Dollar</option>
                      <option value="pending">GBP - British Pound</option>
                      <option value="suspended">JPY - Japanese Yen</option>
                    </select>
                    <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                      <svg
                        class="w-5 h-5 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Customer Priority
                    </label>
                    <div class="relative">
                      <select
                        id="customer-priority"
                        class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="vip">VIP</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label text-xs sm:text-sm">
                      Assigned Account Manager
                    </label>
                    <div class="relative">
                      <select
                        id="account-manager"
                        class="appearance-none w-full px-4 py-3 pr-12 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-border transition-all duration-200 text-text font-medium cursor-pointer"
                      >
                        <option value="john">John Smith</option>
                        <option value="sarah">Sarah Johnson</option>
                        <option value="mike">Mike Davis</option>
                        <option value="emma">Emma Wilson</option>
                      </select>
                      <div class="absolute inset-y-0 right-2 flex items-center pr-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">Tags</label>
                  <input
                    class="form-input text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="tags"
                    placeholder="Add tags separated by commas"
                  />
                  <p class="form-help text-xs">
                    e.g., enterprise, premium, tech
                  </p>
                </div>
                <div class="form-group">
                  <label class="form-label text-xs sm:text-sm">
                    Internal Notes
                  </label>
                  <textarea
                    class="form-input form-textarea text-sm sm:text-base py-2.5! lg:py-3.5!"
                    id="notes"
                    placeholder="Add any internal notes about this customer..."
                  ></textarea>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Notification Preferences
                </h3>
                <div class="flex flex-col gap-4 sm:gap-5">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        Email Notifications
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Receive email updates about invoices and payments
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        SMS Notifications
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Receive text messages for important updates
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        Marketing Communications
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Receive promotional offers and newsletters
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        Payment Reminders
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Automated reminders for upcoming payments
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
                <h3 class="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-text">
                  Access & Permissions
                </h3>
                <div class="flex flex-col gap-4 sm:gap-5">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        Portal Access
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Allow customer to access their portal
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        API Access
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Enable API integration capabilities
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-semibold text-text mb-1 text-xs sm:text-sm">
                        Auto-approve Invoices
                      </p>
                      <p class="text-xs sm:text-sm text-muted">
                        Automatically approve invoices without review
                      </p>
                    </div>
                    <label class="switch">
                      <input
                        type="checkbox"
                        checked="checked"
                        class="notification-toggle"
                        data-type="transaction-alerts"
                      />
                      <span class="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="order-first lg:order-last">
          <div class="card-elevated p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 class="text-sm sm:text-base font-bold mb-4 sm:mb-5 text-center text-text">
              Customer Photo
            </h3>
            <div class="avatar-upload">
              <div class="avatar-preview" id="avatar-preview">
                <i data-lucide="user" class="avatar-placeholder"></i>
              </div>
              <button
                class="avatar-upload-btn"
                onclick="document.getElementById('avatar-input').click()"
              >
                <i
                  data-lucide="camera"
                  class="w-4 h-4 sm:w-5 sm:h-5 text-white"
                ></i>
              </button>
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                class="hidden"
                onchange="handleAvatarUpload(event)"
              />
            </div>
            <p class="text-center text-xs sm:text-sm text-muted">
              Upload a profile picture
              <br />
              JPG, PNG or GIF (max. 5MB)
            </p>
          </div>
          <div class="card-elevated p-4 sm:p-6 mb-4 sm:mb-6">
            <h3 class="text-sm sm:text-base font-bold mb-4 sm:mb-5 text-text">
              Quick Summary
            </h3>
            <div class="flex flex-wrap 3xl:flex-col justify-between gap-3 sm:gap-4">
              <div class="flex items-center gap-3 md:w-auto w-[calc(50%-12px)]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-primary/10">
                  <i
                    data-lucide="user-check"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                  ></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-muted mb-1">Customer Type</p>
                  <p
                    class="text-xs sm:text-sm font-semibold text-text"
                    id="summary-type"
                  >
                    Individual
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3 md:w-auto w-[calc(50%-12px)]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-success/10">
                  <i
                    data-lucide="activity"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-success"
                  ></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-muted mb-1">Status</p>
                  <p
                    class="text-xs sm:text-sm font-semibold text-text"
                    id="summary-status"
                  >
                    Active
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3 md:w-auto w-[calc(50%-12px)]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-warning/10">
                  <i
                    data-lucide="star"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-warning"
                  ></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-muted mb-1">Priority</p>
                  <p
                    class="text-xs sm:text-sm font-semibold text-text"
                    id="summary-priority"
                  >
                    Medium
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3 md:w-auto w-[calc(50%-12px)]">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-info/10">
                  <i
                    data-lucide="dollar-sign"
                    class="w-5 h-5 sm:w-6 sm:h-6 text-info"
                  ></i>
                </div>
                <div class="flex-1">
                  <p class="text-xs text-muted mb-1">Credit Limit</p>
                  <p
                    class="text-xs sm:text-sm font-semibold text-text"
                    id="summary-credit"
                  >
                    $0.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-elevated p-4 sm:p-6">
            <h3 class="text-sm sm:text-base font-bold mb-4 sm:mb-5 text-text">
              Documents
            </h3>
            <div
              class="upload-area"
              id="upload-area"
              ondrop="handleDrop(event)"
              ondragover="handleDragOver(event)"
              ondragleave="handleDragLeave(event)"
              onclick="document.getElementById('file-input').click()"
            >
              <i data-lucide="upload-cloud" class="upload-icon"></i>
              <p class="text-xs sm:text-sm font-semibold text-text mb-1">
                Drop files here or click to browse
              </p>
              <p class="text-xs text-muted">
                PDF, DOC, DOCX, JPG, PNG (max. 10MB)
              </p>
            </div>
            <input
              type="file"
              id="file-input"
              multiple="multiple"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              class="hidden"
              onchange="handleFileUpload(event)"
            />
            <div
              id="uploaded-files"
              class="mt-4 sm:mt-5 flex flex-col gap-3"
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewJob;
