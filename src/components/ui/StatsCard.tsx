import { 
  Users, 
  Lightbulb, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Tag, 
  CreditCard,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: any;
  description?: string;
  trend?: string;
  color?: "blue" | "emerald" | "amber" | "rose" | "purple";
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend, 
  color = "blue" 
}: StatsCardProps) => {
  const colors = {
    blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-2xl border", colors[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-1">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-tight">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            {description}
          </p>
        )}
      </div>

      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100 opacity-50" />
    </div>
  );
};
