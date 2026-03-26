"use client";

import { Idea, ApiResponse, IdeaStatus } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateIdeaStatus } from "@/actions/admin.actions";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, Eye, Search, ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { useState } from "react";

interface AdminIdeaTableProps {
  initialData: ApiResponse<Idea[]>;
}

export const AdminIdeaTable = ({ initialData }: AdminIdeaTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = initialData.meta;
  
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | null>(null);
  const [feedback, setFeedback] = useState("");

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, feedback }: { id: string; status: IdeaStatus; feedback?: string }) => {
      const result = await updateIdeaStatus(id, status as any, feedback);
      if (!result.success) throw new Error(result.error);
      return result; // Return the entire result, not just data
    },
    onSuccess: (data, variables) => {
      toast.success(`Idea status updated to ${variables.status}`);
      setFeedbackModalOpen(false);
      setFeedback("");
      setSelectedStatus(null);
      // Refresh the page data from server
      router.refresh();
    },
    onError: (err: any) => {
      console.error("Status update error:", err);
      toast.error(err.message || "Error updating idea");
    },
  });

  const handleStatusChange = (ideaId: string, newStatus: IdeaStatus) => {
    if (newStatus === "REJECTED") {
      // Open modal for rejection feedback
      setSelectedIdeaId(ideaId);
      setSelectedStatus(newStatus);
      setFeedbackModalOpen(true);
    } else {
      // Direct status update without feedback
      updateStatusMutation.mutate({ id: ideaId, status: newStatus });
    }
  };

  const statusOptions: IdeaStatus[] = ["DRAFT", "UNDER_REVIEW", "APPROVED", "REJECTED"];

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) params.set("searchTerm", term);
    else params.delete("searchTerm");
    params.set("page", "1");
    router.push(`/admin-dashboard/ideas?${params.toString()}`);
  };

  const openRejectModal = (id: string) => {
    setSelectedIdeaId(id);
    setSelectedStatus("REJECTED");
    setFeedbackModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search ideas..."
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
              <TableHead className="font-bold">Idea</TableHead>
              <TableHead className="font-bold">Author</TableHead>
              <TableHead className="font-bold">Category</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.data.map((idea) => (
              <TableRow key={idea.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{idea.title}</span>
                    <span className="text-xs text-zinc-500">{idea.isPaid ? `Paid ($${idea.price})` : "Free"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium">{idea.author.name}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                    {idea.category.name}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={idea.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <Link href={`/ideas/${idea.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4 text-zinc-500" />
                      </Button>
                    </Link>
                    
                    {/* Status Update Dropdown */}
                    <select
                      value={idea.status}
                      onChange={(e) => handleStatusChange(idea.id, e.target.value as IdeaStatus)}
                      disabled={updateStatusMutation.isPending}
                      className="px-3 py-2 rounded-lg border border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-800 text-sm font-medium cursor-pointer hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={feedbackModalOpen} onOpenChange={setFeedbackModalOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Reject Idea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
             <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Reason for rejection</label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide constructive feedback to the author..."
                  required
                />
             </div>
          </div>
          <DialogFooter>
             <Button variant="ghost" onClick={() => {
               setFeedbackModalOpen(false);
               setFeedback("");
               setSelectedStatus(null);
             }}>Cancel</Button>
             <Button 
               variant="destructive" 
               className="rounded-xl font-bold"
               onClick={() => selectedIdeaId && selectedStatus && updateStatusMutation.mutate({ 
                 id: selectedIdeaId, 
                 status: selectedStatus,
                 feedback: feedback.trim() || undefined
               })}
               disabled={updateStatusMutation.isPending}
             >
               Confirm Reject
             </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
