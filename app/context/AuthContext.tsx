"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "Admin" | "Admissions" | "Finance";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
};

type AuthContextType = {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  hasAccess: (allowedRoles: UserRole[]) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<UserRole, User> = {
  Admin: {
    id: "usr-1",
    name: "Hassaan Inam",
    email: "hassaan@apex.edu",
    role: "Admin",
    avatar: "H",
  },
  Admissions: {
    id: "usr-2",
    name: "Ayesha Malik",
    email: "ayesha@apex.edu",
    role: "Admissions",
    avatar: "A",
  },
  Finance: {
    id: "usr-3",
    name: "Tariq Mahmood",
    email: "tariq@apex.edu",
    role: "Finance",
    avatar: "T",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Default to Admin logged in for demo
    const saved = localStorage.getItem("apex_user_role") as UserRole | null;
    setUser(DEMO_USERS[saved || "Admin"]);
  }, []);

  const login = (role: UserRole) => {
    const selectedUser = DEMO_USERS[role];
    setUser(selectedUser);
    localStorage.setItem("apex_user_role", role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("apex_user_role");
  };

  const hasAccess = (allowedRoles: UserRole[]) => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}