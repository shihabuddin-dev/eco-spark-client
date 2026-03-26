export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { Idea, ApiResponse } from "@/types";
import { MemberIdeaList } from "@/components/features/member/MemberIdeaList";
import { buildQueryString } from "@/lib/query-builder";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MemberDashboardPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = buildQueryString(params);
  
  const [stats, ideasRes]: [any, ApiResponse<Idea[]>] = await Promise.all([
    fetchServer("/ideas/user/stats"),
    fetchServer(`/ideas/user/my-ideas${queryString ? `?${queryString}` : ""}`)
  ]);

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your Portfolio</h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">Manage and track your sustainability impact.</p>
        </div>
        <Link href="/member-dashboard/ideas/create">
          <Button className="h-14 rounded-2xl px-8 font-bold text-lg shadow-xl shadow-primary/20">
            <Plus className="mr-2 h-6 w-6" /> Create New Idea
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {[
          { label: "Total Ideas", value: stats.data.totalIdeas, color: "bg-blue-500" },
          { label: "Approved", value: stats.data.approvedIdeas, color: "bg-emerald-500" },
          { label: "Pending", value: stats.data.pendingIdeas, color: "bg-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 shadow-sm relative overflow-hidden group">
            <div className={cn("absolute top-0 right-0 h-24 w-24 translate-x-12 -translate-y-12 rounded-full opacity-10 blur-2xl transition-all group-hover:opacity-20", stat.color)} />
            <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</p>
            <p className="text-5xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Manage Your Submissions</h2>
        <MemberIdeaList initialData={ideasRes} />
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
