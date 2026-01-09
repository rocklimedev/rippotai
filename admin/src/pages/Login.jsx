import React from "react";

const Login = () => {
  return (
    <div class="login-wrapper">
      <div class="login-container">
        <div class="illustration-section">
          <div class="floating-shape shape-1"></div>
          <div class="floating-shape shape-2"></div>
          <div class="floating-shape shape-3"></div>
          <div class="illustration-content">
            <a href="index.html" class="illustration-title">
              Welcome to
              <br />
              Fintrix
            </a>
            <div class="illustration-subtitle">
              Smart, secure, and scalable payment solutions for modern
              businesses
            </div>
            <div class="feature-cards">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-wallet"></i>
                </div>
                <div class="feature-title">Multi-Currency Wallets</div>
                <div class="feature-description">
                  Manage multiple currencies in one place with real-time
                  conversion rates
                </div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-shield-halved"></i>
                </div>
                <div class="feature-title">Bank-Level Security</div>
                <div class="feature-description">
                  Your data is protected with 256-bit encryption and 2FA
                  authentication
                </div>
              </div>
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-chart-line"></i>
                </div>
                <div class="feature-title">Real-Time Analytics</div>
                <div class="feature-description">
                  Track your revenue, expenses, and cash flow with powerful
                  insights
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-section">
          <div class="text-center">
            <a href="index.html" class="logo">
              Fintrix
            </a>
            <h1 class="text-primary text-[28px] font-bold mb-2">Sign In</h1>
            <p class="text-secondary text-[15px] mb-8">
              Welcome back! Please enter your details
            </p>
            <div class="alert alert-error" id="errorAlert">
              <i class="fas fa-exclamation-circle"></i>
              <span id="errorMessage"></span>
            </div>
            <div class="alert alert-success" id="successAlert">
              <i class="fas fa-check-circle"></i>
              <span id="successMessage"></span>
            </div>
            <form id="loginForm" onsubmit="handleLogin(event)">
              <div class="input-group mb-3 sm:mb-5 lg:mb-6">
                <i class="fas fa-envelope input-icon"></i>
                <input
                  type="email"
                  class="input input-support"
                  placeholder="Email address"
                  id="email"
                  required
                />
              </div>
              <div class="input-group mb-3 sm:mb-5 lg:mb-6">
                <i class="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  class="input input-support"
                  placeholder="Password"
                  id="password"
                  required
                />
                <i
                  class="fas fa-eye password-toggle"
                  id="togglePassword"
                  onclick="togglePasswordVisibility()"
                ></i>
              </div>
              <div class="flex items-center justify-between gap-2 mb-2 sm:mb-4 lg:mb-6">
                <div class="checkbox-container flex items-center gap-2">
                  <input type="checkbox" class="checkbox" id="remember" />
                  <label
                    for="remember"
                    class="text-secondary text-xs sm:text-sm cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    class="link-text font-semibold text-xs sm:text-sm decoration-none"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                class="btn-primary w-full md:w-auto"
                id="loginBtn"
              >
                Sign In
              </button>
            </form>
            <div class="divider">
              <span class="divider-text text-center sm:text-left">
                Or continue with
              </span>
            </div>
            <div class="social-buttons">
              <button class="btn-secondary" onclick="socialLogin('google')">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                    fill="#4285F4"
                  />
                  <path
                    d="M9.003 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9.001c0 1.452.348 2.827.957 4.041l3.007-2.332z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
            </div>
            <div class="text-center mt-3 sm:mt-5 lg:mt-6">
              <span class="text-secondary text-sm">
                Don't have an account?{" "}
              </span>
              <a
                href="registration.html"
                class="link-text font-semibold text-sm decoration-none"
              >
                Sign up for free
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
