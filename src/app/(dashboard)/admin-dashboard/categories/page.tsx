export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { Category, ApiResponse } from "@/types";
import { CategoryTable } from "@/components/features/admin/CategoryTable";

export default async function AdminCategoriesPage() {
  let categoriesRes: ApiResponse<Category[]> = {
    success: false,
    message: "",
    data: [],
  };

  try {
    categoriesRes = await fetchServer("/categories");
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage the sustainability themes for the community.
          </p>
        </div>
      </div>

      <CategoryTable initialData={categoriesRes.data} />
    </div>
  );
}
