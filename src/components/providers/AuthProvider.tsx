"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type User = {
  id: string;
  name: string;
  email: string;
  role: "MEMBER" | "ADMIN";
  status: "ACTIVE" | "DEACTIVATED";
  image?: string;
};

type AuthContextType = {
  user: User | null;
  session: any;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: isLoading } = authClient.useSession();
  const router = useRouter();

  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: (session.user as any).role || "MEMBER",
    status: (session.user as any).status || "ACTIVE",
    image: session.user.image || undefined,
  } : null;

  const register = async (name: string, email: string, password: string) => {
    const { error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (error) {
      throw new Error(error.message || "Failed to register");
    }

    toast.success("Registration successful! Please login.");
    router.push("/login");
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
       throw new Error(error.message || "Failed to login");
    }

    if (data) {
        const role = (data.user as any).role;
        if (role === "ADMIN") {
          router.push("/admin-dashboard");
        } else {
          router.push("/member-dashboard");
        }
    }
  };

  const logout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, session, login, register, logout, isLoading }}>
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
