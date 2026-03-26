/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

export const dynamic = "force-dynamic";


import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { useEffect } from "react";

import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const ideaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  problemStatement: z.string().min(20, "Problem statement must be at least 20 characters"),
  proposedSolution: z.string().min(20, "Proposed solution must be at least 20 characters"),
  description: z.string().min(50, "Full description must be at least 50 characters"),
  images: z.string().optional(),
  isPaid: z.boolean(),
  price: z.number().optional(),
});

type IdeaForm = z.infer<typeof ideaSchema>;

export default function EditIdeaPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: idea, isLoading: isLoadingIdea } = useQuery({
    queryKey: ["idea-edit", id],
    queryFn: async () => {
      const response: any = await api.get(`/ideas/${id}`);
      return response.data;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: any = await api.get("/categories");
      return response.data;
    },
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue, reset, getValues } = useForm<IdeaForm>({
    resolver: zodResolver(ideaSchema),
    defaultValues: {
      isPaid: false,
    },
  });

  useEffect(() => {
    if (idea) {
      reset({
        title: idea.title,
        categoryId: idea.categoryId,
        problemStatement: idea.problemStatement,
        proposedSolution: idea.proposedSolution,
        description: idea.description,
        images: idea.images?.[0] || "",
        isPaid: idea.isPaid,
        price: idea.price || undefined,
      });
    }
  }, [idea, reset]);

  const isPaid = watch("isPaid");

  const updateIdeaMutation = useMutation({
    mutationFn: async (data: any) => {
      return api.patch(`/ideas/${id}`, data);
    },
    onSuccess: (_, variables) => {
      toast.success(variables.status === "DRAFT" ? "Idea updated and saved as draft" : "Idea updated and submitted!");
      queryClient.invalidateQueries({ queryKey: ["idea", id] });
      queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
      router.push("/member-dashboard");
    },
    onError: (err: any) => toast.error(err),
  });

  const onSubmit: any = (data: IdeaForm, isDraft: boolean) => {
    const payload = {
      ...data,
      status: isDraft ? "DRAFT" : "UNDER_REVIEW",
      images: data.images ? [data.images] : [],
      price: data.isPaid ? data.price : null,
    };
    updateIdeaMutation.mutate(payload);
  };

  const handleDraftSubmit = handleSubmit((data) => onSubmit(data, true));
  const handleReviewSubmit = handleSubmit((data) => onSubmit(data, false));

  if (isLoadingIdea) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/member-dashboard">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Sustainability Idea</h1>
      </div>

      <form className="grid gap-8 bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Title</label>
            <Input {...register("title")} placeholder="e.g. Solar Powered Water Purification" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Category</label>
            <select
              {...register("categoryId")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Select a category</option>
              {categories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Problem Statement</label>
          <textarea
            {...register("problemStatement")}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Clearly describe the environmental problem you're addressing..."
          />
          {errors.problemStatement && <p className="text-xs text-red-500">{errors.problemStatement.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Proposed Solution</label>
          <textarea
            {...register("proposedSolution")}
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="How does your idea solve the problem?"
          />
          {errors.proposedSolution && <p className="text-xs text-red-500">{errors.proposedSolution.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Full Description</label>
          <textarea
            {...register("description")}
            className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Provide all details, implementation steps, and required resources..."
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Image URL</label>
            <Input {...register("images")} placeholder="https://example.com/image.jpg" />
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-2 pt-8">
               <input 
                 type="checkbox" 
                 id="isPaid" 
                 {...register("isPaid")} 
                 className="h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary"
               />
               <label htmlFor="isPaid" className="text-sm font-medium">This is a Paid Idea</label>
             </div>
             
             {isPaid && (
               <div className="space-y-2">
                 <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Price ($)</label>
                 <Input 
                   type="number" 
                   step="0.01" 
                   {...register("price", { valueAsNumber: true })} 
                   placeholder="9.99" 
                 />
               </div>
             )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-end">
           <Button 
             type="button" 
             variant="outline" 
             className="h-12 px-8 font-bold"
             onClick={handleDraftSubmit}
             disabled={updateIdeaMutation.isPending}
           >
             Keep as Draft
           </Button>
           <Button 
             type="button" 
             className="h-12 px-12 font-bold"
             onClick={handleReviewSubmit}
             disabled={updateIdeaMutation.isPending}
           >
             {updateIdeaMutation.isPending ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Updating...
               </>
             ) : "Publish Changes"}
           </Button>
        </div>
      </form>
    </div>
  );
}
