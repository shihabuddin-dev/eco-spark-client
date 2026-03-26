"use client";

import { Idea, ApiResponse } from "@/types";
import { IdeaCard } from "@/components/shared/IdeaCard";
import { Button } from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface IdeaListProps {
  initialData: ApiResponse<Idea[]>;
}

export const IdeaList = ({ initialData }: IdeaListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = initialData.meta;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/ideas?${params.toString()}`);
  };

  if (!initialData.data?.length) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-xl font-medium text-zinc-500">No ideas found matching your filters.</p>
        <Button variant="link" onClick={() => router.push("/ideas")}>
          Clear all filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {initialData.data.map((idea) => (
          <IdeaCard key={idea.id} idea={idea as any} />
        ))}
      </div>

      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            disabled={meta.page <= 1}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {[...Array(meta.totalPage)].map((_, i) => (
              <Button
                key={i + 1}
                variant={meta.page === i + 1 ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            disabled={meta.page >= meta.totalPage}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
