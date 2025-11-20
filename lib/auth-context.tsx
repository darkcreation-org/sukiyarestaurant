"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login, verifyToken, removeAuthToken, setAuthToken, getAuthToken, type AuthUser, type LoginResponse } from "./admin-api";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = getAuthToken();
    if (token) {
      verifyToken(token)
        .then((result) => {
          if (result.valid) {
            setUser(result.user);
          } else {
            removeAuthToken();
          }
        })
        .catch(() => {
          removeAuthToken();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = async (userId: string, password: string) => {
    const response: LoginResponse = await login(userId, password);
    setAuthToken(response.token);
    setUser(response.user);
  };

  const handleLogout = () => {
    removeAuthToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

