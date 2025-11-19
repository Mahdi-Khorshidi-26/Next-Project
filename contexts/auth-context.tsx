"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  orders?: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        orderNumber: number;
        processedAt: string;
        financialStatus: string;
        fulfillmentStatus: string;
        totalPriceV2: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface AuthContextType {
  customer: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshCustomer: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshCustomer = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      setCustomer(data.customer || null);
    } catch (error) {
      console.error("Failed to fetch customer:", error);
      setCustomer(null);
    }
  };

  useEffect(() => {
    let mounted = true;
    const loadCustomer = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (mounted) {
          setCustomer(data.customer || null);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch customer:", error);
        if (mounted) {
          setCustomer(null);
          setLoading(false);
        }
      }
    };
    loadCustomer();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Login failed");
    }

    await refreshCustomer();
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.error || "Registration failed");
    }

    await refreshCustomer();
  };

  const logout = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    setCustomer(null);
  };

  return (
    <AuthContext.Provider
      value={{ customer, loading, login, register, logout, refreshCustomer }}
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
