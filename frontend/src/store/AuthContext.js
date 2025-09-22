import React, { createContext, useState, useEffect } from "react";
import {
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useRefreshTokenMutation,
} from "../api/rippotaiApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem("adminToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  });

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(
    undefined,
    {
      skip: !authState.token,
    }
  );

  // Update auth state when profile data is fetched
  useEffect(() => {
    if (profile && authState.token) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        user: profile,
      }));
    }
  }, [profile]);

  // Handle token refresh on mount or when token expires
  useEffect(() => {
    const refresh = async () => {
      if (authState.refreshToken && !authState.token) {
        try {
          const response = await refreshTokenMutation({
            refreshToken: authState.refreshToken,
          }).unwrap();
          localStorage.setItem("adminToken", response.accessToken);
          localStorage.setItem("refreshToken", response.refreshToken);
          setAuthState((prev) => ({
            ...prev,
            token: response.accessToken,
            refreshToken: response.refreshToken,
            isAuthenticated: true,
          }));
        } catch (error) {
          console.error("Token refresh failed:", error);
          handleLogout();
        }
      }
    };
    refresh();
  }, [authState.refreshToken, refreshTokenMutation]);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password }).unwrap();
      localStorage.setItem("adminToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      setAuthState({
        isAuthenticated: true,
        user: response.user,
        token: response.accessToken,
        refreshToken: response.refreshToken,
      });
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.data?.message || "Login failed" };
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("adminToken");
    localStorage.removeItem("refreshToken");
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        token: authState.token,
        isLoading: isLoginLoading || isProfileLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
