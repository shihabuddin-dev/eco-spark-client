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

export default async function MyIdeasPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = buildQueryString(params);

  let ideasRes: ApiResponse<Idea[]> = { success: false, message: "", data: [] };

  try {
    ideasRes = await fetchServer(
      `/ideas/user/my-ideas${queryString ? `?${queryString}` : ""}`,
    );
  } catch (error) {
    console.error("Failed to fetch my ideas:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            My Ideas
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            View and manage all your submitted sustainability ideas.
          </p>
        </div>
        <Link href="/member-dashboard/ideas/create">
          <Button className="h-12 rounded-xl px-6 font-bold shadow-md shadow-primary/10">
            <Plus className="mr-2 h-5 w-5" /> Create New
          </Button>
        </Link>
      </div>

      <MemberIdeaList initialData={ideasRes} />
    </div>
  );
}
