"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "usr_001",
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/96?img=33",
  phone: "+1 (555) 123-4567",
  addresses: [
    {
      id: "addr_001",
      label: "Home",
      name: "John Doe",
      line1: "123 Tech Street",
      line2: "Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      country: "US",
      isDefault: true,
    },
    {
      id: "addr_002",
      label: "Office",
      name: "John Doe",
      line1: "456 Market St",
      line2: "Floor 12",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      country: "US",
      isDefault: false,
    },
  ],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nexus-auth");
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login — any credentials work
    const loggedIn = { ...DEMO_USER, email };
    setUser(loggedIn);
    localStorage.setItem("nexus-auth", JSON.stringify(loggedIn));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nexus-auth");
  };

  const register = (data) => {
    const newUser = { ...DEMO_USER, ...data };
    setUser(newUser);
    localStorage.setItem("nexus-auth", JSON.stringify(newUser));
    return true;
  };

  const updateProfile = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem("nexus-auth", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateProfile, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
