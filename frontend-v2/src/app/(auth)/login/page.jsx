"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLoginMutation } from "@/api/authApi";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password }).unwrap();

      if (result.accessToken) {
        localStorage.setItem("adminToken", result.accessToken);

        if (result.refreshToken) {
          localStorage.setItem("refreshToken", result.refreshToken);
        }

        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo = urlParams.get("redirect") || "/admin/";

        window.location.href = redirectTo;
      } else {
        setError("Login succeeded but no access token was received.");
      }
    } catch (err) {
      setError(
        err.data?.message ||
          err.message ||
          "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/login_banner.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-full max-w-md">
        {/* Heading */}
        <div className="text-center text-white mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold">Login</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-200">
            Sign in to manage your dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur p-5 sm:p-8 shadow-lg rounded-xl border border-gray-200">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="mt-1 w-full rounded-md border px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-md bg-red-50 p-3 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                <p className="text-xs sm:text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-5 text-center text-xs sm:text-sm">
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
