"use client";

import { Idea, ApiResponse } from "@/types";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface MemberIdeaListProps {
  initialData: ApiResponse<Idea[]>;
}

export const MemberIdeaList = ({ initialData }: MemberIdeaListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = initialData.meta;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/member-dashboard?${params.toString()}`);
  };

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("searchTerm", term);
    else params.delete("searchTerm");
    params.set("page", "1");
    router.push(`/member-dashboard?${params.toString()}`);
  };

  if (!initialData.data?.length && !searchParams.get("searchTerm")) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-[32px] border-4 border-dashed border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="mb-6 rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
          <Search className="h-12 w-12 text-zinc-400" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No ideas created yet</h3>
        <p className="text-zinc-500 mb-8 max-w-sm text-center">Start your journey by sharing your first sustainability initiative with the community.</p>
        <Button onClick={() => router.push("/member-dashboard/ideas/create")} className="h-12 rounded-xl px-8 font-bold">
           Share an Idea
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search your ideas..."
            className="pl-12 h-12 rounded-2xl bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 shadow-sm"
            defaultValue={searchParams.get("searchTerm") || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {initialData.data.map((idea) => (
          <IdeaCard key={idea.id} idea={idea as any} />
        ))}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-4 pt-8">
          <Button
            variant="outline"
            className="rounded-xl h-12 px-6"
            disabled={meta.page <= 1}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <span className="text-sm font-bold text-zinc-500">Page {meta.page} of {meta.totalPage}</span>
          <Button
            variant="outline"
            className="rounded-xl h-12 px-6"
            disabled={meta.page >= meta.totalPage}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
