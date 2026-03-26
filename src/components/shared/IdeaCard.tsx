import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUp, MessageSquare, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/AuthProvider";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

import { Idea } from "@/types";

type IdeaCardProps = {
  idea: Idea;
};

export const IdeaCard = ({ idea }: IdeaCardProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAuthor = user?.id === idea.authorId;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return api.delete(`/ideas/${idea.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      toast.success("Idea deleted");
    },
    onError: (err: any) => toast.error(err),
  });

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        {idea.isPaid && (
          <div className="rounded-full bg-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Paid
          </div>
        )}
        {isAuthor && (
           <div className={cn(
             "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm",
             idea.status === "APPROVED" ? "bg-emerald-500" : 
             idea.status === "REJECTED" ? "bg-rose-500" : "bg-zinc-500"
           )}>
             {idea.status}
           </div>
        )}
      </div>

      <div className="aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {idea.images?.[0] ? (
          <img
            src={idea.images[0]}
            alt={idea.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary uppercase">
            <Tag className="h-3 w-3" />
            {idea.category.name}
          </div>
        </div>

        <h3 className="mb-2 text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
          {idea.title}
        </h3>
        
        <p className="mb-6 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
          {idea.description}
        </p>

        <div className="mt-auto flex flex-col gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-1 text-xs">
                <ArrowUp className="h-3.5 w-3.5 text-orange-500" />
                <span>{idea._count?.votes || 0}</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5" />
                <span>{idea._count?.comments || 0}</span>
              </div>
            </div>
            
            <Link href={`/ideas/${idea.id}`}>
              <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-wider">
                View Idea
              </Button>
            </Link>
          </div>

          {isAuthor && (
            <div className="flex items-center gap-2">
              <Link href={`/member-dashboard/ideas/${idea.id}/edit`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-[10px] h-8 font-bold uppercase tracking-tighter">
                  Edit Idea
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 text-[10px] h-8 font-bold uppercase tracking-tighter text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                disabled={deleteMutation.isPending}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  if (confirm("Delete this idea?")) deleteMutation.mutate();
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
