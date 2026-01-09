import React from "react";

const MobileNav = () => {
  return (
    <nav class="mobile-nav">
      <a href="index.html" class="mobile-nav-item">
        <i data-lucide="home" class="w-6 h-6"></i>
        <span class="mobile-nav-label">Home</span>{" "}
      </a>
      <a href="wallets.html" class="mobile-nav-item">
        <i data-lucide="wallet" class="w-6 h-6"></i>
        <span class="mobile-nav-label">Wallets</span>{" "}
      </a>
      <a href="payments.html" class="mobile-nav-item">
        <i data-lucide="credit-card" class="w-6 h-6"></i>
        <span class="mobile-nav-label">Payments</span>{" "}
      </a>
      <a href="analytics.html" class="mobile-nav-item">
        <i data-lucide="bar-chart-2" class="w-6 h-6"></i>
        <span class="mobile-nav-label">Analytics</span>{" "}
      </a>
      <a href="profile.html" class="mobile-nav-item">
        <i data-lucide="user" class="w-6 h-6"></i>
        <span class="mobile-nav-label">Profile</span>
      </a>
    </nav>
  );
};

export default MobileNav;
