"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 w-[72px] h-[40px]">
         <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm"></div>
      </div>
    );
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-full border border-zinc-200 dark:border-zinc-800">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center justify-center h-8 w-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${currentTheme === 'light' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center justify-center h-8 w-8 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${currentTheme === 'dark' ? 'bg-zinc-800 shadow-sm text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
