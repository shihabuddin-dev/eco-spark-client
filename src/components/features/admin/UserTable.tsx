"use client";

import { User, ApiResponse } from "@/types";
import { useState } from "react";
import { toggleUserRole, toggleUserStatus } from "@/actions/admin.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Shield, ShieldAlert, UserX, UserCheck, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface UserTableProps {
  initialData: ApiResponse<User[]>;
}

export const UserTable = ({ initialData }: UserTableProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = initialData.meta;

  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const result = await toggleUserRole(id, role);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role updated");
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, isBlocked }: { id: string; isBlocked: boolean }) => {
      const result = await toggleUserStatus(id, isBlocked);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Status updated");
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("searchTerm", term);
    else params.delete("searchTerm");
    params.set("page", "1");
    router.push(`/admin-dashboard/users?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/admin-dashboard/users?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            defaultValue={searchParams.get("searchTerm") || ""}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="font-bold">User</TableHead>
              <TableHead className="font-bold">Role</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Joined</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.data.map((user) => (
              <TableRow key={user.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</span>
                    <span className="text-xs text-zinc-500">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.role === "ADMIN" ? (
                      <Shield className="h-4 w-4 text-primary" />
                    ) : (
                      <ShieldAlert className="h-4 w-4 text-zinc-400" />
                    )}
                    <span className="text-sm font-medium">{user.role}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-sm text-zinc-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateRoleMutation.mutate({
                        id: user.id,
                        role: user.role === "ADMIN" ? "MEMBER" : "ADMIN"
                      })}
                    >
                      Toggle Role
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={user.status === "ACTIVE" ? "hover:text-rose-500" : "hover:text-emerald-500"}
                      onClick={() => toggleStatusMutation.mutate({
                        id: user.id,
                        isBlocked: user.status === "ACTIVE"
                      })}
                    >
                      {user.status === "ACTIVE" ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={meta.page <= 1}
            onClick={() => handlePageChange(meta.page - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
          <span className="text-sm text-zinc-500">Page {meta.page} of {meta.totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={meta.page >= meta.totalPages}
            onClick={() => handlePageChange(meta.page + 1)}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};
