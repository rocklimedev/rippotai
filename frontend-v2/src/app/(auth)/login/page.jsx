// src/app/login/page.jsx    (or wherever your login page lives)
// Recommended location: app/login/page.jsx

"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/store/AuthContext"; // adjust path if needed

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        router.push("/admin"); // redirect to admin dashboard
        // Optional: router.replace("/admin") if you don't want back button to return here
      } else {
        setError(result.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      {/* Optional: Add some basic styling or link to home */}
      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f2f5;
        }
        .login-container {
          background: white;
          padding: 2.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333;
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }
        .error-message {
          color: #ff4d4f;
          margin: 1rem 0;
          text-align: center;
        }
        .login-button {
          width: 100%;
          padding: 0.9rem;
          background: #1890ff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1.05rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-button:hover {
          background: #40a9ff;
        }
        .login-button:disabled {
          background: #91caff;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Login;
