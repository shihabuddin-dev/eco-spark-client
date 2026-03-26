export const dynamic = "force-dynamic";

import { fetchServer } from "@/lib/api-server";
import { User, ApiResponse } from "@/types";
import { UserTable } from "@/components/features/admin/UserTable";
import { buildQueryString } from "@/lib/query-builder";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const queryString = buildQueryString(params);
  const usersRes: ApiResponse<User[]> = await fetchServer(`/admin/users${queryString ? `?${queryString}` : ""}`);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage community accounts and roles.</p>
      </div>

      <UserTable initialData={usersRes} />
    </div>
  );
}
