import React from "react";

const AddUserModal = () => {
  return (
    <div class="modal" id="add-customer-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="text-lg sm:text-xl font-bold text-text">
            Add New Customer
          </h2>
          <button class="btn-icon" onclick="closeModal('add-customer-modal')">
            <i data-lucide="x" class="w-4 h-4 sm:w-5 sm:h-5"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div class="form-group">
              <label class="form-label text-xs sm:text-sm">First Name</label>
              <input
                class="form-input text-sm sm:text-base"
                placeholder="Enter first name"
              />
            </div>
            <div class="form-group">
              <label class="form-label text-xs sm:text-sm">Last Name</label>
              <input
                class="form-input text-sm sm:text-base"
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label text-xs sm:text-sm">Email Address</label>
            <input
              type="email"
              class="form-input text-sm sm:text-base"
              placeholder="customer@example.com"
            />
          </div>
          <div class="form-group">
            <label class="form-label text-xs sm:text-sm">Phone Number</label>
            <input
              type="tel"
              class="form-input text-sm sm:text-base"
              placeholder="+1 (555) 000-0000"
            />
          </div>
          <div class="form-group">
            <label class="form-label text-xs sm:text-sm">Customer Type</label>
            <select class="form-select text-sm sm:text-base">
              <option>Individual</option>
              <option>Business</option>
              <option>VIP</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label text-xs sm:text-sm">Country</label>
            <select class="form-select text-sm sm:text-base">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
              <option>France</option>
            </select>
          </div>
          <div class="form-group mb-0">
            <label class="form-label text-xs sm:text-sm">
              Notes (Optional)
            </label>
            <textarea
              class="form-input text-sm sm:text-base"
              rows="3"
              placeholder="Add any additional notes..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer flex-col gap-3">
          <button
            class="btn-secondary flex justify-center py-2.5! lg:py-3.5! w-full sm:w-auto text-sm sm:text-base"
            onclick="closeModal('add-customer-modal')"
          >
            Cancel
          </button>
          <button
            class="btn-primary flex justify-center py-2.5! lg:py-3.5! w-full sm:w-auto text-sm sm:text-base"
            onclick="addCustomer()"
          >
            <i data-lucide="user-plus" class="w-4 h-4 sm:w-5 sm:h-5"></i> Add
            Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
