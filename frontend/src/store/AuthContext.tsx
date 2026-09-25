
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useGetProfileQuery,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} from "@/api/authApi";

import type { User } from "@/api/authApi";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

interface LoginResult {
  success: boolean;
  error?: string;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<LoginResult>;
  logout: () => Promise<void>;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  refreshToken: null,
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    if (typeof window === "undefined") {
      return initialAuthState;
    }

    const token = localStorage.getItem("adminToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
      isAuthenticated: Boolean(token),
      user: null,
      token,
      refreshToken,
    };
  });

  const [login, { isLoading: isLoginLoading }] =
    useLoginMutation();

  const [logout] = useLogoutMutation();

  const [refreshTokenMutation] =
    useRefreshTokenMutation();

  /*
   * Fetch current profile whenever we have an access token.
   */
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
  } = useGetProfileQuery(undefined, {
    skip: !authState.token,
  });

  /*
   * Logout
   */
  const handleLogout = useCallback(async () => {
    try {
      if (authState.token) {
        await logout().unwrap();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("refreshToken");

      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
      });
    }
  }, [logout, authState.token]);

  /*
   * Update user when profile loads.
   */
  useEffect(() => {
    if (profile && authState.token) {
      setAuthState((previous) => ({
        ...previous,
        isAuthenticated: true,
        user: profile,
      }));
    }
  }, [profile, authState.token]);

  /*
   * If the access token becomes invalid, clear authentication.
   *
   * Your RTK Query API should ideally handle 401 + refresh globally,
   * but this keeps the context safe as well.
   */
  useEffect(() => {
    if (
      authState.token &&
      isProfileError &&
      !authState.refreshToken
    ) {
      void handleLogout();
    }
  }, [
    authState.token,
    authState.refreshToken,
    isProfileError,
    handleLogout,
  ]);

  /*
   * Refresh access token if we only have a refresh token.
   */
  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      if (
        !authState.refreshToken ||
        authState.token
      ) {
        return;
      }

      try {
        const response =
          await refreshTokenMutation(
            authState.refreshToken,
          ).unwrap();

        if (cancelled) {
          return;
        }

        const accessToken =
          response.accessToken ?? response.token;

        const newRefreshToken =
          response.refreshToken ??
          authState.refreshToken;

        if (!accessToken) {
          throw new Error(
            "Refresh response did not contain an access token",
          );
        }

        localStorage.setItem(
          "adminToken",
          accessToken,
        );

        if (newRefreshToken) {
          localStorage.setItem(
            "refreshToken",
            newRefreshToken,
          );
        }

        setAuthState((previous) => ({
          ...previous,
          isAuthenticated: true,
          token: accessToken,
          refreshToken: newRefreshToken,
        }));
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Token refresh failed:",
          error,
        );

        await handleLogout();
      }
    };

    void refresh();

    return () => {
      cancelled = true;
    };
  }, [
    authState.refreshToken,
    authState.token,
    refreshTokenMutation,
    handleLogout,
  ]);

  /*
   * Login
   */
  const handleLogin = useCallback(
    async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }): Promise<LoginResult> => {
      try {
        const response = await login({
          email,
          password,
        }).unwrap();

        /*
         * Support both:
         *
         * {
         *   accessToken: "..."
         * }
         *
         * and:
         *
         * {
         *   token: "..."
         * }
         */
        const accessToken =
          response.accessToken ??
          response.token;

        const refreshToken =
          response.refreshToken;

        if (!accessToken) {
          return {
            success: false,
            error:
              response.message ??
              "Login response did not contain an access token.",
          };
        }

        localStorage.setItem(
          "adminToken",
          accessToken,
        );

        if (refreshToken) {
          localStorage.setItem(
            "refreshToken",
            refreshToken,
          );
        } else {
          localStorage.removeItem(
            "refreshToken",
          );
        }

        setAuthState({
          isAuthenticated: true,
          user: response.user ?? null,
          token: accessToken,
          refreshToken: refreshToken ?? null,
        });

        return {
          success: true,
        };
      } catch (error: unknown) {
        console.error(
          "Login failed:",
          error,
        );

        /*
         * RTK Query error shape is not automatically
         * known to TypeScript, so safely extract it.
         */
        let message = "Login failed";

        if (
          typeof error === "object" &&
          error !== null &&
          "data" in error
        ) {
          const errorData = (
            error as {
              data?: {
                message?: string;
              };
            }
          ).data;

          if (errorData?.message) {
            message = errorData.message;
          }
        }

        return {
          success: false,
          error: message,
        };
      }
    },
    [login],
  );

  const contextValue: AuthContextValue = {
    isAuthenticated:
      authState.isAuthenticated,

    user: authState.user,

    token: authState.token,

    isLoading:
      isLoginLoading ||
      isProfileLoading,

    login: handleLogin,

    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth must be used within AuthProvider",
    );
  }

  return context;
};

