"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  subtitle,
  badge,
  align = "center",
  className,
  children,
}: SectionHeaderProps) => {
  return (
    <div className={cn("mb-20 w-full", align === "center" ? "mx-auto max-w-3xl text-center" : "text-left", className)}>
      {badge && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 backdrop-blur-md shadow-sm animate-in fade-in slide-in-from-bottom-1 duration-500">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">{badge}</span>
        </div>
      )}
      <h2 className={cn(
        "font-black tracking-tighter text-zinc-900 dark:text-white leading-[1.1] mb-6",
        align === "center" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed tracking-tight",
          align === "center" ? "text-lg md:text-xl max-w-2xl mx-auto" : "text-lg max-w-xl"
        )}>
          {subtitle}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
};
