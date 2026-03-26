export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { Category, ApiResponse } from "@/types";
import { CategoryTable } from "@/components/features/admin/CategoryTable";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default async function AdminCategoriesPage() {
  const categoriesRes: ApiResponse<Category[]> = await fetchServer("/categories");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Manage the sustainability themes for the community.</p>
        </div>
        {/* We can add a "Create Category" button that opens a modal */}
      </div>

      <CategoryTable initialData={categoriesRes.data} />
    </div>
  );
}
