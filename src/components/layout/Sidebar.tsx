"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Lightbulb,
  Settings,
  LogOut,
  Leaf,
  Tag,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useAuth } from "@/components/providers/AuthProvider";
import Logo from "../shared/Logo";

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/admin-dashboard" },
    { icon: Lightbulb, label: "Manage Ideas", href: "/admin-dashboard/ideas" },
    { icon: Users, label: "Manage Users", href: "/admin-dashboard/users" },
    { icon: Tag, label: "Categories", href: "/admin-dashboard/categories" },
    { icon: Settings, label: "Settings", href: "/admin-dashboard/settings" },
  ];

  const memberMenuItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/member-dashboard" },
    { icon: Lightbulb, label: "My Ideas", href: "/member-dashboard/ideas" },
    {
      icon: Plus,
      label: "Create Idea",
      href: "/member-dashboard/ideas/create",
    },
    { icon: Settings, label: "Profile", href: "/member-dashboard/profile" },
  ];

  const menuItems = user?.role === "ADMIN" ? adminMenuItems : memberMenuItems;

  return (
    <aside className="fixed left-0 top-0 h-screen w-[var(--sidebar-width)] border-r border-border bg-card/80 dark:bg-slate-950/50 backdrop-blur-2xl z-50 transition-all duration-300">
      <div className="flex flex-col h-full p-6">
       <div className="pb-6 md:pb-10">
        <Logo/>
       </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
