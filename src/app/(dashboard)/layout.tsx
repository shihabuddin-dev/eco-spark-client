"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { useAuth } from "@/components/providers/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-[var(--sidebar-width)]">
        <header className="sticky top-0 h-16 border-b border-border bg-background/50 backdrop-blur-md z-40 px-8 flex items-center justify-between">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
            {user?.role === "ADMIN" ? "Administrator" : "Member"} Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:block">{user?.name}</span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 overflow-hidden flex items-center justify-center text-xs font-bold text-primary">
              {user?.name?.split(" ").map(n => n[0]).join("") || "U"}
            </div>
          </div>
        </header>
        <main className="p-8 pb-16">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
