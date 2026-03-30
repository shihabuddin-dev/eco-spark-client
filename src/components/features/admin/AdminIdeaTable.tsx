"use client";

import { Idea, ApiResponse, IdeaStatus, Category } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateIdeaStatus, editIdea } from "@/actions/admin.actions";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle, Eye, Search, ChevronLeft, ChevronRight, MessageSquare, Pencil, Save, X } from "lucide-react";
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
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";

interface AdminIdeaTableProps {
  initialData: ApiResponse<Idea[]>;
  categories: Category[];
}

export const AdminIdeaTable = ({ initialData, categories }: AdminIdeaTableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const meta = initialData.meta;
  
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | null>(null);
  const [feedback, setFeedback] = useState("");
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);

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

  const editIdeaMutation = useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const result = await editIdea(id, body);
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      toast.success("Idea updated successfully");
      setEditModalOpen(false);
      setEditingIdea(null);
      router.refresh();
    },
    onError: (err: any) => {
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

  const openEditModal = (idea: Idea) => {
    setEditingIdea(idea);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingIdea) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      problemStatement: formData.get("problemStatement") as string,
      proposedSolution: formData.get("proposedSolution") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      isPaid: formData.get("isPaid") === "on",
      categoryId: formData.get("categoryId") as string,
      status: formData.get("status") as IdeaStatus,
    };

    editIdeaMutation.mutate({ id: editingIdea.id, body: data });
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
                      <Button variant="ghost" size="icon" title="View Detail">
                        <Eye className="h-4 w-4 text-zinc-500" />
                      </Button>
                    </Link>
                    
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(idea)} title="Edit Idea">
                      <Pencil className="h-4 w-4 text-zinc-500" />
                    </Button>
                    
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

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Pencil className="h-8 w-8 text-primary" />
              Edit Idea
            </DialogTitle>
          </DialogHeader>
          
          {editingIdea && (
            <form onSubmit={handleEditSubmit} className="space-y-8 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Basic Info</Label>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-bold">Title</Label>
                        <Input id="title" name="title" defaultValue={editingIdea.title} className="rounded-xl border-zinc-200" required />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="categoryId" className="text-sm font-bold">Category</Label>
                          <select 
                            id="categoryId" 
                            name="categoryId" 
                            defaultValue={editingIdea.categoryId}
                            className="flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-zinc-900 dark:border-zinc-800"
                          >
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="status" className="text-sm font-bold">Status</Label>
                          <select 
                            id="status" 
                            name="status" 
                            defaultValue={editingIdea.status}
                            className="flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-zinc-900 dark:border-zinc-800"
                          >
                            <option value="DRAFT">DRAFT</option>
                            <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Pricing</Label>
                    <div className="flex items-center gap-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id="isPaid" 
                          name="isPaid" 
                          defaultChecked={editingIdea.isPaid}
                          className="w-5 h-5 rounded-lg accent-primary"
                        />
                        <Label htmlFor="isPaid" className="text-sm font-bold">Paid Content</Label>
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="price" className="text-xs font-bold text-zinc-500">Price ($)</Label>
                        <Input 
                          id="price" 
                          name="price" 
                          type="number" 
                          step="0.01" 
                          defaultValue={editingIdea.price || 0}
                          className="rounded-xl h-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="problemStatement" className="text-sm font-bold">Problem Statement</Label>
                      <Textarea id="problemStatement" name="problemStatement" defaultValue={editingIdea.problemStatement} className="min-h-[100px] rounded-xl resize-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proposedSolution" className="text-sm font-bold">Proposed Solution</Label>
                      <Textarea id="proposedSolution" name="proposedSolution" defaultValue={editingIdea.proposedSolution} className="min-h-[100px] rounded-xl resize-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-bold">Full Description</Label>
                <Textarea id="description" name="description" defaultValue={editingIdea.description} className="min-h-[150px] rounded-2xl p-4" />
              </div>

              <DialogFooter className="gap-3 pt-4 sm:justify-end">
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="rounded-xl px-8" 
                  onClick={() => setEditModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="rounded-xl px-10 font-bold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  disabled={editIdeaMutation.isPending}
                >
                  {editIdeaMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
