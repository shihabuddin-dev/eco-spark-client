export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { Idea, ApiResponse, Category } from "@/types";
import { AdminIdeaTable } from "@/components/features/admin/AdminIdeaTable";
import { buildQueryString } from "@/lib/query-builder";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminIdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = buildQueryString(params);

  let ideasRes: ApiResponse<Idea[]> = { success: false, message: "", data: [] };
  let categoriesRes: ApiResponse<Category[]> = { success: false, message: "", data: [] };

  try {
    [ideasRes, categoriesRes] = await Promise.all([
      fetchServer(`/admin/ideas${queryString ? `?${queryString}` : ""}`),
      fetchServer("/categories")
    ]);
  } catch (error) {
    console.error("Failed to fetch admin ideas:", error);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Idea Moderation
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Review and moderate community sustainability submissions.
        </p>
      </div>

      <AdminIdeaTable initialData={ideasRes} categories={categoriesRes.data || []} />
    </div>
  );
}
