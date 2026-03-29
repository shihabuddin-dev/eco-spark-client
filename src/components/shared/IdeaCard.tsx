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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        {idea.isPaid && (
          <div className="rounded-full bg-amber-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
            Paid
          </div>
        )}
        {isAuthor && (
          <div className={cn(
            "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm",
            idea.status === "APPROVED" ? "bg-emerald-500/90" :
              idea.status === "REJECTED" ? "bg-rose-500/90" : "bg-zinc-500/90"
          )}>
            {idea.status}
          </div>
        )}
      </div>

      <div className="aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {idea.images?.[0] ? (
          <img
            src={idea.images[0]}
            alt={idea.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 px-5">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[9px] font-black text-primary uppercase tracking-tighter">
            <Tag className="h-2.5 w-2.5" />
            {idea.category.name}
          </div>
        </div>

        <h3 className="mb-1.5 text-[15px] leading-tight font-black text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors line-clamp-1">
          {idea.title}
        </h3>

        <p className="mb-4 line-clamp-2 text-[12px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium tracking-tight">
          {idea.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <ArrowUp className="h-3 w-3 text-orange-500/70" />
              <span>{idea._count?.votes || 0}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <MessageSquare className="h-3 w-3" />
              <span>{idea._count?.comments || 0}</span>
            </div>
          </div>

          <Link href={`/ideas/${idea.id}`}>
            <Button size="sm" variant="outline" className="h-7 px-3 text-[10px] font-black uppercase tracking-widest cursor-pointer">
              View
            </Button>
          </Link>
        </div>

        {isAuthor && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-zinc-50 dark:border-zinc-900">
            <Link href={`/member-dashboard/ideas/${idea.id}/edit`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-[9px] h-7 font-black uppercase tracking-tighter rounded-lg border-zinc-200 dark:border-zinc-800">
                Edit
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-[9px] h-7 font-black uppercase tracking-tighter text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
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
  );
};
