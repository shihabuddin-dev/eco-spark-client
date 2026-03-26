import { IdeaList } from "@/components/features/ideas/IdeaList";
import { IdeaFilters } from "@/components/features/ideas/IdeaFilters";
export const dynamic = "force-dynamic";

import { ApiResponse, Idea } from "@/types";
import { getIdeas } from "@/actions/idea.actions";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function IdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const ideas: ApiResponse<Idea[]> = await getIdeas({ ...params, status: "APPROVED" });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-5xl">
          Sustainability <span className="text-primary">Ideas</span>
        </h1>
        <p className="max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
          Explore and support community-driven projects aimed at reducing environmental impact and promoting a greener future.
        </p>
      </div>

      <IdeaFilters />
      
      <IdeaList initialData={ideas} />
    </div>
  );
}
