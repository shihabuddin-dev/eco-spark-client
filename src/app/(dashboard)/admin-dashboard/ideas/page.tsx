export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { Idea, ApiResponse } from "@/types";
import { AdminIdeaTable } from "@/components/features/admin/AdminIdeaTable";
import { buildQueryString } from "@/lib/query-builder";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminIdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = buildQueryString(params);
  const ideasRes: ApiResponse<Idea[]> = await fetchServer(`/admin/ideas${queryString ? `?${queryString}` : ""}`);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Idea Moderation</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Review and moderate community sustainability submissions.</p>
      </div>

      <AdminIdeaTable initialData={ideasRes} />
    </div>
  );
}
