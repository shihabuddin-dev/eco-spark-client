"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Leaf, User, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Ideas", href: "/ideas" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group z-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            <Leaf className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">EcoSpark</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-primary dark:hover:text-primary",
                pathname === link.href
                  ? "text-primary"
                  : "text-zinc-600 dark:text-zinc-400",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href={
                  user.role === "ADMIN"
                    ? "/admin-dashboard"
                    : "/member-dashboard"
                }
              >
                <Button variant="ghost" className="gap-2 font-bold">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2 font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-500/10 dark:hover:border-rose-500/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="font-bold">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="font-bold px-6 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -mr-2 text-zinc-600 dark:text-zinc-400 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white dark:bg-zinc-950 pt-24 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-bold transition-colors",
                  pathname === link.href
                    ? "text-primary"
                    : "text-zinc-600 dark:text-zinc-400",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-4 pt-2">
            {user ? (
              <>
                <Link
                  href={
                    user.role === "ADMIN"
                      ? "/admin-dashboard"
                      : "/member-dashboard"
                  }
                >
                  <Button className="w-full h-12 font-bold justify-start px-4">
                    <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="w-full h-12 font-bold justify-start px-4"
                >
                  <LogOut className="mr-3 h-5 w-5" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/register">
                  <Button className="w-full h-12 font-bold text-lg">
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 font-bold text-lg"
                  >
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
