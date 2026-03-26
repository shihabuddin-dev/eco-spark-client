"use client";

import { Category } from "@/types";
import { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "@/actions/admin.actions";
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
import { Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";

interface CategoryTableProps {
  initialData: Category[];
}

export const CategoryTable = ({ initialData }: CategoryTableProps) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      if (editingCategory) {
        const result = await updateCategory(editingCategory.id, data.name, data.description);
        if (!result.success) throw new Error(result.error);
        return result.data;
      }
      const result = await createCategory(data.name, data.description);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(editingCategory ? "Category updated" : "Category created");
      closeModal();
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteCategory(id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted");
    },
    onError: (err: any) => toast.error(err.message || err),
  });

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setDescription(category.description);
    } else {
      setEditingCategory(null);
      setName("");
      setDescription("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate({ name, description });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => openModal()} className="rounded-xl font-bold">
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden dark:border-zinc-800 dark:bg-zinc-950 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50/50 dark:bg-zinc-900/50">
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Description</TableHead>
              <TableHead className="font-bold">Ideas Count</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.map((cat) => (
              <TableRow key={cat.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell className="text-zinc-500 max-w-xs truncate">{cat.description}</TableCell>
                <TableCell>{cat._count?.ideas || 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openModal(cat)}>
                      <Edit2 className="h-4 w-4 text-zinc-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="hover:text-rose-500"
                      onClick={() => confirm("Delete this category?") && deleteMutation.mutate(cat.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Renewable Energy"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Description</label>
              <textarea
                className="flex min-h-[100px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this thematic area..."
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeModal} className="rounded-xl">Cancel</Button>
              <Button type="submit" disabled={mutation.isPending} className="rounded-xl px-8 font-bold">
                {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : (editingCategory ? "Update" : "Create")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
