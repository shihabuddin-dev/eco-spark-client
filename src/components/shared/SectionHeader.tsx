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
    <div className={cn("mb-16 w-full", align === "center" ? "mx-auto max-w-3xl text-center" : "text-left", className)}>
      {badge && (
        <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{badge}</span>
        </div>
      )}
      <h2 className={cn(
        "text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-4",
        align === "left" && "text-left"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-zinc-600 dark:text-zinc-400 font-medium",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
};
