import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  className?: string;
}

export const StatusBadge = ({ status, children, className }: { status: string; children?: React.ReactNode; className?: string }) => {
  const getVariant = (s: string): "success" | "warning" | "error" | "info" | "neutral" => {
    const normalized = s.toUpperCase();
    if (["APPROVED", "ACTIVE", "PAID"].includes(normalized)) return "success";
    if (["PENDING", "UNDER_REVIEW"].includes(normalized)) return "warning";
    if (["REJECTED", "DEACTIVATED", "ERROR"].includes(normalized)) return "error";
    if (["DRAFT", "NEUTRAL"].includes(normalized)) return "neutral";
    return "info";
  };

  const variant = getVariant(status);
  
  const variants = {
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    error: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    neutral: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
      variants[variant],
      className
    )}>
      {children || status.replace("_", " ")}
    </span>
  );
};
