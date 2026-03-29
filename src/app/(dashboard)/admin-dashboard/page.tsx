"use client";

import {
  Users,
  Lightbulb,
  CheckCircle2,
  Clock,
  XCircle,
  Tag,
  CreditCard,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";
import { DashboardChart } from "@/components/ui/DashboardChart";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

export default function AdminOverview() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response: any = await api.get("/admin/dashboard");
      return response.data;
    },
  });

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
          Overview
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Track your community&apos;s pulse and performance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          description="Total registered members"
          color="blue"
        />
        <StatsCard
          title="Total Ideas"
          value={stats?.totalIdeas || 0}
          icon={Lightbulb}
          description="Submissions from community"
          color="purple"
        />
        <StatsCard
          title="Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={CreditCard}
          description="Total earnings from ideas"
          color="emerald"
        />
        <StatsCard
          title="Categories"
          value={stats?.totalCategories || 0}
          icon={Tag}
          description="Industry-aligned topics"
          color="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <StatsCard
          title="Approved"
          value={stats?.statusCounts?.APPROVED || 0}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatsCard
          title="Pending Review"
          value={stats?.statusCounts?.UNDER_REVIEW || 0}
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="Rejected"
          value={stats?.statusCounts?.REJECTED || 0}
          icon={XCircle}
          color="rose"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-8 h-[400px] flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">Activity Trends</h3>
          <p className="text-muted-foreground mt-1 max-w-xs">
            Visual data for user engagement and idea submissions.
          </p>
          <div className="mt-8 w-full flex-1">
            <DashboardChart />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-8 h-[400px] overflow-y-auto">
          <h3 className="text-xl font-bold mb-6">Recent Ideas</h3>
          <div className="space-y-6">
            {stats?.recentIdeas?.map((idea: any) => (
              <div key={idea.id} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-xs text-primary">
                  {idea.author?.name ? idea.author.name[0] : "E"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold truncate">{idea.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {idea.author?.name || "Unknown"} •{" "}
                    {new Date(idea.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    idea.status === "APPROVED"
                      ? "bg-emerald-500"
                      : idea.status === "UNDER_REVIEW"
                        ? "bg-amber-500"
                        : "bg-rose-500",
                  )}
                />
              </div>
            ))}
            {(!stats?.recentIdeas || stats.recentIdeas.length === 0) && (
              <p className="text-sm text-center text-zinc-500 py-12">
                No recent activity found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
